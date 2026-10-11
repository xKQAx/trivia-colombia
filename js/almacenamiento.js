/**
 * almacenamiento.js — Persistencia en localStorage.
 * Solo lee/escribe datos; no toca el DOM.
 * Si localStorage falla, las operaciones degradan sin romper la app.
 */

import { CATEGORIAS } from './preguntas.js';

const CLAVE_RANKING = 'trivia_ranking';
const CLAVE_STATS = 'trivia_stats';
const CLAVE_PREFS = 'trivia_preferencias';
const MAX_RANKING = 10;

/** Copia en memoria si localStorage no está disponible. */
const memoria = {
  ranking: null,
  stats: null,
  preferencias: null
};

/**
 * Lectura segura de localStorage.
 * @param {string} clave
 * @returns {string|null}
 */
function leer(clave) {
  try {
    return localStorage.getItem(clave);
  } catch {
    return null;
  }
}

/**
 * Escritura segura de localStorage.
 * @param {string} clave
 * @param {string} valor
 * @returns {boolean}
 */
function escribir(clave, valor) {
  try {
    localStorage.setItem(clave, valor);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string} clave
 * @returns {boolean}
 */
function eliminar(clave) {
  try {
    localStorage.removeItem(clave);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {unknown} entrada
 * @returns {boolean}
 */
function esEntradaRankingValida(entrada) {
  if (!entrada || typeof entrada !== 'object') return false;
  const e = /** @type {Record<string, unknown>} */ (entrada);
  const nombreOk = typeof e.nombre === 'string' && e.nombre.trim().length >= 1 && e.nombre.trim().length <= 20;
  const puntajeOk = typeof e.puntaje === 'number' && Number.isFinite(e.puntaje) && e.puntaje >= 0;
  const categoriaOk = typeof e.categoria === 'string' && e.categoria.length > 0;
  const dificultadOk = typeof e.dificultad === 'string' && e.dificultad.length > 0;
  const aciertosOk = typeof e.aciertos === 'number' && e.aciertos >= 0;
  const tiempoOk = typeof e.tiempoTotal === 'number' && e.tiempoTotal >= 0;
  const fechaOk = typeof e.fecha === 'string' && !Number.isNaN(Date.parse(e.fecha));
  return nombreOk && puntajeOk && categoriaOk && dificultadOk && aciertosOk && tiempoOk && fechaOk;
}

/**
 * Orden: mayor puntaje primero; empate → fecha más antigua primero.
 * @param {Array<Record<string, unknown>>} lista
 */
function ordenarRanking(lista) {
  lista.sort((a, b) => {
    if (b.puntaje !== a.puntaje) return /** @type {number} */ (b.puntaje) - /** @type {number} */ (a.puntaje);
    return Date.parse(/** @type {string} */ (a.fecha)) - Date.parse(/** @type {string} */ (b.fecha));
  });
}

/**
 * @returns {Array<object>}
 */
export function cargarRanking() {
  if (memoria.ranking) return memoria.ranking.map((e) => ({ ...e }));

  const crudo = leer(CLAVE_RANKING);
  if (!crudo) return [];

  try {
    const parsed = JSON.parse(crudo);
    if (!Array.isArray(parsed)) return [];
    const validos = parsed.filter(esEntradaRankingValida).map((e) => ({
      nombre: String(e.nombre).trim(),
      puntaje: Number(e.puntaje),
      categoria: String(e.categoria),
      dificultad: String(e.dificultad),
      aciertos: Number(e.aciertos),
      tiempoTotal: Number(e.tiempoTotal),
      fecha: String(e.fecha)
    }));
    ordenarRanking(validos);
    return validos.slice(0, MAX_RANKING);
  } catch {
    return [];
  }
}

/**
 * Guarda una partida en el top 10 y devuelve la posición (1-based) o null si no entra.
 * @param {object} entrada
 * @returns {number|null}
 */
export function guardarEnRanking(entrada) {
  if (!esEntradaRankingValida(entrada)) return null;

  const limpia = {
    nombre: String(entrada.nombre).trim(),
    puntaje: Number(entrada.puntaje),
    categoria: String(entrada.categoria),
    dificultad: String(entrada.dificultad),
    aciertos: Number(entrada.aciertos),
    tiempoTotal: Number(entrada.tiempoTotal),
    fecha: String(entrada.fecha)
  };

  const lista = cargarRanking();
  lista.push(limpia);
  ordenarRanking(lista);
  const top = lista.slice(0, MAX_RANKING);

  memoria.ranking = top.map((e) => ({ ...e }));
  escribir(CLAVE_RANKING, JSON.stringify(top));

  const idx = top.findIndex(
    (e) =>
      e.nombre === limpia.nombre &&
      e.puntaje === limpia.puntaje &&
      e.fecha === limpia.fecha &&
      e.categoria === limpia.categoria &&
      e.dificultad === limpia.dificultad
  );
  return idx === -1 ? null : idx + 1;
}

/** Borra el ranking persistido y en memoria. */
export function borrarRanking() {
  memoria.ranking = [];
  eliminar(CLAVE_RANKING);
}

/**
 * Estructura vacía de estadísticas.
 * @returns {object}
 */
function statsVacias() {
  /** @type {Record<string, { partidas: number, aciertos: number, preguntas: number, mejorPuntaje: number }>} */
  const porCategoria = {};
  for (const cat of CATEGORIAS) {
    porCategoria[cat.clave] = { partidas: 0, aciertos: 0, preguntas: 0, mejorPuntaje: 0 };
  }
  return {
    partidas: 0,
    aciertosTotales: 0,
    preguntasTotales: 0,
    mejorPuntaje: 0,
    porCategoria,
    mejores: /** @type {Record<string, number>} */ ({})
  };
}

/**
 * @returns {object}
 */
export function cargarEstadisticas() {
  if (memoria.stats) {
    return structuredClone
      ? structuredClone(memoria.stats)
      : JSON.parse(JSON.stringify(memoria.stats));
  }

  const crudo = leer(CLAVE_STATS);
  if (!crudo) return statsVacias();

  try {
    const parsed = JSON.parse(crudo);
    const base = statsVacias();
    if (!parsed || typeof parsed !== 'object') return base;

    base.partidas = Number(parsed.partidas) || 0;
    base.aciertosTotales = Number(parsed.aciertosTotales) || 0;
    base.preguntasTotales = Number(parsed.preguntasTotales) || 0;
    base.mejorPuntaje = Number(parsed.mejorPuntaje) || 0;

    if (parsed.porCategoria && typeof parsed.porCategoria === 'object') {
      for (const cat of CATEGORIAS) {
        const src = parsed.porCategoria[cat.clave];
        if (src && typeof src === 'object') {
          base.porCategoria[cat.clave] = {
            partidas: Number(src.partidas) || 0,
            aciertos: Number(src.aciertos) || 0,
            preguntas: Number(src.preguntas) || 0,
            mejorPuntaje: Number(src.mejorPuntaje) || 0
          };
        }
      }
    }

    if (parsed.mejores && typeof parsed.mejores === 'object') {
      for (const [k, v] of Object.entries(parsed.mejores)) {
        if (typeof v === 'number' && Number.isFinite(v)) base.mejores[k] = v;
      }
    }

    return base;
  } catch {
    return statsVacias();
  }
}

/**
 * Clave normalizada para mejores puntajes por jugador/filtros.
 * @param {string} nombre
 * @param {string} categoria
 * @param {string} dificultad
 */
export function claveMejor(nombre, categoria, dificultad) {
  return `${String(nombre).trim().toLowerCase()}|${String(categoria).trim().toLowerCase()}|${String(dificultad).trim().toLowerCase()}`;
}

/**
 * Actualiza estadísticas tras una partida.
 * Las categorías de acierto usan la categoría REAL de cada pregunta.
 * @param {object} resumen
 * @param {string} resumen.nombre
 * @param {string} resumen.categoriaFiltro
 * @param {string} resumen.dificultad
 * @param {number} resumen.puntaje
 * @param {number} resumen.aciertos
 * @param {number} resumen.totalPreguntas
 * @param {Array<{ categoria: string, correcta: boolean }>} resumen.detallePreguntas
 */
export function actualizarEstadisticas(resumen) {
  const stats = cargarEstadisticas();

  stats.partidas += 1;
  stats.aciertosTotales += resumen.aciertos;
  stats.preguntasTotales += resumen.totalPreguntas;
  if (resumen.puntaje > stats.mejorPuntaje) stats.mejorPuntaje = resumen.puntaje;

  const clave = claveMejor(resumen.nombre, resumen.categoriaFiltro, resumen.dificultad);
  const mejorPrevio = stats.mejores[clave] ?? 0;
  if (resumen.puntaje > mejorPrevio) stats.mejores[clave] = resumen.puntaje;

  /** @type {Record<string, { aciertos: number, preguntas: number }>} */
  const porCatPartida = {};
  for (const det of resumen.detallePreguntas ?? []) {
    const cat = det.categoria;
    if (!stats.porCategoria[cat]) {
      stats.porCategoria[cat] = { partidas: 0, aciertos: 0, preguntas: 0, mejorPuntaje: 0 };
    }
    if (!porCatPartida[cat]) porCatPartida[cat] = { aciertos: 0, preguntas: 0 };
    porCatPartida[cat].preguntas += 1;
    if (det.correcta) porCatPartida[cat].aciertos += 1;
  }

  for (const [cat, datos] of Object.entries(porCatPartida)) {
    const slot = stats.porCategoria[cat];
    slot.partidas += 1;
    slot.aciertos += datos.aciertos;
    slot.preguntas += datos.preguntas;
    if (resumen.puntaje > slot.mejorPuntaje) slot.mejorPuntaje = resumen.puntaje;
  }

  memoria.stats = stats;
  escribir(CLAVE_STATS, JSON.stringify(stats));
  return stats;
}

/**
 * Resumen listo para la UI de estadísticas laterales.
 * @returns {{ partidas: number, porcentajeAciertos: number, mejorPuntaje: number, mejorCategoria: string }}
 */
export function obtenerResumenEstadisticas() {
  const stats = cargarEstadisticas();
  const porcentaje =
    stats.preguntasTotales > 0
      ? Math.round((stats.aciertosTotales / stats.preguntasTotales) * 100)
      : 0;

  let mejorCategoria = '—';
  let mejorRatio = -1;
  for (const cat of CATEGORIAS) {
    const slot = stats.porCategoria[cat.clave];
    if (!slot || slot.preguntas === 0) continue;
    const ratio = slot.aciertos / slot.preguntas;
    if (ratio > mejorRatio) {
      mejorRatio = ratio;
      mejorCategoria = cat.nombre;
    }
  }

  return {
    partidas: stats.partidas,
    porcentajeAciertos: porcentaje,
    mejorPuntaje: stats.mejorPuntaje,
    mejorCategoria
  };
}

/**
 * Mejor puntaje del jugador para categoría + dificultad.
 * @param {string} nombre
 * @param {string} categoria
 * @param {string} dificultad
 * @returns {number|null}
 */
export function obtenerMejorPuntaje(nombre, categoria, dificultad) {
  const stats = cargarEstadisticas();
  const clave = claveMejor(nombre, categoria, dificultad);
  const valor = stats.mejores[clave];
  return typeof valor === 'number' ? valor : null;
}

/**
 * Tema por defecto según prefers-color-scheme (solo primera vez).
 * @returns {'claro'|'oscuro'}
 */
function temaPorSistema() {
  try {
    if (typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'oscuro';
    }
  } catch {
    /* entorno sin matchMedia (p. ej. Node) */
  }
  return 'claro';
}

/**
 * @returns {{ sonido: boolean, tema: 'claro'|'oscuro', ultimoNombre: string }}
 */
export function cargarPreferencias() {
  if (memoria.preferencias) return { ...memoria.preferencias };

  const crudo = leer(CLAVE_PREFS);
  if (!crudo) {
    return { sonido: true, tema: temaPorSistema(), ultimoNombre: '' };
  }

  try {
    const parsed = JSON.parse(crudo);
    return {
      sonido: parsed.sonido !== false,
      tema: parsed.tema === 'oscuro' ? 'oscuro' : 'claro',
      ultimoNombre: typeof parsed.ultimoNombre === 'string' ? parsed.ultimoNombre : ''
    };
  } catch {
    return { sonido: true, tema: temaPorSistema(), ultimoNombre: '' };
  }
}

/**
 * @param {Partial<{ sonido: boolean, tema: string, ultimoNombre: string }>} prefs
 */
export function guardarPreferencias(prefs) {
  const actuales = cargarPreferencias();
  const mezcladas = {
    sonido: typeof prefs.sonido === 'boolean' ? prefs.sonido : actuales.sonido,
    tema: prefs.tema === 'oscuro' || prefs.tema === 'claro' ? prefs.tema : actuales.tema,
    ultimoNombre:
      typeof prefs.ultimoNombre === 'string' ? prefs.ultimoNombre : actuales.ultimoNombre
  };
  memoria.preferencias = { ...mezcladas };
  escribir(CLAVE_PREFS, JSON.stringify(mezcladas));
  return mezcladas;
}
