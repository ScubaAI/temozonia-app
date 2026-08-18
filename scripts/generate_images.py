"""
Temozonia Express — Generador de imágenes gourmet (Vitrina + OG)
Uso: pip install pillow -> python generate_images.py
"""
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

random.seed(42)  # Reproducibilidad

root = Path(__file__).resolve().parent / "images"
root.mkdir(parents=True, exist_ok=True)

# ── Paleta Temozonia ───────────────────────────────────────
CREAM = (255, 252, 245)
PARCHMENT = (249, 243, 233)
DARK = (42, 26, 10)
BROWN = (74, 58, 42)
DEEP_RED = (139, 30, 30)
GOLD = (212, 175, 55)
GOLD_L = (253, 224, 71)
BRAND = (253, 92, 13)
FLYER = (247, 148, 29)
WHITE = (255, 255, 255)

# Colores de carne y ahumado
MEAT_LIGHT = (186, 94, 68)
MEAT_MID = (146, 64, 38)
MEAT_DARK = (96, 38, 22)
CRUST = (160, 82, 46)
CRUST_DARK = (120, 52, 26)
SMOKE = (220, 215, 205)
WOOD_LIGHT = (170, 126, 82)
WOOD_MID = (150, 106, 62)
WOOD_DARK = (110, 74, 40)
BONE = (245, 235, 215)
HERB = (80, 120, 60)
HERB_DARK = (60, 90, 45)


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


def gradient_radial(img, center, radius, color_inner, color_outer):
    """Crea un gradiente radial suave"""
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy = center
    for r in range(radius, 0, -1):
        t = 1 - (r / radius)
        c = tuple(
            int(a * (1 - t) + b * t) for a, b in zip(color_outer, color_inner)
        )
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=c)
    return img


