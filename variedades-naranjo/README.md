# 🍊 Variedades Naranjo — Contabilidad simple

Aplicación para tablet pensada para llevar las cuentas de un local de bisutería,
perfumería, peluches y accesorios **sin inventario y sin internet**, diseñada
para ser usada por una persona mayor: botones gigantes, letra grande y cero
menús escondidos.

## ¿Qué hace?

| Pantalla | Para quién | Qué hace |
|---|---|---|
| 🛍️ **Vender** | La dueña | Toca la familia (Perfumería, Peluches…), escribe el valor y guarda. 3 toques por venta. |
| 💸 **Gastos** | La dueña | Registra arriendo, servicios, compra de mercancía u otros gastos. |
| ⭐ **Mi día** | La dueña | "Hoy ha vendido $340.000 — 12 ventas". |
| 🔒 **Administración** | La familia (clave de 4 números) | Reportes, márgenes por familia, corrección de registros, respaldo y ajustes. |

### Cómo calcula la ganancia

- Cada **familia** de productos tiene su **margen** (ej.: perfumería 40%).
- **Ganancia bruta** = lo vendido × el margen de cada familia.
- **Ganancia real** = ganancia bruta − gastos del local (arriendo, servicios, otros).
- La **compra de mercancía no se resta** de la ganancia: el margen ya descuenta
  lo que costó el producto. Se muestra aparte como inversión en surtido.

## Cómo instalarla en la tablet (una sola vez)

La app necesita estar publicada en una dirección web **una sola vez** para
instalarse. Después funciona para siempre sin internet.

1. **Publicar la carpeta** `variedades-naranjo/` en un alojamiento gratuito de
   páginas (GitHub Pages, Netlify, etc.).
2. En la tablet Android, **compartir internet desde un celular** (zona WiFi) y
   abrir la dirección en **Google Chrome**.
3. Chrome ofrecerá **"Agregar a la pantalla principal"** (o tocar el menú ⋮ →
   *Agregar a pantalla principal* → *Instalar*).
4. Listo: queda el ícono 🍊 en la pantalla de la tablet y **funciona sin
   internet** desde ese momento.

> Recomendado: dejar la app anclada y la tablet solo para esto.

## Claves y cuidados

- La clave de administración inicial es **1234** — cámbienla en
  *Administración → Ajustes*.
- Hagan un **respaldo semanal**: *Administración → Respaldo → Enviar respaldo*
  (comparte un archivo por WhatsApp usando los datos del celular). Con ese
  archivo se recupera todo en una tablet nueva con *Restaurar*.
- Los datos viven en la memoria del navegador de la tablet
  (`localStorage`). **No borren los datos de Chrome** de la tablet.

## Técnico

- PWA sin dependencias: HTML + CSS + JavaScript puro, `localStorage`,
  service worker con caché total para uso offline.
- Sin servidor, sin base de datos, sin cuentas.
- Íconos generados con `iconos/generar_iconos.py` (Pillow).
- Probada con un test funcional de jsdom que recorre todos los flujos
  (venta, gasto, mercancía, clave, reportes, familias, registros, respaldo,
  ajustes y persistencia).
