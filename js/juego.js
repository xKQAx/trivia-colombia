/**
 * juego.js — Lógica pura de la partida.
 * Sin DOM ni localStorage. Importa solo preguntas.js.
 */

import { PREGUNTAS, DIFICULTADES } from './preguntas.js';

const PREGUNTAS_POR_PARTIDA = 10;
const TIEMPO_POR_PREGUNTA = 20;
const PENALIZACION_COMODIN = 30;

/** Estado mutable de la partida en curso. */
export const estado = {
  nombre: '',
  categoria: 'todas',
  dificultad: 'facil',
  preguntas: /** @type {Array<object>} */ ([]),
  indice: 0,
  puntaje: 0,
  racha: 0,
  aciertos: 0,
  tiempoRestante: TIEMPO_POR_PREGUNTA,
  tiempoMaxPregunta: TIEMPO_POR_PREGUNTA,
  tiempoTotal: 0,
  respondida: false,
  comodines: { cincuenta: true, tiempo: true },
  /** @type {Array<object>} */
  historial: [],
  /** @type {ReturnType<typeof setInterval>|null} */
  temporizadorId: null,
  /** Índices ocultos por 50/50 en la pregunta actual */
  opcionesOcultas: /** @type {number[]} */ ([])
};

/**
 * Fisher-Yates in-place. Devuelve el mismo array para encadenar.
 * @template T
 * @param {T[]} lista
 * @returns {T[]}
 */
export function mezclar(lista) {
  for (let i = lista.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = lista[i];
    lista[i] = lista[j];
    lista[j] = tmp;
  }
  return lista;
}

/**
 * Copia la pregunta y baraja opciones recalculando el índice correcto.
 * @param {object} pregunta
 */
function prepararPregunta(pregunta) {
  const opciones = [...pregunta.opciones];
  const textoCorrecto = opciones[pregunta.correcta];
  mezclar(opciones);
  return {
    id: pregunta.id,
    categoria: pregunta.categoria,
    dificultad: pregunta.dificultad,
    enunciado: pregunta.enunciado,
    opciones,
    correcta: opciones.indexOf(textoCorrecto),
    explicacion: pregunta.explicacion
  };
}

/**
 * Obtiene hasta 10 preguntas sin repetir para los filtros dados.
 * Si faltan en el nivel, completa con otros niveles de la misma categoría.
 * @param {string} categoria
 * @param {string} dificultad
 */
export function obtenerPreguntas(categoria, dificultad) {
  const delNivel = PREGUNTAS.filter(
    (p) =>
      (categoria === 'todas' || p.categoria === categoria) && p.dificultad === dificultad
  );

  const seleccion = mezclar([...delNivel]).slice(0, PREGUNTAS_POR_PARTIDA);
  const usados = new Set(seleccion.map((p) => p.id));

  // Completar con otros niveles si no hay suficientes (nunca repetir id)
  if (seleccion.length < PREGUNTAS_POR_PARTIDA && categoria !== 'todas') {
    const extras = mezclar(
      PREGUNTAS.filter((p) => p.categoria === categoria && !usados.has(p.id))
    );
    for (const p of extras) {
      if (seleccion.length >= PREGUNTAS_POR_PARTIDA) break;
      seleccion.push(p);
      usados.add(p.id);
    }
  } else if (seleccion.length < PREGUNTAS_POR_PARTIDA) {
    const extras = mezclar(PREGUNTAS.filter((p) => !usados.has(p.id)));
    for (const p of extras) {
      if (seleccion.length >= PREGUNTAS_POR_PARTIDA) break;
      seleccion.push(p);
    }
  }

  return seleccion.slice(0, PREGUNTAS_POR_PARTIDA).map(prepararPregunta);
}

/**
 * Multiplicador de la dificultad elegida en la partida.
 * @param {string} dificultad
 */
function multiplicadorDe(dificultad) {
  const hallada = DIFICULTADES.find((d) => d.clave === dificultad);
  return hallada ? hallada.multiplicador : 1;
}

/**
 * Inicia una partida nueva y reinicia el estado.
 * @param {string} nombre
 * @param {string} categoria
 * @param {string} dificultad
 */
export function iniciarPartida(nombre, categoria, dificultad) {
  detenerTemporizador();

  estado.nombre = String(nombre).trim();
  estado.categoria = categoria;
  estado.dificultad = dificultad;
  estado.preguntas = obtenerPreguntas(categoria, dificultad);
  estado.indice = 0;
  estado.puntaje = 0;
  estado.racha = 0;
  estado.aciertos = 0;
  estado.tiempoRestante = TIEMPO_POR_PREGUNTA;
  estado.tiempoMaxPregunta = TIEMPO_POR_PREGUNTA;
  estado.tiempoTotal = 0;
  estado.respondida = false;
  estado.comodines = { cincuenta: true, tiempo: true };
  estado.historial = [];
  estado.opcionesOcultas = [];

  return estado;
}

/**
 * Puntos por acierto: (100 + min(5*seg, 100) + bonus racha) * multiplicador.
 * Bonus racha +50 cuando la racha llega a 3, 6 o 9.
 * @param {number} segundosRestantes
 * @param {number} rachaTrasAcierto
 * @param {number} multiplicador
 */
export function calcularPuntos(segundosRestantes, rachaTrasAcierto, multiplicador) {
  const bonusRapidez = Math.min(5 * Math.max(0, segundosRestantes), 100);
  const bonusRacha =
    rachaTrasAcierto > 0 && rachaTrasAcierto % 3 === 0 ? 50 : 0;
  return Math.round((100 + bonusRapidez + bonusRacha) * multiplicador);
}

