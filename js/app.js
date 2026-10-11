/**
 * app.js — Entrada, navegación y coordinación.
 * Conecta juego (reglas), ui (DOM) y almacenamiento (persistencia).
 */

import {
  estado,
  iniciarPartida,
  responder,
  usarComodin,
  iniciarTemporizador,
  detenerTemporizador,
  siguientePregunta,
  obtenerResumen,
  obtenerPreguntaActual,
  resolverDestinoHash
} from './juego.js';
import {
  cargarRanking,
  guardarEnRanking,
  borrarRanking,
  actualizarEstadisticas,
  obtenerResumenEstadisticas,
  obtenerMejorPuntaje,
  cargarPreferencias,
  guardarPreferencias
} from './almacenamiento.js';
import * as ui from './ui.js';

/** Selección de filtros en pantalla de configuración. */
const config = {
  categoria: 'todas',
  dificultad: 'facil'
};

/** Última entrada guardada (para resaltar en ranking). */
let ultimaEntradaRanking = null;

/** Preferencias en memoria. */
let prefs = cargarPreferencias();

/** Partida en curso (no guardada aún / no abandonada). */
let partidaActiva = false;

/** Hay un resultado reciente para permitir #resultado. */
let hayResultado = false;

/** Pantalla lógica actual (para historial). */
let pantallaActual = 'inicio';

/** Evita dobles clics en acciones sensibles. */
let bloqueoAccion = false;

/** Web Audio: se crea tras el primer gesto del usuario. */
let audioCtx = null;

