/* ============================================================
   Variedades Naranjo — lógica de la aplicación
   Todo se guarda en la memoria de la tablet (localStorage).
   No necesita internet para funcionar.
   ============================================================ */

(function () {
  'use strict';

  var CLAVE_DATOS = 'vn_datos_v1';

  /* ---------------- datos ---------------- */

  function datosIniciales() {
    return {
      version: 1,
      config: { nombre: 'Variedades Naranjo', clave: '1234', ultimoRespaldo: null },
      familias: [
        { id: 'f1', nombre: 'Perfumería', icono: '🧴', color: '#7C3AED', margen: 40, activa: true },
        { id: 'f2', nombre: 'Bisutería', icono: '📿', color: '#1098AD', margen: 50, activa: true },
        { id: 'f3', nombre: 'Peluches', icono: '🧸', color: '#E64980', margen: 40, activa: true },
        { id: 'f4', nombre: 'Aretes', icono: '✨', color: '#F08C00', margen: 50, activa: true },
        { id: 'f5', nombre: 'Accesorios', icono: '👜', color: '#3B5BDB', margen: 50, activa: true },
        { id: 'f6', nombre: 'Otros', icono: '🎁', color: '#2F9E44', margen: 40, activa: true }
      ],
      ventas: [],   // { id, familiaId, valor, fecha }
      gastos: []    // { id, tipo, familiaId|null, valor, fecha }
    };
  }

  var TIPOS_GASTO = [
    { tipo: 'arriendo', nombre: 'Arriendo', icono: '🏠', color: '#5C940D' },
    { tipo: 'servicios', nombre: 'Servicios', icono: '💡', color: '#E8590C' },
    { tipo: 'mercancia', nombre: 'Mercancía', icono: '📦', color: '#1971C2' },
    { tipo: 'otro', nombre: 'Otro gasto', icono: '📝', color: '#862E9C' }
  ];

  var ICONOS = ['🧴', '📿', '🧸', '✨', '👜', '💍', '💄', '🕶️', '⌚', '🎀', '🧦', '👛', '🪞', '🧢', '🎁', '💅', '🩴', '🛍️', '📦', '🎈', '🧵', '🪮', '🌸', '⭐'];
  var COLORES = ['#E8590C', '#7C3AED', '#1098AD', '#E64980', '#2F9E44', '#F08C00', '#3B5BDB', '#D6336C', '#0CA678', '#845EF7', '#C92A2A', '#5C940D'];

  var datos = cargar();

  function cargar() {
    try {
      var crudo = localStorage.getItem(CLAVE_DATOS);
      if (!crudo) return datosIniciales();
      var d = JSON.parse(crudo);
      if (!d || !d.familias || !d.ventas || !d.gastos || !d.config) return datosIniciales();
      return d;
    } catch (e) {
      return datosIniciales();
    }
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

  /* sonido suave de confirmación */
  function sonidoOk() {
    try {
      var ctx = sonidoOk.ctx || (sonidoOk.ctx = new (window.AudioContext || window.webkitAudioContext)());
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) { /* sin sonido, no pasa nada */ }
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
      btn.style.background = f.color;
      btn.innerHTML = '<span class="icono">' + f.icono + '</span>' + escaparHtml(f.nombre);
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
    document.getElementById('banner-detalle').textContent =
      (f ? f.icono + ' ' + f.nombre : 'Venta') + ' — ' + fmt(v.valor);
    banner.classList.remove('oculto');
  }

  document.getElementById('btn-deshacer').onclick = function () {
    var v = ultimaVentaDeHoy();
    if (!v) return;
    var f = familiaPorId(v.familiaId);
    abrirModal(
      '<h2>¿Borrar esta venta?</h2>' +
      '<p style="font-size:1.3rem;font-weight:800;text-align:center;">' +
      (f ? f.icono + ' ' + escaparHtml(f.nombre) : '') + '<br>' + fmt(v.valor) + '</p>' +
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
      btn.style.background = t.color;
      btn.innerHTML = '<span class="icono">' + t.icono + '</span>' + t.nombre;
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
      btn.style.background = f.color;
      btn.innerHTML = '<span class="icono">' + f.icono + '</span>' + escaparHtml(f.nombre);
      btn.onclick = function () { abrirTeclado({ modo: 'gasto', tipo: 'mercancia', familiaId: f.id }); };
      grid.appendChild(btn);
    });
    var btn = document.createElement('button');
    btn.className = 'btn-familia';
    btn.style.background = '#868E96';
    btn.innerHTML = '<span class="icono">🤷</span>No sé / Varias';
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
      ctx.innerHTML = '<span class="icono">' + (f ? f.icono : '🛍️') + '</span> Venta de ' + escaparHtml(f ? f.nombre : '');
      ctx.style.color = f ? f.color : 'inherit';
    } else {
      var t = tipoGastoPorId(teclado.tipo);
      var extra = '';
      if (teclado.tipo === 'mercancia' && teclado.familiaId) {
        var fg = familiaPorId(teclado.familiaId);
        if (fg) extra = ' (' + escaparHtml(fg.nombre) + ')';
      }
      ctx.innerHTML = '<span class="icono">' + t.icono + '</span> Gasto: ' + t.nombre + extra;
      ctx.style.color = t.color;
    }
    pintarMonto();
    irA('teclado');
  }

  function pintarMonto() {
    var valor = parseInt(teclado.digitos || '0', 10);
    document.getElementById('teclado-monto').textContent = fmt(valor);
    document.getElementById('teclado-letras').textContent = valor > 0 ? numeroALetras(valor) : ' ';
    document.getElementById('btn-teclado-guardar').disabled = valor <= 0;
  }

  document.querySelectorAll('#pantalla-teclado .tecla').forEach(function (tecla) {
    tecla.addEventListener('click', function () {
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
      mostrarConfirmacion('¡Venta guardada!', (f ? f.icono + ' ' + f.nombre : ''), valor, false);
    } else {
      datos.gastos.push({ id: nuevoId(), tipo: teclado.tipo, familiaId: teclado.familiaId, valor: valor, fecha: new Date().toISOString() });
      guardar();
      var t = tipoGastoPorId(teclado.tipo);
      mostrarConfirmacion('Gasto guardado', t.icono + ' ' + t.nombre, valor, true);
    }
  };

  /* ---------------- confirmación ---------------- */

  var confirmacionTimer = null;

  function mostrarConfirmacion(titulo, detalle, valor, esGasto) {
    var overlay = document.getElementById('overlay-confirmacion');
    overlay.classList.toggle('gasto', !!esGasto);
    document.getElementById('confirmacion-titulo').textContent = titulo;
    document.getElementById('confirmacion-detalle').textContent = detalle;
    document.getElementById('confirmacion-monto').textContent = fmt(valor);
    document.getElementById('confirmacion-letras').textContent = numeroALetras(valor);
    overlay.classList.remove('oculto');
    sonidoOk();
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
          '<span class="nombre">' + f.icono + ' ' + escaparHtml(f.nombre) +
          '<span class="cuantas">(' + p.n + ')</span></span>' +
          '<span class="valor">' + fmt(p.total) + '</span></div>';
      });
      html += '</div>';
    }

    if (gastosHoy.length) {
      html += '<div class="tarjeta"><div class="fila-familia">' +
        '<span class="nombre">💸 Gastos de hoy</span>' +
        '<span class="valor" style="color:var(--rojo)">' + fmt(totalGastos) + '</span></div></div>';
    }

    if (!ventasHoy.length && !gastosHoy.length) {
      html += '<div class="tarjeta" style="text-align:center;font-size:1.15rem;color:var(--gris)">Todavía no hay ventas hoy.<br>¡Ánimo! 💪</div>';
    }

    document.getElementById('midia-contenido').innerHTML = html;
  }

  /* ---------------- clave de administración ---------------- */

  var claveEscrita = '';

  document.getElementById('btn-admin').onclick = function () {
    claveEscrita = '';
    pintarPuntos();
    document.getElementById('clave-error').textContent = ' ';
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
      '<div class="cifra"><p class="etiqueta">🛍️ Ventas</p><p class="numero">' + fmt(totalVentas) + '</p><p class="nota">' + ventas.length + ' ventas</p></div>' +
      '<div class="cifra"><p class="etiqueta">📈 Ganancia bruta</p><p class="numero positivo">' + fmt(utilidadBruta) + '</p><p class="nota">según margen de cada familia</p></div>' +
      '<div class="cifra"><p class="etiqueta">🏠 Gastos del local</p><p class="numero negativo">' + fmt(gastosOperativos) + '</p><p class="nota">arriendo, servicios y otros</p></div>' +
      '<div class="cifra"><p class="etiqueta">💰 Ganancia real</p><p class="numero ' + (utilidadNeta >= 0 ? 'positivo' : 'negativo') + '">' + fmt(utilidadNeta) + '</p><p class="nota">' + (utilidadNeta >= 0 ? 'el local está ganando' : 'el local está perdiendo') + '</p></div>' +
      '</div>';

    if (gastoMercancia > 0) {
      html += '<div class="aviso">📦 Además se invirtieron <b>' + fmt(gastoMercancia) + '</b> en compra de mercancía. ' +
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
          '<div class="barra-encima"><span>' + f.icono + ' ' + escaparHtml(f.nombre) +
          ' <span class="detalle">(' + p.n + ' ventas · gana ' + fmt(ganancia) + ')</span></span>' +
          '<span>' + fmt(p.total) + '</span></div>' +
          '<div class="barra-fondo"><div class="barra-relleno" style="width:' + ancho + '%;background:' + f.color + '"></div></div>' +
          '</div>';
      });
      html += '</div>';
    } else {
      html += '<div class="tarjeta" style="text-align:center;color:var(--gris)">No hay ventas en este periodo.</div>';
    }

    // gastos por tipo
    if (gastos.length) {
      html += '<p class="titulo-seccion">Gastos del periodo</p><div class="tarjeta">';
      TIPOS_GASTO.forEach(function (t) {
        if (!porTipoGasto[t.tipo]) return;
        html += '<div class="fila-familia"><span class="nombre">' + t.icono + ' ' + t.nombre + '</span>' +
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
        '<div class="info"><span class="punto-color" style="background:' + f.color + '"></span>' +
        '<span class="icono">' + f.icono + '</span>' +
        '<div class="textos"><p class="nombre">' + escaparHtml(f.nombre) + (f.activa ? '' : ' (oculta)') + '</p>' +
        '<p class="sub">Margen de ganancia: ' + f.margen + '%</p></div></div>' +
        '<div class="acciones">' +
        '<button class="btn-mini" data-editar-familia="' + f.id + '">✏️</button>' +
        '<button class="btn-mini peligro" data-quitar-familia="' + f.id + '">' + (f.activa ? '🗑️' : '👁️') + '</button>' +
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
        return '<button class="opcion-icono' + (ic === f.icono ? ' elegido' : '') + '" data-icono="' + ic + '">' + ic + '</button>';
      }).join('') + '</div></div>' +
      '<div class="campo"><label>Color del botón</label><div class="selector-colores">' +
      COLORES.map(function (c) {
        return '<button class="opcion-color' + (c === f.color ? ' elegido' : '') + '" data-color="' + c + '" style="background:' + c + '"></button>';
      }).join('') + '</div></div>' +
      '<div class="modal-acciones">' +
      '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
      '<button class="btn-grande btn-guardar" data-accion="guardar-familia">✔ Guardar</button>' +
      '</div>';

    abrirModal(html, function (accion) {
      if (accion !== 'guardar-familia') return;
      var nombre = document.getElementById('campo-nombre').value.trim();
      var margen = parseInt(document.getElementById('campo-margen').value, 10);
      if (!nombre) { alert('Escriba el nombre de la familia.'); return 'mantener'; }
      if (isNaN(margen) || margen < 0 || margen > 95) { alert('El margen debe ser un número entre 0 y 95.'); return 'mantener'; }
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
      html += '<div class="tarjeta" style="text-align:center;color:var(--gris)">No hay registros todavía.</div>';
    }

    recortada.forEach(function (x) {
      var etiqueta, icono;
      if (x.clase === 'venta') {
        var f = familiaPorId(x.m.familiaId);
        etiqueta = f ? f.nombre : 'Venta';
        icono = f ? f.icono : '🛍️';
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
        '<div class="info"><span class="icono">' + icono + '</span>' +
        '<div class="textos"><p class="nombre">' + escaparHtml(etiqueta) + '</p>' +
        '<p class="sub">' + fechaCorta(x.m.fecha) + '</p></div></div>' +
        '<div class="acciones"><span class="monto ' + x.clase + '">' + (x.clase === 'gasto' ? '−' : '') + fmt(x.m.valor) + '</span>' +
        '<button class="btn-mini" data-editar-mov="' + x.m.id + '">✏️</button>' +
        '<button class="btn-mini peligro" data-borrar-mov="' + x.m.id + '">🗑️</button>' +
        '</div></div>';
    });

    if (lista.length > recortada.length) {
      html += '<p style="text-align:center;color:var(--gris);font-size:0.85rem">Mostrando los ' + recortada.length + ' más recientes de ' + lista.length + '.</p>';
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
      '<div class="tarjeta"><div class="fila-familia"><span class="nombre">🛍️ Ventas guardadas</span><span class="valor">' + datos.ventas.length + '</span></div>' +
      '<div class="fila-familia"><span class="nombre">💸 Gastos guardados</span><span class="valor">' + datos.gastos.length + '</span></div>' +
      '<div class="fila-familia"><span class="nombre">💾 Último respaldo</span><span class="valor">' + ultimo + '</span></div></div>' +
      '<button class="btn-bloque principal" id="btn-respaldar"><span class="icono">📤</span><span>Enviar respaldo<small>Comparte un archivo por WhatsApp o lo descarga</small></span></button>' +
      '<button class="btn-bloque" id="btn-restaurar"><span class="icono">📥</span><span>Restaurar desde un archivo<small>Recupera todo en una tablet nueva</small></span></button>' +
      '<div class="aviso">💡 Hagan un respaldo <b>al menos una vez por semana</b>. Si la tablet se daña o se pierde, con el archivo del respaldo se recupera toda la contabilidad.</div>';
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
      '<button class="btn-bloque" id="btn-cambiar-clave"><span class="icono">🔑</span><span>Cambiar la clave de administración<small>La clave actual tiene 4 números</small></span></button>' +
      '<button class="btn-bloque peligro" id="btn-borrar-todo"><span class="icono">⚠️</span><span>Borrar TODOS los datos<small>Empieza de cero. No se puede deshacer.</small></span></button>';
    document.getElementById('admin-contenido').innerHTML = html;

    document.getElementById('btn-guardar-nombre').onclick = function () {
      var nombre = document.getElementById('campo-nombre-local').value.trim();
      if (!nombre) return;
      datos.config.nombre = nombre;
      guardar();
      abrirModal('<h2>✔ Listo</h2><p>El nombre quedó guardado.</p>' +
        '<div class="modal-acciones"><button class="btn-grande btn-guardar" data-accion="cerrar">Entendido</button></div>', function () {});
    };

    document.getElementById('btn-cambiar-clave').onclick = function () {
      abrirModal(
        '<h2>Cambiar clave</h2>' +
        '<div class="campo"><label>Nueva clave (4 números)</label>' +
        '<input id="campo-clave" type="tel" inputmode="numeric" maxlength="4" placeholder="••••"></div>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-guardar" data-accion="guardar-clave">✔ Guardar</button></div>',
        function (accion) {
          if (accion !== 'guardar-clave') return;
          var clave = document.getElementById('campo-clave').value.trim();
          if (!/^\d{4}$/.test(clave)) { alert('La clave debe tener exactamente 4 números.'); return 'mantener'; }
          datos.config.clave = clave;
          guardar();
        }
      );
    };

    document.getElementById('btn-borrar-todo').onclick = function () {
      abrirModal(
        '<h2>⚠️ Borrar todo</h2>' +
        '<p>Se borrarán <b>' + datos.ventas.length + ' ventas</b> y <b>' + datos.gastos.length + ' gastos</b> para siempre. ' +
        'Si no está seguro, haga primero un respaldo.</p>' +
        '<div class="campo"><label>Para confirmar, escriba BORRAR</label><input id="campo-borrar" type="text" autocapitalize="characters"></div>' +
        '<div class="modal-acciones">' +
        '<button class="btn-grande btn-cancelar" data-accion="cerrar">Cancelar</button>' +
        '<button class="btn-grande btn-rojo" data-accion="borrar-todo">Borrar todo</button></div>',
        function (accion) {
          if (accion !== 'borrar-todo') return;
          var texto = document.getElementById('campo-borrar').value.trim().toUpperCase();
          if (texto !== 'BORRAR') { alert('Escriba la palabra BORRAR para confirmar.'); return 'mantener'; }
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
  pintarVentas();

})();
