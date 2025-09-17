#!/usr/bin/env python3
"""
Find all color references in the codebase - optimized version
"""

import re
from pathlib import Path

def find_colors_in_file(file_path):
    """Extract color references focusing on backgrounds"""
    results = []

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        for line_num, line in enumerate(lines, 1):
            # Skip comments
            if line.strip().startswith('//') or line.strip().startswith('#'):
                continue

            # Look for white backgrounds specifically
            white_patterns = [
                (r'background.*?white', 'white background'),
                (r'background.*?#fff\b', '#fff background'),
                (r'background.*?#ffffff\b', '#ffffff background'),
                (r'background.*?rgba\(255,\s*255,\s*255', 'rgba white background'),
                (r'backgroundColor.*?white', 'white backgroundColor'),
                (r'bg:.*?white', 'white in bg variable'),
                (r'background:.*?white', 'white in background'),
                (r'fill="white"', 'white SVG fill'),
                (r'fill="#fff', '#fff SVG fill'),
                (r'background.*?linear-gradient.*?white', 'white in gradient'),
            ]

            for pattern, description in white_patterns:
                if re.search(pattern, line, re.IGNORECASE):
                    results.append({
                        'file': str(file_path),
                        'line': line_num,
                        'type': description,
                        'context': line.strip()[:100]
                    })

            # Also find hex colors
            hex_colors = re.findall(r'#[0-9A-Fa-f]{3,8}\b', line)
            for color in hex_colors:
                if 'background' in line.lower() or 'bg' in line.lower():
                    results.append({
                        'file': str(file_path),
                        'line': line_num,
                        'type': f'hex color {color}',
                        'context': line.strip()[:100]
                    })

    except Exception as e:
        print(f"Error reading {file_path}: {e}")

    return results

def main():
    # Key files to check
    files_to_check = [
        'styles.css',
        'templates.py',
        'presentation_builder.py',
    ]

    # Add slide files
    slides_dir = Path('slides')
    if slides_dir.exists():
        files_to_check.extend([str(f) for f in slides_dir.glob('*.html')])

    # Add JS files
    js_dir = Path('js')
    if js_dir.exists():
        files_to_check.extend([str(f) for f in js_dir.glob('*.js')])

    all_results = []

    for file_path in files_to_check:
        if Path(file_path).exists():
            results = find_colors_in_file(file_path)
            all_results.extend(results)
            print(f"Checked {file_path}: {len(results)} color refs")

    # Write results
    output_file = Path('js/color_notes.txt')
    with open(output_file, 'w') as f:
        f.write("COLOR REFERENCES IN CODEBASE\n")
        f.write("=" * 80 + "\n\n")

        # Group by file
        from collections import defaultdict
        by_file = defaultdict(list)
        for result in all_results:
            by_file[result['file']].append(result)

        # Write white backgrounds first
        f.write("WHITE/LIGHT BACKGROUNDS TO FIX:\n")
        f.write("-" * 80 + "\n")
        white_count = 0
        for file_path, results in sorted(by_file.items()):
            white_results = [r for r in results if 'white' in r['type'].lower() or '#fff' in r['type'].lower()]
            if white_results:
                f.write(f"\n{file_path}:\n")
                for r in white_results:
                    f.write(f"  Line {r['line']:4d}: {r['type']:25s} | {r['context']}\n")
                    white_count += 1

        f.write(f"\nTotal white backgrounds found: {white_count}\n\n")

        # Write all other colors
        f.write("\n" + "=" * 80 + "\n")
        f.write("ALL COLOR REFERENCES BY FILE:\n")
        f.write("=" * 80 + "\n")

        for file_path, results in sorted(by_file.items()):
            f.write(f"\n{file_path}:\n")
            f.write("-" * len(file_path) + "\n")
            for r in results[:30]:  # Limit output
                f.write(f"  Line {r['line']:4d}: {r['context']}\n")
            if len(results) > 30:
                f.write(f"  ... and {len(results) - 30} more\n")

    print(f"\n✅ Analysis complete! Check {output_file}")
    print(f"📊 Found {white_count} white background references")
    print(f"📁 Total color references: {len(all_results)}")

if __name__ == "__main__":
    main()