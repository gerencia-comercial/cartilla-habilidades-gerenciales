/* ============================================================
   Variedades Naranjo — versión 2
   Venta por voz o escrita con biblioteca de productos,
   márgenes aprendidos por producto, caja registradora con
   bolsillos por categoría. Todo offline (localStorage).
   ============================================================ */

(function () {
  'use strict';

  var CLAVE_DATOS = 'vn_datos_v1';

  /* ---------------- iconografía corporativa (SVG) ---------------- */

  var ICONOS_SVG = {
    perfume:   { n: 'Perfume',        s: '<rect x="6" y="8" width="12" height="13" rx="3"/><path d="M10 8V5h4v3"/><path d="M9 3h6"/>' },
    gema:      { n: 'Gema',           s: '<path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20"/><path d="M12 21L8 9l2-6"/><path d="M12 21l4-12-2-6"/>' },
    collar:    { n: 'Collar',         s: '<path d="M5 3c0 7 3 11 7 11s7-4 7-11"/><circle cx="12" cy="17.5" r="2.5"/>' },
    oso:       { n: 'Peluche',        s: '<circle cx="12" cy="13" r="7"/><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="9.5" cy="12" r="0.8" fill="currentColor"/><circle cx="14.5" cy="12" r="0.8" fill="currentColor"/><path d="M10.5 15.5a2 2 0 0 0 3 0"/>' },
    arete:     { n: 'Arete',          s: '<circle cx="12" cy="4" r="1.5"/><path d="M12 5.5V9"/><path d="M12 9l4 4-4 8-4-8 4-4z"/>' },
    bolso:     { n: 'Bolso',          s: '<path d="M6 9h12l1.5 10.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5L6 9z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/>' },
    reloj:     { n: 'Reloj',          s: '<circle cx="12" cy="12" r="7"/><path d="M12 9v3l2.5 1.5"/><path d="M9.5 3h5"/><path d="M9.5 21h5"/>' },
    gafas:     { n: 'Gafas',          s: '<circle cx="6.5" cy="15" r="3.5"/><circle cx="17.5" cy="15" r="3.5"/><path d="M10 15a2 2 0 0 1 4 0"/><path d="M3 15l1.5-7h2"/><path d="M21 15l-1.5-7h-2"/>' },
    labial:    { n: 'Labial',         s: '<rect x="9" y="12" width="6" height="8" rx="1"/><path d="M10 12V6l4-2v8"/>' },
    corona:    { n: 'Corona',         s: '<path d="M3 7l4.5 4L12 4l4.5 7L21 7l-1.8 12H4.8L3 7z"/>' },
    lazo:      { n: 'Lazo',           s: '<path d="M12 12L4 7.5v9L12 12z"/><path d="M12 12l8-4.5v9L12 12z"/><circle cx="12" cy="12" r="1.6"/>' },
    flor:      { n: 'Flor',           s: '<circle cx="12" cy="5.2" r="2.2"/><circle cx="7.5" cy="8.5" r="2.2"/><circle cx="16.5" cy="8.5" r="2.2"/><circle cx="9.2" cy="13" r="2.2"/><circle cx="14.8" cy="13" r="2.2"/><circle cx="12" cy="9.3" r="2"/><path d="M12 15.2V22"/>' },
    estrella:  { n: 'Estrella',       s: '<path d="M12 2.5l2.9 6.2 6.6.7-4.9 4.5 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.4l6.6-.7L12 2.5z"/>' },
    regalo:    { n: 'Regalo',         s: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M12 8v13"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>' },
    camiseta:  { n: 'Ropa',           s: '<path d="M16 3l5 3-2 4-2-1v12H7V9l-2 1-2-4 5-3a4 4 0 0 0 8 0z"/>' },
    zapato:    { n: 'Calzado',        s: '<path d="M3 19v-7c2 0 4-1 6-3 3 5 6 7 12 7v3H3z"/><path d="M16 19v-3"/>' },
    sombrero:  { n: 'Sombrero',       s: '<path d="M4 13a8 8 0 0 1 16 0v2H4v-2z"/><path d="M2 17c4 2 16 2 20 0"/>' },
    anillo:    { n: 'Anillo',         s: '<circle cx="12" cy="14" r="6"/><path d="M12 2l3 3-3 3-3-3 3-3z"/>' },
    medias:    { n: 'Medias',         s: '<path d="M8 2h8v9l3.5 3.5a4.5 4.5 0 0 1-6.4 6.4L8 15.4V2z"/><path d="M8 6h8"/>' },
    tijeras:   { n: 'Cuidado',        s: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.8L20 19"/><path d="M8.5 16.2L20 5"/>' },
    maleta:    { n: 'Maleta',         s: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>' },
    caja:      { n: 'Caja',           s: '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>' },
    etiqueta:  { n: 'Etiqueta',       s: '<path d="M2 11V4a2 2 0 0 1 2-2h7l11 11-9 9L2 11z"/><circle cx="7.5" cy="7.5" r="1" fill="currentColor"/>' },
    sol:       { n: 'Sol',            s: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.9 4.9l1.4 1.4"/><path d="M17.7 17.7l1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.9 19.1l1.4-1.4"/><path d="M17.7 6.3l1.4-1.4"/>' },
    globo:     { n: 'Fiesta',         s: '<ellipse cx="12" cy="8.5" rx="5.5" ry="6.5"/><path d="M12 15l-1.5 2h3L12 15z"/><path d="M12 17c0 3-2 3-2 5"/>' },
    vela:      { n: 'Vela',           s: '<rect x="9" y="10" width="6" height="11" rx="1"/><path d="M12 10V7"/><path d="M12 7c-1.6-1.4-1.6-2.8 0-4 1.6 1.2 1.6 2.6 0 4z"/>' },
    audifonos: { n: 'Tecnología',     s: '<path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="7" rx="1.5"/><rect x="17" y="13" width="4" height="7" rx="1.5"/>' },
    microfono: { n: 'Micrófono',      s: '<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v4"/><path d="M8 21h8"/>' },
    cofre:     { n: 'Caja registradora', s: '<rect x="3" y="9" width="18" height="11" rx="2"/><path d="M3 13h18"/><path d="M12 13v3"/><path d="M7 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"/>' },
    /* interfaz */
    ajustes:   { n: 'Ajustes',        s: '<line x1="21" y1="6" x2="14" y2="6"/><line x1="10" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="18" x2="16" y2="18"/><line x1="12" y1="18" x2="3" y2="18"/><circle cx="12" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="14" cy="18" r="2"/>' },
    candado:   { n: 'Candado',        s: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>' },
    billetera: { n: 'Billetera',      s: '<rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20"/><circle cx="16.5" cy="14.5" r="1" fill="currentColor"/>' },
    grafica:   { n: 'Gráfica',        s: '<path d="M3 21h18"/><path d="M7 21V11"/><path d="M12 21V4"/><path d="M17 21v-7"/>' },
    casa:      { n: 'Casa',           s: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>' },
    bombilla:  { n: 'Bombilla',       s: '<path d="M12 2a7 7 0 0 0-4.6 12.3c.9.8 1.6 1.7 1.6 2.7h6c0-1 .7-1.9 1.6-2.7A7 7 0 0 0 12 2z"/><path d="M9 21h6"/>' },
    documento: { n: 'Documento',      s: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>' },
    lapiz:     { n: 'Papelería',      s: '<path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>' },
    basura:    { n: 'Borrar',         s: '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>' },
    ojo:       { n: 'Mostrar',        s: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>' },
    subir:     { n: 'Enviar',         s: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v13"/>' },
    bajar:     { n: 'Recibir',        s: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V2"/>' },
    llave:     { n: 'Llave',          s: '<circle cx="7" cy="16" r="4"/><path d="M10 13L21 2"/><path d="M17 6l3 3"/><path d="M14 9l2 2"/>' },
    alerta:    { n: 'Alerta',         s: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/>' },
    atras:     { n: 'Atrás',          s: '<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>' },
    check:     { n: 'Listo',          s: '<path d="M20 6L9 17l-5-5"/>' },
    deshacer:  { n: 'Deshacer',       s: '<path d="M3 7v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 7"/>' },
    cerrar:    { n: 'Cerrar',         s: '<path d="M18 6L6 18"/><path d="M6 6l12 12"/>' },
    borrartecla: { n: 'Borrar dígito', s: '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><path d="M18 9l-6 6"/><path d="M12 9l6 6"/>' },
    ayuda:     { n: 'No sé',          s: '<circle cx="12" cy="12" r="9"/><path d="M9.2 9a3 3 0 0 1 5.8 1c0 2-3 2.2-3 4"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/>' }
  };

  var ICONOS = ['perfume', 'gema', 'collar', 'oso', 'arete', 'bolso', 'reloj', 'gafas', 'labial',
    'corona', 'lazo', 'flor', 'estrella', 'regalo', 'camiseta', 'zapato', 'sombrero', 'anillo',
    'medias', 'tijeras', 'maleta', 'caja', 'etiqueta', 'sol', 'globo', 'vela', 'audifonos'];

  function svgIcono(id, clase) {
    var ic = ICONOS_SVG[id] || ICONOS_SVG.etiqueta;
    return '<svg class="icv' + (clase ? ' ' + clase : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ic.s + '</svg>';
  }

  var EMOJI_A_ICONO = {
    '🧴': 'perfume', '📿': 'collar', '🧸': 'oso', '✨': 'arete', '👜': 'bolso', '💍': 'anillo',
    '💄': 'labial', '🕶️': 'gafas', '⌚': 'reloj', '🎀': 'lazo', '🧦': 'medias', '👛': 'bolso',
    '🪞': 'gema', '🧢': 'sombrero', '🎁': 'regalo', '💅': 'labial', '🩴': 'zapato', '🛍️': 'etiqueta',
    '📦': 'caja', '🎈': 'globo', '🧵': 'lazo', '🪮': 'tijeras', '🌸': 'flor', '⭐': 'estrella'
  };

  /* ---------------- categorías estándar ---------------- */

  var CATEGORIAS_BASE = [
    { id: 'c-bisuteria', nombre: 'Bisutería', icono: 'collar', color: '#0F766E', margen: 50, activa: true },
    { id: 'c-perfumeria', nombre: 'Perfumería', icono: 'perfume', color: '#5B21B6', margen: 40, activa: true },
    { id: 'c-peluches', nombre: 'Peluches y juguetes', icono: 'oso', color: '#9D174D', margen: 40, activa: true },
    { id: 'c-bolsos', nombre: 'Bolsos y billeteras', icono: 'bolso', color: '#1D4ED8', margen: 45, activa: true },
    { id: 'c-accesorios', nombre: 'Accesorios', icono: 'gafas', color: '#0E7490', margen: 50, activa: true },
    { id: 'c-cabello', nombre: 'Accesorios de cabello', icono: 'lazo', color: '#A21CAF', margen: 55, activa: true },
    { id: 'c-papeleria', nombre: 'Papelería', icono: 'lapiz', color: '#B45309', margen: 35, activa: true },
    { id: 'c-regalos', nombre: 'Detalles y regalos', icono: 'regalo', color: '#15803D', margen: 45, activa: true },
    { id: 'c-pinateria', nombre: 'Piñatería y fiesta', icono: 'globo', color: '#C2410C', margen: 50, activa: true },
    { id: 'c-hogar', nombre: 'Hogar y decoración', icono: 'casa', color: '#7E22CE', margen: 45, activa: true },
    { id: 'c-tecnologia', nombre: 'Tecnología', icono: 'audifonos', color: '#374151', margen: 40, activa: true },
    { id: 'c-medias', nombre: 'Medias y ropa', icono: 'medias', color: '#B91C1C', margen: 50, activa: true },
    { id: 'c-cuidado', nombre: 'Cuidado personal', icono: 'tijeras', color: '#0CA678', margen: 50, activa: true },
    { id: 'c-religioso', nombre: 'Religioso y velas', icono: 'vela', color: '#57534E', margen: 45, activa: true }
  ];

  /* ---------------- biblioteca de productos (término → [Nombre, categoría]) ----------------
     Claves en minúscula, sin tildes y en singular. */

  var BIBLIOTECA = {
    /* bisutería */
    arete: ['Aretes', 'c-bisuteria'], candonga: ['Candongas', 'c-bisuteria'], topo: ['Topos', 'c-bisuteria'],
    cartela: ['Cartela de aretes', 'c-bisuteria'], collar: ['Collar', 'c-bisuteria'], cadena: ['Cadena', 'c-bisuteria'],
    gargantilla: ['Gargantilla', 'c-bisuteria'], pulsera: ['Pulsera', 'c-bisuteria'], manilla: ['Manilla', 'c-bisuteria'],
    anillo: ['Anillo', 'c-bisuteria'], tobillera: ['Tobillera', 'c-bisuteria'], dije: ['Dije', 'c-bisuteria'],
    piercing: ['Piercing', 'c-bisuteria'], mostacilla: ['Mostacillas', 'c-bisuteria'], perla: ['Perlas', 'c-bisuteria'],
    /* perfumería y cosméticos */
    perfume: ['Perfume', 'c-perfumeria'], locion: ['Loción', 'c-perfumeria'], splash: ['Splash', 'c-perfumeria'],
    esencia: ['Esencia', 'c-perfumeria'], colonia: ['Colonia', 'c-perfumeria'], crema: ['Crema', 'c-perfumeria'],
    labial: ['Labial', 'c-perfumeria'], pintalabio: ['Pintalabios', 'c-perfumeria'], gloss: ['Gloss', 'c-perfumeria'],
    brillo: ['Brillo labial', 'c-perfumeria'], rubor: ['Rubor', 'c-perfumeria'], sombra: ['Sombras', 'c-perfumeria'],
    base: ['Base', 'c-perfumeria'], polvo: ['Polvo', 'c-perfumeria'], pestanina: ['Pestañina', 'c-perfumeria'],
    rimel: ['Rímel', 'c-perfumeria'], delineador: ['Delineador', 'c-perfumeria'], esmalte: ['Esmalte', 'c-perfumeria'],
    removedor: ['Removedor', 'c-perfumeria'], brocha: ['Brocha', 'c-perfumeria'], esponja: ['Esponja', 'c-perfumeria'],
    pestana: ['Pestañas postizas', 'c-perfumeria'], maquillaje: ['Maquillaje', 'c-perfumeria'],
    jabon: ['Jabón', 'c-perfumeria'], shampoo: ['Shampoo', 'c-perfumeria'], champu: ['Shampoo', 'c-perfumeria'],
    acondicionador: ['Acondicionador', 'c-perfumeria'], tinte: ['Tinte', 'c-perfumeria'], desodorante: ['Desodorante', 'c-perfumeria'],
    /* peluches y juguetes */
    peluche: ['Peluche', 'c-peluches'], oso: ['Oso de peluche', 'c-peluches'], osito: ['Oso de peluche', 'c-peluches'],
    muneca: ['Muñeca', 'c-peluches'], muneco: ['Muñeco', 'c-peluches'], carro: ['Carro de juguete', 'c-peluches'],
    carrito: ['Carro de juguete', 'c-peluches'], pelota: ['Pelota', 'c-peluches'], balon: ['Balón', 'c-peluches'],
    rompecabeza: ['Rompecabezas', 'c-peluches'], alcancia: ['Alcancía', 'c-peluches'], trompo: ['Trompo', 'c-peluches'],
    yoyo: ['Yoyo', 'c-peluches'], burbuja: ['Burbujas', 'c-peluches'], dinosaurio: ['Dinosaurio', 'c-peluches'],
    juguete: ['Juguete', 'c-peluches'], slime: ['Slime', 'c-peluches'], plastilina: ['Plastilina', 'c-peluches'],
    bloque: ['Bloques armables', 'c-peluches'], pistola: ['Pistola de juguete', 'c-peluches'],
    cocinita: ['Cocinita', 'c-peluches'], dado: ['Dados', 'c-peluches'], carta: ['Cartas', 'c-peluches'],
    naipe: ['Naipes', 'c-peluches'], parques: ['Parqués', 'c-peluches'], domino: ['Dominó', 'c-peluches'],
    ajedrez: ['Ajedrez', 'c-peluches'], loteria: ['Lotería', 'c-peluches'],
    /* bolsos y billeteras */
    bolso: ['Bolso', 'c-bolsos'], cartera: ['Cartera', 'c-bolsos'], billetera: ['Billetera', 'c-bolsos'],
    monedero: ['Monedero', 'c-bolsos'], mochila: ['Mochila', 'c-bolsos'], morral: ['Morral', 'c-bolsos'],
    canguro: ['Canguro', 'c-bolsos'], maleta: ['Maleta', 'c-bolsos'], lonchera: ['Lonchera', 'c-bolsos'],
    cosmetiquera: ['Cosmetiquera', 'c-bolsos'], neceser: ['Neceser', 'c-bolsos'],
    /* accesorios */
    correa: ['Correa', 'c-accesorios'], cinturon: ['Cinturón', 'c-accesorios'], gorra: ['Gorra', 'c-accesorios'],
    sombrero: ['Sombrero', 'c-accesorios'], bufanda: ['Bufanda', 'c-accesorios'], guante: ['Guantes', 'c-accesorios'],
    sombrilla: ['Sombrilla', 'c-accesorios'], paragua: ['Paraguas', 'c-accesorios'], paraguas: ['Paraguas', 'c-accesorios'],
    gafa: ['Gafas', 'c-accesorios'], lente: ['Gafas', 'c-accesorios'], reloj: ['Reloj', 'c-accesorios'],
    llavero: ['Llavero', 'c-accesorios'], panoleta: ['Pañoleta', 'c-accesorios'], chal: ['Chal', 'c-accesorios'],
    /* cabello */
    mono: ['Moño', 'c-cabello'], caiman: ['Caimán', 'c-cabello'], balaca: ['Balaca', 'c-cabello'],
    vincha: ['Balaca', 'c-cabello'], diadema: ['Diadema', 'c-cabello'], hebilla: ['Hebilla', 'c-cabello'],
    gancho: ['Ganchos', 'c-cabello'], cola: ['Colas', 'c-cabello'], liga: ['Ligas', 'c-cabello'],
    peineta: ['Peineta', 'c-cabello'], tiara: ['Tiara', 'c-cabello'], corona: ['Corona', 'c-cabello'],
    turbante: ['Turbante', 'c-cabello'], lazo: ['Lazo', 'c-cabello'],
    /* papelería */
    cuaderno: ['Cuaderno', 'c-papeleria'], esfero: ['Esfero', 'c-papeleria'], lapicero: ['Lapicero', 'c-papeleria'],
    boligrafo: ['Bolígrafo', 'c-papeleria'], lapiz: ['Lápiz', 'c-papeleria'], portamina: ['Portaminas', 'c-papeleria'],
    mina: ['Minas', 'c-papeleria'], borrador: ['Borrador', 'c-papeleria'], tajalapiz: ['Tajalápiz', 'c-papeleria'],
    sacapunta: ['Sacapuntas', 'c-papeleria'], regla: ['Regla', 'c-papeleria'], color: ['Colores', 'c-papeleria'],
    marcador: ['Marcador', 'c-papeleria'], micropunta: ['Micropunta', 'c-papeleria'], resaltador: ['Resaltador', 'c-papeleria'],
    crayola: ['Crayolas', 'c-papeleria'], cartulina: ['Cartulina', 'c-papeleria'], papel: ['Papel', 'c-papeleria'],
    block: ['Block', 'c-papeleria'], bloc: ['Block', 'c-papeleria'], carpeta: ['Carpeta', 'c-papeleria'],
    sobre: ['Sobres', 'c-papeleria'], colbon: ['Colbón', 'c-papeleria'], pegante: ['Pegante', 'c-papeleria'],
    tijera: ['Tijeras', 'c-papeleria'], cinta: ['Cinta', 'c-papeleria'], foami: ['Foami', 'c-papeleria'],
    fomi: ['Foami', 'c-papeleria'], escarcha: ['Escarcha', 'c-papeleria'], silicona: ['Silicona', 'c-papeleria'],
    vinilo: ['Vinilo', 'c-papeleria'], tempera: ['Témperas', 'c-papeleria'], pincel: ['Pincel', 'c-papeleria'],
    calculadora: ['Calculadora', 'c-papeleria'], agenda: ['Agenda', 'c-papeleria'], grapadora: ['Cosedora', 'c-papeleria'],
    cosedora: ['Cosedora', 'c-papeleria'], clip: ['Clips', 'c-papeleria'], libreta: ['Libreta', 'c-papeleria'],
    /* detalles y regalos */
    mug: ['Mug', 'c-regalos'], pocillo: ['Pocillo', 'c-regalos'], taza: ['Taza', 'c-regalos'],
    vaso: ['Vaso', 'c-regalos'], termo: ['Termo', 'c-regalos'], portarretrato: ['Portarretrato', 'c-regalos'],
    'caja de regalo': ['Caja de regalo', 'c-regalos'], 'bolsa de regalo': ['Bolsa de regalo', 'c-regalos'],
    'papel regalo': ['Papel regalo', 'c-regalos'], 'papel de regalo': ['Papel regalo', 'c-regalos'],
    regalo: ['Regalo', 'c-regalos'], detalle: ['Detalle', 'c-regalos'], tarjeta: ['Tarjeta', 'c-regalos'],
    figura: ['Figura', 'c-regalos'], adorno: ['Adorno', 'c-regalos'], ancheta: ['Ancheta', 'c-regalos'],
    copa: ['Copa', 'c-regalos'], navideno: ['Adorno navideño', 'c-regalos'], guirnalda: ['Guirnalda', 'c-regalos'],
    luz: ['Luces', 'c-regalos'],
    /* piñatería y fiesta */
    pinata: ['Piñata', 'c-pinateria'], bomba: ['Bombas', 'c-pinateria'], globo: ['Globos', 'c-pinateria'],
    serpentina: ['Serpentina', 'c-pinateria'], confeti: ['Confeti', 'c-pinateria'], gorro: ['Gorros de fiesta', 'c-pinateria'],
    velita: ['Velitas de cumpleaños', 'c-pinateria'], letrero: ['Letrero', 'c-pinateria'],
    desechable: ['Desechables', 'c-pinateria'], plato: ['Platos desechables', 'c-pinateria'],
    sorpresa: ['Sorpresas', 'c-pinateria'], antifaz: ['Antifaz', 'c-pinateria'], mascara: ['Máscara', 'c-pinateria'],
    disfraz: ['Disfraz', 'c-pinateria'],
    /* hogar y decoración */
    florero: ['Florero', 'c-hogar'], flor: ['Flores', 'c-hogar'], espejo: ['Espejo', 'c-hogar'],
    'reloj de pared': ['Reloj de pared', 'c-hogar'], cuadro: ['Cuadro', 'c-hogar'], cojin: ['Cojín', 'c-hogar'],
    tapete: ['Tapete', 'c-hogar'], individual: ['Individuales', 'c-hogar'], mantel: ['Mantel', 'c-hogar'],
    organizador: ['Organizador', 'c-hogar'], canasta: ['Canasta', 'c-hogar'], cesta: ['Canasta', 'c-hogar'],
    lampara: ['Lámpara', 'c-hogar'], matera: ['Matera', 'c-hogar'], jarron: ['Jarrón', 'c-hogar'],
    cortina: ['Cortina', 'c-hogar'], toalla: ['Toalla', 'c-hogar'], cobija: ['Cobija', 'c-hogar'],
    sabana: ['Sábanas', 'c-hogar'], almohada: ['Almohada', 'c-hogar'],
    /* tecnología */
    audifono: ['Audífonos', 'c-tecnologia'], cargador: ['Cargador', 'c-tecnologia'], cable: ['Cable', 'c-tecnologia'],
    forro: ['Forro de celular', 'c-tecnologia'], estuche: ['Estuche', 'c-tecnologia'], vidrio: ['Vidrio templado', 'c-tecnologia'],
    templado: ['Vidrio templado', 'c-tecnologia'], memoria: ['Memoria USB', 'c-tecnologia'], usb: ['Memoria USB', 'c-tecnologia'],
    parlante: ['Parlante', 'c-tecnologia'], 'manos libres': ['Manos libres', 'c-tecnologia'],
    pila: ['Pilas', 'c-tecnologia'], bateria: ['Batería', 'c-tecnologia'], linterna: ['Linterna', 'c-tecnologia'],
    mouse: ['Mouse', 'c-tecnologia'], teclado: ['Teclado', 'c-tecnologia'],
    /* medias y ropa */
    media: ['Medias', 'c-medias'], calcetin: ['Calcetines', 'c-medias'], panty: ['Pantys', 'c-medias'],
    pantimedia: ['Pantimedias', 'c-medias'], boxer: ['Bóxer', 'c-medias'], camiseta: ['Camiseta', 'c-medias'],
    camisilla: ['Camisilla', 'c-medias'], pijama: ['Pijama', 'c-medias'], brasier: ['Brasier', 'c-medias'],
    tanga: ['Tanga', 'c-medias'],
    /* cuidado personal */
    cortauna: ['Cortaúñas', 'c-cuidado'], cortaunas: ['Cortaúñas', 'c-cuidado'], lima: ['Lima', 'c-cuidado'],
    pinza: ['Pinzas', 'c-cuidado'], peinilla: ['Peinilla', 'c-cuidado'], peine: ['Peine', 'c-cuidado'],
    cepillo: ['Cepillo', 'c-cuidado'], maquina: ['Máquina de afeitar', 'c-cuidado'], cuchilla: ['Cuchilla', 'c-cuidado'],
    copito: ['Copitos', 'c-cuidado'], algodon: ['Algodón', 'c-cuidado'], cura: ['Curas', 'c-cuidado'],
    panuelo: ['Pañuelos', 'c-cuidado'],
    /* religioso y velas */
    virgen: ['Virgen', 'c-religioso'], angel: ['Ángel', 'c-religioso'], veladora: ['Veladora', 'c-religioso'],
    estampa: ['Estampa', 'c-religioso'], sahumerio: ['Sahumerio', 'c-religioso'], incienso: ['Incienso', 'c-religioso'],
    velon: ['Velón', 'c-religioso'], vela: ['Vela', 'c-religioso'], denario: ['Denario', 'c-religioso'],
    biblia: ['Biblia', 'c-religioso'], santo: ['Santo', 'c-religioso'], cruz: ['Cruz', 'c-religioso'],
    rosario: ['Rosario', 'c-religioso'], camandula: ['Camándula', 'c-religioso']
  };

  /* ---------------- datos y migración ---------------- */

  function datosIniciales() {
    return {
      version: 2,
      config: { nombre: 'Variedades Naranjo', clave: '1234', ultimoRespaldo: null },
      categorias: JSON.parse(JSON.stringify(CATEGORIAS_BASE)),
      productos: [],  // { id, nombre, clave, categoriaId, margen|null, n }
      ventas: [],     // { id, productoId|null, producto|null, categoriaId, valor, fecha }
      gastos: [],     // { id, tipo, categoriaId|null, valor, fecha }
      caja: { bases: {}, cierres: [] }
    };
  }

  var TIPOS_GASTO = [
    { tipo: 'arriendo', nombre: 'Arriendo', icono: 'casa', color: '#3F6212' },
    { tipo: 'servicios', nombre: 'Servicios', icono: 'bombilla', color: '#9A3412' },
    { tipo: 'mercancia', nombre: 'Mercancía', icono: 'caja', color: '#1E40AF' },
    { tipo: 'otro', nombre: 'Otro gasto', icono: 'documento', color: '#6B21A8' }
  ];

  var COLORES = ['#9A3412', '#5B21B6', '#0F766E', '#9D174D', '#B45309', '#1D4ED8',
    '#15803D', '#7E22CE', '#0E7490', '#A21CAF', '#B91C1C', '#374151'];

  function normalizar(t) {
    return String(t).toLowerCase()
      .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
      .replace(/ü/g, 'u').replace(/ñ/g, 'n')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function migrar(d) {
    if (!d.config) d.config = { nombre: 'Variedades Naranjo', clave: '1234', ultimoRespaldo: null };
    if (d.familias && !d.categorias) { d.categorias = d.familias; delete d.familias; }
    d.categorias = d.categorias || [];
    d.categorias.forEach(function (c) {
      if (!ICONOS_SVG[c.icono]) c.icono = EMOJI_A_ICONO[c.icono] || 'etiqueta';
    });
    CATEGORIAS_BASE.forEach(function (cb) {
      var existe = d.categorias.some(function (c) {
        return c.id === cb.id || normalizar(c.nombre) === normalizar(cb.nombre);
      });
      if (!existe) d.categorias.push(JSON.parse(JSON.stringify(cb)));
    });
    d.ventas = d.ventas || [];
    d.gastos = d.gastos || [];
    d.ventas.forEach(function (v) {
      if (v.familiaId && !v.categoriaId) { v.categoriaId = v.familiaId; delete v.familiaId; }
    });
    d.gastos.forEach(function (g) {
      if (g.familiaId !== undefined && g.categoriaId === undefined) { g.categoriaId = g.familiaId; delete g.familiaId; }
    });
    d.productos = d.productos || [];
    d.caja = d.caja || { bases: {}, cierres: [] };
    d.caja.bases = d.caja.bases || {};
    d.caja.cierres = d.caja.cierres || [];
    d.version = 2;
    return d;
  }

  var datos = cargar();

  function cargar() {
    var d;
    try {
      var crudo = localStorage.getItem(CLAVE_DATOS);
      d = crudo ? JSON.parse(crudo) : null;
      if (!d || !d.ventas) d = datosIniciales();
    } catch (e) {
      d = datosIniciales();
    }
    return migrar(d);
  }

  function guardar() {
    localStorage.setItem(CLAVE_DATOS, JSON.stringify(datos));
  }

  function nuevoId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function categoriaPorId(id) {
    for (var i = 0; i < datos.categorias.length; i++) {
      if (datos.categorias[i].id === id) return datos.categorias[i];
    }
    return null;
  }

  function productoPorClave(clave) {
    for (var i = 0; i < datos.productos.length; i++) {
      if (datos.productos[i].clave === clave) return datos.productos[i];
    }
    return null;
  }

  function productoPorId(id) {
    for (var i = 0; i < datos.productos.length; i++) {
      if (datos.productos[i].id === id) return datos.productos[i];
    }
    return null;
  }

  function tipoGastoPorId(tipo) {
    for (var i = 0; i < TIPOS_GASTO.length; i++) {
      if (TIPOS_GASTO[i].tipo === tipo) return TIPOS_GASTO[i];
    }
    return TIPOS_GASTO[3];
  }

  function margenDeVenta(v) {
    if (v.productoId) {
      var p = productoPorId(v.productoId);
      if (p && p.margen !== null && p.margen !== undefined) return p.margen;
    }
    var c = categoriaPorId(v.categoriaId);
    return c ? c.margen : 0;
  }

  /* ---------------- utilidades ---------------- */

  var fmtCO = new Intl.NumberFormat('es-CO');

  function fmt(n) {
    return '$ ' + fmtCO.format(Math.round(n));
  }

  function mezclar(hex, hacia, factor) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    r = Math.round(r + (hacia - r) * factor);
    g = Math.round(g + (hacia - g) * factor);
    b = Math.round(b + (hacia - b) * factor);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function fondoElegante(color) {
    return 'linear-gradient(165deg, ' + mezclar(color, 255, 0.16) + ' 0%, ' + color + ' 55%, ' + mezclar(color, 0, 0.25) + ' 100%)';
  }

  function numeroALetras(n) {
    n = Math.round(n);
    if (n === 0) return 'cero pesos';
    var U = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
      'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'];
    var D = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    var C = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    function tres(x) {
      if (x === 0) return '';
      if (x === 100) return 'cien';
      var s = '';
      var cc = Math.floor(x / 100);
      var r = x % 100;
      if (cc) s += C[cc] + (r ? ' ' : '');
      if (r) {
        if (r <= 20) {
          s += U[r];
        } else {
          var dd = Math.floor(r / 10);
          var uu = r % 10;
          if (dd === 2) s += (uu === 1 ? 'veintiún' : 'veinti' + U[uu]);
          else s += D[dd] + (uu ? ' y ' + U[uu] : '');
        }
      }
      return s;
    }

    var partes = [];
    var millones = Math.floor(n / 1000000);
    var miles = Math.floor((n % 1000000) / 1000);
    var resto = n % 1000;
    if (millones) partes.push(millones === 1 ? 'un millón' : tres(millones) + ' millones');
    if (miles) partes.push(miles === 1 ? 'mil' : tres(miles) + ' mil');
    if (resto) partes.push(tres(resto));
    var sufijo = ' pesos';
    if (n === 1) sufijo = ' peso';
    else if (millones && !miles && !resto) sufijo = ' de pesos';
    return partes.join(' ') + sufijo;
  }

  /* números dichos en palabras → valor */
  var PALABRA_NUM = {
    cero: 0, un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7,
    ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15,
    dieciseis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19, veinte: 20,
    veintiun: 21, veintiuno: 21, veintidos: 22, veintitres: 23, veinticuatro: 24, veinticinco: 25,
    veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29,
    treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90,
    cien: 100, ciento: 100, doscientos: 200, trescientos: 300, cuatrocientos: 400, quinientos: 500,
    seiscientos: 600, setecientos: 700, ochocientos: 800, novecientos: 900
  };

  var PALABRAS_IGNORAR = { de: 1, por: 1, a: 1, en: 1, el: 1, la: 1, los: 1, las: 1, del: 1, al: 1,
    pesos: 1, peso: 1, vendi: 1, venta: 1, vendio: 1, y: 1, con: 1 };

  /* devuelve las posibles formas singulares de una palabra en plural;
     el español tiene varias reglas, así que probamos todas */
  function formasSingular(p) {
    var formas = [p];
    if (p.length > 4 && p.slice(-3) === 'ces') formas.push(p.slice(0, -3) + 'z'); // lapices→lapiz
    if (p.length > 3 && p.slice(-2) === 'es') formas.push(p.slice(0, -2));        // collares→collar
    if (p.length > 3 && p.slice(-1) === 's') formas.push(p.slice(0, -1));         // aretes→arete
    return formas;
  }

  /* la forma singular "principal" (para guardar la clave de un producto) */
  function singularizar(p) {
    var palabras = String(p).split(' ');
    var ult = palabras[palabras.length - 1];
    var formas = formasSingular(ult);
    palabras[palabras.length - 1] = formas[formas.length - 1];
    return palabras.join(' ');
  }

  function buscarTermino(palabras) {
    // intenta la frase completa, luego pares de palabras, luego palabra por palabra
    function busca(t) {
      var prod = productoPorClave(t);
      if (prod) return { producto: prod };
      if (BIBLIOTECA[t]) return { nombre: BIBLIOTECA[t][0], categoriaId: BIBLIOTECA[t][1], clave: t };
      return null;
    }
    function buscaConFormas(t) {
      var todas = formasSingular(t);
      todas.unshift(t);
      for (var k = 0; k < todas.length; k++) {
        var r = busca(todas[k]);
        if (r) return r;
      }
      return null;
    }
    var formas = [];
    if (palabras.length > 1) formas.push(palabras.join(' '));
    for (var i = 0; i + 1 < palabras.length; i++) formas.push(palabras[i] + ' ' + palabras[i + 1]);
    palabras.forEach(function (p) { formas.push(p); });
    for (var j = 0; j < formas.length; j++) {
      var encontrado = buscaConFormas(formas[j]);
      if (encontrado) return encontrado;
    }
    return null;
  }

  function analizarFrase(texto) {
    var limpio = normalizar(String(texto).replace(/\$/g, ' ').replace(/(\d)[\.,](?=\d{3}\b)/g, '$1'));
    if (!limpio) return null;
    var tokens = limpio.split(' ');
    var total = 0, actual = 0;
    var palabrasProducto = [];

    tokens.forEach(function (tok) {
      if (/^\d+$/.test(tok)) {
        actual += parseInt(tok, 10);
      } else if (tok === 'mil') {
        actual = (actual || 1) * 1000;
        total += actual; actual = 0;
      } else if (tok === 'millon' || tok === 'millones') {
        actual = (actual || 1) * 1000000;
        total += actual; actual = 0;
      } else if (PALABRA_NUM[tok] !== undefined) {
        actual += PALABRA_NUM[tok];
      } else if (PALABRAS_IGNORAR[tok]) {
        // se ignora
      } else {
        // palabra del producto: si había un numerito suelto (un, dos...) era cantidad, se descarta
        if (actual > 0 && actual < 100) actual = 0;
        palabrasProducto.push(tok);
      }
    });
    total += actual;

    if (total > 0 && total < 100) total *= 1000; // "aretes a catorce" = $14.000
    if (!palabrasProducto.length || total <= 0 || total > 999999999) return null;

    var encontrado = buscarTermino(palabrasProducto);
    var resultado = { valor: Math.round(total) };
    if (encontrado && encontrado.producto) {
      resultado.producto = encontrado.producto;
      resultado.nombre = encontrado.producto.nombre;
      resultado.clave = encontrado.producto.clave;
      resultado.categoriaId = encontrado.producto.categoriaId;
    } else if (encontrado) {
      resultado.nombre = encontrado.nombre;
      resultado.clave = encontrado.clave;
      resultado.categoriaId = encontrado.categoriaId;
    } else {
      var crudo = palabrasProducto.join(' ');
      resultado.nombre = crudo.charAt(0).toUpperCase() + crudo.slice(1);
      resultado.clave = singularizar(crudo);
      resultado.categoriaId = null;
    }
    return resultado;
  }

  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  function fechaLarga(d) {
    return DIAS[d.getDay()] + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()];
  }

  function fechaCorta(iso) {
    var d = new Date(iso);
    var hh = d.getHours();
    var mm = ('0' + d.getMinutes()).slice(-2);
    var ampm = hh >= 12 ? 'p.m.' : 'a.m.';
    var h12 = hh % 12; if (h12 === 0) h12 = 12;
    return d.getDate() + ' ' + MESES[d.getMonth()].slice(0, 3) + ' · ' + h12 + ':' + mm + ' ' + ampm;
  }

  function claveDia(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  function esMismoDia(iso, ref) {
    var d = new Date(iso);
    return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth() && d.getDate() === ref.getDate();
  }

  function escaparHtml(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------------- sonidos y vibración ---------------- */

  var audioCtx = null;

  function obtenerAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* sin audio */ }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      try { audioCtx.resume(); } catch (e) { /* nada */ }
    }
    return audioCtx;
  }

  function tono(freq, inicio, dur, vol, forma) {
    var ctx = obtenerAudio();
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = forma || 'sine';
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    var t = ctx.currentTime + inicio;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function sonido(cual) {
    try {
      if (cual === 'ok') {
        tono(660, 0, 0.18, 0.16);
        tono(880, 0.13, 0.3, 0.16);
      } else if (cual === 'error') {
        tono(220, 0, 0.22, 0.18, 'square');
        tono(160, 0.18, 0.28, 0.16, 'square');
      } else {
        tono(1150, 0, 0.04, 0.06);
      }
    } catch (e) { /* sin sonido, no pasa nada */ }
  }

  function vibrar(patron) {
    try { if (navigator.vibrate) navigator.vibrate(patron); } catch (e) { /* sin vibración */ }
  }

  function avisoError(mensaje) {
    sonido('error');
    vibrar([70, 50, 70]);
    alert(mensaje);
  }

  function pintarIconosEstaticos() {
    document.querySelectorAll('[data-svg]').forEach(function (el) {
      el.innerHTML = svgIcono(el.getAttribute('data-svg'));
    });
  }

  /* ---------------- navegación ---------------- */

  function irA(nombre) {
    var pantallas = document.querySelectorAll('.pantalla');
    for (var i = 0; i < pantallas.length; i++) pantallas[i].classList.remove('activa');
    document.getElementById('pantalla-' + nombre).classList.add('activa');
    if (nombre === 'ventas') pintarVentas();
    if (nombre === 'gastos') pintarGastos();
    if (nombre === 'caja') pintarCaja();
    if (nombre === 'midia') pintarMiDia();
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', function (ev) {
    if (ev.target.closest('button')) vibrar(15);
    var b = ev.target.closest('[data-ir]');
    if (b) irA(b.getAttribute('data-ir'));
  });

  /* ---------------- pantalla VENDER ---------------- */

  function pintarVentas() {
    document.getElementById('nombre-local').textContent = datos.config.nombre;
    document.getElementById('fecha-hoy').textContent = fechaLarga(new Date());
    pintarBannerUltima();
    pintarRapidos();
  }

  function pintarRapidos() {
    var top = datos.productos.slice()
      .filter(function (p) { return p.n > 0; })
      .sort(function (a, b) { return b.n - a.n; })
      .slice(0, 6);
    var titulo = document.getElementById('titulo-rapidos');
    var grid = document.getElementById('grid-rapidos');
    grid.innerHTML = '';
    if (!top.length) { titulo.classList.add('oculto'); return; }
    titulo.classList.remove('oculto');
    top.forEach(function (p) {
      var c = categoriaPorId(p.categoriaId);
      var btn = document.createElement('button');
      btn.className = 'btn-familia';
      btn.style.background = fondoElegante(c ? c.color : '#57534E');
      btn.innerHTML = '<span class="icono">' + svgIcono(c ? c.icono : 'etiqueta') + '</span>' + escaparHtml(p.nombre);
      btn.onclick = function () {
        ventaPendiente = { nombre: p.nombre, clave: p.clave, categoriaId: p.categoriaId, valor: 0 };
        abrirTeclado({
          contexto: '<span class="icono" style="background:' + (c ? c.color : '#57534E') + '">' + svgIcono(c ? c.icono : 'etiqueta') + '</span> Venta de ' + escaparHtml(p.nombre),
          alGuardar: function (valor) {
            ventaPendiente.valor = valor;
            pintarConfirmar();
            irA('confirmar');
          },
          alCancelar: function () { irA('ventas'); }
        });
      };
      grid.appendChild(btn);
    });
  }

  function ultimaVentaDeHoy() {
    var hoy = new Date();
    for (var i = datos.ventas.length - 1; i >= 0; i--) {
      if (esMismoDia(datos.ventas[i].fecha, hoy)) return datos.ventas[i];
    }
    return null;
  }

  function descripcionVenta(v) {
    if (v.producto) return v.producto;
    var c = categoriaPorId(v.categoriaId);
    return c ? c.nombre : 'Venta';
  }

  function pintarBannerUltima() {
    var banner = document.getElementById('banner-ultima');
    var v = ultimaVentaDeHoy();
    if (!v) { banner.classList.add('oculto'); return; }
    var c = categoriaPorId(v.categoriaId);
    document.getElementById('banner-detalle').innerHTML =
      svgIcono(c ? c.icono : 'etiqueta') + ' ' + escaparHtml(descripcionVenta(v)) + ' — ' + fmt(v.valor);
    banner.classList.remove('oculto');
  }

  document.getElementById('btn-deshacer').onclick = function () {
    var v = ultimaVentaDeHoy();
    if (!v) return;
    abrirModal(
      '<h2>¿Borrar esta venta?</h2>' +
      '<p style="font-size:1.3rem;font-weight:800;text-align:center;">' +
      escaparHtml(descripcionVenta(v)) + '<br>' + fmt(v.valor) + '</p>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">No, dejarla</button>' +
      '<button class="btn-grande btn-rojo" data-accion="borrar-ultima">Sí, borrarla</button>' +
      '</div>',
      function (accion) {
        if (accion === 'borrar-ultima') {
          if (v.productoId) {
            var p = productoPorId(v.productoId);
            if (p && p.n > 0) p.n--;
          }
          datos.ventas = datos.ventas.filter(function (x) { return x.id !== v.id; });
          guardar();
          pintarVentas();
        }
      }
    );
  };

  /* ---------------- venta por voz / escrita ---------------- */

  var ventaPendiente = null;
  var Reconocedor = window.SpeechRecognition || window.webkitSpeechRecognition;
  var reconocimiento = null;
  var escuchando = false;

  document.getElementById('btn-voz').onclick = function () { abrirVoz(true); };
  document.getElementById('btn-escribir').onclick = function () { abrirVoz(false); };

  function abrirVoz(conMicrofono) {
    document.getElementById('voz-texto').value = '';
    document.getElementById('voz-error').textContent = ' ';
    document.getElementById('voz-escucha').classList.add('oculto');
    document.getElementById('voz-estado').textContent = 'Diga el producto y el valor';
    irA('voz');
    if (conMicrofono && Reconocedor && navigator.onLine) {
      iniciarEscucha();
    } else {
      setTimeout(function () { document.getElementById('voz-texto').focus(); }, 150);
    }
  }

  function iniciarEscucha() {
    try {
      reconocimiento = new Reconocedor();
      reconocimiento.lang = 'es-CO';
      reconocimiento.interimResults = false;
      reconocimiento.maxAlternatives = 1;
      reconocimiento.onresult = function (e) {
        escuchando = false;
        document.getElementById('voz-escucha').classList.add('oculto');
        var texto = e.results[0][0].transcript;
        document.getElementById('voz-texto').value = texto;
        procesarFrase(texto);
      };
      reconocimiento.onerror = function () {
        escuchando = false;
        document.getElementById('voz-escucha').classList.add('oculto');
        document.getElementById('voz-estado').textContent = 'No la escuché. Escriba o use el micrófono 🎙 del teclado';
        document.getElementById('voz-texto').focus();
      };
      reconocimiento.onend = function () {
        escuchando = false;
        document.getElementById('voz-escucha').classList.add('oculto');
      };
      escuchando = true;
      document.getElementById('voz-escucha').classList.remove('oculto');
      reconocimiento.start();
    } catch (e) {
      document.getElementById('voz-escucha').classList.add('oculto');
      document.getElementById('voz-texto').focus();
    }
  }

  document.getElementById('btn-voz-ok').onclick = function () {
    procesarFrase(document.getElementById('voz-texto').value);
  };
  document.getElementById('voz-texto').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') procesarFrase(this.value);
  });

  function procesarFrase(texto) {
    var r = analizarFrase(texto);
    if (!r) {
      sonido('error');
      vibrar([70, 50, 70]);
      document.getElementById('voz-error').textContent = 'No entendí. Ejemplo: "aretes catorce mil"';
      return;
    }
    ventaPendiente = r;
    pintarConfirmar();
    irA('confirmar');
  }

  /* ---------------- confirmar venta ---------------- */

  function pintarConfirmar() {
    var c = ventaPendiente.categoriaId ? categoriaPorId(ventaPendiente.categoriaId) : null;
    var insignia = document.getElementById('confirmar-insignia');
    insignia.style.background = c ? c.color : '#57534E';
    insignia.innerHTML = svgIcono(c ? c.icono : 'ayuda');
    document.getElementById('confirmar-producto').textContent = ventaPendiente.nombre;
    document.getElementById('confirmar-categoria').textContent = c ? c.nombre : 'Producto nuevo';
    document.getElementById('confirmar-monto').textContent = fmt(ventaPendiente.valor);
    document.getElementById('confirmar-letras').textContent = numeroALetras(ventaPendiente.valor);
  }

  document.getElementById('btn-confirmar-repetir').onclick = function () { abrirVoz(true); };

  document.getElementById('btn-confirmar-corregir').onclick = function () {
    var c = ventaPendiente.categoriaId ? categoriaPorId(ventaPendiente.categoriaId) : null;
    abrirTeclado({
      contexto: '<span class="icono" style="background:' + (c ? c.color : '#57534E') + '">' + svgIcono(c ? c.icono : 'ayuda') + '</span> ' + escaparHtml(ventaPendiente.nombre),
      valorInicial: ventaPendiente.valor,
      alGuardar: function (valor) {
        ventaPendiente.valor = valor;
        pintarConfirmar();
        irA('confirmar');
      },
      alCancelar: function () { irA('confirmar'); }
    });
  };

  document.getElementById('btn-confirmar-si').onclick = function () {
    if (!ventaPendiente) return;
    if (!ventaPendiente.categoriaId) {
      modalElegirCategoria(function (catId) {
        ventaPendiente.categoriaId = catId;
        pintarConfirmar();
        continuarGuardadoVenta();
      });
      return;
    }
    continuarGuardadoVenta();
  };

  function continuarGuardadoVenta() {
    var prod = ventaPendiente.producto || productoPorClave(ventaPendiente.clave);
    if (prod && prod.margen !== null && prod.margen !== undefined) {
      guardarVentaPendiente(prod, null);
      return;
    }
    var cat = categoriaPorId(ventaPendiente.categoriaId);
    modalMargen(ventaPendiente.nombre, cat ? cat.margen : 40, function (margen) {
      guardarVentaPendiente(prod, margen);
    });
  }

  function guardarVentaPendiente(prodExistente, margenNuevo) {
    var prod = prodExistente;
    if (!prod) {
      prod = { id: nuevoId(), nombre: ventaPendiente.nombre, clave: ventaPendiente.clave,
        categoriaId: ventaPendiente.categoriaId, margen: null, n: 0 };
      datos.productos.push(prod);
    }
    if (margenNuevo !== null && margenNuevo !== undefined) prod.margen = margenNuevo;
    if (!prod.categoriaId) prod.categoriaId = ventaPendiente.categoriaId;
    prod.n++;
    datos.ventas.push({
      id: nuevoId(), productoId: prod.id, producto: prod.nombre,
      categoriaId: ventaPendiente.categoriaId, valor: ventaPendiente.valor, fecha: new Date().toISOString()
    });
    guardar();
    mostrarConfirmacion('¡Venta guardada!', escaparHtml(prod.nombre), ventaPendiente.valor, false);
    ventaPendiente = null;
  }

  /* modal: elegir categoría */
  function modalElegirCategoria(alElegir) {
    var html = '<h2>¿De qué categoría es "' + escaparHtml(ventaPendiente.nombre) + '"?</h2>' +
      '<p>Solo se pregunta esta primera vez.</p><div class="grid-modal-categorias">';
    datos.categorias.forEach(function (c) {
      if (!c.activa) return;
      html += '<button class="btn-familia" data-cat="' + c.id + '" style="background:' + fondoElegante(c.color) + '">' +
        '<span class="icono">' + svgIcono(c.icono) + '</span>' + escaparHtml(c.nombre) + '</button>';
    });
    html += '</div><div class="modal-acciones"><button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button></div>';
    abrirModal(html, function () {});
    document.querySelectorAll('#modal-caja [data-cat]').forEach(function (b) {
      b.addEventListener('click', function () {
        cerrarModal();
        alElegir(b.getAttribute('data-cat'));
      });
    });
  }

  /* modal: margen de ganancia del producto (una sola vez) */
  function modalMargen(nombreProducto, sugerido, alElegir) {
    var elegido = { margen: sugerido };
    var opciones = [20, 30, 40, 50, 60, 70];
    var html = '<h2>¿Qué % de ganancia deja "' + escaparHtml(nombreProducto) + '"?</h2>' +
      '<p>Se guarda una sola vez; no se vuelve a preguntar.</p>' +
      '<div class="chips-margen">' +
      opciones.map(function (m) {
        return '<button class="chip-margen' + (m === sugerido ? ' elegido' : '') + '" data-margen="' + m + '">' + m + '%</button>';
      }).join('') + '</div>' +
      '<div class="campo"><label>U otro número (%)</label>' +
      '<input id="campo-margen-otro" type="number" inputmode="numeric" min="0" max="95" value="' + sugerido + '"></div>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
      '<button class="btn-grande btn-guardar" data-accion="guardar-margen">' + svgIcono('check') + ' Guardar</button></div>';

    abrirModal(html, function (accion) {
      if (accion !== 'guardar-margen') return;
      var m = parseInt(document.getElementById('campo-margen-otro').value, 10);
      if (isNaN(m) || m < 0 || m > 95) { avisoError('El porcentaje debe estar entre 0 y 95.'); return 'mantener'; }
      alElegir(m);
    });
    document.querySelectorAll('#modal-caja .chip-margen').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('#modal-caja .chip-margen').forEach(function (x) { x.classList.remove('elegido'); });
        b.classList.add('elegido');
        document.getElementById('campo-margen-otro').value = b.getAttribute('data-margen');
      });
    });
  }

  /* ---------------- pantalla GASTOS ---------------- */

  function pintarGastos() {
    var grid = document.getElementById('grid-gastos');
    grid.innerHTML = '';
    TIPOS_GASTO.forEach(function (t) {
      var btn = document.createElement('button');
      btn.className = 'btn-familia';
      btn.style.background = fondoElegante(t.color);
      btn.innerHTML = '<span class="icono">' + svgIcono(t.icono) + '</span>' + t.nombre;
      btn.onclick = function () {
        if (t.tipo === 'mercancia') {
          pintarCategoriaGasto();
          irA('familia-gasto');
        } else {
          tecladoGasto(t, null);
        }
      };
      grid.appendChild(btn);
    });
  }

  function pintarCategoriaGasto() {
    var grid = document.getElementById('grid-familia-gasto');
    grid.innerHTML = '';
    datos.categorias.forEach(function (c) {
      if (!c.activa) return;
      var btn = document.createElement('button');
      btn.className = 'btn-familia';
      btn.style.background = fondoElegante(c.color);
      btn.innerHTML = '<span class="icono">' + svgIcono(c.icono) + '</span>' + escaparHtml(c.nombre);
      btn.onclick = function () { tecladoGasto(tipoGastoPorId('mercancia'), c.id); };
      grid.appendChild(btn);
    });
    var btn = document.createElement('button');
    btn.className = 'btn-familia';
    btn.style.background = fondoElegante('#57534E');
    btn.innerHTML = '<span class="icono">' + svgIcono('ayuda') + '</span>No sé / Varias';
    btn.onclick = function () { tecladoGasto(tipoGastoPorId('mercancia'), null); };
    grid.appendChild(btn);
  }

  function tecladoGasto(t, categoriaId) {
    var extra = '';
    if (categoriaId) {
      var c = categoriaPorId(categoriaId);
      if (c) extra = ' (' + escaparHtml(c.nombre) + ')';
    }
    abrirTeclado({
      contexto: '<span class="icono" style="background:' + t.color + '">' + svgIcono(t.icono) + '</span> Gasto: ' + t.nombre + extra,
      alGuardar: function (valor) {
        datos.gastos.push({ id: nuevoId(), tipo: t.tipo, categoriaId: categoriaId, valor: valor, fecha: new Date().toISOString() });
        guardar();
        mostrarConfirmacion('Gasto guardado', svgIcono(t.icono) + ' ' + t.nombre + extra, valor, true);
      },
      alCancelar: function () { irA('gastos'); }
    });
  }

  /* ---------------- teclado genérico ---------------- */

  var teclado = { digitos: '', alGuardar: null, alCancelar: null, permitirCero: false };

  function abrirTeclado(opciones) {
    teclado.digitos = opciones.valorInicial ? String(opciones.valorInicial) : '';
    teclado.alGuardar = opciones.alGuardar;
    teclado.alCancelar = opciones.alCancelar || function () { irA('ventas'); };
    teclado.permitirCero = !!opciones.permitirCero;
    document.getElementById('teclado-contexto').innerHTML = opciones.contexto || '';
    pintarMonto();
    irA('teclado');
  }

  function pintarMonto() {
    var valor = parseInt(teclado.digitos || '0', 10);
    document.getElementById('teclado-monto').textContent = fmt(valor);
    document.getElementById('teclado-letras').textContent = valor > 0 ? numeroALetras(valor) : ' ';
    document.getElementById('btn-teclado-guardar').disabled = teclado.permitirCero ? false : valor <= 0;
  }

  document.querySelectorAll('#pantalla-teclado .tecla').forEach(function (tecla) {
    tecla.addEventListener('click', function () {
      sonido('tecla');
      var t = tecla.getAttribute('data-tecla');
      if (t === 'borrar') {
        teclado.digitos = teclado.digitos.slice(0, -1);
      } else if (t === '000') {
        if (teclado.digitos && teclado.digitos.length <= 6) teclado.digitos += '000';
      } else {
        if (teclado.digitos.length < 9) teclado.digitos += t;
        if (teclado.digitos === '0') teclado.digitos = '';
      }
      pintarMonto();
    });
  });

  document.getElementById('btn-teclado-cancelar').onclick = function () {
    if (teclado.alCancelar) teclado.alCancelar();
  };

  document.getElementById('btn-teclado-guardar').onclick = function () {
    var valor = parseInt(teclado.digitos || '0', 10);
    if (valor <= 0 && !teclado.permitirCero) return;
    if (teclado.alGuardar) teclado.alGuardar(valor);
  };

  /* ---------------- confirmación (pantalla verde/azul) ---------------- */

  var confirmacionTimer = null;

  function mostrarConfirmacion(titulo, detalleHtml, valor, esGasto) {
    var overlay = document.getElementById('overlay-confirmacion');
    overlay.classList.toggle('gasto', !!esGasto);
    document.getElementById('confirmacion-titulo').textContent = titulo;
    document.getElementById('confirmacion-detalle').innerHTML = detalleHtml;
    document.getElementById('confirmacion-monto').textContent = fmt(valor);
    document.getElementById('confirmacion-letras').textContent = numeroALetras(valor);
    overlay.classList.remove('oculto');
    sonido('ok');
    vibrar([40, 60, 40]);
    clearTimeout(confirmacionTimer);
    confirmacionTimer = setTimeout(cerrarConfirmacion, 2800);
  }

  function cerrarConfirmacion() {
    clearTimeout(confirmacionTimer);
    document.getElementById('overlay-confirmacion').classList.add('oculto');
    irA('ventas');
  }

  document.getElementById('overlay-confirmacion').onclick = cerrarConfirmacion;

  /* ---------------- CAJA ---------------- */

  function ventasDelDia(ref) {
    return datos.ventas.filter(function (v) { return esMismoDia(v.fecha, ref); });
  }
  function gastosDelDia(ref) {
    return datos.gastos.filter(function (g) { return esMismoDia(g.fecha, ref); });
  }

  function calcularBolsillos() {
    var mapa = {};
    datos.ventas.forEach(function (v) {
      var m = margenDeVenta(v);
      mapa[v.categoriaId] = (mapa[v.categoriaId] || 0) + v.valor * (1 - m / 100);
    });
    datos.gastos.forEach(function (g) {
      if (g.tipo === 'mercancia' && g.categoriaId) {
        mapa[g.categoriaId] = (mapa[g.categoriaId] || 0) - g.valor;
      }
    });
    return mapa;
  }

  function pintarCaja() {
    document.getElementById('caja-fecha').textContent = fechaLarga(new Date());
    var hoy = new Date();
    var clave = claveDia(hoy);
    var base = datos.caja.bases[clave];
    var cierreHoy = null;
    datos.caja.cierres.forEach(function (c) { if (c.fecha === clave) cierreHoy = c; });

    var ventasHoy = ventasDelDia(hoy).reduce(function (s, v) { return s + v.valor; }, 0);
    var gastosHoy = gastosDelDia(hoy).reduce(function (s, g) { return s + g.valor; }, 0);
    var esperado = (base || 0) + ventasHoy - gastosHoy;

    var html = '';

    if (base === undefined) {
      html += '<div class="tarjeta tarjeta-grande">' +
        '<p class="tarjeta-titulo">Para empezar el día</p>' +
        '<p style="font-size:1.25rem;font-weight:700;margin:0.5rem 0 0.9rem">¿Con cuánta plata abre la caja hoy?</p>' +
        '<button id="btn-abrir-caja" class="btn-grande btn-abrir-caja">' + svgIcono('cofre') + ' ABRIR LA CAJA</button>' +
        '<button id="btn-abrir-sin-base" class="btn-grande btn-cancelar" style="width:100%;margin-top:0.6rem;min-height:3.4rem;font-size:1rem">Abrir sin base ($ 0)</button>' +
        '</div>';
    } else {
      html += '<div class="tarjeta caja-resumen">' +
        '<div class="caja-fila"><span class="concepto">' + svgIcono('cofre') + ' Abrió con (base)</span><span class="cifra-caja">' + fmt(base) + '</span></div>' +
        '<div class="caja-fila"><span class="concepto">' + svgIcono('etiqueta') + ' + Ventas de hoy</span><span class="cifra-caja" style="color:var(--verde-oscuro)">' + fmt(ventasHoy) + '</span></div>' +
        '<div class="caja-fila"><span class="concepto">' + svgIcono('billetera') + ' − Gastos de hoy</span><span class="cifra-caja" style="color:var(--rojo)">' + fmt(gastosHoy) + '</span></div>' +
        '<div class="caja-fila caja-total"><span class="concepto">En caja debe haber</span><span class="cifra-caja">' + fmt(esperado) + '</span></div>' +
        '</div>';

      if (cierreHoy) {
        var dif = cierreHoy.diferencia;
        html += '<div class="tarjeta cierre-resultado">' +
          '<p class="resultado-grande ' + (dif === 0 ? 'cuadro' : 'descuadre') + '">' +
          (dif === 0 ? '✔ La caja CUADRÓ' : (dif > 0 ? 'Sobraron ' + fmt(dif) : 'Faltaron ' + fmt(-dif))) + '</p>' +
          '<p style="color:var(--tinta-suave)">Contado: ' + fmt(cierreHoy.contado) + ' · Esperado: ' + fmt(cierreHoy.esperado) + '</p>' +
          '<button id="btn-reabrir" class="btn-mini" style="margin-top:0.6rem">Corregir cierre</button>' +
          '</div>';
      } else {
        html += '<button id="btn-cerrar-caja" class="btn-grande btn-cerrar-caja">' + svgIcono('candado') + ' CERRAR LA CAJA</button>';
      }
      html += '<button id="btn-corregir-base" class="btn-mini" style="align-self:center">Corregir la base del día</button>';
    }

    // bolsillos por categoría
    var bolsillos = calcularBolsillos();
    var lista = datos.categorias.filter(function (c) { return c.activa && bolsillos[c.id]; })
      .sort(function (a, b) { return (bolsillos[b.id] || 0) - (bolsillos[a.id] || 0); });
    html += '<p class="titulo-seccion">Bolsillos para comprar mercancía</p>';
    if (lista.length) {
      html += '<div class="tarjeta">';
      lista.forEach(function (c) {
        var valor = bolsillos[c.id];
        html += '<div class="fila-familia"><span class="nombre">' + svgIcono(c.icono) + ' ' + escaparHtml(c.nombre) + '</span>' +
          '<span class="valor" style="color:' + (valor >= 0 ? 'var(--verde-oscuro)' : 'var(--rojo)') + '">' + fmt(valor) + '</span></div>';
      });
      html += '</div>' +
        '<div class="aviso">De cada venta, la parte del <b>costo</b> entra al bolsillo de su categoría para reponer mercancía; la ganancia queda para los gastos y la utilidad. Cuando compra mercancía, sale del bolsillo.</div>';
    } else {
      html += '<div class="tarjeta" style="text-align:center;color:var(--tinta-suave)">Cuando registre ventas, aquí verá cuánto tiene cada categoría para volver a surtir.</div>';
    }

    document.getElementById('caja-contenido').innerHTML = html;

    var btnAbrir = document.getElementById('btn-abrir-caja');
    if (btnAbrir) btnAbrir.onclick = function () { tecladoBase(clave); };
    var btnSinBase = document.getElementById('btn-abrir-sin-base');
    if (btnSinBase) btnSinBase.onclick = function () {
      datos.caja.bases[clave] = 0;
      guardar();
      pintarCaja();
    };
    var btnCerrar = document.getElementById('btn-cerrar-caja');
    if (btnCerrar) btnCerrar.onclick = function () { tecladoCierre(clave, esperado, base, ventasHoy, gastosHoy); };
    var btnCorregirBase = document.getElementById('btn-corregir-base');
    if (btnCorregirBase) btnCorregirBase.onclick = function () { tecladoBase(clave); };
    var btnReabrir = document.getElementById('btn-reabrir');
    if (btnReabrir) btnReabrir.onclick = function () {
      datos.caja.cierres = datos.caja.cierres.filter(function (c) { return c.fecha !== clave; });
      guardar();
      pintarCaja();
    };
  }

  function tecladoBase(clave) {
    abrirTeclado({
      contexto: '<span class="icono" style="background:var(--verde)">' + svgIcono('cofre') + '</span> ¿Con cuánto abre la caja?',
      valorInicial: datos.caja.bases[clave] || '',
      permitirCero: true,
      alGuardar: function (valor) {
        datos.caja.bases[clave] = valor;
        guardar();
        irA('caja');
      },
      alCancelar: function () { irA('caja'); }
    });
  }

  function tecladoCierre(clave, esperado, base, ventasHoy, gastosHoy) {
    abrirTeclado({
      contexto: '<span class="icono" style="background:var(--tinta)">' + svgIcono('candado') + '</span> Cuente la plata: ¿cuánto hay?',
      permitirCero: true,
      alGuardar: function (contado) {
        var dif = contado - esperado;
        datos.caja.cierres.push({
          fecha: clave, hora: new Date().toISOString(),
          base: base || 0, ventas: ventasHoy, gastos: gastosHoy,
          esperado: esperado, contado: contado, diferencia: dif
        });
        guardar();
        if (dif === 0) { sonido('ok'); vibrar([40, 60, 40]); } else { sonido('error'); vibrar([70, 50, 70]); }
        abrirModal(
          '<h2 style="text-align:center">' + (dif === 0 ? '✔ ¡La caja cuadró!' : (dif > 0 ? 'Sobraron ' + fmt(dif) : 'Faltaron ' + fmt(-dif))) + '</h2>' +
          '<p style="text-align:center;font-size:1.15rem">Esperado: <b>' + fmt(esperado) + '</b><br>Contado: <b>' + fmt(contado) + '</b></p>' +
          '<div class="modal-acciones"><button class="btn-grande btn-guardar" data-accion="cerrar">Entendido</button></div>',
          function () {}
        );
        irA('caja');
      },
      alCancelar: function () { irA('caja'); }
    });
  }

  /* ---------------- MI DÍA ---------------- */

  function pintarMiDia() {
    document.getElementById('midia-fecha').textContent = fechaLarga(new Date());
    var hoy = new Date();

    var ventasHoy = ventasDelDia(hoy);
    var gastosHoy = gastosDelDia(hoy);

    var totalVentas = ventasHoy.reduce(function (s, v) { return s + v.valor; }, 0);
    var totalGastos = gastosHoy.reduce(function (s, g) { return s + g.valor; }, 0);

    var html = '';
    html += '<div class="tarjeta tarjeta-grande">' +
      '<p class="tarjeta-titulo">Hoy ha vendido</p>' +
      '<p class="tarjeta-valor">' + fmt(totalVentas) + '</p>' +
      '<p class="tarjeta-sub">' + ventasHoy.length + (ventasHoy.length === 1 ? ' venta' : ' ventas') + '</p>' +
      '</div>';

    if (ventasHoy.length) {
      var porCategoria = {};
      ventasHoy.forEach(function (v) {
        if (!porCategoria[v.categoriaId]) porCategoria[v.categoriaId] = { total: 0, n: 0 };
        porCategoria[v.categoriaId].total += v.valor;
        porCategoria[v.categoriaId].n++;
      });
      html += '<div class="tarjeta">';
      datos.categorias.forEach(function (c) {
        var p = porCategoria[c.id];
        if (!p) return;
        html += '<div class="fila-familia">' +
          '<span class="nombre">' + svgIcono(c.icono) + ' ' + escaparHtml(c.nombre) +
          '<span class="cuantas">(' + p.n + ')</span></span>' +
          '<span class="valor">' + fmt(p.total) + '</span></div>';
      });
      html += '</div>';
    }

    if (gastosHoy.length) {
      html += '<div class="tarjeta"><div class="fila-familia">' +
        '<span class="nombre">' + svgIcono('billetera') + ' Gastos de hoy</span>' +
        '<span class="valor" style="color:var(--rojo)">' + fmt(totalGastos) + '</span></div></div>';
    }

    if (!ventasHoy.length && !gastosHoy.length) {
      html += '<div class="tarjeta" style="text-align:center;font-size:1.15rem;color:var(--tinta-suave)">Todavía no hay ventas hoy.<br>¡Ánimo!</div>';
    }

    document.getElementById('midia-contenido').innerHTML = html;
  }

  /* ---------------- clave de administración ---------------- */

  var claveEscrita = '';

  document.getElementById('btn-admin').onclick = function () {
    claveEscrita = '';
    pintarPuntos();
    document.getElementById('clave-error').textContent = ' ';
    irA('clave');
  };

  function pintarPuntos() {
    var puntos = document.querySelectorAll('#clave-puntos .punto');
    for (var i = 0; i < puntos.length; i++) {
      puntos[i].classList.toggle('lleno', i < claveEscrita.length);
    }
  }

  document.querySelectorAll('#pantalla-clave .tecla').forEach(function (tecla) {
    tecla.addEventListener('click', function () {
      sonido('tecla');
      var t = tecla.getAttribute('data-clave');
      if (t === 'cancelar') { irA('ventas'); return; }
      if (t === 'borrar') {
        claveEscrita = claveEscrita.slice(0, -1);
        pintarPuntos();
        return;
      }
      if (claveEscrita.length >= 4) return;
      claveEscrita += t;
      pintarPuntos();
      if (claveEscrita.length === 4) {
        setTimeout(function () {
          if (claveEscrita === datos.config.clave) {
            irA('admin');
            pintarTabAdmin('reportes');
          } else {
            sonido('error');
            vibrar([70, 50, 70]);
            document.getElementById('clave-error').textContent = 'Clave incorrecta';
            claveEscrita = '';
            pintarPuntos();
          }
        }, 150);
      }
    });
  });

  document.getElementById('btn-admin-salir').onclick = function () { irA('ventas'); };

  /* ---------------- administración: pestañas ---------------- */

  document.querySelectorAll('.admin-tabs .tab').forEach(function (tab) {
    tab.addEventListener('click', function () { pintarTabAdmin(tab.getAttribute('data-tab')); });
  });

  function pintarTabAdmin(nombre) {
    document.querySelectorAll('.admin-tabs .tab').forEach(function (t) {
      t.classList.toggle('tab-activo', t.getAttribute('data-tab') === nombre);
    });
    if (nombre === 'reportes') pintarReportes();
    if (nombre === 'productos') pintarProductosAdmin();
    if (nombre === 'familias') pintarCategoriasAdmin();
    if (nombre === 'cierres') pintarCierresAdmin();
    if (nombre === 'movimientos') pintarMovimientos();
    if (nombre === 'respaldo') pintarRespaldo();
    if (nombre === 'ajustes') pintarAjustes();
  }

  /* ---------------- reportes ---------------- */

  var periodoActual = 'mes';

  var PERIODOS = [
    { id: 'hoy', nombre: 'Hoy' },
    { id: '7dias', nombre: 'Últimos 7 días' },
    { id: 'mes', nombre: 'Este mes' },
    { id: 'mesAnterior', nombre: 'Mes anterior' },
    { id: 'ano', nombre: 'Este año' },
    { id: 'todo', nombre: 'Todo' }
  ];

  function rangoPeriodo(id) {
    var ahora = new Date();
    var desde, hasta;
    if (id === 'hoy') {
      desde = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
      hasta = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1);
    } else if (id === '7dias') {
      desde = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - 6);
      hasta = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1);
    } else if (id === 'mes') {
      desde = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
      hasta = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1);
    } else if (id === 'mesAnterior') {
      desde = new Date(ahora.getFullYear(), ahora.getMonth() - 1, 1);
      hasta = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    } else if (id === 'ano') {
      desde = new Date(ahora.getFullYear(), 0, 1);
      hasta = new Date(ahora.getFullYear() + 1, 0, 1);
    } else {
      desde = new Date(2000, 0, 1);
      hasta = new Date(ahora.getFullYear() + 10, 0, 1);
    }
    return { desde: desde, hasta: hasta };
  }

  function enRango(iso, rango) {
    var d = new Date(iso);
    return d >= rango.desde && d < rango.hasta;
  }

  function pintarReportes() {
    var rango = rangoPeriodo(periodoActual);
    var ventas = datos.ventas.filter(function (v) { return enRango(v.fecha, rango); });
    var gastos = datos.gastos.filter(function (g) { return enRango(g.fecha, rango); });

    var totalVentas = ventas.reduce(function (s, v) { return s + v.valor; }, 0);

    var utilidadBruta = 0;
    var porCategoria = {};
    var porProducto = {};
    ventas.forEach(function (v) {
      var margen = margenDeVenta(v);
      utilidadBruta += v.valor * margen / 100;
      if (!porCategoria[v.categoriaId]) porCategoria[v.categoriaId] = { total: 0, n: 0 };
      porCategoria[v.categoriaId].total += v.valor;
      porCategoria[v.categoriaId].n++;
      var nombreP = v.producto || '(sin producto)';
      if (!porProducto[nombreP]) porProducto[nombreP] = { total: 0, n: 0, categoriaId: v.categoriaId };
      porProducto[nombreP].total += v.valor;
      porProducto[nombreP].n++;
    });

    var gastosOperativos = 0, gastoMercancia = 0;
    var porTipoGasto = {};
    gastos.forEach(function (g) {
      if (g.tipo === 'mercancia') gastoMercancia += g.valor;
      else gastosOperativos += g.valor;
      porTipoGasto[g.tipo] = (porTipoGasto[g.tipo] || 0) + g.valor;
    });

    var utilidadNeta = utilidadBruta - gastosOperativos;

    var html = '<div class="chips-periodo">';
    PERIODOS.forEach(function (p) {
      html += '<button class="chip' + (p.id === periodoActual ? ' chip-activo' : '') + '" data-periodo="' + p.id + '">' + p.nombre + '</button>';
    });
    html += '</div>';

    html += '<div class="resumen-cifras">' +
      '<div class="cifra"><p class="etiqueta">' + svgIcono('etiqueta') + ' Ventas</p><p class="numero">' + fmt(totalVentas) + '</p><p class="nota">' + ventas.length + ' ventas</p></div>' +
      '<div class="cifra"><p class="etiqueta">' + svgIcono('grafica') + ' Ganancia bruta</p><p class="numero positivo">' + fmt(utilidadBruta) + '</p><p class="nota">según el margen de cada producto</p></div>' +
      '<div class="cifra"><p class="etiqueta">' + svgIcono('casa') + ' Gastos del local</p><p class="numero negativo">' + fmt(gastosOperativos) + '</p><p class="nota">arriendo, servicios y otros</p></div>' +
      '<div class="cifra"><p class="etiqueta">' + svgIcono('billetera') + ' Ganancia real</p><p class="numero ' + (utilidadNeta >= 0 ? 'positivo' : 'negativo') + '">' + fmt(utilidadNeta) + '</p><p class="nota">' + (utilidadNeta >= 0 ? 'el local está ganando' : 'el local está perdiendo') + '</p></div>' +
      '</div>';

    if (gastoMercancia > 0) {
      html += '<div class="aviso">Además se invirtieron <b>' + fmt(gastoMercancia) + '</b> en compra de mercancía. ' +
        'No se resta de la ganancia porque el margen ya descuenta lo que costó el producto: es plata que quedó surtida en el local.</div>';
    }

    // lo más vendido
    var topProductos = Object.keys(porProducto)
      .sort(function (a, b) { return porProducto[b].total - porProducto[a].total; })
      .slice(0, 8);
    if (topProductos.length) {
      html += '<p class="titulo-seccion">Lo más vendido</p><div class="tarjeta">';
      topProductos.forEach(function (nombreP) {
        var p = porProducto[nombreP];
        var c = categoriaPorId(p.categoriaId);
        html += '<div class="fila-familia"><span class="nombre">' + svgIcono(c ? c.icono : 'etiqueta') + ' ' +
          escaparHtml(nombreP) + '<span class="cuantas">(' + p.n + ')</span></span>' +
          '<span class="valor">' + fmt(p.total) + '</span></div>';
      });
      html += '</div>';
    }

    // barras por categoría
    if (ventas.length) {
      html += '<p class="titulo-seccion">Ventas por categoría</p><div class="tarjeta">';
      var maximo = 0;
      datos.categorias.forEach(function (c) {
        if (porCategoria[c.id] && porCategoria[c.id].total > maximo) maximo = porCategoria[c.id].total;
      });
      var ordenadas = datos.categorias.slice().filter(function (c) { return porCategoria[c.id]; })
        .sort(function (a, b) { return porCategoria[b.id].total - porCategoria[a.id].total; });
      ordenadas.forEach(function (c) {
        var p = porCategoria[c.id];
        var ancho = maximo ? Math.round(p.total / maximo * 100) : 0;
        html += '<div class="barra-fila">' +
          '<div class="barra-encima"><span class="nombre-barra">' + svgIcono(c.icono) + ' ' + escaparHtml(c.nombre) +
          ' <span class="detalle">(' + p.n + ' ventas)</span></span>' +
          '<span>' + fmt(p.total) + '</span></div>' +
          '<div class="barra-fondo"><div class="barra-relleno" style="width:' + ancho + '%;background:' + c.color + '"></div></div>' +
          '</div>';
      });
      html += '</div>';
    } else {
      html += '<div class="tarjeta" style="text-align:center;color:var(--tinta-suave)">No hay ventas en este periodo.</div>';
    }

    if (gastos.length) {
      html += '<p class="titulo-seccion">Gastos del periodo</p><div class="tarjeta">';
      TIPOS_GASTO.forEach(function (t) {
        if (!porTipoGasto[t.tipo]) return;
        html += '<div class="fila-familia"><span class="nombre">' + svgIcono(t.icono) + ' ' + t.nombre + '</span>' +
          '<span class="valor">' + fmt(porTipoGasto[t.tipo]) + '</span></div>';
      });
      html += '</div>';
    }

    document.getElementById('admin-contenido').innerHTML = html;

    document.querySelectorAll('[data-periodo]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        periodoActual = chip.getAttribute('data-periodo');
        pintarReportes();
      });
    });
  }

  /* ---------------- productos (administración) ---------------- */

  function pintarProductosAdmin() {
    var html = '<div class="aviso">Estos son los productos que la app ha <b>aprendido</b>. La primera vez que se vende uno, ' +
      'pregunta su % de ganancia y aquí pueden corregirlo.</div>';
    var lista = datos.productos.slice().sort(function (a, b) { return b.n - a.n; });
    if (!lista.length) {
      html += '<div class="tarjeta" style="text-align:center;color:var(--tinta-suave)">Todavía no se ha vendido ningún producto.</div>';
    }
    lista.forEach(function (p) {
      var c = categoriaPorId(p.categoriaId);
      html += '<div class="fila-admin">' +
        '<div class="info"><span class="insignia" style="background:' + (c ? c.color : '#57534E') + '">' + svgIcono(c ? c.icono : 'etiqueta') + '</span>' +
        '<div class="textos"><p class="nombre">' + escaparHtml(p.nombre) + '</p>' +
        '<p class="sub">' + (c ? escaparHtml(c.nombre) + ' · ' : '') + 'Gana ' + (p.margen === null || p.margen === undefined ? '—' : p.margen + '%') + ' · ' + p.n + ' ventas</p></div></div>' +
        '<div class="acciones">' +
        '<button class="btn-mini" data-editar-prod="' + p.id + '" aria-label="Editar">' + svgIcono('lapiz') + '</button>' +
        '<button class="btn-mini peligro" data-borrar-prod="' + p.id + '" aria-label="Borrar">' + svgIcono('basura') + '</button>' +
        '</div></div>';
    });
    document.getElementById('admin-contenido').innerHTML = html;

    document.querySelectorAll('[data-editar-prod]').forEach(function (b) {
      b.addEventListener('click', function () { modalProducto(b.getAttribute('data-editar-prod')); });
    });
    document.querySelectorAll('[data-borrar-prod]').forEach(function (b) {
      b.addEventListener('click', function () { borrarProducto(b.getAttribute('data-borrar-prod')); });
    });
  }

  function modalProducto(id) {
    var p = productoPorId(id);
    if (!p) return;
    var html = '<h2>Editar producto</h2>' +
      '<div class="campo"><label>Nombre</label><input id="campo-prod-nombre" type="text" maxlength="30" value="' + escaparHtml(p.nombre) + '"></div>' +
      '<div class="campo"><label>Margen de ganancia (%)</label><input id="campo-prod-margen" type="number" inputmode="numeric" min="0" max="95" value="' + (p.margen === null || p.margen === undefined ? '' : p.margen) + '"></div>' +
      '<div class="campo"><label>Categoría</label><div class="grid-modal-categorias">';
    datos.categorias.forEach(function (c) {
      if (!c.activa && c.id !== p.categoriaId) return;
      html += '<button class="btn-familia" data-prod-cat="' + c.id + '" style="background:' + fondoElegante(c.color) +
        (c.id === p.categoriaId ? ';outline:4px solid var(--tinta)' : '') + '">' +
        '<span class="icono">' + svgIcono(c.icono) + '</span>' + escaparHtml(c.nombre) + '</button>';
    });
    html += '</div></div>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
      '<button class="btn-grande btn-guardar" data-accion="guardar-prod">' + svgIcono('check') + ' Guardar</button></div>';

    var catElegida = p.categoriaId;
    abrirModal(html, function (accion) {
      if (accion !== 'guardar-prod') return;
      var nombre = document.getElementById('campo-prod-nombre').value.trim();
      var mTxt = document.getElementById('campo-prod-margen').value.trim();
      var margen = mTxt === '' ? null : parseInt(mTxt, 10);
      if (!nombre) { avisoError('Escriba el nombre del producto.'); return 'mantener'; }
      if (margen !== null && (isNaN(margen) || margen < 0 || margen > 95)) { avisoError('El margen debe estar entre 0 y 95.'); return 'mantener'; }
      p.nombre = nombre;
      p.clave = singularizar(normalizar(nombre));
      p.margen = margen;
      p.categoriaId = catElegida;
      guardar();
      pintarProductosAdmin();
    });
    document.querySelectorAll('#modal-caja [data-prod-cat]').forEach(function (b) {
      b.addEventListener('click', function () {
        catElegida = b.getAttribute('data-prod-cat');
        document.querySelectorAll('#modal-caja [data-prod-cat]').forEach(function (x) { x.style.outline = ''; });
        b.style.outline = '4px solid var(--tinta)';
      });
    });
  }

  function borrarProducto(id) {
    var p = productoPorId(id);
    if (!p) return;
    abrirModal(
      '<h2>¿Borrar "' + escaparHtml(p.nombre) + '"?</h2>' +
      '<p>Las ventas ya registradas no se borran; solo se olvida el producto y su % de ganancia (volverá a preguntarlo si se vende de nuevo).</p>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
      '<button class="btn-grande btn-rojo" data-accion="borrar">Sí, borrarlo</button></div>',
      function (accion) {
        if (accion === 'borrar') {
          datos.productos = datos.productos.filter(function (x) { return x.id !== id; });
          guardar();
          pintarProductosAdmin();
        }
      }
    );
  }

  /* ---------------- categorías (administración) ---------------- */

  function pintarCategoriasAdmin() {
    var html = '<div class="aviso">Las <b>categorías</b> agrupan los productos para los reportes y los bolsillos de compra. ' +
      'El margen de la categoría se usa cuando un producto no tiene el suyo propio.</div>';
    datos.categorias.forEach(function (c) {
      html += '<div class="fila-admin' + (c.activa ? '' : ' inactiva') + '">' +
        '<div class="info"><span class="insignia" style="background:' + c.color + '">' + svgIcono(c.icono) + '</span>' +
        '<div class="textos"><p class="nombre">' + escaparHtml(c.nombre) + (c.activa ? '' : ' (oculta)') + '</p>' +
        '<p class="sub">Margen sugerido: ' + c.margen + '%</p></div></div>' +
        '<div class="acciones">' +
        '<button class="btn-mini" data-editar-cat="' + c.id + '" aria-label="Editar">' + svgIcono('lapiz') + '</button>' +
        '<button class="btn-mini peligro" data-quitar-cat="' + c.id + '" aria-label="' + (c.activa ? 'Ocultar' : 'Mostrar') + '">' + svgIcono(c.activa ? 'basura' : 'ojo') + '</button>' +
        '</div></div>';
    });
    html += '<button class="btn-agregar" id="btn-agregar-cat">＋ Agregar categoría</button>';
    document.getElementById('admin-contenido').innerHTML = html;

    document.querySelectorAll('[data-editar-cat]').forEach(function (b) {
      b.addEventListener('click', function () { modalCategoria(b.getAttribute('data-editar-cat')); });
    });
    document.querySelectorAll('[data-quitar-cat]').forEach(function (b) {
      b.addEventListener('click', function () { quitarCategoria(b.getAttribute('data-quitar-cat')); });
    });
    document.getElementById('btn-agregar-cat').onclick = function () { modalCategoria(null); };
  }

  function modalCategoria(id) {
    var c = id ? categoriaPorId(id) : { nombre: '', icono: ICONOS[0], color: COLORES[0], margen: 40 };
    var elegido = { icono: c.icono, color: c.color };

    var html = '<h2>' + (id ? 'Editar categoría' : 'Nueva categoría') + '</h2>' +
      '<div class="campo"><label>Nombre</label><input id="campo-nombre" type="text" maxlength="26" value="' + escaparHtml(c.nombre) + '" placeholder="Ej: Perfumería"></div>' +
      '<div class="campo"><label>Margen sugerido (%)</label><input id="campo-margen" type="number" inputmode="numeric" min="0" max="95" value="' + c.margen + '"></div>' +
      '<div class="campo"><label>Ícono</label><div class="selector-iconos">' +
      ICONOS.map(function (ic) {
        return '<button class="opcion-icono' + (ic === c.icono ? ' elegido' : '') + '" data-icono="' + ic + '" title="' + ICONOS_SVG[ic].n + '" aria-label="' + ICONOS_SVG[ic].n + '">' + svgIcono(ic) + '</button>';
      }).join('') + '</div></div>' +
      '<div class="campo"><label>Color</label><div class="selector-colores">' +
      COLORES.map(function (col) {
        return '<button class="opcion-color' + (col === c.color ? ' elegido' : '') + '" data-color="' + col + '" style="background:' + col + '"></button>';
      }).join('') + '</div></div>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
      '<button class="btn-grande btn-guardar" data-accion="guardar-cat">' + svgIcono('check') + ' Guardar</button>' +
      '</div>';

    abrirModal(html, function (accion) {
      if (accion !== 'guardar-cat') return;
      var nombre = document.getElementById('campo-nombre').value.trim();
      var margen = parseInt(document.getElementById('campo-margen').value, 10);
      if (!nombre) { avisoError('Escriba el nombre de la categoría.'); return 'mantener'; }
      if (isNaN(margen) || margen < 0 || margen > 95) { avisoError('El margen debe ser un número entre 0 y 95.'); return 'mantener'; }
      if (id) {
        c.nombre = nombre; c.margen = margen; c.icono = elegido.icono; c.color = elegido.color;
      } else {
        datos.categorias.push({ id: nuevoId(), nombre: nombre, icono: elegido.icono, color: elegido.color, margen: margen, activa: true });
      }
      guardar();
      pintarCategoriasAdmin();
    });

    document.querySelectorAll('.opcion-icono').forEach(function (b) {
      b.addEventListener('click', function () {
        elegido.icono = b.getAttribute('data-icono');
        document.querySelectorAll('.opcion-icono').forEach(function (x) { x.classList.remove('elegido'); });
        b.classList.add('elegido');
      });
    });
    document.querySelectorAll('.opcion-color').forEach(function (b) {
      b.addEventListener('click', function () {
        elegido.color = b.getAttribute('data-color');
        document.querySelectorAll('.opcion-color').forEach(function (x) { x.classList.remove('elegido'); });
        b.classList.add('elegido');
      });
    });
  }

  function quitarCategoria(id) {
    var c = categoriaPorId(id);
    if (!c) return;
    if (!c.activa) {
      c.activa = true;
      guardar();
      pintarCategoriasAdmin();
      return;
    }
    var tieneMovimientos = datos.ventas.some(function (v) { return v.categoriaId === id; }) ||
      datos.gastos.some(function (g) { return g.categoriaId === id; }) ||
      datos.productos.some(function (p) { return p.categoriaId === id; });
    if (tieneMovimientos) {
      abrirModal(
        '<h2>Ocultar categoría</h2>' +
        '<p>La categoría <b>' + escaparHtml(c.nombre) + '</b> ya tiene movimientos, así que no se puede borrar. Se puede <b>ocultar</b>: sus números se conservan en los reportes.</p>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-rojo" data-accion="ocultar">Ocultarla</button></div>',
        function (accion) {
          if (accion === 'ocultar') { c.activa = false; guardar(); pintarCategoriasAdmin(); }
        }
      );
    } else {
      abrirModal(
        '<h2>¿Borrar categoría?</h2><p>La categoría <b>' + escaparHtml(c.nombre) + '</b> no tiene movimientos y se borrará por completo.</p>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-rojo" data-accion="borrar">Sí, borrarla</button></div>',
        function (accion) {
          if (accion === 'borrar') {
            datos.categorias = datos.categorias.filter(function (x) { return x.id !== id; });
            guardar();
            pintarCategoriasAdmin();
          }
        }
      );
    }
  }

  /* ---------------- cierres de caja (administración) ---------------- */

  function pintarCierresAdmin() {
    var html = '<div class="aviso">Historial de cierres de caja: con cuánto abrió, cuánto debía haber y cuánto contó.</div>';
    var lista = datos.caja.cierres.slice().reverse().slice(0, 40);
    if (!lista.length) {
      html += '<div class="tarjeta" style="text-align:center;color:var(--tinta-suave)">Todavía no hay cierres de caja.</div>';
    }
    lista.forEach(function (c) {
      var partes = c.fecha.split('-');
      var fechaTxt = partes[2] + ' de ' + MESES[parseInt(partes[1], 10) - 1] + ' ' + partes[0];
      var dif = c.diferencia;
      html += '<div class="fila-admin fila-mov">' +
        '<div class="info"><span class="insignia-mov">' + svgIcono('cofre') + '</span>' +
        '<div class="textos"><p class="nombre">' + fechaTxt + '</p>' +
        '<p class="sub">Base ' + fmt(c.base) + ' · Esperado ' + fmt(c.esperado) + ' · Contado ' + fmt(c.contado) + '</p></div></div>' +
        '<span class="monto ' + (dif === 0 ? 'venta' : 'gasto') + '">' +
        (dif === 0 ? '✔ Cuadró' : (dif > 0 ? '+' + fmt(dif) : '−' + fmt(-dif))) + '</span>' +
        '</div>';
    });
    document.getElementById('admin-contenido').innerHTML = html;
  }

  /* ---------------- movimientos (registros) ---------------- */

  var filtroMov = 'todos';

  function pintarMovimientos() {
    var lista = [];
    datos.ventas.forEach(function (v) { lista.push({ clase: 'venta', m: v }); });
    datos.gastos.forEach(function (g) { lista.push({ clase: 'gasto', m: g }); });
    lista.sort(function (a, b) { return new Date(b.m.fecha) - new Date(a.m.fecha); });

    if (filtroMov !== 'todos') lista = lista.filter(function (x) { return x.clase === filtroMov; });
    var recortada = lista.slice(0, 120);

    var html = '<div class="chips-periodo">' +
      '<button class="chip' + (filtroMov === 'todos' ? ' chip-activo' : '') + '" data-filtro="todos">Todos</button>' +
      '<button class="chip' + (filtroMov === 'venta' ? ' chip-activo' : '') + '" data-filtro="venta">Ventas</button>' +
      '<button class="chip' + (filtroMov === 'gasto' ? ' chip-activo' : '') + '" data-filtro="gasto">Gastos</button>' +
      '</div>';

    if (!recortada.length) {
      html += '<div class="tarjeta" style="text-align:center;color:var(--tinta-suave)">No hay registros todavía.</div>';
    }

    recortada.forEach(function (x) {
      var etiqueta, icono;
      if (x.clase === 'venta') {
        var c = categoriaPorId(x.m.categoriaId);
        etiqueta = descripcionVenta(x.m);
        icono = c ? c.icono : 'etiqueta';
      } else {
        var t = tipoGastoPorId(x.m.tipo);
        etiqueta = t.nombre;
        if (x.m.tipo === 'mercancia' && x.m.categoriaId) {
          var cg = categoriaPorId(x.m.categoriaId);
          if (cg) etiqueta += ' · ' + cg.nombre;
        }
        icono = t.icono;
      }
      html += '<div class="fila-admin fila-mov">' +
        '<div class="info"><span class="insignia-mov">' + svgIcono(icono) + '</span>' +
        '<div class="textos"><p class="nombre">' + escaparHtml(etiqueta) + '</p>' +
        '<p class="sub">' + fechaCorta(x.m.fecha) + '</p></div></div>' +
        '<div class="acciones"><span class="monto ' + x.clase + '">' + (x.clase === 'gasto' ? '−' : '') + fmt(x.m.valor) + '</span>' +
        '<button class="btn-mini" data-editar-mov="' + x.m.id + '" aria-label="Editar">' + svgIcono('lapiz') + '</button>' +
        '<button class="btn-mini peligro" data-borrar-mov="' + x.m.id + '" aria-label="Borrar">' + svgIcono('basura') + '</button>' +
        '</div></div>';
    });

    if (lista.length > recortada.length) {
      html += '<p style="text-align:center;color:var(--tinta-suave);font-size:0.85rem">Mostrando los ' + recortada.length + ' más recientes de ' + lista.length + '.</p>';
    }

    document.getElementById('admin-contenido').innerHTML = html;

    document.querySelectorAll('[data-filtro]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        filtroMov = chip.getAttribute('data-filtro');
        pintarMovimientos();
      });
    });
    document.querySelectorAll('[data-editar-mov]').forEach(function (b) {
      b.addEventListener('click', function () { editarMovimiento(b.getAttribute('data-editar-mov')); });
    });
    document.querySelectorAll('[data-borrar-mov]').forEach(function (b) {
      b.addEventListener('click', function () { borrarMovimiento(b.getAttribute('data-borrar-mov')); });
    });
  }

  function buscarMovimiento(id) {
    var i;
    for (i = 0; i < datos.ventas.length; i++) if (datos.ventas[i].id === id) return { clase: 'venta', m: datos.ventas[i] };
    for (i = 0; i < datos.gastos.length; i++) if (datos.gastos[i].id === id) return { clase: 'gasto', m: datos.gastos[i] };
    return null;
  }

  function editarMovimiento(id) {
    var x = buscarMovimiento(id);
    if (!x) return;
    abrirTeclado({
      contexto: '<span class="icono" style="background:var(--tinta)">' + svgIcono('lapiz') + '</span> Corregir valor',
      valorInicial: x.m.valor,
      alGuardar: function (valor) {
        x.m.valor = valor;
        guardar();
        irA('admin');
        pintarTabAdmin('movimientos');
      },
      alCancelar: function () { irA('admin'); pintarTabAdmin('movimientos'); }
    });
  }

  function borrarMovimiento(id) {
    var x = buscarMovimiento(id);
    if (!x) return;
    abrirModal(
      '<h2>¿Borrar este registro?</h2><p style="font-size:1.2rem;font-weight:800;text-align:center">' + fmt(x.m.valor) + '</p>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">No</button>' +
      '<button class="btn-grande btn-rojo" data-accion="borrar">Sí, borrarlo</button></div>',
      function (accion) {
        if (accion === 'borrar') {
          if (x.clase === 'venta' && x.m.productoId) {
            var p = productoPorId(x.m.productoId);
            if (p && p.n > 0) p.n--;
          }
          datos.ventas = datos.ventas.filter(function (v) { return v.id !== id; });
          datos.gastos = datos.gastos.filter(function (g) { return g.id !== id; });
          guardar();
          pintarMovimientos();
        }
      }
    );
  }

  /* ---------------- respaldo ---------------- */

  function pintarRespaldo() {
    var ultimo = datos.config.ultimoRespaldo
      ? fechaCorta(datos.config.ultimoRespaldo)
      : 'Nunca se ha hecho';
    var html =
      '<div class="tarjeta"><div class="fila-familia"><span class="nombre">' + svgIcono('etiqueta') + ' Ventas guardadas</span><span class="valor">' + datos.ventas.length + '</span></div>' +
      '<div class="fila-familia"><span class="nombre">' + svgIcono('billetera') + ' Gastos guardados</span><span class="valor">' + datos.gastos.length + '</span></div>' +
      '<div class="fila-familia"><span class="nombre">' + svgIcono('caja') + ' Productos aprendidos</span><span class="valor">' + datos.productos.length + '</span></div>' +
      '<div class="fila-familia"><span class="nombre">' + svgIcono('reloj') + ' Último respaldo</span><span class="valor">' + ultimo + '</span></div></div>' +
      '<button class="btn-bloque principal" id="btn-respaldar"><span class="icono-bloque">' + svgIcono('subir') + '</span><span>Enviar respaldo<small>Comparte un archivo por WhatsApp o lo descarga</small></span></button>' +
      '<button class="btn-bloque" id="btn-restaurar"><span class="icono-bloque">' + svgIcono('bajar') + '</span><span>Restaurar desde un archivo<small>Recupera todo en una tablet nueva</small></span></button>' +
      '<div class="aviso">Hagan un respaldo <b>al menos una vez por semana</b>. Si la tablet se daña o se pierde, con el archivo del respaldo se recupera toda la contabilidad.</div>';
    document.getElementById('admin-contenido').innerHTML = html;

    document.getElementById('btn-respaldar').onclick = hacerRespaldo;
    document.getElementById('btn-restaurar').onclick = function () {
      document.getElementById('input-restaurar').click();
    };
  }

  function hacerRespaldo() {
    var contenido = JSON.stringify({
      app: 'variedades-naranjo',
      version: 2,
      exportado: new Date().toISOString(),
      datos: datos
    }, null, 1);

    var hoy = new Date();
    var nombre = 'respaldo-variedades-naranjo-' + claveDia(hoy) + '.json';
    var archivo = new File([contenido], nombre, { type: 'application/json' });

    function marcarHecho() {
      datos.config.ultimoRespaldo = new Date().toISOString();
      guardar();
      pintarRespaldo();
    }

    if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
      navigator.share({ files: [archivo], title: 'Respaldo Variedades Naranjo' })
        .then(marcarHecho)
        .catch(function () { /* canceló: no pasa nada */ });
    } else {
      var url = URL.createObjectURL(archivo);
      var a = document.createElement('a');
      a.href = url;
      a.download = nombre;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
      marcarHecho();
    }
  }

  document.getElementById('input-restaurar').addEventListener('change', function (ev) {
    var archivo = ev.target.files[0];
    ev.target.value = '';
    if (!archivo) return;
    var lector = new FileReader();
    lector.onload = function () {
      var paquete;
      try {
        paquete = JSON.parse(lector.result);
      } catch (e) { paquete = null; }
      if (!paquete || paquete.app !== 'variedades-naranjo' || !paquete.datos || !paquete.datos.ventas) {
        abrirModal('<h2>Archivo no válido</h2><p>Ese archivo no es un respaldo de Variedades Naranjo.</p>' +
          '<div class="modal-acciones"><button class="btn-grande btn-cancelar" data-accion="cerrar">Entendido</button></div>', function () {});
        return;
      }
      abrirModal(
        '<h2>¿Restaurar respaldo?</h2>' +
        '<p>El archivo tiene <b>' + paquete.datos.ventas.length + ' ventas</b> y <b>' + paquete.datos.gastos.length + ' gastos</b> ' +
        '(guardado el ' + fechaCorta(paquete.exportado) + ').</p>' +
        '<p><b>Atención:</b> esto reemplaza TODO lo que hay ahora en la tablet.</p>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-rojo" data-accion="restaurar">Sí, restaurar</button></div>',
        function (accion) {
          if (accion === 'restaurar') {
            datos = migrar(paquete.datos);
            guardar();
            pintarTabAdmin('respaldo');
          }
        }
      );
    };
    lector.readAsText(archivo);
  });

  /* ---------------- ajustes ---------------- */

  function pintarAjustes() {
    var html =
      '<div class="tarjeta"><div class="campo"><label>Nombre del local</label>' +
      '<input id="campo-nombre-local" type="text" maxlength="30" value="' + escaparHtml(datos.config.nombre) + '"></div>' +
      '<button class="btn-agregar" id="btn-guardar-nombre" style="margin-top:0.8rem;width:100%">Guardar nombre</button></div>' +
      '<button class="btn-bloque" id="btn-cambiar-clave"><span class="icono-bloque">' + svgIcono('llave') + '</span><span>Cambiar la clave de administración<small>La clave actual tiene 4 números</small></span></button>' +
      '<button class="btn-bloque peligro" id="btn-borrar-todo"><span class="icono-bloque">' + svgIcono('alerta') + '</span><span>Borrar TODOS los datos<small>Empieza de cero. No se puede deshacer.</small></span></button>';
    document.getElementById('admin-contenido').innerHTML = html;

    document.getElementById('btn-guardar-nombre').onclick = function () {
      var nombre = document.getElementById('campo-nombre-local').value.trim();
      if (!nombre) return;
      datos.config.nombre = nombre;
      guardar();
      abrirModal('<h2>Listo</h2><p>El nombre quedó guardado.</p>' +
        '<div class="modal-acciones"><button class="btn-grande btn-guardar" data-accion="cerrar">Entendido</button></div>', function () {});
    };

    document.getElementById('btn-cambiar-clave').onclick = function () {
      abrirModal(
        '<h2>Cambiar clave</h2>' +
        '<div class="campo"><label>Nueva clave (4 números)</label>' +
        '<input id="campo-clave" type="tel" inputmode="numeric" maxlength="4" placeholder="••••"></div>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-guardar" data-accion="guardar-clave">' + svgIcono('check') + ' Guardar</button></div>',
        function (accion) {
          if (accion !== 'guardar-clave') return;
          var clave = document.getElementById('campo-clave').value.trim();
          if (!/^\d{4}$/.test(clave)) { avisoError('La clave debe tener exactamente 4 números.'); return 'mantener'; }
          datos.config.clave = clave;
          guardar();
        }
      );
    };

    document.getElementById('btn-borrar-todo').onclick = function () {
      abrirModal(
        '<h2>Borrar todo</h2>' +
        '<p>Se borrarán <b>' + datos.ventas.length + ' ventas</b>, <b>' + datos.gastos.length + ' gastos</b> y <b>' +
        datos.productos.length + ' productos aprendidos</b> para siempre. Si no está seguro, haga primero un respaldo.</p>' +
        '<div class="campo"><label>Para confirmar, escriba BORRAR</label><input id="campo-borrar" type="text" autocapitalize="characters"></div>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-rojo" data-accion="borrar-todo">Borrar todo</button></div>',
        function (accion) {
          if (accion !== 'borrar-todo') return;
          var texto = document.getElementById('campo-borrar').value.trim().toUpperCase();
          if (texto !== 'BORRAR') { avisoError('Escriba la palabra BORRAR para confirmar.'); return 'mantener'; }
          var nombre = datos.config.nombre;
          var clave = datos.config.clave;
          datos = datosIniciales();
          datos.config.nombre = nombre;
          datos.config.clave = clave;
          guardar();
          pintarTabAdmin('ajustes');
        }
      );
    };
  }

  /* ---------------- modal genérico ---------------- */

  function cerrarModal() {
    document.getElementById('modal').classList.add('oculto');
    document.getElementById('modal-caja').innerHTML = '';
  }

  function abrirModal(html, alAccionar) {
    var fondo = document.getElementById('modal');
    var caja = document.getElementById('modal-caja');
    caja.innerHTML = html;
    fondo.classList.remove('oculto');

    caja.onclick = function (ev) {
      var b = ev.target.closest('[data-accion]');
      if (!b) return;
      var accion = b.getAttribute('data-accion');
      var resultado = accion === 'cerrar' ? null : alAccionar(accion);
      if (resultado !== 'mantener') cerrarModal();
    };
  }

  /* ---------------- service worker ---------------- */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* sin SW sigue funcionando */ });
    });
  }

  /* ---------------- arranque ---------------- */

  guardar();
  pintarIconosEstaticos();
  pintarVentas();

})();
