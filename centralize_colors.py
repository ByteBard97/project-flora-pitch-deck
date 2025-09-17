#!/usr/bin/env python3
"""
Centralize all colors in the presentation system
"""

import re
import yaml
from pathlib import Path

# Centralized color configuration
BYTE_BARD_COLORS = {
    # Primary brand colors from logo
    'navy_dark': '#0A3D82',
    'navy_medium': '#1B4A8C',
    'cream': '#F5F0E6',
    'red': '#E53935',
    'gold': '#FFC107',

    # Semantic colors
    'bg_primary': '#0A3D82',
    'bg_secondary': '#1B4A8C',
    'text_primary': '#F5F0E6',
    'text_secondary': '#B8C5D6',
    'text_muted': '#8A9BAE',

    # Component colors
    'card_bg': 'rgba(10, 61, 130, 0.1)',
    'card_border': '#FFC107',
    'code_bg': 'rgba(0, 0, 0, 0.5)',
    'code_text': '#F5F0E6',

    # Feedback colors
    'success': '#FFC107',
    'warning': '#FF6B35',
    'error': '#E53935',
    'info': '#B8C5D6',

    # Transparent variants
    'white_5': 'rgba(245, 240, 230, 0.05)',
    'white_10': 'rgba(245, 240, 230, 0.1)',
    'white_15': 'rgba(245, 240, 230, 0.15)',
    'navy_10': 'rgba(10, 61, 130, 0.1)',
    'navy_20': 'rgba(10, 61, 130, 0.2)',
    'gold_20': 'rgba(255, 193, 7, 0.2)',
    'red_20': 'rgba(229, 57, 53, 0.2)',
}

def generate_css_variables():
    """Generate CSS custom properties from color config"""
    css = ":root {\n  /* Byte Bard Color System */\n"

    for key, value in BYTE_BARD_COLORS.items():
        css_var_name = f"--bb-{key.replace('_', '-')}"
        css += f"  {css_var_name}: {value};\n"

    css += "\n  /* Legacy variable mappings for compatibility */\n"
    css += "  --bg: var(--bb-bg-primary);\n"
    css += "  --card: var(--bb-bg-secondary);\n"
    css += "  --ink: var(--bb-text-primary);\n"
    css += "  --muted: var(--bb-text-muted);\n"
    css += "  --accent: var(--bb-red);\n"
    css += "  --accent2: var(--bb-gold);\n"
    css += "  --accent3: var(--bb-cream);\n"
    css += "  --bytebard-navy: var(--bb-navy-dark);\n"
    css += "  --bytebard-red: var(--bb-red);\n"
    css += "  --bytebard-gold: var(--bb-gold);\n"
    css += "  --bytebard-cream: var(--bb-cream);\n"
    css += "}\n"

    return css

def generate_js_colors():
    """Generate JavaScript color object"""
    js = "// Centralized Byte Bard Color System\n"
    js += "const ByteBardColors = {\n"

    for key, value in BYTE_BARD_COLORS.items():
        js_key = key.replace('_', '')
        js += f"  {js_key}: '{value}',\n"

    js += "};\n\n"
    js += "// Make available globally\n"
    js += "window.ByteBardColors = ByteBardColors;\n"
    js += "// Also available as BB for convenience\n"
    js += "window.BB = ByteBardColors;\n"

    return js

def update_config_yaml():
    """Add colors section to config.yaml"""
    config_path = Path('config.yaml')

    if config_path.exists():
        with open(config_path, 'r') as f:
            config = yaml.safe_load(f)

        config['colors'] = BYTE_BARD_COLORS

        with open(config_path, 'w') as f:
            yaml.dump(config, f, default_flow_style=False, sort_keys=False)

        print(f"✅ Updated {config_path} with color configuration")

