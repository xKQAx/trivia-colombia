/**
 * app.js — Punto de entrada y navegación entre pantallas.
 * Orquesta el flujo general de Trivia Colombia.
 */

import { juego } from "./juego.js";
import { PREGUNTAS } from "./preguntas.js";
import { ui } from "./ui.js";
import { almacenamiento } from "./almacenamiento.js";

// Reserva para conectar lógica de partida más adelante
void juego;
void PREGUNTAS;
void almacenamiento;

ui.inicializar();
console.log("Trivia Colombia lista");
