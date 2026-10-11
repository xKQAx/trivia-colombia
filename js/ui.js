/**
 * ui.js — Solo DOM. No decide reglas de juego ni toca localStorage.
 * Los ids/clases del HTML real mandan (p. ej. #juego-tiempo, no #juego-segundos).
 */

import { CATEGORIAS, DIFICULTADES } from './preguntas.js';

const PANTALLAS = {
  inicio: 'pantalla-inicio',
  instrucciones: 'pantalla-instrucciones',
  configuracion: 'pantalla-configuracion',
  juego: 'pantalla-juego',
  retroalimentacion: 'pantalla-retroalimentacion',
  resultado: 'pantalla-resultado',
  ranking: 'pantalla-ranking'
};

const NOMBRES_CAT = Object.fromEntries([
  ['todas', 'Todas'],
  ...CATEGORIAS.map((c) => [c.clave, c.nombre])
]);

const NOMBRES_DIF = Object.fromEntries(DIFICULTADES.map((d) => [d.clave, d.nombre]));

const LETRAS = ['A', 'B', 'C', 'D'];

/** SVG de check (createElementNS: evita innerHTML con markup). */
function crearSvgCheck() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icono');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M5 12.5L10 17.5L19 7');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2.2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);
  return svg;
}

function crearSvgMarca(ok) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icono');
  svg.setAttribute('width', '22');
  svg.setAttribute('height', '22');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  if (ok) {
    path.setAttribute('d', 'M5 12.5L10 17.5L19 7');
    path.setAttribute('stroke-linejoin', 'round');
  } else {
    path.setAttribute('d', 'M7 7L17 17M17 7L7 17');
  }
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2.2');
  path.setAttribute('stroke-linecap', 'round');
  svg.appendChild(path);
  return svg;
}

/**
 * Formato miles con punto (regex propia, sin toLocaleString).
 * @param {number} n
 */
export function formatearNumero(n) {
  const entero = Math.round(Number(n) || 0);
  const negativo = entero < 0;
  const abs = String(Math.abs(entero));
  const conPuntos = abs.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return negativo ? `-${conPuntos}` : conPuntos;
}

/**
 * @param {string} iso
 */
