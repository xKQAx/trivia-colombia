/**
 * audio.js — Efectos y música de fondo con Web Audio (sin archivos).
 * app.js coordina; este módulo no toca reglas de juego ni localStorage.
 */

const BPM = 96;
const BEAT = 60 / BPM;
const COMPAS = BEAT * 4;
/** Ganancia base de la música (~0.12) y más baja en partida */
const GAIN_MUSICA = 0.12;
const GAIN_MUSICA_PARTIDA = 0.05;
const FADE_S = 1;

/** Notas La menor pentatónica (Hz): A C D E G */
const PENTA = {
  A3: 220.0,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  G4: 392.0,
  A4: 440.0,
  C5: 523.25,
  E5: 659.25
};

/** Progresión bajo cumbia: Am – G – F – E (un compás cada una) */
const BAJOS = [PENTA.A3, 196.0, 174.61, 164.81];

let ctx = null;
let masterMusica = null;
let filtroMusica = null;
let musicaActiva = false;
let enPartida = false;
let preferenciaMusica = true;
let preferenciaSonido = true;
let siguienteNota = 0;
let timerScheduler = null;
let ultimoTicSeg = -1;

/**
 * ¿Hay Web Audio disponible?
 */
export function audioDisponible() {
  return typeof window !== 'undefined'
    && !!(window.AudioContext || window.webkitAudioContext);
}

/**
 * Crea / reanuda el AudioContext tras gesto del usuario.
 * @returns {AudioContext|null}
 */
export function asegurarContexto() {
  if (!audioDisponible()) return null;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!ctx) ctx = new Ctx();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/**
 * @param {boolean} sonido
 * @param {boolean} musica
 */
export function sincronizarPreferencias(sonido, musica) {
  preferenciaSonido = !!sonido;
  preferenciaMusica = !!musica;
  if (!preferenciaMusica) detenerMusica();
  else if (musicaActiva) ajustarVolumenMusica(true);
}

export function setEnPartida(activo) {
  enPartida = !!activo;
  if (musicaActiva) ajustarVolumenMusica(true);
}

/**
 * Efectos cortos: acierto, error, fin, clic, tic, comodin.
 * @param {'acierto'|'error'|'fin'|'click'|'tic'|'comodin'} tipo
 */
export function reproducirEfecto(tipo) {
  if (!preferenciaSonido) return;
  const c = asegurarContexto();
  if (!c) return;

  const ahora = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);

  const mapa = {
    acierto: { freq: 660, dur: 0.12, type: 'sine', vol: 0.08 },
    error: { freq: 180, dur: 0.18, type: 'triangle', vol: 0.08 },
    fin: { freq: 523.25, dur: 0.35, type: 'sine', vol: 0.09 },
    click: { freq: 420, dur: 0.045, type: 'sine', vol: 0.045 },
    tic: { freq: 880, dur: 0.04, type: 'square', vol: 0.03 },
    comodin: { freq: 520, dur: 0.1, type: 'square', vol: 0.06 }
  };
  const cfg = mapa[tipo] ?? mapa.click;
  osc.type = cfg.type;
  osc.frequency.setValueAtTime(cfg.freq, ahora);

  if (tipo === 'fin') {
    osc.frequency.setValueAtTime(PENTA.C5, ahora);
    osc.frequency.linearRampToValueAtTime(PENTA.E5, ahora + 0.18);
    osc.frequency.linearRampToValueAtTime(PENTA.A4, ahora + 0.34);
  }

  gain.gain.setValueAtTime(0.0001, ahora);
  gain.gain.exponentialRampToValueAtTime(cfg.vol, ahora + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ahora + cfg.dur);
  osc.start(ahora);
  osc.stop(ahora + cfg.dur + 0.02);
}

/**
 * Tic de temporizador en los últimos 5 s (una vez por segundo visible).
 * @param {number} segundos
 */
