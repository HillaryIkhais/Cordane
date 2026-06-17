import sys
from PIL import Image

def get_bbox_size(image_path):
    img = Image.open(image_path).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        width = bbox[2] - bbox[0]
        height = bbox[3] - bbox[1]
        return width, height, img.size
    return 0, 0, img.size

dark_w, dark_h, dark_size = get_bbox_size("public/dark_orb.png")
light_w, light_h, light_size = get_bbox_size("public/light_orb.png")

print(f"Dark Orb: file_size={dark_size}, visible_width={dark_w}, visible_height={dark_h}")
print(f"Light Orb: file_size={light_size}, visible_width={light_w}, visible_height={light_h}")

if dark_w > 0 and light_w > 0:
    ratio = dark_w / light_w
    print(f"To make the light orb match the dark orb, scale the light orb by: {ratio:.4f}")