export function formatearFecha(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

/**
 * @param {number} segundos
 */
export function formatearTiempo(segundos) {
  const total = Math.max(0, Math.round(Number(segundos) || 0));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * @param {keyof typeof PANTALLAS} clave
 */
export function mostrarPantalla(clave) {
  const idActivo = PANTALLAS[clave];
  if (!idActivo) return;

  Object.values(PANTALLAS).forEach((id) => {
    const seccion = document.getElementById(id);
    if (seccion) seccion.hidden = id !== idActivo;
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * @param {string} mensaje
 */
export function mostrarErrorNombre(mensaje) {
  const entrada = document.getElementById('entrada-nombre');
  if (!entrada) return;

  entrada.setAttribute('aria-invalid', 'true');
  entrada.focus();

  let aviso = document.getElementById('error-nombre');
  if (!aviso) {
    aviso = document.createElement('p');
    aviso.id = 'error-nombre';
    aviso.className = 'campo__error';
    aviso.setAttribute('role', 'alert');
    entrada.insertAdjacentElement('afterend', aviso);
  }
  aviso.textContent = mensaje;
}

export function limpiarErrorNombre() {
  const entrada = document.getElementById('entrada-nombre');
  entrada?.removeAttribute('aria-invalid');
  document.getElementById('error-nombre')?.remove();
}

/**
 * Marca selección exclusiva en un grupo de tarjetas.
 * @param {string} selector
 * @param {string} valor
 * @param {string} attr
 */
function marcarGrupo(selector, valor, attr) {
  document.querySelectorAll(selector).forEach((boton) => {
    const activo = boton.getAttribute(attr) === valor;
    boton.classList.toggle('is-activo', activo);
    boton.setAttribute('aria-pressed', String(activo));

    if (boton.matches('.tarjeta-opcion')) {
      boton.querySelector('.tarjeta-opcion__check')?.remove();
      if (activo) {
        const check = document.createElement('span');
        check.className = 'tarjeta-opcion__check';
        check.setAttribute('aria-hidden', 'true');
        check.appendChild(crearSvgCheck());
        boton.appendChild(check);
      }
    }
  });
}

/**
 * @param {string} nombre
 * @param {string} categoria
 * @param {string} dificultad
 * @param {number|null} mejorPuntaje
 */
export function renderizarConfiguracion(nombre, categoria, dificultad, mejorPuntaje) {
  const chip = document.getElementById('chip-jugador');
  if (chip) chip.textContent = `Jugador: ${nombre || '—'}`;

  marcarGrupo('.rejilla-categorias .tarjeta-opcion', categoria, 'data-categoria');
  marcarGrupo('.rejilla-niveles .tarjeta-nivel', dificultad, 'data-dificultad');

  const aviso = document.getElementById('aviso-mejor-puntaje');
  const texto = aviso?.querySelector('span');
  if (texto) {
    const cat = NOMBRES_CAT[categoria] ?? categoria;
    const dif = NOMBRES_DIF[dificultad] ?? dificultad;
    if (mejorPuntaje == null) {
      texto.textContent = `Aún no tienes puntaje en ${cat} · ${dif}`;
    } else {
      texto.textContent = `Tu mejor puntaje en ${cat} · ${dif}: ${formatearNumero(mejorPuntaje)} puntos`;
    }
  }
}

/**
 * @param {object} pregunta
 * @param {number} numero 1-based
 * @param {number} total
 * @param {string} dificultadPartida
 */
export function mostrarPregunta(pregunta, numero, total, dificultadPartida) {
  const num = document.getElementById('juego-num');
  if (num) num.textContent = String(numero);

  const chip = document.getElementById('juego-chip-cat');
  if (chip) {
    const cat = NOMBRES_CAT[pregunta.categoria] ?? pregunta.categoria;
    const dif = NOMBRES_DIF[dificultadPartida] ?? dificultadPartida;
    chip.textContent = `${cat} · ${dif}`;
  }

  const enunciado = document.getElementById('juego-enunciado');
  if (enunciado) enunciado.textContent = pregunta.enunciado;

  const contenedor = document.getElementById('juego-opciones');
  if (!contenedor) return;

  // Plantilla data-ejemplo: clonar y luego regenerar (quitar plantilla del DOM)
  let plantilla = contenedor.querySelector('[data-ejemplo="opcion"]');
  if (!plantilla) plantilla = contenedor.querySelector('.opcion');
  const moldeOpcion = plantilla
    ? /** @type {HTMLButtonElement} */ (plantilla.cloneNode(true))
    : null;

  contenedor.replaceChildren();

  pregunta.opciones.forEach((texto, i) => {
    const boton = /** @type {HTMLButtonElement} */ (
      moldeOpcion ? moldeOpcion.cloneNode(true) : document.createElement('button')
    );
    boton.removeAttribute('data-ejemplo');
    boton.removeAttribute('hidden');
    boton.className = 'opcion';
    boton.type = 'button';
    boton.dataset.opcion = String(i);
    boton.removeAttribute('aria-disabled');
    boton.removeAttribute('aria-hidden');
    boton.disabled = false;

    let letra = boton.querySelector('.opcion__letra');
    let cuerpo = boton.querySelector('.opcion__texto');
    if (!letra || !cuerpo) {
      boton.replaceChildren();
      letra = document.createElement('span');
      letra.className = 'opcion__letra';
      cuerpo = document.createElement('span');
      cuerpo.className = 'opcion__texto';
      boton.append(letra, cuerpo);
    }
    boton.querySelector('.opcion__marca')?.remove();
    boton.classList.remove('opcion--oculta', 'opcion--correcta', 'opcion--incorrecta', 'opcion--neutral');
    letra.textContent = LETRAS[i];
    cuerpo.textContent = texto;
    contenedor.appendChild(boton);
  });

  const barra = document.querySelector('#pantalla-juego .barra-progreso__lleno');
  if (barra) {
    const pct = total > 0 ? (numero / total) * 100 : 0;
    /** @type {HTMLElement} */ (barra).style.width = `${pct}%`;
  }

  reiniciarRetroalimentacion();
}

/**
 * @param {number} segundos
 * @param {number} tiempoMax
 */
export function actualizarTemporizador(segundos, tiempoMax = 20) {
  const valor = document.getElementById('juego-tiempo');
  if (valor) valor.textContent = String(Math.max(0, segundos));

  const reloj = document.getElementById('juego-temporizador');
  if (reloj) {
    const max = Math.max(1, tiempoMax);
    const progreso = Math.max(0, Math.min(1, segundos / max));
    reloj.style.setProperty('--progreso', String(progreso));
    reloj.classList.toggle('temporizador--urgente', segundos <= 5);
    reloj.classList.toggle('temporizador--agotado', segundos <= 0);
  }

  // Espejo en pantalla de retro (mismo valor visible al revelar)
  const retroValor = document.querySelector(
    '#pantalla-retroalimentacion .temporizador__valor'
  );
  if (retroValor) retroValor.textContent = String(Math.max(0, segundos));
}

/**
 * @param {number} puntaje
 * @param {number} racha
 */
export function actualizarMarcador(puntaje, racha) {
  const actualizar = (root) => {
    const p = root.querySelector('.partida__puntaje, #juego-puntaje');
    if (p) p.textContent = formatearNumero(puntaje);
    const r = root.querySelector('.chip--racha, #juego-racha');
    if (r) {
      // Conservar el SVG de fuego si existe
      const svg = r.querySelector('svg');
      r.textContent = '';
      if (svg) r.appendChild(svg);
      r.append(document.createTextNode(` Racha: ${racha}`));
    }
  };

  const juego = document.getElementById('pantalla-juego');
  const retro = document.getElementById('pantalla-retroalimentacion');
  if (juego) actualizar(juego);
  if (retro) actualizar(retro);

  const puntajeJuego = document.getElementById('juego-puntaje');
  if (puntajeJuego) puntajeJuego.textContent = formatearNumero(puntaje);
}

/**
 * Colorea opciones tras responder (pantalla juego y retro).
 * @param {number|null} indiceElegido
 * @param {number} indiceCorrecta
 * @param {ParentNode} [raiz]
 */
export function marcarRespuesta(indiceElegido, indiceCorrecta, raiz) {
  const root = raiz ?? document.getElementById('juego-opciones');
  if (!root) return;

  root.querySelectorAll('.opcion').forEach((el, i) => {
    el.classList.remove('opcion--correcta', 'opcion--incorrecta', 'opcion--neutral');
    el.setAttribute('aria-disabled', 'true');
    if (el instanceof HTMLButtonElement) el.disabled = false;

    el.querySelector('.opcion__marca')?.remove();

    if (i === indiceCorrecta) {
      el.classList.add('opcion--correcta');
      const marca = document.createElement('span');
      marca.className = 'opcion__marca';
      marca.setAttribute('aria-hidden', 'true');
      marca.appendChild(crearSvgMarca(true));
      el.appendChild(marca);
    } else if (indiceElegido != null && i === indiceElegido) {
      el.classList.add('opcion--incorrecta');
      const marca = document.createElement('span');
      marca.className = 'opcion__marca';
      marca.setAttribute('aria-hidden', 'true');
      marca.appendChild(crearSvgMarca(false));
      el.appendChild(marca);
    } else {
      el.classList.add('opcion--neutral');
    }
  });
}

/**
 * Oculta opciones (comodín 50/50) con aria y clase.
 * @param {number[]} indices
 */
export function ocultarOpciones(indices) {
  const root = document.getElementById('juego-opciones');
  if (!root) return;
  indices.forEach((i) => {
    const el = root.querySelector(`[data-opcion="${i}"]`);
    if (!el) return;
    el.classList.add('opcion--oculta');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('aria-disabled', 'true');
  });
}

/**
 * @param {object} resultado
 * @param {boolean} resultado.correcta
 * @param {number} resultado.puntosGanados
 * @param {string} resultado.explicacion
 * @param {boolean} [resultado.tiempoAgotado]
 * @param {number|null} resultado.indiceElegido
 * @param {number} resultado.indiceCorrecta
 * @param {string[]} resultado.opciones
 * @param {string} resultado.enunciado
 * @param {string} categoriaNombre
 * @param {string} dificultadNombre
 * @param {number} numero
 * @param {number} total
 * @param {number} puntaje
 * @param {number} racha
 * @param {number} segundos
 */
export function mostrarRetroalimentacion(
  resultado,
  categoriaNombre,
  dificultadNombre,
  numero,
  total,
  puntaje,
  racha,
  segundos
) {
  const pantalla = document.getElementById('pantalla-retroalimentacion');
  if (!pantalla) return;

  const contador = document.getElementById('titulo-retroalimentacion');
  if (contador) contador.textContent = `${numero} / ${total}`;

  const chip = pantalla.querySelector('.pregunta-bloque .chip');
  if (chip) chip.textContent = `${categoriaNombre} · ${dificultadNombre}`;

  const enunciado = pantalla.querySelector('.pregunta-bloque__enunciado');
  if (enunciado) enunciado.textContent = resultado.enunciado;

  const opcionesRoot = pantalla.querySelector('.opciones');
  if (opcionesRoot) {
    opcionesRoot.classList.add('opciones--reveladas');
    opcionesRoot.replaceChildren();
    resultado.opciones.forEach((texto, i) => {
      const div = document.createElement('div');
      div.className = 'opcion';
      div.setAttribute('aria-disabled', 'true');
      const letra = document.createElement('span');
      letra.className = 'opcion__letra';
      letra.textContent = LETRAS[i];
      const cuerpo = document.createElement('span');
      cuerpo.className = 'opcion__texto';
      cuerpo.textContent = texto;
      div.append(letra, cuerpo);
      opcionesRoot.appendChild(div);
    });
    marcarRespuesta(resultado.indiceElegido, resultado.indiceCorrecta, opcionesRoot);
  }

  const banner = document.getElementById('retro-banner');
  if (banner) {
    banner.classList.remove('retro-banner--error', 'retro-banner--acierto');
    banner.classList.add(resultado.correcta ? 'retro-banner--acierto' : 'retro-banner--error');
    const titulo = banner.querySelector('.retro-banner__titulo');
    const detalle = banner.querySelector('.retro-banner__detalle');
    if (titulo) {
      titulo.textContent = resultado.tiempoAgotado
        ? 'Se acabó el tiempo'
        : resultado.correcta
          ? '¡Respuesta correcta!'
          : 'Respuesta incorrecta';
    }
    if (detalle) {
      if (resultado.correcta) {
        detalle.textContent = `+${formatearNumero(resultado.puntosGanados)} puntos`;
      } else {
        detalle.textContent = '+0 puntos · La racha se reinicia';
      }
    }
  }

  const expl = pantalla.querySelector('.explicacion__texto');
  if (expl) expl.textContent = resultado.explicacion;

  const btnSig = document.getElementById('btn-siguiente');
  if (btnSig) {
    btnSig.textContent =
      numero >= total ? 'Ver resultado' : 'Siguiente pregunta';
  }

  const barra = pantalla.querySelector('.barra-progreso__lleno');
  if (barra) {
    /** @type {HTMLElement} */ (barra).style.width = `${(numero / total) * 100}%`;
  }

  actualizarMarcador(puntaje, racha);
  actualizarTemporizador(segundos, segundos || 20);

  // También marcar en pantalla de juego (bloqueadas)
  const juegoOps = document.getElementById('juego-opciones');
  if (juegoOps) {
    marcarRespuesta(resultado.indiceElegido, resultado.indiceCorrecta, juegoOps);
  }

  mostrarPantalla('retroalimentacion');
}

export function reiniciarRetroalimentacion() {
  const banner = document.getElementById('retro-banner');
  if (banner) {
    banner.classList.remove('retro-banner--error', 'retro-banner--acierto');
  }
}

/**
 * @param {{ cincuenta: boolean, tiempo: boolean }} comodines
 * @param {boolean} respondida
 */
/** Icono de reloj para el botón de tiempo extra (recreable si se perdió del DOM). */
function crearSvgReloj() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icono');
  svg.setAttribute('width', '22');
  svg.setAttribute('height', '22');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circulo.setAttribute('cx', '12');
  circulo.setAttribute('cy', '12');
  circulo.setAttribute('r', '8.5');
  circulo.setAttribute('stroke', 'currentColor');
  circulo.setAttribute('stroke-width', '1.8');
  const manecilla = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  manecilla.setAttribute('d', 'M12 7.5V12.5L15 14.5');
  manecilla.setAttribute('stroke', 'currentColor');
  manecilla.setAttribute('stroke-width', '1.8');
  manecilla.setAttribute('stroke-linecap', 'round');
  manecilla.setAttribute('stroke-linejoin', 'round');
  svg.append(circulo, manecilla);
  return svg;
}

export function actualizarComodines(comodines, respondida) {
  const btn50 = document.getElementById('btn-5050');
  const btnTiempo = document.getElementById('btn-tiempo-extra');

  if (btn50) {
    btn50.disabled = respondida || !comodines.cincuenta;
    btn50.textContent = comodines.cincuenta ? '50/50 · −30 pts' : '50/50 usado';
  }

  if (btnTiempo) {
    btnTiempo.disabled = respondida || !comodines.tiempo;
    btnTiempo.replaceChildren();
    if (comodines.tiempo) {
      btnTiempo.append(crearSvgReloj(), document.createTextNode(' +10 s · −30 pts'));
    } else {
      btnTiempo.append(document.createTextNode('Tiempo usado'));
    }
  }
}

/**
 * Mensaje según aciertos (textos de resultado).
 * @param {string} nombre
 * @param {number} aciertos
 * @param {number} total
 */
function mensajeResultado(nombre, aciertos, total) {
  if (aciertos === total) return `¡Increíble, ${nombre}! Dominas el tema.`;
  if (aciertos >= 7) return `¡Muy bien, ${nombre}! Vas por muy buen camino.`;
  if (aciertos >= 4) return `¡Bien, ${nombre}! Sigues sumando aciertos.`;
  return `¡Ánimo, ${nombre}! La próxima te va mejor.`;
}

/**
 * @param {object} resumen
 * @param {number|null} posicion
 */
export function mostrarResultado(resumen, posicion) {
  const mensaje = document.getElementById('resultado-mensaje');
  if (mensaje) {
    mensaje.textContent = mensajeResultado(
      resumen.nombre,
      resumen.aciertos,
      resumen.totalPreguntas
    );
  }

  const pantalla = document.getElementById('pantalla-resultado');
  if (!pantalla) return;

  const valor = pantalla.querySelector('.puntaje-final__valor');
  if (valor) valor.textContent = formatearNumero(resumen.puntaje);

  const stats = pantalla.querySelectorAll('.dato-stat__valor');
  if (stats[0]) stats[0].textContent = `${resumen.aciertos} / ${resumen.totalPreguntas}`;
  if (stats[1]) stats[1].textContent = formatearTiempo(resumen.tiempoTotal);
  if (stats[2]) {
    stats[2].textContent = posicion != null ? `#${posicion}` : '—';
  }

  const lista = pantalla.querySelector('.falladas__lista');
  const seccion = pantalla.querySelector('.falladas');
  if (lista && seccion) {
    let plantilla = lista.querySelector('[data-ejemplo="fallada"]');
    if (!plantilla) plantilla = lista.querySelector('.falladas__item');
    const moldeFallada = plantilla
      ? /** @type {HTMLElement} */ (plantilla.cloneNode(true))
      : null;

    lista.replaceChildren();

    if (resumen.falladas.length === 0) {
      seccion.hidden = true;
    } else {
      seccion.hidden = false;
      resumen.falladas.forEach((f) => {
        const item = /** @type {HTMLElement} */ (
          moldeFallada
            ? moldeFallada.cloneNode(true)
            : document.createElement('li')
        );
        item.removeAttribute('data-ejemplo');
        item.className = 'falladas__item';
        item.hidden = false;

        let preg = item.querySelector('.falladas__pregunta');
        if (!preg) {
          item.replaceChildren();
          preg = document.createElement('p');
          preg.className = 'falladas__pregunta';
          const chips = document.createElement('div');
          chips.className = 'falladas__chips';
          const err = document.createElement('span');
          err.className = 'chip chip--error';
          const ok = document.createElement('span');
          ok.className = 'chip chip--ok';
          chips.append(err, ok);
          item.append(preg, chips);
        }
        preg.textContent = f.enunciado;

        const chips = item.querySelectorAll('.falladas__chips .chip');
        if (chips[0]) chips[0].textContent = `Tu respuesta: ${f.respuestaUsuario}`;
        if (chips[1]) chips[1].textContent = `Correcta: ${f.respuestaCorrecta}`;

        lista.appendChild(item);
      });
    }

    lista.querySelectorAll('[data-ejemplo]').forEach((el) => el.remove());
  }

  mostrarPantalla('resultado');
}

/**
 * @param {Array<object>} ranking
 * @param {object|null} entradaActual
 * @param {object} resumenStats
 */
export function renderizarRanking(ranking, entradaActual, resumenStats) {
  const tabla = document.querySelector('.tabla-ranking');
  if (!tabla) return;

  const cabeza = tabla.querySelector('.tabla-ranking__fila--cabeza');
  let plantilla = tabla.querySelector('[data-ejemplo="fila-ranking"]');
  if (!plantilla) {
    plantilla = tabla.querySelector('.tabla-ranking__fila:not(.tabla-ranking__fila--cabeza)');
  }
  // Clonar antes de vaciar: el nodo plantilla vive dentro de la tabla
  const molde = plantilla ? /** @type {HTMLElement} */ (plantilla.cloneNode(true)) : null;

  [...tabla.children].forEach((hijo) => {
    if (!hijo.classList.contains('tabla-ranking__fila--cabeza')) hijo.remove();
  });

  let vacio = document.getElementById('ranking-vacio');
  if (!vacio) {
    vacio = document.createElement('p');
    vacio.id = 'ranking-vacio';
    vacio.className = 'ranking-vacio';
    vacio.textContent = 'Aún no hay puntajes. ¡Sé el primero!';
    tabla.after(vacio);
  }

  if (ranking.length === 0) {
    vacio.hidden = false;
  } else {
    vacio.hidden = true;
    ranking.forEach((entrada, idx) => {
      const fila = /** @type {HTMLElement} */ (
        molde ? molde.cloneNode(true) : document.createElement('div')
      );
      fila.removeAttribute('data-ejemplo');
      fila.hidden = false;
      fila.className = 'tabla-ranking__fila';
      fila.setAttribute('role', 'row');
      if (idx < 3) fila.classList.add('tabla-ranking__fila--podio');

      const esActual =
        entradaActual &&
        entrada.nombre === entradaActual.nombre &&
        entrada.puntaje === entradaActual.puntaje &&
        entrada.fecha === entradaActual.fecha;
      // HTML usa --tu; el prompt menciona fila-actual → se adapta a la clase real
      if (esActual) fila.classList.add('tabla-ranking__fila--tu');

      const pos = idx + 1;
      const celdas = [
        String(pos),
        esActual ? `${entrada.nombre} (tú)` : entrada.nombre,
        formatearNumero(entrada.puntaje),
        NOMBRES_CAT[entrada.categoria] ?? entrada.categoria,
        formatearFecha(entrada.fecha)
      ];

      fila.replaceChildren();
      celdas.forEach((texto, i) => {
        const span = document.createElement('span');
        span.setAttribute('role', 'cell');
        if (i === 0) {
          span.className = 'posicion';
          if (pos === 1) span.classList.add('posicion--oro');
          else if (pos === 2) span.classList.add('posicion--plata');
          else if (pos === 3) span.classList.add('posicion--bronce');
        }
        if (i === 2) span.classList.add('tabla-ranking__puntaje');
        span.textContent = texto;
        fila.appendChild(span);
      });

      tabla.appendChild(fila);
    });
  }

  // Conservar molde oculto para re-renderizados posteriores
  if (molde) {
    const guardada = /** @type {HTMLElement} */ (molde.cloneNode(true));
    guardada.setAttribute('data-ejemplo', 'fila-ranking');
    guardada.hidden = true;
    guardada.classList.remove('tabla-ranking__fila--tu', 'tabla-ranking__fila--podio');
    tabla.appendChild(guardada);
  }

  if (cabeza && !tabla.contains(cabeza)) tabla.prepend(cabeza);
  renderizarEstadisticas(resumenStats);
}

/**
 * Actualiza solo el bloque lateral de estadísticas.
 * @param {object} resumenStats
 */
export function renderizarEstadisticas(resumenStats) {
  const dl = document.querySelector('.stats-laterales__lista');
  if (!dl || !resumenStats) return;
  const dds = dl.querySelectorAll('dd');
  if (dds[0]) dds[0].textContent = formatearNumero(resumenStats.partidas);
  if (dds[1]) dds[1].textContent = `${resumenStats.porcentajeAciertos} %`;
  if (dds[2]) dds[2].textContent = formatearNumero(resumenStats.mejorPuntaje);
  if (dds[3]) dds[3].textContent = resumenStats.mejorCategoria;
}

/**
 * @param {'claro'|'oscuro'} tema
 */
export function aplicarTema(tema) {
  const raiz = document.documentElement;
  if (tema === 'oscuro') raiz.setAttribute('data-tema', 'oscuro');
  else raiz.removeAttribute('data-tema');

  const boton = document.getElementById('btn-tema');
  if (boton) {
    boton.setAttribute('aria-pressed', String(tema === 'oscuro'));
    boton.title = tema === 'oscuro' ? 'Tema oscuro' : 'Tema claro';
  }
}

/**
 * @param {boolean} activo
 */
export function aplicarSonido(activo) {
  const boton = document.getElementById('btn-sonido');
  if (boton) {
    boton.setAttribute('aria-pressed', String(activo));
    boton.title = activo ? 'Sonido activado' : 'Sonido silenciado';
  }
}

export function nombreCategoria(clave) {
  return NOMBRES_CAT[clave] ?? clave;
}

export function nombreDificultad(clave) {
  return NOMBRES_DIF[clave] ?? clave;
}
