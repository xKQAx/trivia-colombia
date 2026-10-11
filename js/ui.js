/**
 * ui.js — Interfaz de usuario (DOM).
 * Actualiza y controla elementos visuales de la página.
 * Patrón Module: exporta un único objeto `ui` con operaciones de presentación.
 */

const PANTALLAS = {
  inicio: "pantalla-inicio",
  instrucciones: "pantalla-instrucciones",
  configuracion: "pantalla-configuracion",
  juego: "pantalla-juego",
  retroalimentacion: "pantalla-retroalimentacion",
  resultado: "pantalla-resultado",
  ranking: "pantalla-ranking",
};

/**
 * Muestra una pantalla y oculta el resto (navegación mínima para demo de UI).
 * @param {keyof typeof PANTALLAS} clave
 */
function mostrarPantalla(clave) {
  const idActivo = PANTALLAS[clave];
  if (!idActivo) {
    console.warn("Pantalla desconocida:", clave);
    return;
  }

  Object.values(PANTALLAS).forEach((id) => {
    const seccion = document.getElementById(id);
    if (!seccion) return;
    seccion.hidden = id !== idActivo;
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Alterna tema claro/oscuro mediante data-tema en <html>. */
function alternarTema() {
  const raiz = document.documentElement;
  const oscuro = raiz.getAttribute("data-tema") === "oscuro";
  if (oscuro) {
    raiz.removeAttribute("data-tema");
  } else {
    raiz.setAttribute("data-tema", "oscuro");
  }

  const boton = document.getElementById("btn-tema");
  if (boton) {
    boton.setAttribute("aria-pressed", String(!oscuro));
  }
}

/** Stub de sonido: solo refleja estado en el botón. */
function alternarSonido() {
  const boton = document.getElementById("btn-sonido");
  if (!boton) return;
  const activo = boton.getAttribute("aria-pressed") !== "false";
  boton.setAttribute("aria-pressed", String(!activo));
}

/**
 * Enlaza botones con data-ir y controles de cabecera.
 * No implementa lógica de partida: solo UI.
 */
function inicializar() {
  document.querySelectorAll("[data-ir]").forEach((elemento) => {
    elemento.addEventListener("click", (evento) => {
      evento.preventDefault();
      const destino = elemento.getAttribute("data-ir");
      if (destino) mostrarPantalla(destino);
    });
  });

  document.getElementById("btn-tema")?.addEventListener("click", alternarTema);
  document.getElementById("btn-sonido")?.addEventListener("click", alternarSonido);

  // Jugar: exige nombre no vacío (validación de presentación)
  document.getElementById("btn-jugar")?.addEventListener("click", () => {
    const entrada = document.getElementById("entrada-nombre");
    const nombre = entrada?.value?.trim() ?? "";
    if (!nombre) {
      entrada?.focus();
      entrada?.setAttribute("aria-invalid", "true");
      return;
    }
    entrada?.removeAttribute("aria-invalid");
    console.log("Jugar (stub) — jugador:", nombre);
    mostrarPantalla("configuracion");
  });
}

export const ui = {
  inicializar,
  mostrarPantalla,
  alternarTema,
  alternarSonido,
};
