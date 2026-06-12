"""Genera los íconos PNG de la app (una naranja sobre fondo naranja oscuro)."""
from PIL import Image, ImageDraw

NARANJA_FONDO = (232, 89, 12)
NARANJA_FRUTA = (255, 169, 77)
NARANJA_BRILLO = (255, 216, 168)
VERDE_HOJA = (47, 158, 68)
CAFE_TALLO = (103, 65, 24)


def dibujar(tamano, margen_extra=0.0, esquinas_redondas=True):
    img = Image.new("RGBA", (tamano, tamano), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if esquinas_redondas:
        radio = int(tamano * 0.22)
        d.rounded_rectangle([0, 0, tamano - 1, tamano - 1], radius=radio, fill=NARANJA_FONDO)
    else:
        d.rectangle([0, 0, tamano - 1, tamano - 1], fill=NARANJA_FONDO)

    # la fruta
    centro = tamano / 2
    r = tamano * (0.30 - margen_extra)
    cy = centro + tamano * 0.05
    d.ellipse([centro - r, cy - r, centro + r, cy + r], fill=NARANJA_FRUTA)

    # brillo
    rb = r * 0.32
    bx, by = centro - r * 0.38, cy - r * 0.42
    d.ellipse([bx - rb, by - rb, bx + rb, by + rb], fill=NARANJA_BRILLO)

    # tallo
    grosor = max(2, int(tamano * 0.025))
    d.line([centro, cy - r, centro + tamano * 0.02, cy - r - tamano * 0.07], fill=CAFE_TALLO, width=grosor)

    # hoja
    hoja = Image.new("RGBA", (tamano, tamano), (0, 0, 0, 0))
    dh = ImageDraw.Draw(hoja)
    hw, hh = tamano * 0.16, tamano * 0.075
    hx, hy = centro + tamano * 0.10, cy - r - tamano * 0.06
    dh.ellipse([hx - hw / 2, hy - hh / 2, hx + hw / 2, hy + hh / 2], fill=VERDE_HOJA)
    hoja = hoja.rotate(-30, center=(hx, hy))
    img.alpha_composite(hoja)

    return img


dibujar(192).save("icono-192.png")
dibujar(512).save("icono-512.png")
dibujar(512, margen_extra=0.06, esquinas_redondas=False).save("icono-maskable-512.png")
print("Íconos generados.")