export function ticTemporizador(segundos) {
  if (segundos > 5 || segundos <= 0) {
    ultimoTicSeg = -1;
    return;
  }
  if (segundos === ultimoTicSeg) return;
  ultimoTicSeg = segundos;
  reproducirEfecto('tic');
}

function asegurarCadenaMusica() {
  const c = asegurarContexto();
  if (!c) return null;
  if (!masterMusica) {
    filtroMusica = c.createBiquadFilter();
    filtroMusica.type = 'lowpass';
    filtroMusica.frequency.value = 2200;
    masterMusica = c.createGain();
    masterMusica.gain.value = 0.0001;
    filtroMusica.connect(masterMusica);
    masterMusica.connect(c.destination);
  }
  return c;
}

function ajustarVolumenMusica(conFade) {
  if (!ctx || !masterMusica) return;
  const meta = enPartida ? GAIN_MUSICA_PARTIDA : GAIN_MUSICA;
  const ahora = ctx.currentTime;
  masterMusica.gain.cancelScheduledValues(ahora);
  if (conFade) {
    masterMusica.gain.setValueAtTime(Math.max(0.0001, masterMusica.gain.value), ahora);
    masterMusica.gain.linearRampToValueAtTime(meta, ahora + FADE_S);
  } else {
    masterMusica.gain.setValueAtTime(meta, ahora);
  }
}

/**
 * Programa una nota corta en la cadena de música.
 * @param {number} freq
 * @param {number} cuando
 * @param {number} dur
 * @param {OscillatorType} tipo
 * @param {number} vol
 */
function nota(freq, cuando, dur, tipo, vol) {
  if (!ctx || !filtroMusica) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(freq, cuando);
  g.gain.setValueAtTime(0.0001, cuando);
  g.gain.exponentialRampToValueAtTime(vol, cuando + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, cuando + dur);
  osc.connect(g);
  g.connect(filtroMusica);
  osc.start(cuando);
  osc.stop(cuando + dur + 0.03);
}

/**
 * Ruido corto (guacharaca / hi-hat improvisado).
 * @param {number} cuando
 * @param {number} dur
 * @param {number} vol
 */
function ruido(cuando, dur, vol) {
  if (!ctx || !filtroMusica) return;
  const tam = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buffer = ctx.createBuffer(1, tam, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < tam; i += 1) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const g = ctx.createGain();
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 3500;
  g.gain.setValueAtTime(vol, cuando);
  g.gain.exponentialRampToValueAtTime(0.0001, cuando + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(filtroMusica);
  src.start(cuando);
  src.stop(cuando + dur + 0.02);
}

/**
 * Tambor grave (kick suave).
 * @param {number} cuando
 */
function tambor(cuando) {
  if (!ctx || !filtroMusica) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, cuando);
  osc.frequency.exponentialRampToValueAtTime(45, cuando + 0.12);
  g.gain.setValueAtTime(0.14, cuando);
  g.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.18);
  osc.connect(g);
  g.connect(filtroMusica);
  osc.start(cuando);
  osc.stop(cuando + 0.2);
}

/**
 * Programa un compás (anticipación Lookahead vía currentTime).
 * @param {number} t0
 * @param {number} indiceCompas
 */
function programarCompas(t0, indiceCompas) {
  const bajo = BAJOS[indiceCompas % BAJOS.length];
  // Bajo triangle estilo cumbia (tiempos 1 y 3)
  nota(bajo, t0, BEAT * 0.85, 'triangle', 0.11);
  nota(bajo * 0.98, t0 + BEAT * 2, BEAT * 0.7, 'triangle', 0.09);

  // Melodía: arpegios pentatónicos
  const arpegio = [PENTA.A4, PENTA.C5, PENTA.E5, PENTA.C5, PENTA.G4, PENTA.E4, PENTA.A4, PENTA.C5];
  for (let i = 0; i < 8; i += 1) {
    nota(arpegio[i], t0 + i * (BEAT / 2), BEAT * 0.4, 'sine', 0.045);
  }

  // Percusión: tambor en 1 y 3; guacharaca en corcheas
  tambor(t0);
  tambor(t0 + BEAT * 2);
  for (let i = 0; i < 8; i += 1) {
    if (i % 2 === 1) ruido(t0 + i * (BEAT / 2), 0.04, 0.035);
  }
}

