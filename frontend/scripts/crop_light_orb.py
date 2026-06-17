from PIL import Image, ImageChops

def trim(im):
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

try:
    img = Image.open('public/light_orb.png').convert('RGB')
    print("Original size:", img.size)
    cropped = trim(img)
    print("Cropped size:", cropped.size)

    w, h = cropped.size
    size = max(w, h)
    new_img = Image.new('RGB', (size, size), (255, 255, 255))
    new_img.paste(cropped, ((size - w) // 2, (size - h) // 2))

    # Add a tiny bit of padding so it's not touching the very edges
    padding = int(size * 0.05)
    size_with_padding = size + padding * 2
    final_square = Image.new('RGB', (size_with_padding, size_with_padding), (255, 255, 255))
    final_square.paste(new_img, (padding, padding))

    final_img = final_square.resize((1024, 1024), Image.Resampling.LANCZOS)
    final_img.save('public/light_orb_scaled.png')
    print("Successfully saved public/light_orb_scaled.png")
except Exception as e:
    print("Error:", e)
