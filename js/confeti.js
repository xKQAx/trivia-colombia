/**
 * confeti.js — Canvas de celebración (solo DOM/canvas, sin lógica de juego).
 */

const COLORES = ['#1E5A45', '#E3A72F', '#C65D35', '#1B4F8A', '#2F8A57', '#FFFAF2'];
const DURACION_MS = 2000;
const PIEZAS = 80;

/**
 * ¿El usuario prefiere menos movimiento?
 */
function reduceMotion() {
  try {
    return typeof matchMedia === 'function'
      && matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Lanza confeti ~2s; no hace nada con reduced-motion.
 * @param {HTMLElement} [ancla] contenedor; por defecto body
 */
export function lanzarConfeti(ancla = document.body) {
  if (reduceMotion() || !ancla) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'confeti-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ancla.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const piezas = Array.from({ length: PIEZAS }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height * 0.4,
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 10,
    color: COLORES[Math.floor(Math.random() * COLORES.length)],
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * Math.PI,
    vr: -0.15 + Math.random() * 0.3
  }));

  const inicio = performance.now();

  function cuadro(ahora) {
    const t = ahora - inicio;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of piezas) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (t < DURACION_MS) {
      requestAnimationFrame(cuadro);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(cuadro);
}
