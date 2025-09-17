#!/usr/bin/env python3
# Auto-generated script to apply color replacements

import sys
from pathlib import Path

replacements = {'rgba(255, 255, 255, 0.01)': 'rgba(245, 240, 230, 0.05)', 'rgba(255, 255, 255, 0.02)': 'rgba(245, 240, 230, 0.05)', 'rgba(255, 255, 255, 0.03)': 'rgba(245, 240, 230, 0.05)', 'rgba(255, 255, 255, 0.04)': 'rgba(245, 240, 230, 0.1)', 'rgba(255, 255, 255, 0.05)': 'rgba(245, 240, 230, 0.1)', 'rgba(255, 255, 255, 0.06)': 'rgba(245, 240, 230, 0.1)', 'rgba(255, 255, 255, 0.08)': 'rgba(245, 240, 230, 0.15)', 'rgba(255, 255, 255, 0.1)': 'rgba(245, 240, 230, 0.15)', 'rgba(255, 255, 255, 0.12)': 'rgba(245, 240, 230, 0.15)', 'rgba(255, 255, 255, 0.15)': 'rgba(245, 240, 230, 0.15)', 'background: white': 'background: #0A3D82', 'background:white': 'background: #0A3D82', 'fill="#fff"': 'fill="#F5F0E6"', 'fill="#ffffff"': 'fill="#F5F0E6"', '#0a1a1f': '#0A3D82', '#1a2f33': '#1B4A8C', '#4ade80': '#FFC107', '#22d3ee': '#E53935'}

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
        print(f"✅ Updated {sys.argv[1]}")
    else:
        print("Usage: python apply_colors.py <file>")
