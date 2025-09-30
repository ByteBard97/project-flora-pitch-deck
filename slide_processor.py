#!/usr/bin/env python3
"""
Presentation Build System
Compiles modular slides into single file or bundle with WebP image optimization

Usage:
    ./build.py                    # Direct execution
    conda run -n superglue-env ./build.py    # With specific conda env
"""

import re
import json
import base64
import shutil
import zipfile
from pathlib import Path
from datetime import datetime
from PIL import Image
import yaml


class SlideProcessor:
    """Handles slide collection and processing"""
    
    def __init__(self, config, asset_manager):
        self.config = config
        self.asset_manager = asset_manager
    
    def collect_slides(self, output_mode='bundle'):
        """Read slide files from config.yaml and discover assets"""
        slides_dir = Path("slides")
        
        # Get slide files from config.yaml
        slide_configs = self.config.get('slides', [])
        if not slide_configs:
            print("❌ No slides defined in config.yaml")
            return []
        
        print(f"📄 Processing {len(slide_configs)} slides from config.yaml")
        
        slides_content = []
        for i, slide_config in enumerate(slide_configs, 1):
            # Handle both formats
            if isinstance(slide_config, str):
                slide_filename = slide_config
            else:
                slide_filename = slide_config.get('file')
            
            slide_file = slides_dir / slide_filename
            
            if not slide_file.exists():
                print(f"   ❌ Slide not found: {slide_filename}")
                continue
            
            # Quietly process slide
            content = slide_file.read_text(encoding='utf-8')
            
            # Extract title from HTML
            title = self._extract_title_from_html(content)
            
            # Process shader includes (must happen before asset processing)
            content = self._process_shader_includes(content)

            # Process assets in this slide
            content, slide_assets = self.asset_manager.process_slide_assets(
                content, slide_file, output_mode
            )

            # IMPORTANT: Remove any fetch() calls from slides
            content = self._remove_fetch_calls(content)
            
            slides_content.append({
                'file': slide_filename,
                'number': i,
                'title': title,
                'content': content,
                'assets': slide_assets
            })
            
            self.asset_manager.assets_collected.extend(slide_assets)
        
        return slides_content
    
    def _extract_title_from_html(self, content):
        """Extract title from HTML <h1> tag"""
        h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
        if h1_match:
            title = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
            return title
        return "Untitled Slide"
    
    def _remove_fetch_calls(self, content):
        """Replace fetch() calls with checks for embedded data"""
        # Don't modify fetch calls for now since they're complex Promise chains
        # The 3D slide already has proper fallback logic to use embedded data
        # when available, so no replacement is needed
        return content

    def _process_shader_includes(self, content):
        """Process {{SHADER:filename.glsl}} includes recursively

        Replaces placeholders with shader file contents.
        Example: {{SHADER:cube-circle.glsl}} -> contents of cube-circle.glsl
        Handles nested shader includes (up to 10 levels deep)
        """
        import re

        def replace_shader(match):
            shader_filename = match.group(1)
            shader_path = Path(shader_filename)

            if not shader_path.exists():
                print(f"   ⚠️  Shader file not found: {shader_filename}")
                return f"/* Shader file not found: {shader_filename} */"

            try:
                shader_content = shader_path.read_text(encoding='utf-8')
                # Don't escape here - will be done at the end
                print(f"   📦 Embedded shader: {shader_filename}")
                return shader_content
            except Exception as e:
                print(f"   ❌ Error reading shader {shader_filename}: {e}")
                return f"/* Error reading shader: {e} */"

        # Replace all {{SHADER:filename}} patterns recursively (up to 10 levels)
        max_iterations = 10
        for i in range(max_iterations):
            new_content = re.sub(r'\{\{SHADER:([^}]+)\}\}', replace_shader, content)
            if new_content == content:
                # No more replacements found
                break
            content = new_content
        else:
            print(f"   ⚠️  Warning: Reached max shader include depth ({max_iterations})")

        # DON'T escape - the content is GLSL shader code that goes into a JS template literal
        # The only thing we need to escape is backticks (`) which would break the template literal
        # But GLSL doesn't use backticks, so we're safe

        return content
