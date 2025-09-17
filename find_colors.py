#!/usr/bin/env python3
"""
Find all color references in the codebase
Searches for hex colors, rgb/rgba, named colors, and CSS variables
"""

import re
import json
from pathlib import Path
from collections import defaultdict

def find_colors_in_file(file_path):
    """Extract all color references from a file"""
    colors = defaultdict(list)

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            lines = content.split('\n')

        # Track line numbers for context
        for line_num, line in enumerate(lines, 1):
            # Skip commented lines in CSS/JS
            if line.strip().startswith('//') or line.strip().startswith('/*'):
                continue

            # Hex colors (#RGB, #RRGGBB, #RRGGBBAA)
            hex_pattern = r'#[0-9A-Fa-f]{3,8}\b'
            for match in re.finditer(hex_pattern, line):
                colors['hex'].append({
                    'value': match.group(),
                    'file': str(file_path),
                    'line': line_num,
                    'context': line.strip()
                })

            # RGB/RGBA colors
            rgb_pattern = r'rgba?\([^)]+\)'
            for match in re.finditer(rgb_pattern, line):
                colors['rgb'].append({
                    'value': match.group(),
                    'file': str(file_path),
                    'line': line_num,
                    'context': line.strip()
                })

            # HSL/HSLA colors
            hsl_pattern = r'hsla?\([^)]+\)'
            for match in re.finditer(hsl_pattern, line):
                colors['hsl'].append({
                    'value': match.group(),
                    'file': str(file_path),
                    'line': line_num,
                    'context': line.strip()
                })

            # CSS variables (--variable-name)
            var_pattern = r'var\(--[^)]+\)|--[\w-]+(?=:)'
            for match in re.finditer(var_pattern, line):
                colors['css_vars'].append({
                    'value': match.group(),
                    'file': str(file_path),
                    'line': line_num,
                    'context': line.strip()
                })

            # Common named colors (especially white, black, transparent)
            named_colors = [
                'white', 'black', 'red', 'blue', 'green', 'yellow', 'orange',
                'purple', 'gray', 'grey', 'navy', 'cyan', 'magenta', 'lime',
                'transparent', 'cream', 'gold', 'silver', 'brown'
            ]
            for color in named_colors:
                # Look for color as a CSS value (after : and before ; or })
                css_value_pattern = rf':\s*{color}\b'
                if re.search(css_value_pattern, line, re.IGNORECASE):
                    colors['named'].append({
                        'value': color,
                        'file': str(file_path),
                        'line': line_num,
                        'context': line.strip()
                    })
                # Also look for color in fill/stroke attributes
                attr_pattern = rf'(fill|stroke|color|background|backgroundColor|bg).*?["\']?\s*{color}\b'
                if re.search(attr_pattern, line, re.IGNORECASE):
                    colors['named'].append({
                        'value': color,
                        'file': str(file_path),
                        'line': line_num,
                        'context': line.strip()
                    })

            # Background-specific patterns
            bg_patterns = [
                r'background\s*:\s*[^;]+',
                r'backgroundColor\s*:\s*[^;]+',
                r'background-color\s*:\s*[^;]+',
                r'bg\s*:\s*[^;]+',
                r'fill\s*=\s*["\'][^"\']+["\']',
                r'stroke\s*=\s*["\'][^"\']+["\']'
            ]
            for pattern in bg_patterns:
                for match in re.finditer(pattern, line, re.IGNORECASE):
                    if 'white' in match.group().lower() or '#fff' in match.group().lower():
                        colors['backgrounds'].append({
                            'value': match.group(),
                            'file': str(file_path),
                            'line': line_num,
                            'context': line.strip()
                        })
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

    return colors

