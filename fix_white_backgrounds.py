#!/usr/bin/env python3
"""
Replace white and light backgrounds with Flora dark theme
"""

import os
import re
from pathlib import Path

# Background replacements
BACKGROUND_REPLACEMENTS = {
    # Pure whites
    'background: white': 'background: var(--flora-bg-secondary)',
    'background:white': 'background: var(--flora-bg-secondary)',
    'background-color: white': 'background-color: var(--flora-bg-secondary)',
    'background-color:white': 'background-color: var(--flora-bg-secondary)',
    'background: #fff': 'background: var(--flora-bg-secondary)',
    'background: #ffffff': 'background: var(--flora-bg-secondary)',
    'background-color: #fff': 'background-color: var(--flora-bg-secondary)',
    'background-color: #ffffff': 'background-color: var(--flora-bg-secondary)',

    # Light grays and off-whites
    'background: #f8f9fa': 'background: var(--flora-bg-secondary)',
    'background: #f0f7ff': 'background: rgba(142, 209, 198, 0.1)',  # soft aqua tint
    'background: #e8f5e8': 'background: rgba(44, 122, 90, 0.1)',   # flora green tint
    'background-color: #f8f9fa': 'background-color: var(--flora-bg-secondary)',

    # Specific white/light values we found
    'rgba(255, 255, 255': 'rgba(245, 243, 238',  # Replace white with parchment in rgba
    '#e5e7eb': 'var(--flora-bg-secondary)',

    # Parchment should now be used for text, not backgrounds
    'background: var(--parchment)': 'background: var(--flora-bg-secondary)',
    'background-color: var(--parchment)': 'background-color: var(--flora-bg-secondary)',
}

def replace_backgrounds_in_file(file_path):
    """Replace white/light backgrounds in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        changes_made = []

        for old_bg, new_bg in BACKGROUND_REPLACEMENTS.items():
            if old_bg in content:
                content = content.replace(old_bg, new_bg)
                changes_made.append(f"{old_bg} -> {new_bg}")

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {file_path.name}: {len(changes_made)} background replacements")
            for change in changes_made:
                print(f"   {change}")
            return True
        else:
            print(f"⏭️  No background changes needed in {file_path.name}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Replace white backgrounds in all slide files"""
    slides_dir = Path("slides")

    if not slides_dir.exists():
        print("❌ slides/ directory not found")
        return

    html_files = list(slides_dir.glob("*.html"))

    print(f"🌲 Replacing white backgrounds with Flora dark theme in {len(html_files)} files...")
    print("=" * 70)

    updated_count = 0
    for html_file in html_files:
        if replace_backgrounds_in_file(html_file):
            updated_count += 1

    print("=" * 70)
    print(f"🎯 Updated {updated_count} out of {len(html_files)} files")
    print("🌿 Flora dark theme applied - no more white backgrounds!")

if __name__ == "__main__":
    main()