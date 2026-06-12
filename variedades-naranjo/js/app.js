/* ============================================================
   Variedades Naranjo — lógica de la aplicación
   Todo se guarda en la memoria de la tablet (localStorage).
   No necesita internet para funcionar.
   ============================================================ */

(function () {
  'use strict';

  var CLAVE_DATOS = 'vn_datos_v1';

  /* ---------------- iconografía corporativa (SVG) ---------------- */

  var ICONOS_SVG = {
    /* familias de productos */
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
    tijeras:   { n: 'Peluquería',     s: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.8L20 19"/><path d="M8.5 16.2L20 5"/>' },
    maleta:    { n: 'Maleta',         s: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>' },
    caja:      { n: 'Caja',           s: '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>' },
    etiqueta:  { n: 'Etiqueta',       s: '<path d="M2 11V4a2 2 0 0 1 2-2h7l11 11-9 9L2 11z"/><circle cx="7.5" cy="7.5" r="1" fill="currentColor"/>' },
    sol:       { n: 'Sol',            s: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.9 4.9l1.4 1.4"/><path d="M17.7 17.7l1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.9 19.1l1.4-1.4"/><path d="M17.7 6.3l1.4-1.4"/>' },
    /* interfaz */
    ajustes:   { n: 'Ajustes',        s: '<line x1="21" y1="6" x2="14" y2="6"/><line x1="10" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="18" x2="16" y2="18"/><line x1="12" y1="18" x2="3" y2="18"/><circle cx="12" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="14" cy="18" r="2"/>' },
    candado:   { n: 'Candado',        s: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>' },
    billetera: { n: 'Billetera',      s: '<rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20"/><circle cx="16.5" cy="14.5" r="1" fill="currentColor"/>' },
    grafica:   { n: 'Gráfica',        s: '<path d="M3 21h18"/><path d="M7 21V11"/><path d="M12 21V4"/><path d="M17 21v-7"/>' },
    casa:      { n: 'Casa',           s: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>' },
    bombilla:  { n: 'Bombilla',       s: '<path d="M12 2a7 7 0 0 0-4.6 12.3c.9.8 1.6 1.7 1.6 2.7h6c0-1 .7-1.9 1.6-2.7A7 7 0 0 0 12 2z"/><path d="M9 21h6"/>' },
    documento: { n: 'Documento',      s: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>' },
    lapiz:     { n: 'Editar',         s: '<path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>' },
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

  /* los que aparecen en el selector al editar una familia */
  var ICONOS = ['perfume', 'gema', 'collar', 'oso', 'arete', 'bolso', 'reloj', 'gafas', 'labial',
    'corona', 'lazo', 'flor', 'estrella', 'regalo', 'camiseta', 'zapato', 'sombrero', 'anillo',
    'medias', 'tijeras', 'maleta', 'caja', 'etiqueta', 'sol'];

  function svgIcono(id, clase) {
    var ic = ICONOS_SVG[id] || ICONOS_SVG.etiqueta;
    return '<svg class="icv' + (clase ? ' ' + clase : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ic.s + '</svg>';
  }

  /* migración de la versión anterior, que guardaba emojis */
  var EMOJI_A_ICONO = {
    '🧴': 'perfume', '📿': 'collar', '🧸': 'oso', '✨': 'arete', '👜': 'bolso', '💍': 'anillo',
    '💄': 'labial', '🕶️': 'gafas', '⌚': 'reloj', '🎀': 'lazo', '🧦': 'medias', '👛': 'bolso',
    '🪞': 'gema', '🧢': 'sombrero', '🎁': 'regalo', '💅': 'labial', '🩴': 'zapato', '🛍️': 'etiqueta',
    '📦': 'caja', '🎈': 'regalo', '🧵': 'lazo', '🪮': 'tijeras', '🌸': 'flor', '⭐': 'estrella'
  };

  function migrarIconos(d) {
    d.familias.forEach(function (f) {
      if (!ICONOS_SVG[f.icono]) f.icono = EMOJI_A_ICONO[f.icono] || 'etiqueta';
    });
  }

  /* ---------------- datos ---------------- */

  function datosIniciales() {
    return {
      version: 1,
      config: { nombre: 'Variedades Naranjo', clave: '1234', ultimoRespaldo: null },
      familias: [
        { id: 'f1', nombre: 'Perfumería', icono: 'perfume', color: '#5B21B6', margen: 40, activa: true },
        { id: 'f2', nombre: 'Bisutería', icono: 'collar', color: '#0F766E', margen: 50, activa: true },
        { id: 'f3', nombre: 'Peluches', icono: 'oso', color: '#9D174D', margen: 40, activa: true },
        { id: 'f4', nombre: 'Aretes', icono: 'arete', color: '#B45309', margen: 50, activa: true },
        { id: 'f5', nombre: 'Accesorios', icono: 'bolso', color: '#1D4ED8', margen: 50, activa: true },
        { id: 'f6', nombre: 'Otros', icono: 'regalo', color: '#15803D', margen: 40, activa: true }
      ],
      ventas: [],   // { id, familiaId, valor, fecha }
      gastos: []    // { id, tipo, familiaId|null, valor, fecha }
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

  var datos = cargar();

  function cargar() {
    var d;
    try {
      var crudo = localStorage.getItem(CLAVE_DATOS);
      d = crudo ? JSON.parse(crudo) : null;
      if (!d || !d.familias || !d.ventas || !d.gastos || !d.config) d = datosIniciales();
    } catch (e) {
      d = datosIniciales();
    }
    migrarIconos(d);
    return d;
  }

  function guardar() {
    localStorage.setItem(CLAVE_DATOS, JSON.stringify(datos));
  }

  function nuevoId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function familiaPorId(id) {
    for (var i = 0; i < datos.familias.length; i++) {
      if (datos.familias[i].id === id) return datos.familias[i];
    }
    return null;
  }

  function tipoGastoPorId(tipo) {
    for (var i = 0; i < TIPOS_GASTO.length; i++) {
      if (TIPOS_GASTO[i].tipo === tipo) return TIPOS_GASTO[i];
    }
    return TIPOS_GASTO[3];
  }

  /* ---------------- utilidades ---------------- */

  var fmtCO = new Intl.NumberFormat('es-CO');

  function fmt(n) {
    return '$ ' + fmtCO.format(Math.round(n));
  }

  /* degradado elegante a partir del color de la familia */
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
      if (cual === 'ok') {            // campanita ascendente: quedó bien
        tono(660, 0, 0.18, 0.16);
        tono(880, 0.13, 0.3, 0.16);
      } else if (cual === 'error') {  // zumbido grave: algo salió mal
        tono(220, 0, 0.22, 0.18, 'square');
        tono(160, 0.18, 0.28, 0.16, 'square');
      } else {                        // clic corto de tecla
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

  /* íconos fijos del HTML (encabezados, navegación, teclas) */
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
    if (nombre === 'midia') pintarMiDia();
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', function (ev) {
    // toda opción que se toque vibra, para que se sienta que sí respondió
    if (ev.target.closest('button')) vibrar(15);
    var b = ev.target.closest('[data-ir]');
    if (b) irA(b.getAttribute('data-ir'));
  });

  /* ---------------- pantalla VENDER ---------------- */

  function pintarVentas() {
    document.getElementById('nombre-local').textContent = datos.config.nombre;
    document.getElementById('fecha-hoy').textContent = fechaLarga(new Date());

    var grid = document.getElementById('grid-familias');
    grid.innerHTML = '';
    datos.familias.forEach(function (f) {
      if (!f.activa) return;
      var btn = document.createElement('button');
      btn.className = 'btn-familia';
      btn.style.background = fondoElegante(f.color);
      btn.innerHTML = '<span class="icono">' + svgIcono(f.icono) + '</span>' + escaparHtml(f.nombre);
      btn.onclick = function () { abrirTeclado({ modo: 'venta', familiaId: f.id }); };
      grid.appendChild(btn);
    });

    pintarBannerUltima();
  }

  function ultimaVentaDeHoy() {
    var hoy = new Date();
    for (var i = datos.ventas.length - 1; i >= 0; i--) {
      if (esMismoDia(datos.ventas[i].fecha, hoy)) return datos.ventas[i];
    }
    return null;
  }

  function pintarBannerUltima() {
    var banner = document.getElementById('banner-ultima');
    var v = ultimaVentaDeHoy();
    if (!v) { banner.classList.add('oculto'); return; }
    var f = familiaPorId(v.familiaId);
    document.getElementById('banner-detalle').innerHTML =
      (f ? svgIcono(f.icono) + ' ' + escaparHtml(f.nombre) : 'Venta') + ' — ' + fmt(v.valor);
    banner.classList.remove('oculto');
  }

  document.getElementById('btn-deshacer').onclick = function () {
    var v = ultimaVentaDeHoy();
    if (!v) return;
    var f = familiaPorId(v.familiaId);
    abrirModal(
      '<h2>¿Borrar esta venta?</h2>' +
      '<p style="font-size:1.3rem;font-weight:800;text-align:center;">' +
      (f ? svgIcono(f.icono) + ' ' + escaparHtml(f.nombre) : '') + '<br>' + fmt(v.valor) + '</p>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">No, dejarla</button>' +
      '<button class="btn-grande btn-rojo" data-accion="borrar-ultima">Sí, borrarla</button>' +
      '</div>',
      function (accion) {
        if (accion === 'borrar-ultima') {
          datos.ventas = datos.ventas.filter(function (x) { return x.id !== v.id; });
          guardar();
          pintarVentas();
        }
      }
    );
  };

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
          pintarFamiliaGasto();
          irA('familia-gasto');
        } else {
          abrirTeclado({ modo: 'gasto', tipo: t.tipo, familiaId: null });
        }
      };
      grid.appendChild(btn);
    });
  }

  function pintarFamiliaGasto() {
    var grid = document.getElementById('grid-familia-gasto');
    grid.innerHTML = '';
    datos.familias.forEach(function (f) {
      if (!f.activa) return;
      var btn = document.createElement('button');
      btn.className = 'btn-familia';
      btn.style.background = fondoElegante(f.color);
      btn.innerHTML = '<span class="icono">' + svgIcono(f.icono) + '</span>' + escaparHtml(f.nombre);
      btn.onclick = function () { abrirTeclado({ modo: 'gasto', tipo: 'mercancia', familiaId: f.id }); };
      grid.appendChild(btn);
    });
    var btn = document.createElement('button');
    btn.className = 'btn-familia';
    btn.style.background = fondoElegante('#57534E');
    btn.innerHTML = '<span class="icono">' + svgIcono('ayuda') + '</span>No sé / Varias';
    btn.onclick = function () { abrirTeclado({ modo: 'gasto', tipo: 'mercancia', familiaId: null }); };
    grid.appendChild(btn);
  }

  /* ---------------- teclado ---------------- */

  var teclado = { modo: null, familiaId: null, tipo: null, digitos: '', editandoId: null };

  function abrirTeclado(opciones) {
    teclado.modo = opciones.modo;
    teclado.familiaId = opciones.familiaId || null;
    teclado.tipo = opciones.tipo || null;
    teclado.editandoId = opciones.editandoId || null;
    teclado.digitos = opciones.valorInicial ? String(opciones.valorInicial) : '';

    var ctx = document.getElementById('teclado-contexto');
    if (teclado.modo === 'venta') {
      var f = familiaPorId(teclado.familiaId);
      ctx.innerHTML = '<span class="icono" style="background:' + (f ? f.color : '#57534E') + '">' +
        svgIcono(f ? f.icono : 'etiqueta') + '</span> Venta de ' + escaparHtml(f ? f.nombre : '');
    } else {
      var t = tipoGastoPorId(teclado.tipo);
      var extra = '';
      if (teclado.tipo === 'mercancia' && teclado.familiaId) {
        var fg = familiaPorId(teclado.familiaId);
        if (fg) extra = ' (' + escaparHtml(fg.nombre) + ')';
      }
      ctx.innerHTML = '<span class="icono" style="background:' + t.color + '">' +
        svgIcono(t.icono) + '</span> Gasto: ' + t.nombre + extra;
    }
    pintarMonto();
    irA('teclado');
  }

  function pintarMonto() {
    var valor = parseInt(teclado.digitos || '0', 10);
    document.getElementById('teclado-monto').textContent = fmt(valor);
    document.getElementById('teclado-letras').textContent = valor > 0 ? numeroALetras(valor) : ' ';
    document.getElementById('btn-teclado-guardar').disabled = valor <= 0;
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
    irA(teclado.modo === 'venta' ? 'ventas' : 'gastos');
  };

  document.getElementById('btn-teclado-guardar').onclick = function () {
    var valor = parseInt(teclado.digitos || '0', 10);
    if (valor <= 0) return;

    if (teclado.editandoId) {
      // edición desde administración
      var i;
      for (i = 0; i < datos.ventas.length; i++) if (datos.ventas[i].id === teclado.editandoId) datos.ventas[i].valor = valor;
      for (i = 0; i < datos.gastos.length; i++) if (datos.gastos[i].id === teclado.editandoId) datos.gastos[i].valor = valor;
      guardar();
      irA('admin');
      pintarTabAdmin('movimientos');
      return;
    }

    if (teclado.modo === 'venta') {
      datos.ventas.push({ id: nuevoId(), familiaId: teclado.familiaId, valor: valor, fecha: new Date().toISOString() });
      guardar();
      var f = familiaPorId(teclado.familiaId);
      mostrarConfirmacion('¡Venta guardada!', (f ? svgIcono(f.icono) + ' ' + escaparHtml(f.nombre) : ''), valor, false);
    } else {
      datos.gastos.push({ id: nuevoId(), tipo: teclado.tipo, familiaId: teclado.familiaId, valor: valor, fecha: new Date().toISOString() });
      guardar();
      var t = tipoGastoPorId(teclado.tipo);
      mostrarConfirmacion('Gasto guardado', svgIcono(t.icono) + ' ' + t.nombre, valor, true);
    }
  };

  /* ---------------- confirmación ---------------- */

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

  /* ---------------- MI DÍA ---------------- */

  function pintarMiDia() {
    document.getElementById('midia-fecha').textContent = fechaLarga(new Date());
    var hoy = new Date();

    var ventasHoy = datos.ventas.filter(function (v) { return esMismoDia(v.fecha, hoy); });
    var gastosHoy = datos.gastos.filter(function (g) { return esMismoDia(g.fecha, hoy); });

    var totalVentas = ventasHoy.reduce(function (s, v) { return s + v.valor; }, 0);
    var totalGastos = gastosHoy.reduce(function (s, g) { return s + g.valor; }, 0);

    var html = '';
    html += '<div class="tarjeta tarjeta-grande">' +
      '<p class="tarjeta-titulo">Hoy ha vendido</p>' +
      '<p class="tarjeta-valor">' + fmt(totalVentas) + '</p>' +
      '<p class="tarjeta-sub">' + ventasHoy.length + (ventasHoy.length === 1 ? ' venta' : ' ventas') + '</p>' +
      '</div>';

    if (ventasHoy.length) {
      var porFamilia = {};
      ventasHoy.forEach(function (v) {
        if (!porFamilia[v.familiaId]) porFamilia[v.familiaId] = { total: 0, n: 0 };
        porFamilia[v.familiaId].total += v.valor;
        porFamilia[v.familiaId].n++;
      });
      html += '<div class="tarjeta">';
      datos.familias.forEach(function (f) {
        var p = porFamilia[f.id];
        if (!p) return;
        html += '<div class="fila-familia">' +
          '<span class="nombre">' + svgIcono(f.icono) + ' ' + escaparHtml(f.nombre) +
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

  var tabActual = 'reportes';

  document.querySelectorAll('.admin-tabs .tab').forEach(function (tab) {
    tab.addEventListener('click', function () { pintarTabAdmin(tab.getAttribute('data-tab')); });
  });

  function pintarTabAdmin(nombre) {
    tabActual = nombre;
    document.querySelectorAll('.admin-tabs .tab').forEach(function (t) {
      t.classList.toggle('tab-activo', t.getAttribute('data-tab') === nombre);
    });
    if (nombre === 'reportes') pintarReportes();
    if (nombre === 'familias') pintarFamiliasAdmin();
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

    // utilidad bruta según el margen de cada familia
    var utilidadBruta = 0;
    var porFamilia = {};
    ventas.forEach(function (v) {
      var f = familiaPorId(v.familiaId);
      var margen = f ? f.margen : 0;
      utilidadBruta += v.valor * margen / 100;
      if (!porFamilia[v.familiaId]) porFamilia[v.familiaId] = { total: 0, n: 0 };
      porFamilia[v.familiaId].total += v.valor;
      porFamilia[v.familiaId].n++;
    });

    // la mercancía no se resta de la utilidad (el margen ya descuenta el costo);
    // se muestra aparte como inversión en surtido
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
      '<div class="cifra"><p class="etiqueta">' + svgIcono('grafica') + ' Ganancia bruta</p><p class="numero positivo">' + fmt(utilidadBruta) + '</p><p class="nota">según margen de cada familia</p></div>' +
      '<div class="cifra"><p class="etiqueta">' + svgIcono('casa') + ' Gastos del local</p><p class="numero negativo">' + fmt(gastosOperativos) + '</p><p class="nota">arriendo, servicios y otros</p></div>' +
      '<div class="cifra"><p class="etiqueta">' + svgIcono('billetera') + ' Ganancia real</p><p class="numero ' + (utilidadNeta >= 0 ? 'positivo' : 'negativo') + '">' + fmt(utilidadNeta) + '</p><p class="nota">' + (utilidadNeta >= 0 ? 'el local está ganando' : 'el local está perdiendo') + '</p></div>' +
      '</div>';

    if (gastoMercancia > 0) {
      html += '<div class="aviso">Además se invirtieron <b>' + fmt(gastoMercancia) + '</b> en compra de mercancía. ' +
        'No se resta de la ganancia porque el margen de cada familia ya descuenta lo que costó el producto: es plata que quedó surtida en el local.</div>';
    }

    // barras por familia
    if (ventas.length) {
      html += '<p class="titulo-seccion">Ventas por familia</p><div class="tarjeta">';
      var maximo = 0;
      datos.familias.forEach(function (f) {
        if (porFamilia[f.id] && porFamilia[f.id].total > maximo) maximo = porFamilia[f.id].total;
      });
      var ordenadas = datos.familias.slice().filter(function (f) { return porFamilia[f.id]; })
        .sort(function (a, b) { return porFamilia[b.id].total - porFamilia[a.id].total; });
      ordenadas.forEach(function (f) {
        var p = porFamilia[f.id];
        var ancho = maximo ? Math.round(p.total / maximo * 100) : 0;
        var ganancia = p.total * f.margen / 100;
        html += '<div class="barra-fila">' +
          '<div class="barra-encima"><span class="nombre-barra">' + svgIcono(f.icono) + ' ' + escaparHtml(f.nombre) +
          ' <span class="detalle">(' + p.n + ' ventas · gana ' + fmt(ganancia) + ')</span></span>' +
          '<span>' + fmt(p.total) + '</span></div>' +
          '<div class="barra-fondo"><div class="barra-relleno" style="width:' + ancho + '%;background:' + f.color + '"></div></div>' +
          '</div>';
      });
      html += '</div>';
    } else {
      html += '<div class="tarjeta" style="text-align:center;color:var(--tinta-suave)">No hay ventas en este periodo.</div>';
    }

    // gastos por tipo
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

  /* ---------------- familias (administración) ---------------- */

  function pintarFamiliasAdmin() {
    var html = '<div class="aviso">El <b>margen</b> es el porcentaje de ganancia: si la perfumería deja el 40%, de una venta de $100.000 la ganancia es $40.000.</div>';
    datos.familias.forEach(function (f) {
      html += '<div class="fila-admin' + (f.activa ? '' : ' inactiva') + '">' +
        '<div class="info"><span class="insignia" style="background:' + f.color + '">' + svgIcono(f.icono) + '</span>' +
        '<div class="textos"><p class="nombre">' + escaparHtml(f.nombre) + (f.activa ? '' : ' (oculta)') + '</p>' +
        '<p class="sub">Margen de ganancia: ' + f.margen + '%</p></div></div>' +
        '<div class="acciones">' +
        '<button class="btn-mini" data-editar-familia="' + f.id + '" aria-label="Editar">' + svgIcono('lapiz') + '</button>' +
        '<button class="btn-mini peligro" data-quitar-familia="' + f.id + '" aria-label="' + (f.activa ? 'Ocultar' : 'Mostrar') + '">' + svgIcono(f.activa ? 'basura' : 'ojo') + '</button>' +
        '</div></div>';
    });
    html += '<button class="btn-agregar" id="btn-agregar-familia">＋ Agregar familia</button>';
    document.getElementById('admin-contenido').innerHTML = html;

    document.querySelectorAll('[data-editar-familia]').forEach(function (b) {
      b.addEventListener('click', function () { modalFamilia(b.getAttribute('data-editar-familia')); });
    });
    document.querySelectorAll('[data-quitar-familia]').forEach(function (b) {
      b.addEventListener('click', function () { quitarFamilia(b.getAttribute('data-quitar-familia')); });
    });
    document.getElementById('btn-agregar-familia').onclick = function () { modalFamilia(null); };
  }

  function modalFamilia(id) {
    var f = id ? familiaPorId(id) : { nombre: '', icono: ICONOS[0], color: COLORES[0], margen: 40 };
    var elegido = { icono: f.icono, color: f.color };

    var html = '<h2>' + (id ? 'Editar familia' : 'Nueva familia') + '</h2>' +
      '<div class="campo"><label>Nombre</label><input id="campo-nombre" type="text" maxlength="22" value="' + escaparHtml(f.nombre) + '" placeholder="Ej: Perfumería"></div>' +
      '<div class="campo"><label>Margen de ganancia (%)</label><input id="campo-margen" type="number" inputmode="numeric" min="0" max="95" value="' + f.margen + '"></div>' +
      '<div class="campo"><label>Ícono</label><div class="selector-iconos">' +
      ICONOS.map(function (ic) {
        return '<button class="opcion-icono' + (ic === f.icono ? ' elegido' : '') + '" data-icono="' + ic + '" title="' + ICONOS_SVG[ic].n + '" aria-label="' + ICONOS_SVG[ic].n + '">' + svgIcono(ic) + '</button>';
      }).join('') + '</div></div>' +
      '<div class="campo"><label>Color del botón</label><div class="selector-colores">' +
      COLORES.map(function (c) {
        return '<button class="opcion-color' + (c === f.color ? ' elegido' : '') + '" data-color="' + c + '" style="background:' + c + '"></button>';
      }).join('') + '</div></div>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
      '<button class="btn-grande btn-guardar" data-accion="guardar-familia">' + svgIcono('check') + ' Guardar</button>' +
      '</div>';

    abrirModal(html, function (accion) {
      if (accion !== 'guardar-familia') return;
      var nombre = document.getElementById('campo-nombre').value.trim();
      var margen = parseInt(document.getElementById('campo-margen').value, 10);
      if (!nombre) { avisoError('Escriba el nombre de la familia.'); return 'mantener'; }
      if (isNaN(margen) || margen < 0 || margen > 95) { avisoError('El margen debe ser un número entre 0 y 95.'); return 'mantener'; }
      if (id) {
        f.nombre = nombre; f.margen = margen; f.icono = elegido.icono; f.color = elegido.color;
      } else {
        datos.familias.push({ id: nuevoId(), nombre: nombre, icono: elegido.icono, color: elegido.color, margen: margen, activa: true });
      }
      guardar();
      pintarFamiliasAdmin();
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

  function quitarFamilia(id) {
    var f = familiaPorId(id);
    if (!f) return;
    if (!f.activa) {
      f.activa = true;
      guardar();
      pintarFamiliasAdmin();
      return;
    }
    var tieneMovimientos = datos.ventas.some(function (v) { return v.familiaId === id; }) ||
      datos.gastos.some(function (g) { return g.familiaId === id; });
    if (tieneMovimientos) {
      abrirModal(
        '<h2>Ocultar familia</h2>' +
        '<p>La familia <b>' + escaparHtml(f.nombre) + '</b> ya tiene ventas registradas, así que no se puede borrar (se perdería la historia). Se puede <b>ocultar</b>: desaparece de la pantalla de ventas pero sus números se conservan en los reportes.</p>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-rojo" data-accion="ocultar">Ocultarla</button></div>',
        function (accion) {
          if (accion === 'ocultar') { f.activa = false; guardar(); pintarFamiliasAdmin(); }
        }
      );
    } else {
      abrirModal(
        '<h2>¿Borrar familia?</h2><p>La familia <b>' + escaparHtml(f.nombre) + '</b> no tiene ventas registradas y se borrará por completo.</p>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-rojo" data-accion="borrar">Sí, borrarla</button></div>',
        function (accion) {
          if (accion === 'borrar') {
            datos.familias = datos.familias.filter(function (x) { return x.id !== id; });
            guardar();
            pintarFamiliasAdmin();
          }
        }
      );
    }
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
        var f = familiaPorId(x.m.familiaId);
        etiqueta = f ? f.nombre : 'Venta';
        icono = f ? f.icono : 'etiqueta';
      } else {
        var t = tipoGastoPorId(x.m.tipo);
        etiqueta = t.nombre;
        if (x.m.tipo === 'mercancia' && x.m.familiaId) {
          var fg = familiaPorId(x.m.familiaId);
          if (fg) etiqueta += ' · ' + fg.nombre;
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
    if (x.clase === 'venta') {
      abrirTeclado({ modo: 'venta', familiaId: x.m.familiaId, editandoId: id, valorInicial: x.m.valor });
    } else {
      abrirTeclado({ modo: 'gasto', tipo: x.m.tipo, familiaId: x.m.familiaId, editandoId: id, valorInicial: x.m.valor });
    }
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
      version: 1,
      exportado: new Date().toISOString(),
      datos: datos
    }, null, 1);

    var hoy = new Date();
    var nombre = 'respaldo-variedades-naranjo-' + hoy.getFullYear() + '-' +
      ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) + '.json';
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
            datos = paquete.datos;
            migrarIconos(datos);
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
        '<p>Se borrarán <b>' + datos.ventas.length + ' ventas</b> y <b>' + datos.gastos.length + ' gastos</b> para siempre. ' +
        'Si no está seguro, haga primero un respaldo.</p>' +
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
      if (resultado !== 'mantener') {
        fondo.classList.add('oculto');
        caja.innerHTML = '';
      }
    };
  }

  /* ---------------- service worker ---------------- */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* sin SW sigue funcionando */ });
    });
  }

  /* ---------------- arranque ---------------- */

  guardar(); // asegura que los datos iniciales queden grabados desde la primera vez
  pintarIconosEstaticos();
  pintarVentas();

})();
