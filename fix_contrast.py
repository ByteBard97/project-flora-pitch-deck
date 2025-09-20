#!/usr/bin/env python3
"""
Fix contrast issues by ensuring proper text/background combinations
"""

import os
import re
from pathlib import Path

# Contrast fixes - ensure we don't have light text on light backgrounds
CONTRAST_FIXES = {
    # Fix any remaining parchment backgrounds that should be dark
    'background: var(--parchment)': 'background: var(--flora-bg-secondary)',
    'background-color: var(--parchment)': 'background-color: var(--flora-bg-secondary)',

    # Fix any cases where we might have white/light text on white backgrounds
    'color: var(--parchment)': 'color: var(--flora-text-primary)',
    'color: white': 'color: var(--flora-text-primary)',
    'color: #fff': 'color: var(--flora-text-primary)',
    'color: #ffffff': 'color: var(--flora-text-primary)',

    # Ensure proper text colors on backgrounds
    'fill="var(--parchment)"': 'fill="var(--flora-text-primary)"',
    'fill="#fff"': 'fill="var(--flora-text-primary)"',
    'fill="white"': 'fill="var(--flora-text-primary)"',

    # Fix any remaining white backgrounds
    'background: white': 'background: var(--flora-bg-secondary)',
    'background: #fff': 'background: var(--flora-bg-secondary)',
    'background: #ffffff': 'background: var(--flora-bg-secondary)',
}

def fix_contrast_in_file(file_path):
    """Fix contrast issues in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        changes_made = []

        for old_value, new_value in CONTRAST_FIXES.items():
            if old_value in content:
                content = content.replace(old_value, new_value)
                changes_made.append(f"{old_value} -> {new_value}")

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed contrast in {file_path.name}: {len(changes_made)} changes")
            for change in changes_made:
                print(f"   {change}")
            return True
        else:
            print(f"⏭️  No contrast fixes needed in {file_path.name}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Fix contrast issues in all slide files"""
    slides_dir = Path("slides")

    if not slides_dir.exists():
        print("❌ slides/ directory not found")
        return

    html_files = list(slides_dir.glob("*.html"))

    print(f"🔍 Fixing contrast issues in {len(html_files)} slide files...")
    print("=" * 70)

    updated_count = 0
    for html_file in html_files:
        if fix_contrast_in_file(html_file):
            updated_count += 1

    print("=" * 70)
    print(f"🎯 Fixed contrast in {updated_count} out of {len(html_files)} files")
    print("👁️  Text should now be visible everywhere!")

if __name__ == "__main__":
    main()