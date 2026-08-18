"""
Temozonia Express — Generador de placeholders para imágenes faltantes
Uso: pip install pillow -> python generate_placeholders.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

random = __import__("random")
random.seed(123)

public = Path(__file__).resolve().parent.parent / "public"

# Paleta Temozonia
CREAM = (255, 252, 245)
DARK = (42, 26, 10)
BROWN = (74, 58, 42)
GOLD = (212, 175, 55)
WHITE = (255, 255, 255)
BRAND = (253, 92, 13)

# Placeholders para imágenes de producto / contenido (800x800)
PRODUCT_PLACEHOLDERS = [
    ("images/recipes/cochinita.jpg", "Cochinita Pibil"),
    ("images/recipes/panuchos.jpg", "Panuchos"),
    ("images/recipes/tacos-longaniza.jpg", "Tacos de Longaniza"),
    ("images/recipes/salbutes.jpg", "Salbutes"),
    ("images/recipes/relleno-blanco.jpg", "Relleno Blanco"),
    ("images/recipes/queso-relleno.jpg", "Queso Relleno"),
    ("images/about/hero-temozonia.jpg", "Hero Temozonia"),
    ("images/promos/navidad-2024.jpg", "Promo Navidad 2024"),
    ("images/promos/dia-padre.jpg", "Promo Dia del Padre"),
    ("images/promos/mayoreo.jpg", "Promo Mayoreo"),
]

# Placeholders para imágenes pequeñas / genéricas (400x320)
SMALL_PLACEHOLDERS = [
    ("placeholder-product.jpg", "Producto", 400, 320),
    ("images/placeholder.png", "Placeholder", 400, 320),
]


def font(size, bold=False):
    names = (
        "georgiab.ttf" if bold else "georgia.ttf",
        "arialbd.ttf" if bold else "arial.ttf",
        "DejaVuSerif.ttf",
    )
    for n in names:
        try:
            return ImageFont.truetype(n, size)
        except OSError:
            pass
    return ImageFont.load_default()


def make_product_placeholder(path: Path, title: str, size=800):
    img = Image.new("RGB", (size, size), CREAM)
    d = ImageDraw.Draw(img, "RGBA")

    # Doble aro dorado
    margin = 60
    d.ellipse(
        (margin, margin, size - margin, size - margin),
        outline=GOLD,
        width=4,
    )
    d.ellipse(
        (margin + 15, margin + 15, size - margin - 15, size - margin - 15),
        outline=(*GOLD, 140),
        width=2,
    )

    # Fondo circular interior
    d.ellipse(
        (margin + 35, margin + 35, size - margin - 35, size - margin - 35),
        fill=(255, 253, 247),
    )

    # Texto centrado
    f = font(36, True)
    bbox = d.textbbox((0, 0), title, font=f)
    text_w = bbox[2] - bbox[0]
    d.text(((size - text_w) / 2, size / 2 - 20), title, fill=DARK, font=f)

    # Subtítulo
    fc = font(16)
    sub = "TEMOZONIA"
    bbox = d.textbbox((0, 0), sub, font=fc)
    text_w = bbox[2] - bbox[0]
    d.text(((size - text_w) / 2, size / 2 + 30), sub, fill=GOLD, font=fc)

    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, quality=90)


def make_small_placeholder(path: Path, title: str, w=400, h=320):
    img = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(img, "RGBA")

    d.rectangle((0, 0, w, h), outline=GOLD, width=3)
    d.rectangle((8, 8, w - 8, h - 8), fill=(255, 253, 247))

    f = font(22, True)
    bbox = d.textbbox((0, 0), title, font=f)
    text_w = bbox[2] - bbox[0]
    d.text(((w - text_w) / 2, h / 2 - 12), title, fill=DARK, font=f)

    fc = font(14)
    sub = "TEMOZONIA"
    bbox = d.textbbox((0, 0), sub, font=fc)
    text_w = bbox[2] - bbox[0]
    d.text(((w - text_w) / 2, h / 2 + 18), sub, fill=GOLD, font=fc)

    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, quality=90)


def make_partner_svg(path: Path, name: str):
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
  <rect width="200" height="100" rx="8" fill="#1a1a20"/>
  <rect x="10" y="10" width="180" height="80" rx="6" fill="#252530" stroke="#D4AF37" stroke-width="1"/>
  <text x="100" y="55" font-family="Georgia, serif" font-size="14" fill="#D4AF37" text-anchor="middle">{name}</text>
</svg>"""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(svg, encoding="utf-8")


# ── Ejecución ──────────────────────────────────────────────────────────────────
print("Generando placeholders...")

# Productos / recetas / promos / about
for rel_path, title in PRODUCT_PLACEHOLDERS:
    make_product_placeholder(public / rel_path, title)

# Pequeños placeholders
for rel_path, title, w, h in SMALL_PLACEHOLDERS:
    make_small_placeholder(public / rel_path, title, w, h)

# Logos de partners
partners = [
    ("logos/partners/carnes-de-puebla.svg", "Carnes de Puebla"),
    ("logos/partners/cafe-veracruz.svg", "Cafe Veracruz"),
    ("logos/partners/miel-yucatan.svg", "Miel Yucatan"),
    ("logos/partners/vino-artesanal.svg", "Vino Artesanal"),
]
for rel_path, name in partners:
    make_partner_svg(public / rel_path, name)

# Copiar las imágenes gourmet generadas a public/
src_img_dir = Path(__file__).resolve().parent / "images"
dst_img_dir = public / "images" / "products"
dst_img_dir.mkdir(parents=True, exist_ok=True)

for fname in ("prod-carne.jpg", "prod-costilla.jpg", "prod-longaniza.jpg"):
    src = src_img_dir / fname
    dst = dst_img_dir / fname
    if src.exists():
        dst.write_bytes(src.read_bytes())
        print(f"  [COPY] {src.name} -> public/images/products/{src.name}")

# OG image
og_src = src_img_dir / "og-temozonia.jpg"
og_dst = public / "images" / "og-temozonia.jpg"
if og_src.exists():
    og_dst.write_bytes(og_src.read_bytes())
    print(f"  [COPY] og-temozonia.jpg -> public/images/og-temozonia.jpg")

print("\n[OK] Placeholders generados en public/")
for p in sorted(public.rglob("*")):
    if p.is_file() and p.suffix in (".jpg", ".png", ".svg"):
        size_kb = p.stat().st_size / 1024
        print(f"  [IMG] {p.relative_to(public)} ({size_kb:.1f} KB)")