function asegurarAudio() {
  if (!prefs.sonido) return null;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Beep corto con oscilador (sin archivos externos).
 * @param {'acierto'|'error'|'click'|'comodin'} tipo
 */
function reproducirSonido(tipo) {
  const ctx = asegurarAudio();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  const ahora = ctx.currentTime;
  const mapa = {
    acierto: { freq: 660, dur: 0.12, type: 'sine' },
    error: { freq: 180, dur: 0.18, type: 'triangle' },
    click: { freq: 420, dur: 0.05, type: 'sine' },
    comodin: { freq: 520, dur: 0.1, type: 'square' }
  };
  const cfg = mapa[tipo] ?? mapa.click;
  osc.type = cfg.type;
  osc.frequency.setValueAtTime(cfg.freq, ahora);
  gain.gain.setValueAtTime(0.0001, ahora);
  gain.gain.exponentialRampToValueAtTime(0.08, ahora + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ahora + cfg.dur);
  osc.start(ahora);
  osc.stop(ahora + cfg.dur + 0.02);
}

function validarNombre(raw) {
  const nombre = String(raw ?? '').trim();
  if (nombre.length < 1 || nombre.length > 20) {
    return { ok: false, nombre, error: 'El nombre debe tener entre 1 y 20 caracteres.' };
  }
  return { ok: true, nombre, error: '' };
}

function refrescarMejorEnConfig() {
  const nombre = document.getElementById('entrada-nombre')?.value?.trim()
    || prefs.ultimoNombre
    || estado.nombre;
  const mejor = nombre
    ? obtenerMejorPuntaje(nombre, config.categoria, config.dificultad)
    : null;
  ui.renderizarConfiguracion(
    nombre || estado.nombre,
    config.categoria,
    config.dificultad,
    mejor
  );
}

/**
 * Empuja o reemplaza el hash de pantalla.
 * @param {string} destino
 * @param {{ reemplazar?: boolean }} [opts]
 */
function sincronizarHistorial(destino, opts = {}) {
  const hash = `#${destino}`;
  const estadoHist = { pantalla: destino };
  if (opts.reemplazar) {
    history.replaceState(estadoHist, '', hash);
  } else if (location.hash !== hash) {
    history.pushState(estadoHist, '', hash);
  } else {
    history.replaceState(estadoHist, '', hash);
  }
}

/**
 * Abandona la partida sin guardar y vuelve a configuración.
 */
function abandonarPartida() {
  detenerTemporizador();
  partidaActiva = false;
  estado.preguntas = [];
  estado.respondida = false;
  estado.historial = [];
}

/**
 * Navegación central: data-ir, historial y guards de partida.
 * @param {string} destino
 * @param {{ desdeHistor?: boolean, reemplazar?: boolean, forzar?: boolean }} [opts]
 */
async function irA(destino, opts = {}) {
  const { desdeHistor = false, reemplazar = false, forzar = false } = opts;

  const resuelto = resolverDestinoHash(`#${destino}`, {
    hayPartida: partidaActiva,
    hayResultado
  });

  // Si pedían juego/resultado inválidos, redirigir al fallback
  if (resuelto !== destino && (destino === 'juego' || destino === 'resultado')) {
    return irA(resuelto, { reemplazar: true });
  }

  const dejandoPartida =
    partidaActiva &&
    !forzar &&
    destino !== 'juego' &&
    destino !== 'retroalimentacion';

  if (dejandoPartida) {
    const confirmar = await ui.confirmarSalirPartida();
    if (!confirmar) {
      // Seguir jugando: mantener / restaurar #juego en el historial
      if (desdeHistorial || location.hash !== '#juego') {
        history.pushState({ pantalla: 'juego' }, '', '#juego');
      }
      return;
    }
    abandonarPartida();
    if (destino === 'inicio' || destino === 'instrucciones' || destino === 'ranking') {
      // ok
    } else {
      destino = 'configuracion';
    }
  }

  if (destino === 'ranking') {
    ui.renderizarRanking(cargarRanking(), ultimaEntradaRanking, obtenerResumenEstadisticas());
  }
  if (destino === 'configuracion') {
    refrescarMejorEnConfig();
  }

  // Retroalimentación comparte hash #juego
  const hashPantalla = destino === 'retroalimentacion' ? 'juego' : destino;
  pantallaActual = destino;
  if (!desdeHistorial) {
    sincronizarHistorial(hashPantalla, { reemplazar });
  } else if (location.hash !== `#${hashPantalla}`) {
    history.replaceState({ pantalla: hashPantalla }, '', `#${hashPantalla}`);
  }

  ui.mostrarPantalla(destino);
}

function alTick(segundos) {
  ui.actualizarTemporizador(segundos, estado.tiempoMaxPregunta);
}

function alAgotar() {
  if (estado.respondida) return;
  finalizarRespuesta(responder(null));
}

function mostrarPreguntaActual() {
  const pregunta = obtenerPreguntaActual();
  if (!pregunta) return;

  ui.mostrarPregunta(
    pregunta,
    estado.indice + 1,
    estado.preguntas.length,
    estado.dificultad
  );
  ui.actualizarMarcador(estado.puntaje, estado.racha);
  ui.actualizarComodines(estado.comodines, false);
  ui.actualizarTemporizador(estado.tiempoRestante, estado.tiempoMaxPregunta);
  irA('juego', { reemplazar: pantallaActual === 'juego' || pantallaActual === 'retroalimentacion' });
  iniciarTemporizador(alTick, alAgotar);
}

/**
 * @param {object|null} resultado
 */
function finalizarRespuesta(resultado) {
  if (!resultado) return;

  detenerTemporizador();
  ui.actualizarMarcador(estado.puntaje, estado.racha);
  ui.actualizarComodines(estado.comodines, true);

  reproducirSonido(resultado.correcta ? 'acierto' : 'error');

  const pregunta = obtenerPreguntaActual();
  ui.mostrarRetroalimentacion(
    {
      correcta: resultado.correcta,
      puntosGanados: resultado.puntosGanados,
      explicacion: resultado.explicacion,
      tiempoAgotado: resultado.tiempoAgotado,
      indiceElegido: resultado.indiceElegido,
      indiceCorrecta: resultado.indiceCorrecta,
      opciones: resultado.opciones,
      enunciado: resultado.enunciado
    },
    ui.nombreCategoria(pregunta?.categoria ?? estado.categoria),
    ui.nombreDificultad(estado.dificultad),
    estado.indice + 1,
    estado.preguntas.length,
    estado.puntaje,
    estado.racha,
    estado.tiempoRestante
  );
  pantallaActual = 'retroalimentacion';
  // Mantener hash #juego durante la retroalimentación
  if (location.hash !== '#juego') {
    history.replaceState({ pantalla: 'juego' }, '', '#juego');
  }
}

function comenzarPartida() {
  const nombre =
    estado.nombre ||
    document.getElementById('entrada-nombre')?.value?.trim() ||
    prefs.ultimoNombre;
  const check = validarNombre(nombre);
  if (!check.ok) {
    irA('inicio', { reemplazar: true });
    ui.mostrarErrorNombre(check.error);
    return;
  }

  iniciarPartida(check.nombre, config.categoria, config.dificultad);
  partidaActiva = true;
  hayResultado = false;
  mostrarPreguntaActual();
}

function terminarPartida() {
  const resumen = obtenerResumen();
  const entrada = {
    nombre: resumen.nombre,
    puntaje: resumen.puntaje,
    categoria: resumen.categoria,
    dificultad: resumen.dificultad,
    aciertos: resumen.aciertos,
    tiempoTotal: resumen.tiempoTotal,
    fecha: new Date().toISOString()
  };

  const posicion = guardarEnRanking(entrada);
  ultimaEntradaRanking = entrada;

  actualizarEstadisticas({
    nombre: resumen.nombre,
    categoriaFiltro: resumen.categoria,
    dificultad: resumen.dificultad,
    puntaje: resumen.puntaje,
    aciertos: resumen.aciertos,
    totalPreguntas: resumen.totalPreguntas,
    detallePreguntas: resumen.detallePreguntas
  });

  partidaActiva = false;
  hayResultado = true;
  ui.mostrarResultado(resumen, posicion);
  pantallaActual = 'resultado';
  sincronizarHistorial('resultado');
}

async function onSiguiente() {
  if (!estado.respondida || bloqueoAccion) return;
  bloqueoAccion = true;
  const btn = document.getElementById('btn-siguiente');
  if (btn) btn.disabled = true;
  try {
    const hayMas = siguientePregunta();
    if (hayMas) mostrarPreguntaActual();
    else terminarPartida();
  } finally {
    bloqueoAccion = false;
    if (btn) btn.disabled = false;
  }
}

function onRespuestaClick(evento) {
  const boton = evento.target.closest('.opcion');
  if (!boton || estado.respondida) return;
  if (boton.getAttribute('aria-disabled') === 'true') return;
  if (boton.classList.contains('opcion--oculta')) return;

  const indice = Number(boton.dataset.opcion);
  if (Number.isNaN(indice)) return;
  finalizarRespuesta(responder(indice));
}

function onTeclado(evento) {
  const juegoVisible = document.getElementById('pantalla-juego');
  if (!juegoVisible || juegoVisible.hidden || estado.respondida) return;

  const tecla = evento.key.toLowerCase();
  const mapa = {
    '1': 0,
    '2': 1,
    '3': 2,
    '4': 3,
    a: 0,
    b: 1,
    c: 2,
    d: 3
  };
  if (!(tecla in mapa)) return;

  const indice = mapa[tecla];
  const boton = document.querySelector(`#juego-opciones [data-opcion="${indice}"]`);
  if (!boton || boton.classList.contains('opcion--oculta')) return;
  if (boton.getAttribute('aria-disabled') === 'true') return;

  evento.preventDefault();
  finalizarRespuesta(responder(indice));
}

function enlazarConfiguracion() {
  document.querySelectorAll('.rejilla-categorias .tarjeta-opcion').forEach((boton) => {
    boton.addEventListener('click', () => {
      const valor = boton.getAttribute('data-categoria');
      if (!valor) return;
      config.categoria = valor;
      reproducirSonido('click');
      refrescarMejorEnConfig();
    });
  });

  document.querySelectorAll('.rejilla-niveles .tarjeta-nivel').forEach((boton) => {
    boton.addEventListener('click', () => {
      const valor = boton.getAttribute('data-dificultad');
      if (!valor) return;
      config.dificultad = valor;
      reproducirSonido('click');
      refrescarMejorEnConfig();
    });
  });
}

function aplicarPreferenciasIniciales() {
  ui.aplicarTema(prefs.tema);
  ui.aplicarSonido(prefs.sonido);

  const entrada = document.getElementById('entrada-nombre');
  if (entrada && prefs.ultimoNombre) {
    entrada.value = prefs.ultimoNombre;
  }
}

async function alPopState() {
  const destino = resolverDestinoHash(location.hash, {
    hayPartida: partidaActiva,
    hayResultado
  });

  if (partidaActiva && destino !== 'juego') {
    const confirmar = await ui.confirmarSalirPartida();
    if (!confirmar) {
      history.pushState({ pantalla: 'juego' }, '', '#juego');
      return;
    }
    abandonarPartida();
    await irA(destino === 'resultado' ? 'configuracion' : destino, {
      desdeHistor: true,
      forzar: true
    });
    return;
  }

  await irA(destino, { desdeHistor: true, forzar: true });
}

function inicializar() {
  aplicarPreferenciasIniciales();

  // Reload siempre a inicio (ignora hash previo)
  partidaActiva = false;
  hayResultado = false;
  pantallaActual = 'inicio';
  history.replaceState({ pantalla: 'inicio' }, '', '#inicio');
  ui.mostrarPantalla('inicio');

  // Primer gesto: habilita AudioContext (política del navegador)
  const desbloquearAudio = () => {
    asegurarAudio();
    document.removeEventListener('pointerdown', desbloquearAudio);
  };
  document.addEventListener('pointerdown', desbloquearAudio);

  window.addEventListener('popstate', () => {
    alPopState();
  });

  // Aviso al cerrar/recargar con partida en curso
  window.addEventListener('beforeunload', (evento) => {
    if (!partidaActiva) return;
    evento.preventDefault();
    evento.returnValue = '';
  });

  document.querySelectorAll('[data-ir]').forEach((elemento) => {
    elemento.addEventListener('click', (evento) => {
      if (elemento.id === 'btn-siguiente') return;
      evento.preventDefault();
      const destino = elemento.getAttribute('data-ir');
      if (!destino) return;
      irA(destino);
    });
  });

  document.getElementById('btn-jugar')?.addEventListener('click', async () => {
    if (bloqueoAccion) return;
    bloqueoAccion = true;
    try {
      const entrada = document.getElementById('entrada-nombre');
      const check = validarNombre(entrada?.value);
      if (!check.ok) {
        ui.mostrarErrorNombre(check.error);
        return;
      }
      ui.limpiarErrorNombre();
      estado.nombre = check.nombre;
      prefs = guardarPreferencias({ ...prefs, ultimoNombre: check.nombre });
      config.categoria = 'todas';
      config.dificultad = 'facil';
      refrescarMejorEnConfig();
      await irA('configuracion');
    } finally {
      bloqueoAccion = false;
    }
  });

  document.getElementById('entrada-nombre')?.addEventListener('input', () => {
    ui.limpiarErrorNombre();
  });

  document.getElementById('entrada-nombre')?.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Enter') return;
    evento.preventDefault();
    document.getElementById('btn-jugar')?.click();
  });

  enlazarConfiguracion();

  document.getElementById('btn-comenzar')?.addEventListener('click', () => {
    if (bloqueoAccion) return;
    reproducirSonido('click');
    comenzarPartida();
  });

  document.getElementById('juego-opciones')?.addEventListener('click', onRespuestaClick);

  document.getElementById('btn-5050')?.addEventListener('click', () => {
    const btn = document.getElementById('btn-5050');
    if (btn?.disabled || bloqueoAccion) return;
    const r = usarComodin('cincuenta');
    if (!r) return;
    ui.ocultarOpciones(r.ocultar);
    ui.actualizarMarcador(estado.puntaje, estado.racha);
    ui.actualizarComodines(estado.comodines, estado.respondida);
    reproducirSonido('comodin');
  });

  document.getElementById('btn-tiempo-extra')?.addEventListener('click', () => {
    const btn = document.getElementById('btn-tiempo-extra');
    if (btn?.disabled || bloqueoAccion) return;
    const r = usarComodin('tiempo');
    if (!r) return;
    ui.actualizarTemporizador(estado.tiempoRestante, estado.tiempoMaxPregunta);
    ui.actualizarMarcador(estado.puntaje, estado.racha);
    ui.actualizarComodines(estado.comodines, estado.respondida);
    reproducirSonido('comodin');
  });

  document.getElementById('btn-siguiente')?.addEventListener('click', () => {
    onSiguiente();
  });

  document.getElementById('btn-salir-partida')?.addEventListener('click', async () => {
    if (!partidaActiva) return;
    const confirmar = await ui.confirmarSalirPartida();
    if (!confirmar) return;
    abandonarPartida();
    await irA('configuracion', { forzar: true });
  });

  document.getElementById('btn-borrar-ranking')?.addEventListener('click', async () => {
    const ok = await ui.confirmarBorrarRanking();
    if (!ok) return;
    borrarRanking();
    ultimaEntradaRanking = null;
    ui.renderizarRanking([], null, obtenerResumenEstadisticas());
  });

  document.getElementById('btn-tema')?.addEventListener('click', () => {
    prefs = guardarPreferencias({
      ...prefs,
      tema: prefs.tema === 'oscuro' ? 'claro' : 'oscuro'
    });
    ui.aplicarTema(prefs.tema);
    const btnTema = document.getElementById('btn-tema');
    if (btnTema) {
      btnTema.title = prefs.tema === 'oscuro' ? 'Tema oscuro' : 'Tema claro';
    }
  });

  document.getElementById('btn-sonido')?.addEventListener('click', () => {
    prefs = guardarPreferencias({ ...prefs, sonido: !prefs.sonido });
    ui.aplicarSonido(prefs.sonido);
    const btnSonido = document.getElementById('btn-sonido');
    if (btnSonido) {
      btnSonido.title = prefs.sonido ? 'Sonido activado' : 'Sonido silenciado';
    }
    if (prefs.sonido) reproducirSonido('click');
  });

  document.addEventListener('keydown', onTeclado);

  refrescarMejorEnConfig();
}

inicializar();