/** Detiene el intervalo del temporizador si existe. */
export function detenerTemporizador() {
  if (estado.temporizadorId != null) {
    clearInterval(estado.temporizadorId);
    estado.temporizadorId = null;
  }
}

/**
 * Registra segundos usados de la pregunta actual en tiempoTotal.
 */
function acumularTiempoUsado() {
  const usados = Math.max(0, estado.tiempoMaxPregunta - estado.tiempoRestante);
  estado.tiempoTotal += usados;
}

/**
 * Responde la pregunta actual. indiceOpcion null/-1 = tiempo agotado / sin respuesta.
 * @param {number|null} indiceOpcion
 */
export function responder(indiceOpcion) {
  if (estado.respondida) return null;
  const pregunta = estado.preguntas[estado.indice];
  if (!pregunta) return null;

  estado.respondida = true;
  detenerTemporizador();
  acumularTiempoUsado();

  const sinRespuesta = indiceOpcion == null || indiceOpcion < 0;
  const esCorrecta = !sinRespuesta && indiceOpcion === pregunta.correcta;

  let puntosGanados = 0;
  if (esCorrecta) {
    estado.racha += 1;
    estado.aciertos += 1;
    puntosGanados = calcularPuntos(
      estado.tiempoRestante,
      estado.racha,
      multiplicadorDe(estado.dificultad)
    );
    estado.puntaje += puntosGanados;
  } else {
    estado.racha = 0;
  }

  const registro = {
    preguntaId: pregunta.id,
    categoria: pregunta.categoria,
    enunciado: pregunta.enunciado,
    opciones: [...pregunta.opciones],
    indiceElegido: sinRespuesta ? null : indiceOpcion,
    indiceCorrecta: pregunta.correcta,
    correcta: esCorrecta,
    puntosGanados,
    explicacion: pregunta.explicacion,
    tiempoAgotado: sinRespuesta
  };
  estado.historial.push(registro);

  return registro;
}

/**
 * Usa un comodín una vez por partida si la pregunta no está respondida.
 * @param {'cincuenta'|'tiempo'} tipo
 */
export function usarComodin(tipo) {
  if (estado.respondida) return null;

  if (tipo === 'cincuenta') {
    if (!estado.comodines.cincuenta) return null;
    estado.comodines.cincuenta = false;
    estado.puntaje = Math.max(0, estado.puntaje - PENALIZACION_COMODIN);

    const pregunta = estado.preguntas[estado.indice];
    const incorrectas = [0, 1, 2, 3].filter((i) => i !== pregunta.correcta);
    mezclar(incorrectas);
    const ocultar = incorrectas.slice(0, 2);
    estado.opcionesOcultas = ocultar;

    return { tipo, ocultar, puntaje: estado.puntaje };
  }

  if (tipo === 'tiempo') {
    if (!estado.comodines.tiempo) return null;
    estado.comodines.tiempo = false;
    estado.puntaje = Math.max(0, estado.puntaje - PENALIZACION_COMODIN);
    estado.tiempoRestante += 10;
    estado.tiempoMaxPregunta += 10;

    return {
      tipo,
      tiempoRestante: estado.tiempoRestante,
      tiempoMaxPregunta: estado.tiempoMaxPregunta,
      puntaje: estado.puntaje
    };
  }

  return null;
}

/**
 * Arranca cuenta regresiva de 1 s. Callbacks sin acoplar al DOM.
 * @param {(segundos: number) => void} alTick
 * @param {() => void} alAgotar
 */
export function iniciarTemporizador(alTick, alAgotar) {
  detenerTemporizador();
  alTick?.(estado.tiempoRestante);

  estado.temporizadorId = setInterval(() => {
    estado.tiempoRestante -= 1;
    if (estado.tiempoRestante <= 0) {
      estado.tiempoRestante = 0;
      detenerTemporizador();
      alTick?.(0);
      alAgotar?.();
      return;
    }
    alTick?.(estado.tiempoRestante);
  }, 1000);
}

/**
 * Avanza a la siguiente pregunta. Devuelve false si la partida terminó.
 * @returns {boolean}
 */
export function siguientePregunta() {
  if (estado.indice >= estado.preguntas.length - 1) return false;

  estado.indice += 1;
  estado.respondida = false;
  estado.tiempoRestante = TIEMPO_POR_PREGUNTA;
  estado.tiempoMaxPregunta = TIEMPO_POR_PREGUNTA;
  estado.opcionesOcultas = [];
  return true;
}

/**
 * Resumen final de la partida (para resultado / ranking / stats).
 */
export function obtenerResumen() {
  const falladas = estado.historial
    .filter((h) => !h.correcta)
    .map((h) => ({
      enunciado: h.enunciado,
      respuestaUsuario:
        h.indiceElegido == null ? 'Sin respuesta' : h.opciones[h.indiceElegido],
      respuestaCorrecta: h.opciones[h.indiceCorrecta],
      explicacion: h.explicacion
    }));

  return {
    nombre: estado.nombre,
    categoria: estado.categoria,
    dificultad: estado.dificultad,
    puntaje: estado.puntaje,
    aciertos: estado.aciertos,
    totalPreguntas: estado.preguntas.length,
    tiempoTotal: estado.tiempoTotal,
    falladas,
    detallePreguntas: estado.historial.map((h) => ({
      categoria: h.categoria,
      correcta: h.correcta
    }))
  };
}

/** Pregunta actual o null. */
export function obtenerPreguntaActual() {
  return estado.preguntas[estado.indice] ?? null;
}

export const TIEMPO_INICIAL = TIEMPO_POR_PREGUNTA;
