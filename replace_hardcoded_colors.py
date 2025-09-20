#!/usr/bin/env python3
"""
Replace hardcoded colors in slide files with Flora CSS variables
"""

import os
import re
from pathlib import Path

# Color mapping from hardcoded colors to Flora variables
COLOR_REPLACEMENTS = {
    # Greens
    '#4CAF50': 'var(--flora-green)',
    '#4caf50': 'var(--flora-green)',
    '#2E7D32': 'var(--flora-green)',
    '#2e7d32': 'var(--flora-green)',
    'rgba(76, 175, 80, 0.1)': 'var(--flora-green-10)',
    'rgba(76, 175, 80, 0.2)': 'var(--flora-green-20)',
    'rgba(76, 175, 80, 0.7)': 'var(--flora-green)',
    'rgba(56, 142, 60, 0.7)': 'var(--flora-green)',

    # Blues -> Teal
    '#2196F3': 'var(--digital-teal)',
    '#2196f3': 'var(--digital-teal)',
    'rgba(33, 150, 243, 0.1)': 'var(--flora-teal-10)',
    'rgba(33, 150, 243, 0.2)': 'var(--flora-teal-20)',
    'rgba(33, 150, 243, 0.5)': 'var(--digital-teal)',
    'rgba(21, 101, 192, 0.5)': 'var(--digital-teal)',

    # Yellows/Golds -> Digital Teal
    '#FFC107': 'var(--digital-teal)',
    '#ffc107': 'var(--digital-teal)',
    'rgba(255, 193, 7, 0.1)': 'var(--flora-teal-10)',
    'rgba(255, 193, 7, 0.2)': 'var(--flora-teal-20)',
    '#FFD180': 'var(--leaf-green)',
    '#ffd180': 'var(--leaf-green)',

    # Reds -> Flora green (for error states we want to keep Flora theme)
    '#FF5722': 'var(--flora-green)',
    '#ff5722': 'var(--flora-green)',
    '#FF6B35': 'var(--flora-green)',
    '#ff6b35': 'var(--flora-green)',

    # Oranges -> Digital teal
    '#FF9800': 'var(--digital-teal)',
    '#ff9800': 'var(--digital-teal)',
    '#FF8F00': 'var(--digital-teal)',
    '#ff8f00': 'var(--digital-teal)',

    # Grays -> Charcoal
    '#333': 'var(--charcoal)',
    '#666': 'var(--charcoal)',
    '#444': 'var(--charcoal)',

    # Whites -> Parchment
    '#fff': 'var(--parchment)',
    '#ffffff': 'var(--parchment)',
    'rgba(255, 255, 255, 0.02)': 'var(--parchment)',
    'rgba(255, 255, 255, 0.1)': 'var(--parchment)',
    'rgba(255, 255, 255, 0.15)': 'var(--parchment)',
    'rgba(255, 255, 255, 0.2)': 'var(--parchment)',

    # Specific problematic colors
    'rgba(255,255,255,.22)': 'var(--parchment)',
    'rgba(0,0,0,.5)': 'var(--charcoal)',
    'rgba(0, 0, 0, 0.3)': 'var(--charcoal)',
    'rgba(0, 0, 0, 0.35)': 'var(--charcoal)',
    '#e6eef9': 'var(--soft-aqua)',
    '#cfe0f1': 'var(--soft-aqua)',
}

def replace_colors_in_file(file_path):
    """Replace hardcoded colors in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        changes_made = []

        for old_color, new_color in COLOR_REPLACEMENTS.items():
            if old_color in content:
                content = content.replace(old_color, new_color)
                changes_made.append(f"{old_color} -> {new_color}")

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {file_path.name}: {len(changes_made)} color replacements")
            for change in changes_made:
                print(f"   {change}")
            return True
        else:
            print(f"⏭️  No changes needed in {file_path.name}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Replace hardcoded colors in all slide files"""
    slides_dir = Path("slides")

    if not slides_dir.exists():
        print("❌ slides/ directory not found")
        return

    html_files = list(slides_dir.glob("*.html"))

    print(f"🎨 Replacing hardcoded colors in {len(html_files)} slide files...")
    print("=" * 60)

    updated_count = 0
    for html_file in html_files:
        if replace_colors_in_file(html_file):
            updated_count += 1

    print("=" * 60)
    print(f"🎯 Updated {updated_count} out of {len(html_files)} files")
    print("💚 Flora color system is now more consistent!")

if __name__ == "__main__":
    main()