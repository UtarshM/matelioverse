with open('d:/precision-build-website/src/data/blogContent.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if "id: " in l:
        print(l.strip())
