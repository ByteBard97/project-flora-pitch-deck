#!/usr/bin/env python3
"""
Embed WebP images directly into slide HTML files as base64 data URLs
"""

import re
import base64
from pathlib import Path

def webp_to_base64(webp_path):
    """Convert WebP image to base64 data URL"""
    with open(webp_path, 'rb') as f:
        image_data = f.read()
    b64_data = base64.b64encode(image_data).decode('utf-8')
    return f"data:image/webp;base64,{b64_data}"

def embed_images_in_slide(slide_path):
    """Find and embed all WebP images in a slide"""
    print(f"Processing {slide_path.name}...")
    
    with open(slide_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Find all assets/ references
    assets_pattern = r'src="assets/([^"]+\.webp)"'
    assets_matches = re.findall(assets_pattern, content)
    
    for image_name in assets_matches:
        webp_path = slide_path.parent / "assets" / image_name
        if webp_path.exists():
            # Convert to base64
            data_url = webp_to_base64(webp_path)
            
            # Replace in content
            old_src = f'src="assets/{image_name}"'
            new_src = f'src="{data_url}"'
            content = content.replace(old_src, new_src)
            modified = True
            
            print(f"  ✅ Embedded {image_name} ({webp_path.stat().st_size} bytes)")
        else:
            print(f"  ❌ Not found: {webp_path}")
    
    # Find and convert old UnifrakturCook references to WebP
    old_pattern = r'src="../../output/UnifrakturCook-Bold_A/([^"]+)\.(png|svg)"'
    old_matches = re.findall(old_pattern, content)
    
    for base_name, ext in old_matches:
        # Look for corresponding WebP
        webp_path = slide_path.parent / "assets" / f"{base_name}.webp"
        if webp_path.exists():
            # Convert to base64
            data_url = webp_to_base64(webp_path)
            
            # Replace in content
            old_src = f'src="../../output/UnifrakturCook-Bold_A/{base_name}.{ext}"'
            new_src = f'src="{data_url}"'
            content = content.replace(old_src, new_src)
            modified = True
            
            print(f"  ✅ Converted and embedded {base_name}.{ext} -> {base_name}.webp ({webp_path.stat().st_size} bytes)")
        else:
            print(f"  ⚠️  No WebP found for {base_name}.{ext}")
    
    if not modified:
        print(f"  No images to embed")
        return
    
    # Write updated content
    with open(slide_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    slides_dir = Path("slides")
    
    # Process all HTML files
    for slide_path in slides_dir.glob("*.html"):
        embed_images_in_slide(slide_path)
    
    print("\n✅ All slides processed!")

if __name__ == "__main__":
    main()