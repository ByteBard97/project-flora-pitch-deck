#!/usr/bin/env python3
"""
Replace all hardcoded colors with centralized CSS variables
"""

import re
from pathlib import Path

# Color replacement mappings
COLOR_REPLACEMENTS = {
    # White backgrounds to semi-transparent overlays
    'rgba(255, 255, 255, 0.01)': 'var(--bb-white-5)',
    'rgba(255, 255, 255, 0.02)': 'var(--bb-white-5)',
    'rgba(255, 255, 255, 0.03)': 'var(--bb-white-5)',
    'rgba(255, 255, 255, 0.04)': 'var(--bb-white-10)',
    'rgba(255, 255, 255, 0.05)': 'var(--bb-white-10)',
    'rgba(255, 255, 255, 0.06)': 'var(--bb-white-10)',
    'rgba(255, 255, 255, 0.08)': 'var(--bb-white-15)',
    'rgba(255, 255, 255, 0.1)': 'var(--bb-white-15)',
    'rgba(255, 255, 255, 0.12)': 'var(--bb-white-15)',
    'rgba(255, 255, 255, 0.15)': 'var(--bb-white-15)',

    # Direct white backgrounds
    'background: white': 'background: var(--bb-bg-primary)',
    'background:white': 'background: var(--bb-bg-primary)',
    'background:#fff': 'background: var(--bb-bg-primary)',
    'background: #fff': 'background: var(--bb-bg-primary)',
    'background:#ffffff': 'background: var(--bb-bg-primary)',
    'background: #ffffff': 'background: var(--bb-bg-primary)',

    # SVG fills
    'fill="#fff"': 'fill="var(--bb-cream)"',
    'fill="#ffffff"': 'fill="var(--bb-cream)"',
    'fill="white"': 'fill="var(--bb-cream)"',

    # Specific color replacements
    '#2d3748': 'var(--bb-bg-secondary)',  # Dark gray backgrounds
    '#e53e3e': 'var(--bb-red)',  # Red buttons
    '#2196F3': 'var(--bb-info)',  # Blue accents
    '#FF9800': 'var(--bb-gold)',  # Orange to gold
    '#4ecdc4': 'var(--bb-gold)',  # Teal to gold
    '#ff6b6b': 'var(--bb-red)',  # Light red to red

    # Old theme colors
    '#0a1a1f': 'var(--bb-navy-dark)',
    '#1a2f33': 'var(--bb-navy-medium)',
    '#4ade80': 'var(--bb-gold)',
    '#22d3ee': 'var(--bb-info)',
    '#00e6a8': 'var(--bb-gold)',

    # Gray colors
    '#E0E0E0': 'var(--bb-text-muted)',
    '#999': 'var(--bb-text-muted)',
    '#CCC': 'var(--bb-text-secondary)',
    '#444': 'var(--bb-navy-medium)',
}

def process_css_in_style_tags(content):
    """Process CSS inside <style> tags"""
    def replace_in_style(match):
        style_content = match.group(1)
        for old_color, new_color in COLOR_REPLACEMENTS.items():
            style_content = style_content.replace(old_color, new_color)
        return f'<style>{style_content}</style>'

    # Find and process all style tags
    content = re.sub(r'<style>(.*?)</style>', replace_in_style, content, flags=re.DOTALL)
    return content

def process_inline_styles(content):
    """Process inline style attributes"""
    def replace_in_style_attr(match):
        style_value = match.group(1)
        for old_color, new_color in COLOR_REPLACEMENTS.items():
            # Skip var() replacements in inline styles (they won't work)
            if 'var(' not in new_color or 'background' in old_color:
                style_value = style_value.replace(old_color, new_color)
        return f'style="{style_value}"'

    # Find and process all style attributes
    content = re.sub(r'style="([^"]*)"', replace_in_style_attr, content)
    return content

def fix_inline_styles_with_classes(content):
    """Replace inline styles with CSS classes where CSS variables won't work"""

    # Add class definitions at the beginning if there's a style tag
    if '<style>' in content:
        additional_styles = """
        /* Centralized color classes for inline replacements */
        .bb-bg-primary { background: var(--bb-bg-primary) !important; }
        .bb-bg-secondary { background: var(--bb-bg-secondary) !important; }
        .bb-text-cream { color: var(--bb-cream) !important; }
        .bb-text-gold { color: var(--bb-gold) !important; }
        .bb-fill-cream { fill: var(--bb-cream) !important; }
        .bb-fill-gold { fill: var(--bb-gold) !important; }
        .bb-stroke-gold { stroke: var(--bb-gold) !important; }
        .bb-stroke-red { stroke: var(--bb-red) !important; }
        """
        content = content.replace('<style>', '<style>' + additional_styles)

    return content

def process_file(file_path):
    """Process a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Process CSS in style tags
        content = process_css_in_style_tags(content)

        # Process inline styles
        content = process_inline_styles(content)

        # Add helper classes
        if file_path.suffix == '.html':
            content = fix_inline_styles_with_classes(content)

        # Apply general replacements
        for old_color, new_color in COLOR_REPLACEMENTS.items():
            # Only apply non-var replacements to inline content
            if file_path.suffix != '.html' or 'var(' not in new_color:
                content = content.replace(old_color, new_color)

        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Process all relevant files"""

    # Files to process
    files_to_process = []

    # Add slide HTML files
    slides_dir = Path('slides')
    if slides_dir.exists():
        files_to_process.extend(slides_dir.glob('*.html'))

    # Add JS files that might have colors
    js_files = [
        Path('js/gis-demo.js'),
        Path('js/interactive-demo.js'),
        Path('js/flight-photo-window.js'),
        Path('js/hue-drag-wheel.js'),
    ]
    files_to_process.extend([f for f in js_files if f.exists()])

    # Add CSS files
    css_files = [
        Path('styles.css'),
    ]
    files_to_process.extend([f for f in css_files if f.exists()])

    # Process each file
    updated_count = 0
    for file_path in files_to_process:
        print(f"Processing {file_path}...")
        if process_file(file_path):
            print(f"  ✅ Updated {file_path}")
            updated_count += 1
        else:
            print(f"  ⏭️  No changes needed in {file_path}")

    print("\n" + "="*60)
    print(f"✅ Color replacement complete!")
    print(f"📝 Updated {updated_count} files")
    print("="*60)

    # Special handling for styles.css - ensure it imports byte_bard_colors.css
    styles_path = Path('styles.css')
    if styles_path.exists():
        with open(styles_path, 'r') as f:
            styles_content = f.read()

        if '@import' not in styles_content and 'byte_bard_colors' not in styles_content:
            # Add import at the beginning
            import_statement = '@import "byte_bard_colors.css";\n\n'
            styles_content = import_statement + styles_content

            with open(styles_path, 'w') as f:
                f.write(styles_content)

            print("\n✅ Added @import for byte_bard_colors.css to styles.css")

if __name__ == "__main__":
    main()