def create_color_replacement_map():
    """Create a map of old colors to new centralized colors"""
    replacements = {
        # White backgrounds to navy/transparent
        'rgba(255, 255, 255, 0.01)': BYTE_BARD_COLORS['white_5'],
        'rgba(255, 255, 255, 0.02)': BYTE_BARD_COLORS['white_5'],
        'rgba(255, 255, 255, 0.03)': BYTE_BARD_COLORS['white_5'],
        'rgba(255, 255, 255, 0.04)': BYTE_BARD_COLORS['white_10'],
        'rgba(255, 255, 255, 0.05)': BYTE_BARD_COLORS['white_10'],
        'rgba(255, 255, 255, 0.06)': BYTE_BARD_COLORS['white_10'],
        'rgba(255, 255, 255, 0.08)': BYTE_BARD_COLORS['white_15'],
        'rgba(255, 255, 255, 0.1)': BYTE_BARD_COLORS['white_15'],
        'rgba(255, 255, 255, 0.12)': BYTE_BARD_COLORS['white_15'],
        'rgba(255, 255, 255, 0.15)': BYTE_BARD_COLORS['white_15'],

        # Direct white to appropriate colors
        'background: white': f"background: {BYTE_BARD_COLORS['bg_primary']}",
        'background:white': f"background: {BYTE_BARD_COLORS['bg_primary']}",
        'fill="#fff"': f'fill="{BYTE_BARD_COLORS["cream"]}"',
        'fill="#ffffff"': f'fill="{BYTE_BARD_COLORS["cream"]}"',

        # Old color references
        '#0a1a1f': BYTE_BARD_COLORS['navy_dark'],
        '#1a2f33': BYTE_BARD_COLORS['navy_medium'],
        '#4ade80': BYTE_BARD_COLORS['gold'],
        '#22d3ee': BYTE_BARD_COLORS['red'],
    }

    return replacements

def process_file_with_replacements(file_path, replacements):
    """Replace colors in a file based on replacement map"""
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        original = content
        for old_color, new_color in replacements.items():
            content = content.replace(old_color, new_color)

        if content != original:
            with open(file_path, 'w') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Generate centralized color files"""

    # 1. Generate CSS variables file
    css_content = generate_css_variables()
    css_file = Path('byte_bard_colors.css')
    with open(css_file, 'w') as f:
        f.write(css_content)
    print(f"✅ Created {css_file}")

    # 2. Generate JavaScript colors file
    js_content = generate_js_colors()
    js_file = Path('js/byte_bard_colors.js')
    js_file.parent.mkdir(exist_ok=True)
    with open(js_file, 'w') as f:
        f.write(js_content)
    print(f"✅ Created {js_file}")

    # 3. Update config.yaml
    update_config_yaml()

    # 4. Create replacement suggestions
    replacements = create_color_replacement_map()

    # 5. Write replacement script
    script_content = f"""#!/usr/bin/env python3
# Auto-generated script to apply color replacements

import sys
from pathlib import Path

replacements = {repr(replacements)}

def apply_replacements(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    for old, new in replacements.items():
        content = content.replace(old, new)

    with open(file_path, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        apply_replacements(sys.argv[1])
        print(f"✅ Updated {{sys.argv[1]}}")
    else:
        print("Usage: python apply_colors.py <file>")
"""

    script_file = Path('apply_colors.py')
    with open(script_file, 'w') as f:
        f.write(script_content)
    script_file.chmod(0o755)
    print(f"✅ Created {script_file}")

    print("\n" + "="*60)
    print("CENTRALIZED COLOR SYSTEM CREATED!")
    print("="*60)
    print("\nFiles created:")
    print("  • byte_bard_colors.css - CSS custom properties")
    print("  • js/byte_bard_colors.js - JavaScript color object")
    print("  • config.yaml - Updated with colors section")
    print("  • apply_colors.py - Script to apply replacements")
    print("\nNext steps:")
    print("1. Import byte_bard_colors.css in your main CSS")
    print("2. Include byte_bard_colors.js in your build")
    print("3. Use CSS variables: var(--bb-navy-dark)")
    print("4. Use JS colors: ByteBardColors.navyDark or BB.navyDark")
    print("\nTo apply color replacements to a file:")
    print("  python apply_colors.py <filename>")

if __name__ == "__main__":
    main()