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

/** Estado visual de configuración (stub; sin persistencia aún). */
const configUI = {
  categoria: "historia",
  dificultad: "medio",
  nombre: "",
};

const NOMBRES_CATEGORIA = {
  todas: "Todas",
  geografia: "Geografía",
  historia: "Historia",
  cultura: "Cultura y Tradiciones",
  deportes: "Deportes",
  naturaleza: "Ciencia y Naturaleza",
};

const NOMBRES_DIFICULTAD = {
  facil: "Fácil",
  medio: "Medio",
  dificil: "Difícil",
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

/** Actualiza chip de jugador y texto demo del mejor puntaje. */
function refrescarCabeceraConfig() {
  const chip = document.getElementById("chip-jugador");
  if (chip) {
    chip.textContent = `Jugador: ${configUI.nombre || "—"}`;
  }

  const aviso = document.getElementById("aviso-mejor-puntaje");
  const texto = aviso?.querySelector("span");
  if (texto) {
    const cat = NOMBRES_CATEGORIA[configUI.categoria] ?? "Historia";
    const dif = NOMBRES_DIFICULTAD[configUI.dificultad] ?? "Medio";
    // Valor de ejemplo estático (como en Figma); no lee localStorage aún
    texto.textContent = `Tu mejor puntaje en ${cat} · ${dif}: 1.250 puntos`;
  }
}

/**
 * Selección exclusiva visual (radio-like) en un grupo de botones.
 * @param {string} selectorGrupo
 * @param {(valor: string) => void} alCambiar
 * @param {string} attrDatos
 */
function enlazarGrupoOpcion(selectorGrupo, alCambiar, attrDatos) {
  document.querySelectorAll(selectorGrupo).forEach((boton) => {
    boton.addEventListener("click", () => {
      document.querySelectorAll(selectorGrupo).forEach((otro) => {
        otro.classList.remove("is-activo");
        otro.setAttribute("aria-pressed", "false");
        otro.querySelector(".tarjeta-opcion__check")?.remove();
      });

      boton.classList.add("is-activo");
      boton.setAttribute("aria-pressed", "true");

      // Check solo en categorías (patrón del diseño Figma)
      if (boton.matches(".tarjeta-opcion") && !boton.querySelector(".tarjeta-opcion__check")) {
        const check = document.createElement("span");
        check.className = "tarjeta-opcion__check";
        check.setAttribute("aria-hidden", "true");
        check.innerHTML =
          '<svg class="icono" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L10 17.5L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        boton.appendChild(check);
      }

      const valor = boton.getAttribute(attrDatos);
      if (valor) alCambiar(valor);
      refrescarCabeceraConfig();
    });
  });
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
    configUI.nombre = nombre;
    refrescarCabeceraConfig();
    console.log("Jugar (stub) — jugador:", nombre);
    mostrarPantalla("configuracion");
  });

  // Configuración: categorías y niveles (solo estado visual)
  enlazarGrupoOpcion(".rejilla-categorias .tarjeta-opcion", (valor) => {
    configUI.categoria = valor;
  }, "data-categoria");

  enlazarGrupoOpcion(".rejilla-niveles .tarjeta-nivel", (valor) => {
    configUI.dificultad = valor;
  }, "data-dificultad");

  document.getElementById("btn-comenzar")?.addEventListener("click", () => {
    console.log("Comenzar (stub)", { ...configUI });
    mostrarPantalla("juego");
  });

  // Demo visual: elegir opción → pantalla de retroalimentación (sin scoring real)
  document.querySelectorAll("#juego-opciones .opcion").forEach((boton) => {
    boton.addEventListener("click", () => {
      console.log("Respuesta demo (stub)", boton.getAttribute("data-opcion"));
      mostrarPantalla("retroalimentacion");
    });
  });

  // Comodines: solo feedback visual deshabilitando el botón
  document.getElementById("btn-5050")?.addEventListener("click", (evento) => {
    const boton = evento.currentTarget;
    boton.disabled = true;
    boton.textContent = "50/50 usado";
  });

  document.getElementById("btn-tiempo-extra")?.addEventListener("click", (evento) => {
    const boton = evento.currentTarget;
    boton.disabled = true;
    const tiempo = document.getElementById("juego-tiempo");
    if (tiempo) {
      const actual = Number.parseInt(tiempo.textContent ?? "14", 10) || 14;
      tiempo.textContent = String(actual + 10);
    }
  });

  refrescarCabeceraConfig();
}

export const ui = {
  inicializar,
  mostrarPantalla,
  alternarTema,
  alternarSonido,
};