/**
 * Scheduler: setTimeout + audioContext.currentTime (no setInterval).
 */
function tickScheduler() {
  if (!musicaActiva || !ctx) return;
  const horizonte = ctx.currentTime + 0.2;
  while (siguienteNota < horizonte) {
    const indice = Math.round(siguienteNota / COMPAS);
    programarCompas(siguienteNota, indice);
    siguienteNota += COMPAS;
  }
  timerScheduler = window.setTimeout(tickScheduler, 100);
}

/**
 * Inicia música con fade-in (idempotente).
 */
export function iniciarMusica() {
  if (!preferenciaMusica || musicaActiva) return;
  const c = asegurarCadenaMusica();
  if (!c || !masterMusica) return;

  musicaActiva = true;
  siguienteNota = c.currentTime + 0.05;
  masterMusica.gain.cancelScheduledValues(c.currentTime);
  masterMusica.gain.setValueAtTime(0.0001, c.currentTime);
  const meta = enPartida ? GAIN_MUSICA_PARTIDA : GAIN_MUSICA;
  masterMusica.gain.linearRampToValueAtTime(meta, c.currentTime + FADE_S);
  tickScheduler();
}

/**
 * Pausa música (p. ej. pestaña oculta) con fade-out.
 */
export function pausarMusica() {
  if (!musicaActiva || !ctx || !masterMusica) return;
  if (timerScheduler != null) {
    clearTimeout(timerScheduler);
    timerScheduler = null;
  }
  const ahora = ctx.currentTime;
  masterMusica.gain.cancelScheduledValues(ahora);
  masterMusica.gain.setValueAtTime(Math.max(0.0001, masterMusica.gain.value), ahora);
  masterMusica.gain.linearRampToValueAtTime(0.0001, ahora + FADE_S);
}

/**
 * Reanuda tras pause (fade-in).
 */
export function reanudarMusica() {
  if (!preferenciaMusica || !musicaActiva) return;
  const c = asegurarCadenaMusica();
  if (!c || !masterMusica) return;
  siguienteNota = Math.max(siguienteNota, c.currentTime + 0.05);
  ajustarVolumenMusica(true);
  if (timerScheduler == null) tickScheduler();
}

/** Detiene música de forma limpia. */
export function detenerMusica() {
  if (timerScheduler != null) {
    clearTimeout(timerScheduler);
    timerScheduler = null;
  }
  if (ctx && masterMusica) {
    const ahora = ctx.currentTime;
    masterMusica.gain.cancelScheduledValues(ahora);
    masterMusica.gain.setValueAtTime(Math.max(0.0001, masterMusica.gain.value), ahora);
    masterMusica.gain.linearRampToValueAtTime(0.0001, ahora + FADE_S);
  }
  musicaActiva = false;
}

/**
 * Enlaza visibilidad del documento: pause / resume con fade.
 */
export function enlazarVisibilidad() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pausarMusica();
    else if (preferenciaMusica && musicaActiva) reanudarMusica();
  });
}

/**
 * Oculta controles de audio si no hay Web Audio.
 */
export function ocultarControlesSiNoSoporta() {
  if (audioDisponible()) return;
  document.getElementById('btn-sonido')?.setAttribute('hidden', '');
  document.getElementById('btn-musica')?.setAttribute('hidden', '');
}

/**
 * Actualiza aria/título del botón de música.
 * @param {boolean} activo
 */
export function aplicarBotonMusica(activo) {
  const boton = document.getElementById('btn-musica');
  if (!boton) return;
  boton.setAttribute('aria-pressed', String(activo));
  boton.setAttribute('aria-label', activo ? 'Silenciar música de fondo' : 'Activar música de fondo');
  boton.title = activo ? 'Música activada' : 'Música silenciada';
}
