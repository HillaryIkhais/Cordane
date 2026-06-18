import os
import re

files = [
    "src/app/(app)/dashboard/page.tsx",
    "src/app/platform/page.tsx",
    "src/app/(app)/verdicts/page.tsx",
    "src/app/(app)/settings/page.tsx",
    "src/app/(app)/upload/page.tsx",
    "src/app/(app)/layout.tsx"
]

for filepath in files:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Replace white/ with foreground/ (covers bg-white/, border-white/, etc.)
    # Be careful not to replace actual white text that needs to stay white
    # Actually, let's target specific patterns
    content = re.sub(r'bg-white/(\d+)', r'bg-foreground/\1', content)
    content = re.sub(r'border-white/(\d+)', r'border-foreground/\1', content)
    content = re.sub(r'text-white/(\d+)', r'text-foreground/\1', content)
    
    # In dashboard, text-white was used for buttons
    content = re.sub(r'text-white([^a-zA-Z0-9_-])', r'text-foreground\1', content)
    
    # bg-black/20 was used for table headers and dark regions. 
    # In light mode, this should probably just be bg-foreground/5
    content = re.sub(r'bg-black/(\d+)', r'bg-foreground/5', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
        
print("Replaced colors in files.")
