#!/usr/bin/env python3
"""
Presentation Build System
Compiles modular slides into single file or bundle with WebP image optimization

Usage:
    ./build.py                    # Direct execution
    conda run -n superglue-env ./build.py    # With specific conda env
"""

# Debug control - set to True to save debug files (presentation_no_plotly.html, etc.)
# Useful for development and troubleshooting. Set to False for production builds.
SAVE_DEBUG = False

import re
import json
import base64
import shutil
import zipfile
from pathlib import Path
from datetime import datetime
from PIL import Image
import yaml
from asset_manager import AssetManager
from slide_processor import SlideProcessor
from json_embedder import JSONDataEmbedder
from templates import SINGLE_FILE, BUNDLE_INDEX, NAVIGATION, JSON_EMBED, BUNDLE_PRESENTATION


class PresentationBuilder:
    """Main builder orchestrating the presentation build process"""
    
    def __init__(self, config_path="config.yaml"):
        self.config = self._load_config(config_path)
        self.build_dir = Path("dist")
        self.asset_manager = AssetManager(self.config, self.build_dir)
        self.slide_processor = SlideProcessor(self.config, self.asset_manager)
        self.json_embedder = JSONDataEmbedder()
    
    def _load_config(self, config_path):
        """Load build configuration"""
        if Path(config_path).exists():
            with open(config_path) as f:
                return yaml.safe_load(f)
        else:
            return {
                'presentation': {
                    'title': 'LWIR Project Presentation',
                    'author': 'Geoff',
                    'date': datetime.now().strftime('%Y-%m-%d')
                },
                'build': {
                    'single_file': True,
                    'bundle_folder': True,
                    'webp_quality': 90,
                    'max_image_width': 1920,
                    'compress_json': True
                }
            }
    
    def build_all(self):
        """Main build function - creates both single file and bundle"""
        print("🚀 Building LWIR Presentation...")
        
        # Clean and create build directory
        if self.build_dir.exists():
            shutil.rmtree(self.build_dir)
        self.build_dir.mkdir()
        
        # Build outputs
        if self.config['build']['single_file']:
            self.build_single_file()
        
        if self.config['build']['bundle_folder']:
            self.build_bundle()
        
        # Create manifest
        self._create_manifest()
        
        print(f"✅ Build complete! Output in {self.build_dir}")
        self._print_build_summary()
    
    def build_single_file(self):
        """Build single HTML file with everything embedded"""
        print("📦 Building single file...")
        
        # Collect slides for single file mode
        slides_content = self.slide_processor.collect_slides(output_mode='single')
        
        # Create HTML with embedded everything
        html_content = self._create_single_file_html(slides_content)
        
        # Process images as base64 for single file
        for slide in slides_content:
            for asset in slide['assets']:
                if asset['type'] == 'image':
                    # Process the image to WebP in temp location
                    original_path = Path(asset['original'])
                    temp_dir = self.build_dir / "temp"
                    temp_dir.mkdir(exist_ok=True)
                    
                    local_name = self.asset_manager._generate_asset_name(original_path, 'image')
                    temp_path = temp_dir / local_name
                    
                    # Process the image
                    self.asset_manager._process_asset(original_path, local_name, 'image', 'bundle')
                    asset['processed'] = str(self.build_dir / "presentation_bundle" / "assets" / local_name)
        
        # Embed assets as base64
        html_content = self.asset_manager.embed_as_base64(html_content, self.asset_manager.assets_collected)
        
        # Write single file
        single_file_path = self.build_dir / "presentation.html"
        single_file_path.write_text(html_content, encoding='utf-8')
        
        file_size = single_file_path.stat().st_size / (1024*1024)
        print(f"   ✅ Single file: {single_file_path} ({file_size:.1f}MB)")
        
        # Clean up temp directory
        temp_dir = self.build_dir / "temp"
        if temp_dir.exists():
            shutil.rmtree(temp_dir)
    
    def build_bundle(self):
        """Build bundle folder with separate assets"""
        print("📁 Building bundle folder...")
        
        bundle_dir = self.build_dir / "presentation_bundle"
        bundle_dir.mkdir(exist_ok=True)
        
        # Collect slides for bundle mode
        slides_content = self.slide_processor.collect_slides(output_mode='bundle')
        
        # Create directory structure
        (bundle_dir / "css").mkdir(exist_ok=True)
        (bundle_dir / "js").mkdir(exist_ok=True)
        (bundle_dir / "assets").mkdir(exist_ok=True)
        
        # Copy CSS
        if Path("styles.css").exists():
            shutil.copy2("styles.css", bundle_dir / "css" / "styles.css")
        
        # Copy Plotly library if exists
        plotly_path = Path("plotly-2.27.0.min.js")
        if plotly_path.exists():
            shutil.copy2(plotly_path, bundle_dir / "js" / "plotly-2.27.0.min.js")
            print(f"   📊 Copied Plotly library")
        
        # Create presentation.js with embedded slide data
        presentation_js = self._create_bundle_javascript(slides_content)
        (bundle_dir / "js" / "presentation.js").write_text(presentation_js, encoding='utf-8')
        
        # Create index.html
        index_html = self._create_bundle_html()
        (bundle_dir / "index.html").write_text(index_html, encoding='utf-8')
        
        # Create ZIP
        zip_path = self.build_dir / "presentation_bundle.zip"
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            for file in bundle_dir.rglob('*'):
                if file.is_file():
                    zf.write(file, file.relative_to(bundle_dir))
        
        zip_size = zip_path.stat().st_size / (1024*1024)
        print(f"   ✅ Bundle: {zip_path} ({zip_size:.1f}MB)")
    
    def _create_single_file_html(self, slides_content):
        """Create complete single-file HTML"""
        css_content = Path("styles.css").read_text() if Path("styles.css").exists() else ""
        
        # Get embedded JSON data
        json_embed_js = self.json_embedder.load_and_embed_json_data()
        
        # Create slides JavaScript data
        slides_js_data = []
        for slide in slides_content:
            slides_js_data.append({
                'content': slide['content'],
                'title': slide['title']
            })
        
        slides_json = json.dumps(slides_js_data, ensure_ascii=False, separators=(',', ':'))
        
        # Create navigation JavaScript
        nav_js = self._create_navigation_javascript()
        
        # DEBUG: Save intermediate versions without Plotly
        debug_html_no_plotly = SINGLE_FILE.replace('{{TITLE}}', self.config['presentation']['title']) \
                                        .replace('{{CSS_CONTENT}}', css_content) \
                                        .replace('{{PLOTLY_SCRIPT}}', '<!-- Plotly library removed for debugging -->') \
                                        .replace('{{TOTAL_SLIDES}}', str(len(slides_content))) \
                                        .replace('{{JSON_EMBED_JS}}', json_embed_js) \
                                        .replace('{{SLIDES_JSON}}', slides_json) \
                                        .replace('{{NAVIGATION_JS}}', nav_js)
        
        # Save debug versions (if enabled)
        if SAVE_DEBUG:
            debug_dir = self.build_dir / "debug"
            debug_dir.mkdir(exist_ok=True)
            
            (debug_dir / "presentation_no_plotly.html").write_text(debug_html_no_plotly, encoding='utf-8')
            (debug_dir / "json_embed.js").write_text(json_embed_js, encoding='utf-8')
            (debug_dir / "navigation.js").write_text(nav_js, encoding='utf-8')
            (debug_dir / "slides_data.json").write_text(slides_json, encoding='utf-8')
            
            print(f"   🐛 Debug files saved to {debug_dir}")
        
        # Embed Plotly library for final version
        plotly_script = ""
        plotly_path = Path("plotly-2.27.0.min.js")
        if plotly_path.exists():
            plotly_js = plotly_path.read_text(encoding='utf-8')
            plotly_js_escaped = plotly_js.replace('</', '<\\/')
            plotly_script = f'<script>{plotly_js_escaped}</script>'
            print(f"   📦 Embedded Plotly.js library")
        
        return SINGLE_FILE.replace('{{TITLE}}', self.config['presentation']['title']) \
                        .replace('{{CSS_CONTENT}}', css_content) \
                        .replace('{{PLOTLY_SCRIPT}}', plotly_script) \
                        .replace('{{TOTAL_SLIDES}}', str(len(slides_content))) \
                        .replace('{{JSON_EMBED_JS}}', json_embed_js) \
                        .replace('{{SLIDES_JSON}}', slides_json) \
                        .replace('{{NAVIGATION_JS}}', nav_js)
    
    def _create_bundle_html(self):
        """Create index.html for bundle"""
        return BUNDLE_INDEX.replace('{{TITLE}}', self.config['presentation']['title'])
    
    def _create_bundle_javascript(self, slides_content):
        """Create presentation.js for bundle with embedded slides"""
        # Get embedded JSON data
        json_embed_js = self.json_embedder.load_and_embed_json_data()
        
        # Create slides JavaScript data
        slides_js_data = []
        for slide in slides_content:
            slides_js_data.append({
                'content': slide['content'],
                'title': slide['title']
            })
        
        slides_json = json.dumps(slides_js_data, ensure_ascii=False, separators=(',', ':'))
        
        # Create navigation JavaScript
        nav_js = self._create_navigation_javascript()
        
        return BUNDLE_PRESENTATION.replace('{{JSON_EMBED_JS}}', json_embed_js) \
                                 .replace('{{SLIDES_JSON}}', slides_json) \
                                 .replace('{{NAVIGATION_JS}}', nav_js)
    
    def _create_navigation_javascript(self):
        """Create reusable navigation JavaScript"""
        return NAVIGATION
    
    def _create_manifest(self):
        """Create asset manifest"""
        manifest = {
            'build_info': {
                'title': self.config['presentation']['title'],
                'build_time': datetime.now().isoformat(),
                'total_assets': len(self.asset_manager.assets_collected),
                'webp_quality': self.config['build']['webp_quality']
            },
            'assets': []
        }
        
        for asset in self.asset_manager.assets_collected:
            asset_info = {
                'local': asset['local'],
                'original': asset['original'],
                'type': asset['type'],
                'used_in_slide': asset['slide']
            }
            
            if asset.get('processed') and Path(asset['processed']).exists():
                size = Path(asset['processed']).stat().st_size
                asset_info['size_bytes'] = size
                asset_info['size_human'] = self._human_size(size)
            
            manifest['assets'].append(asset_info)
        
        manifest_path = self.build_dir / "assets_manifest.json"
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)
        
        print(f"📋 Created manifest: {manifest_path}")
    
    def _human_size(self, size_bytes):
        """Convert bytes to human readable format"""
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size_bytes < 1024:
                return f"{size_bytes:.1f}{unit}"
            size_bytes /= 1024
        return f"{size_bytes:.1f}TB"
    
    def _print_build_summary(self):
        """Print build summary"""
        total_assets = len(self.asset_manager.assets_collected)
        image_assets = len([a for a in self.asset_manager.assets_collected if a['type'] == 'image'])
        
        print("\n📊 Build Summary:")
        print(f"   📄 Slides processed: {len(list(Path('slides').glob('*.html')))}")
        print(f"   🖼️  Images converted to WebP: {image_assets}")
        print(f"   📁 Total assets: {total_assets}")
        print(f"   🎯 WebP quality: {self.config['build']['webp_quality']}%")
        
        if self.build_dir.exists():
            files = list(self.build_dir.rglob('*'))
            total_size = sum(f.stat().st_size for f in files if f.is_file())
            print(f"   💾 Total output size: {self._human_size(total_size)}")