def main():
    """Main function to search all relevant files"""

    # Define search patterns
    extensions = {
        '*.js': 'JavaScript',
        '*.html': 'HTML',
        '*.css': 'CSS',
        '*.py': 'Python'
    }

    all_colors = defaultdict(list)

    # Search in main directory and subdirectories
    search_dirs = [
        Path('.'),
        Path('slides'),
        Path('js'),
        Path('new_pages'),
        Path('docs'),
        Path('docs/presentation_bundle')
    ]

    # Also specifically check templates.py
    specific_files = [
        Path('templates.py'),
        Path('presentation_builder.py'),
        Path('styles.css')
    ]

    processed_files = set()

    # Search all directories
    for search_dir in search_dirs:
        if search_dir.exists():
            for pattern, file_type in extensions.items():
                for file_path in search_dir.glob(pattern):
                    if file_path not in processed_files:
                        processed_files.add(file_path)
                        file_colors = find_colors_in_file(file_path)
                        for color_type, color_list in file_colors.items():
                            all_colors[color_type].extend(color_list)

    # Process specific files
    for file_path in specific_files:
        if file_path.exists() and file_path not in processed_files:
            processed_files.add(file_path)
            file_colors = find_colors_in_file(file_path)
            for color_type, color_list in file_colors.items():
                all_colors[color_type].extend(color_list)

    # Write results to color_notes.txt
    output_file = Path('js/color_notes.txt')
    with open(output_file, 'w') as f:
        f.write("=" * 80 + "\n")
        f.write("COLOR REFERENCES IN CODEBASE\n")
        f.write("=" * 80 + "\n\n")

        # Summary
        f.write("SUMMARY\n")
        f.write("-" * 40 + "\n")
        for color_type, color_list in all_colors.items():
            f.write(f"{color_type.upper()}: {len(color_list)} references\n")
        f.write("\n")

        # White/Light backgrounds that need attention
        f.write("=" * 80 + "\n")
        f.write("WHITE/LIGHT BACKGROUNDS THAT NEED FIXING\n")
        f.write("=" * 80 + "\n\n")

        white_patterns = ['white', '#fff', '#ffffff', 'rgba(255, 255, 255', 'rgb(255, 255, 255']
        for color_type, color_list in all_colors.items():
            for color in color_list:
                value_lower = color['value'].lower()
                if any(pattern in value_lower for pattern in white_patterns):
                    if 'background' in color['context'].lower() or 'bg' in color['context'].lower():
                        f.write(f"File: {color['file']}\n")
                        f.write(f"Line {color['line']}: {color['context']}\n")
                        f.write(f"Value: {color['value']}\n")
                        f.write("-" * 40 + "\n")

        f.write("\n")

        # All color references by type
        for color_type, color_list in all_colors.items():
            if color_list:
                f.write("=" * 80 + "\n")
                f.write(f"{color_type.upper()} COLORS\n")
                f.write("=" * 80 + "\n\n")

                # Group by file
                by_file = defaultdict(list)
                for color in color_list:
                    by_file[color['file']].append(color)

                for file_path, file_colors in sorted(by_file.items()):
                    f.write(f"\n{file_path}\n")
                    f.write("-" * len(file_path) + "\n")

                    # Remove duplicates while preserving order
                    seen = set()
                    unique_colors = []
                    for color in file_colors:
                        key = (color['value'], color['line'])
                        if key not in seen:
                            seen.add(key)
                            unique_colors.append(color)

                    for color in unique_colors[:20]:  # Limit to first 20 per file
                        f.write(f"  Line {color['line']:4d}: {color['value']:30s} | {color['context'][:60]}\n")

                    if len(unique_colors) > 20:
                        f.write(f"  ... and {len(unique_colors) - 20} more\n")

                f.write("\n")

        f.write("\n" + "=" * 80 + "\n")
        f.write(f"Total files processed: {len(processed_files)}\n")
        f.write("=" * 80 + "\n")

    # Also create a JSON file for easier processing
    json_output = Path('js/color_data.json')
    with open(json_output, 'w') as f:
        # Convert to serializable format
        json_data = {}
        for color_type, color_list in all_colors.items():
            json_data[color_type] = color_list
        json.dump(json_data, f, indent=2)

    print(f"✅ Color analysis complete!")
    print(f"📄 Text report: {output_file}")
    print(f"📊 JSON data: {json_output}")
    print(f"📁 Processed {len(processed_files)} files")

    # Print summary
    total = sum(len(color_list) for color_list in all_colors.values())
    print(f"🎨 Found {total} total color references")

    # Count white backgrounds
    white_count = 0
    for color_type, color_list in all_colors.items():
        for color in color_list:
            value_lower = color['value'].lower()
            if any(pattern in value_lower for pattern in white_patterns):
                if 'background' in color['context'].lower() or 'bg' in color['context'].lower():
                    white_count += 1

    if white_count > 0:
        print(f"⚠️  Found {white_count} white/light background references that may need updating")

if __name__ == "__main__":
    main()