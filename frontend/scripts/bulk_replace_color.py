import os

files = [
    "src/app/(app)/dashboard/page.tsx",
    "src/app/platform/page.tsx",
    "src/app/how-it-works/page.tsx"
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace the old coral color with the new luxury amber
        new_content = content.replace('#e07a5f', '#cc8b45')
        
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"File not found: {filepath}")
