"""Resize and convert source photos to WebP.

Run with `npm run images` after adding a photo to scripts/source-images/.
Each source image produces <name>-480.webp and <name>-960.webp in src/assets/.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "source-images"
OUT = ROOT / "src" / "assets"
WIDTHS = (480, 960)
OUT.mkdir(parents=True, exist_ok=True)

for path in sorted(SRC.glob("*.jpg")):
    image = Image.open(path).convert("RGB")
    for width in WIDTHS:
        w = min(width, image.width)
        h = round(image.height * w / image.width)
        target = OUT / f"{path.stem}-{width}.webp"
        image.resize((w, h), Image.LANCZOS).save(target, "WEBP", quality=74, method=6)
        print(f"{target.name}: {target.stat().st_size // 1024} kB")