def add_texture_noise(img, opacity=0.03):
    """Agrega textura sutil de papel"""
    w, h = img.size
    noise = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(noise)
    for _ in range(w * h // 50):
        x, y = random.randint(0, w - 1), random.randint(0, h - 1)
        v = random.randint(200, 255)
        d.point((x, y), fill=(v, v, v))
    noise = noise.filter(ImageFilter.GaussianBlur(1))
    return Image.blend(img, noise, opacity)


def draw_wood_texture(d, bbox):
    """Dibuja textura de tabla de madera"""
    x1, y1, x2, y2 = bbox
    w, h = x2 - x1, y2 - y1

    # Base de madera
    for y in range(y1, y2, 2):
        t = (y - y1) / h
        c = tuple(
            int(a * (1 - t) + b * t) for a, b in zip(WOOD_LIGHT, WOOD_DARK)
        )
        d.line([(x1, y), (x2, y)], fill=c)

    # Vetás de madera
    for _ in range(15):
        y_start = random.randint(y1, y2 - 10)
        curve = [(x1, y_start)]
        for x in range(x1 + 20, x2, 20):
            y_start += random.randint(-2, 2)
            y_start = max(y1, min(y2, y_start))
            curve.append((x, y_start))
        for i in range(len(curve) - 1):
            d.line([curve[i], curve[i + 1]], fill=WOOD_DARK, width=1)


def draw_meat_texture(d, bbox, dark=False):
    """Dibuja textura realista de carne ahumada"""
    x1, y1, x2, y2 = bbox
    base = MEAT_DARK if dark else MEAT_MID

    # Gradiente base
    for y in range(y1, y2):
        t = (y - y1) / (y2 - y1)
        c = tuple(int(a * (1 - t) + b * t) for a, b in zip(MEAT_LIGHT, base))
        d.line([(x1, y), (x2, y)], fill=c)

    # Fibras de carne
    for _ in range(30):
        x_start = random.randint(x1, x2 - 10)
        y_start = random.randint(y1, y2)
        length = random.randint(20, 60)
        angle = random.uniform(-0.3, 0.3)
        x_end = x_start + int(length * 0.9)
        y_end = y_start + int(length * angle)
        c = MEAT_DARK if random.random() > 0.5 else MEAT_LIGHT
        d.line([(x_start, y_start), (x_end, y_end)], fill=c, width=1)


def draw_smoke(d, cx, cy, radius, opacity=40):
    """Dibuja volutas de humo"""
    for _ in range(8):
        x_off = random.randint(-radius, radius)
        y_off = random.randint(-radius, radius)
        r = random.randint(radius // 3, radius)
        d.ellipse(
            (cx + x_off - r, cy + y_off - r, cx + x_off + r, cy + y_off + r),
            fill=(*SMOKE, opacity),
        )


def draw_herbs(d, cx, cy, count=12):
    """Dibuja hierbas decorativas"""
    for _ in range(count):
        x = cx + random.randint(-180, 180)
        y = cy + random.randint(-180, 180)
        angle = random.uniform(0, 3.14)
        length = random.randint(15, 30)

        # Tallo
        x_end = x + int(length * 0.7 * random.uniform(0.7, 1))
        y_end = y + int(length * 0.7 * random.uniform(0.7, 1))
        d.line([(x, y), (x_end, y_end)], fill=HERB_DARK, width=2)

        # Hojas pequeñas
        for i in range(3):
            leaf_x = x + (x_end - x) * (i + 1) / 4
            leaf_y = y + (y_end - y) * (i + 1) / 4
            leaf_size = random.randint(3, 6)
            d.ellipse(
                (
                    leaf_x - leaf_size,
                    leaf_y - leaf_size,
                    leaf_x + leaf_size,
                    leaf_y + leaf_size,
                ),
                fill=HERB,
            )


# ── Motivos de producto ────────────────────────────────────
def motif_carne(d, cx, cy):
    """Piezas de carne ahumada sobre tabla de madera"""
    # Tabla de madera
    draw_wood_texture(d, (cx - 200, cy + 80, cx + 200, cy + 150))

    # Sombra bajo la carne
    d.ellipse(
        (cx - 140, cy + 60, cx + 140, cy + 100),
        fill=(0, 0, 0, 30),
    )

    # Pieza principal de carne
    d.rounded_rectangle(
        (cx - 100, cy - 80, cx + 100, cy + 80),
        radius=30,
        fill=MEAT_MID,
        outline=MEAT_DARK,
        width=4,
    )
    draw_meat_texture(d, (cx - 95, cy - 75, cx + 95, cy + 75))

    # Corteza dorada arriba
    d.arc((cx - 95, cy - 80, cx + 95, cy - 40), start=180, end=0, fill=CRUST, width=8)
    d.arc(
        (cx - 90, cy - 75, cx + 90, cy - 45),
        start=180,
        end=0,
        fill=CRUST_DARK,
        width=4,
    )

    # Segunda pieza más pequeña
    d.rounded_rectangle(
        (cx - 50, cy - 20, cx + 50, cy + 60),
        radius=20,
        fill=MEAT_LIGHT,
        outline=MEAT_MID,
        width=3,
    )
    draw_meat_texture(d, (cx - 45, cy - 15, cx + 45, cy + 55), dark=True)

    # Brillo especular
    d.arc((cx - 60, cy - 60, cx - 20, cy - 20), start=180, end=270, fill=WHITE, width=4)


def motif_costilla(d, cx, cy):
    """Costillas ahumadas con huesos visibles"""
    # Sombra
    d.ellipse(
        (cx - 160, cy + 40, cx + 160, cy + 80),
        fill=(0, 0, 0, 30),
    )

    # Rack de costillas
    for j, y_offset in enumerate([-60, 40]):
        # Base de carne
        d.rounded_rectangle(
            (cx - 180, cy + y_offset - 35, cx + 180, cy + y_offset + 35),
            radius=20,
            fill=MEAT_DARK,
            outline=CRUST_DARK,
            width=4,
        )
        draw_meat_texture(
            d, (cx - 175, cy + y_offset - 30, cx + 175, cy + y_offset + 30), dark=True
        )

        # Huesos
        for x in range(cx - 150, cx + 160, 50):
            d.rounded_rectangle(
                (x - 6, cy + y_offset - 28, x + 6, cy + y_offset + 28),
                radius=5,
                fill=BONE,
                outline=(200, 190, 170),
                width=2,
            )
            # Sombra del hueso
            d.rounded_rectangle(
                (x - 6, cy + y_offset + 20, x + 6, cy + y_offset + 28),
                radius=3,
                fill=(180, 170, 150),
            )

        # Brillo de grasa
        d.line(
            (cx - 170, cy + y_offset - 20, cx + 170, cy + y_offset - 20),
            fill=(255, 200, 150),
            width=3,
        )


def motif_longaniza(d, cx, cy):
    """Longanizas ahumadas atadas"""
    # Sombra
    d.ellipse(
        (cx - 160, cy + 50, cx + 160, cy + 90),
        fill=(0, 0, 0, 30),
    )

    # Cuerda de atar
    d.line((cx - 180, cy - 100, cx + 180, cy - 100), fill=WOOD_DARK, width=4)

    # Longanizas
    for i in range(4):
        y = cy - 80 + i * 50

        # Cuerpo principal
        d.rounded_rectangle(
            (cx - 170, y, cx + 170, y + 30),
            radius=15,
            fill=MEAT_MID,
            outline=MEAT_DARK,
            width=3,
        )
        draw_meat_texture(d, (cx - 165, y + 3, cx + 165, y + 27))

        # Nudos de la cuerda
        for x in range(cx - 140, cx + 150, 45):
            d.ellipse((x, y + 8, x + 10, y + 18), fill=WOOD_DARK)
            d.ellipse((x + 2, y + 10, x + 8, y + 16), fill=(255, 235, 210))

        # Brillo superior
        d.line((cx - 170, y + 8, cx + 170, y + 8), fill=(255, 190, 160), width=2)


# ── Cards de producto con doble aro dorado heritage ────────
def make_product(path, title, motif):
    img = Image.new("RGB", (800, 800), CREAM)
    img = gradient_radial(img, (400, 400), 400, PARCHMENT, CREAM)
    img = add_texture_noise(img, 0.04)

    d = ImageDraw.Draw(img, "RGBA")

    # Doble aro dorado
    d.ellipse((110, 110, 690, 690), outline=GOLD, width=4)
    d.ellipse((130, 130, 670, 670), outline=(*GOLD, 140), width=2)

    # Fondo circular interior
    d.ellipse((170, 170, 630, 630), fill=(255, 253, 247))
    d.ellipse((200, 200, 600, 600), fill=(250, 246, 236))

    # Humo sutil de fondo
    draw_smoke(d, 400, 350, 150, opacity=25)

    # Motivo del producto
    {"carne": motif_carne, "costilla": motif_costilla, "longaniza": motif_longaniza}[
        motif
    ](d, 400, 400)

    # Hierbas decorativas
    draw_herbs(d, 400, 400, count=15)

    # Título
    f = font(44, True)
    bbox = d.textbbox((0, 0), title, font=f)
    text_w = bbox[2] - bbox[0]
    d.text(((800 - text_w) / 2, 700), title, fill=DARK, font=f)

    # Subtítulo
    cap = "TEMOZONIA  ·  CAUCEL, MÉRIDA"
    fc = font(18)
    bbox = d.textbbox((0, 0), cap, font=fc)
    text_w = bbox[2] - bbox[0]
    d.text(((800 - text_w) / 2, 755), cap, fill=GOLD, font=fc)

    img.convert("RGB").save(path, quality=92)


# ── IMAGEN OPEN GRAPH (Para WhatsApp / Facebook) ───────────
def make_og(path):
    img = Image.new("RGB", (1200, 630), DEEP_RED)
    img = gradient_radial(img, (200, 200), 600, DEEP_RED, DARK)
    img = gradient_radial(img, (1000, 400), 500, (200, 60, 40), DEEP_RED)
    img = add_texture_noise(img, 0.05)

    d = ImageDraw.Draw(img, "RGBA")

    # Círculos decorativos
    d.ellipse((-100, -100, 400, 400), fill=(255, 255, 255, 20))
    d.ellipse((800, 200, 1400, 800), fill=(*FLYER, 30))

    # Humo dramático
    draw_smoke(d, 900, 300, 250, opacity=35)

    # Textos
    f_title = font(85, True)
    f_sub = font(40)
    f_tag = font(30, True)

    # Temozonia
    d.text((80, 150), "Temozonia", fill=GOLD_L, font=f_title)
    d.text((80, 250), "Carnes Ahumadas", fill=WHITE, font=f_title)

    # Línea dorada
    d.rectangle((80, 350, 320, 358), fill=GOLD)

    # Subtítulo
    d.text((80, 385), "Caucel, Mérida · 100% Tradicional", fill=CREAM, font=f_sub)

    # Tagline
    d.text((80, 445), "Mayoreo y Menudeo · Pedidos al instante", fill=FLYER, font=f_tag)

    # Diamante decorativo
    d.polygon([(1050, 315), (1070, 335), (1050, 355), (1030, 335)], fill=GOLD)

    img.convert("RGB").save(path, quality=95)


# ── Ejecución ──────────────────────────────────────────────
print("Generando imágenes gourmet de Temozonia...")
make_product(root / "prod-carne.jpg", "Carne Ahumada", "carne")
make_product(root / "prod-costilla.jpg", "Costilla Ahumada", "costilla")
make_product(root / "prod-longaniza.jpg", "Longaniza Tradicional", "longaniza")
make_og(root / "og-temozonia.jpg")

print("\n✅ Imágenes creadas en", root)
for p in sorted(root.iterdir()):
    size_kb = p.stat().st_size / 1024
    print(f"  📸 {p.name} ({size_kb:.1f} KB)")
