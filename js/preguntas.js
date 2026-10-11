/**
 * preguntas.js — Banco de preguntas.
 * Contiene y expone el conjunto de preguntas del trivia.
 */

export const CATEGORIAS = [
  { clave: 'geografia', nombre: 'Geografía', icono: 'mountain' },
  { clave: 'historia', nombre: 'Historia', icono: 'landmark' },
  { clave: 'cultura', nombre: 'Cultura y Tradiciones', icono: 'music' },
  { clave: 'deportes', nombre: 'Deportes', icono: 'trophy' },
  { clave: 'naturaleza', nombre: 'Ciencia y Naturaleza', icono: 'leaf' }
];

export const DIFICULTADES = [
  { clave: 'facil', nombre: 'Fácil', multiplicador: 1 },
  { clave: 'medio', nombre: 'Medio', multiplicador: 1.5 },
  { clave: 'dificil', nombre: 'Difícil', multiplicador: 2 }
];

export const PREGUNTAS = [];
