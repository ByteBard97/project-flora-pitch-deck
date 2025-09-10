#!/usr/bin/env python3
"""
Simple Math Presentation Builder
Creates bundled versions by embedding our CSS and slides, keeping external CDN links
"""

import yaml
import json
from pathlib import Path

class SimpleMathBuilder:
    """Simple builder for math presentation"""
    
    def __init__(self, config_path="config.yaml"):
        self.config = self._load_config(config_path)
        self.build_dir = Path("docs")
        self.build_dir.mkdir(exist_ok=True)
        self.templates_dir = Path("templates")
    
    def _load_config(self, config_path):
        """Load build configuration"""
        with open(config_path) as f:
            return yaml.safe_load(f)
    
    def _load_template(self, template_name):
        """Load a template file"""
        template_path = self.templates_dir / template_name
        return template_path.read_text(encoding='utf-8')
    
    def build_single_file(self):
        """Create a single HTML file with embedded CSS and slides"""
        print("📦 Building single file...")
        
        # Read main files
        styles = Path("styles.css").read_text(encoding='utf-8')
        main_html = Path("index.html").read_text(encoding='utf-8')
        presentation_js = Path("presentation.js").read_text(encoding='utf-8')
        
        # Read all slides
        slides_data = {}
        print(f"📄 Processing {len(self.config['slides'])} slides from config.yaml")
        
        for i, slide_file in enumerate(self.config['slides'], 1):
            print(f"   Processing slide {i}: {slide_file}...")
            slide_path = Path("slides") / slide_file
            if slide_path.exists():
                slides_data[slide_file] = slide_path.read_text(encoding='utf-8')
            else:
                print(f"   ⚠️  Warning: {slide_file} not found")
        
        # Create modified presentation.js using template
        modified_js_template = self._load_template("modified_presentation.js")
        
        # We're replacing the entire presentation.js with our template
        # No need to include original JS since the template is complete
        
        # Clean up slide data and create numeric key-value pairs
        clean_slides_dict = {}
        import re
        
        for i, slide_file in enumerate(self.config['slides']):
            if slide_file in slides_data:
                content = slides_data[slide_file]
                # Remove leading/trailing whitespace and normalize line endings
                clean_content = content.strip()
                
                # Split content into code and script parts for selective cleanup
                parts = re.split(r'(<pre><code[^>]*>.*?</code></pre>|<script[^>]*>.*?</script>)', clean_content, flags=re.DOTALL)
                
                for part_idx, part in enumerate(parts):
                    if re.match(r'<pre><code[^>]*>.*?</code></pre>', part, re.DOTALL):
                        # This is a code block - only normalize newlines, preserve indentation
                        parts[part_idx] = re.sub(r'\n+', '\n', part)
                    elif re.match(r'<script[^>]*>.*?</script>', part, re.DOTALL):
                        # This is a script block - preserve JavaScript completely
                        parts[part_idx] = part
                    else:
                        # This is regular content - clean up whitespace
                        part = re.sub(r'\n\s+', '\n', part)  # Remove leading spaces on lines
                        part = re.sub(r'\s+\n', '\n', part)  # Remove trailing spaces on lines
                        parts[part_idx] = re.sub(r'\n+', '\n', part)  # Normalize multiple newlines
                
                clean_content = ''.join(parts)
                
                # Convert double quotes to single quotes ONLY in HTML attributes, not in script blocks
                # Split by script tags first to preserve JavaScript
                script_parts = re.split(r'(<script[^>]*>.*?</script>)', clean_content, flags=re.DOTALL)
                for script_idx, script_part in enumerate(script_parts):
                    if not re.match(r'<script[^>]*>.*?</script>', script_part, re.DOTALL):
                        # Only replace quotes in non-script HTML content
                        script_parts[script_idx] = script_part.replace('"', "'")
                clean_content = ''.join(script_parts)
                clean_slides_dict[str(i)] = clean_content  # Use string keys for JSON
            else:
                clean_slides_dict[str(i)] = ""  # Empty slide if missing
        
        # Save to intermediate JSON file for debugging/inspection
        json_output_path = self.build_dir / "slides_data.json"
        with open(json_output_path, 'w', encoding='utf-8') as f:
            json.dump(clean_slides_dict, f, indent=2, ensure_ascii=False)
        print(f"   📄 Saved processed slides: {json_output_path}")
        
        # Load back from JSON and create JavaScript object/dict format with readable formatting
        with open(json_output_path, 'r', encoding='utf-8') as f:
            loaded_slides = json.load(f)
        
        # Create JavaScript object format with newlines between keys for easy reading
        slides_js_dict = "{\n"
        for i, key in enumerate(sorted(loaded_slides.keys(), key=int)):  # Sort numerically
            content = loaded_slides[key]
            # Escape any backslashes and escape script tags for JavaScript
            escaped_content = content.replace('\\', '\\\\')
            escaped_content = escaped_content.replace('</script>', '<\\/script>')
            
            # Preserve newlines in code blocks but replace them elsewhere
            import re
            # Split content into code and non-code parts
            parts = re.split(r'(<pre><code[^>]*>.*?</code></pre>)', escaped_content, flags=re.DOTALL)
            
            for part_idx, part in enumerate(parts):
                if re.match(r'<pre><code[^>]*>.*?</code></pre>', part, re.DOTALL):
                    # This is a code block - preserve newlines but escape them for JavaScript
                    parts[part_idx] = part.replace('\n', '\\n').replace('\r', '\\r')
                else:
                    # This is regular content - replace newlines with spaces
                    parts[part_idx] = part.replace('\n', ' ').replace('\r', ' ')
            
            escaped_content = ''.join(parts)
            slides_js_dict += f'  "{key}": "{escaped_content}"'
            if i < len(loaded_slides) - 1:
                slides_js_dict += ","
            slides_js_dict += "\n\n"  # Double newline between keys for easy reading
        slides_js_dict += "}"
        
        # Load the unified presentation.js
        presentation_js_path = Path("presentation.js")
        if presentation_js_path.exists():
            presentation_js = presentation_js_path.read_text(encoding='utf-8')
        else:
            raise FileNotFoundError("presentation.js not found")
        
        # Read additional JavaScript modules
        additional_js = ""
        if Path("js/vector-calculator.js").exists():
            additional_js += Path("js/vector-calculator.js").read_text(encoding='utf-8') + "\n\n"
        if Path("js/timeseries-analyzer.js").exists():
            additional_js += Path("js/timeseries-analyzer.js").read_text(encoding='utf-8') + "\n\n"
        
        # Replace placeholders in the template
        modified_js = modified_js_template.replace('{{SLIDES_DATA}}', slides_js_dict)
        modified_js = modified_js.replace('{{PRESENTATION_JS}}', presentation_js + "\n\n" + additional_js)
        
        # Replace external stylesheet with embedded CSS
        bundled_html = main_html.replace(
            '<link rel="stylesheet" href="styles.css">',
            f'<style>\n{styles}\n    </style>'
        )
        
        # Remove external JS module references (they're now embedded)
        bundled_html = bundled_html.replace(
            '    <!-- Interactive demo modules (for bundle version) -->\n    <script src="js/vector-calculator.js"></script>\n    <script src="js/timeseries-analyzer.js"></script>\n    \n    ',
            ''
        )
        
        # Replace external JS with embedded JS
        bundled_html = bundled_html.replace(
            '<script src="presentation.js"></script>',
            f'<script>\n{modified_js}\n    </script>'
        )
        
        # Write bundled file
        output_path = self.build_dir / "index.html"
        output_path.write_text(bundled_html, encoding='utf-8')
        
        file_size = output_path.stat().st_size / 1024
        print(f"   ✅ Single file: {output_path} ({file_size:.1f}KB)")
        
        return output_path
    
    def build_bundle_folder(self):
        """Create a bundle folder with separate files"""
        print("📁 Building bundle folder...")
        
        bundle_dir = self.build_dir / "math_presentation_bundle"
        if bundle_dir.exists():
            import shutil
            shutil.rmtree(bundle_dir)
        
        bundle_dir.mkdir()
        (bundle_dir / "slides").mkdir()
        
        # Copy main files
        import shutil
        shutil.copy2("index.html", bundle_dir / "index.html")
        shutil.copy2("styles.css", bundle_dir / "styles.css") 
        shutil.copy2("presentation.js", bundle_dir / "presentation.js")
        
        # Copy JavaScript modules
        js_dir = bundle_dir / "js"
        js_dir.mkdir(exist_ok=True)
        if Path("js/vector-calculator.js").exists():
            shutil.copy2("js/vector-calculator.js", js_dir / "vector-calculator.js")
        if Path("js/timeseries-analyzer.js").exists():
            shutil.copy2("js/timeseries-analyzer.js", js_dir / "timeseries-analyzer.js")
        
        # Copy all slides
        for slide_file in self.config['slides']:
            slide_path = Path("slides") / slide_file
            if slide_path.exists():
                shutil.copy2(slide_path, bundle_dir / "slides" / slide_file)
        
        # Create README from template
        readme_template = self._load_template("README.md")
        readme_content = readme_template.replace('{{TITLE}}', self.config['presentation']['title'])
        readme_content = readme_content.replace('{{SUBTITLE}}', self.config['presentation'].get('subtitle', ''))
        readme_content = readme_content.replace('{{AUTHOR}}', self.config['presentation']['author'])
        readme_content = readme_content.replace('{{DATE}}', self.config['presentation']['date'])
        
        (bundle_dir / "README.md").write_text(readme_content)
        
        print(f"   ✅ Bundle folder: {bundle_dir}")
        return bundle_dir
    
    def build_all(self):
        """Build both single file and bundle versions"""
        print(f"🎯 Building {self.config['presentation']['title']}...")
        
        single_file = self.build_single_file()
        bundle_folder = self.build_bundle_folder()
        
        print("\n✅ Build complete!")
        print(f"📄 Single file: {single_file.name}")
        print(f"📁 Bundle folder: {bundle_folder.name}")
        print(f"\n🚀 Ready to share with colleagues!")

def main():
    """Main entry point"""
    builder = SimpleMathBuilder()
    builder.build_all()

if __name__ == "__main__":
    main()