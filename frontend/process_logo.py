from PIL import Image
import numpy as np

# Load the chosen logo
img = Image.open('/Users/ikhaisoshuare/.gemini/antigravity/brain/70dac800-9919-4cf8-944d-01466431de01/cordane_vector_3_1781776077647.png').convert('RGBA')
arr = np.array(img)

# The image is black text on white background.
# We want to make the white background transparent.
# And we want to change the black text to the amber color #cc8b45 (R:204, G:139, B:69).

# Get RGB channels
r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

# Identify white pixels (background)
# Since it might have some anti-aliasing, we can convert brightness to alpha.
# Brightness is roughly the average of RGB. Since it's greyscale-ish, we can just use the R channel.
# Black is 0, White is 255. We want Black to have Alpha=255, and White to have Alpha=0.
alpha = 255 - r

# Set the RGB channels to the amber color
arr[:,:,0] = 204 # R
arr[:,:,1] = 139 # G
arr[:,:,2] = 69  # B
arr[:,:,3] = alpha

# Create new image
new_img = Image.fromarray(arr)

# Crop to bounding box of non-transparent pixels
# Since we only want the 'CO' part, let's look at the image dimensions. The image is 1024x1024.
# The word "cordane" is centered. The 'CO' is on the left.
# Let's crop just the 'CO' portion.
# First, let's find the bounding box of all text.
bbox = new_img.getbbox()
if bbox:
    # bbox is (left, upper, right, lower)
    # The 'CO' symbol is roughly the first 30% of the text width.
    text_width = bbox[2] - bbox[0]
    # Let's crop to just the left part. We'll extract a square around the 'co'.
    co_right = bbox[0] + int(text_width * 0.35)
    
    # Actually, to be safer, let's just save the entire wordmark as one file,
    # and the cropped 'co' as another file.
    new_img.crop(bbox).save('public/logo-wordmark.png')
    
    # Crop just the 'co' for the icon.
    co_bbox = (bbox[0], bbox[1], co_right, bbox[3])
    co_img = new_img.crop(co_bbox)
    
    # Let's find the true bounding box of the cropped 'co' to remove any extra right space
    co_true_bbox = co_img.getbbox()
    if co_true_bbox:
        co_img = co_img.crop(co_true_bbox)
        # Pad it slightly to make it square
        w, h = co_img.size
        size = max(w, h)
        square_img = Image.new('RGBA', (size, size), (0,0,0,0))
        offset = ((size - w) // 2, (size - h) // 2)
        square_img.paste(co_img, offset)
        square_img.save('public/logo-icon.png')
        print("Successfully created logo-wordmark.png and logo-icon.png")
    else:
        print("Failed to crop CO")
else:
    print("Failed to find bounding box")
