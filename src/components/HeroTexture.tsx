/**
 * Hero texture T6 — the design kit's T4 Voronoi morph combined with its T1
 * animated grain, under a hollow-centre vignette.
 *
 * Layers, bottom to top:
 * 1. Morph mesh — the canvas's 88 vertices and 215 edges from
 *    `voronoiMorphData`, drawn on a <canvas>. The design animates this with
 *    SMIL on every x1/y1/x2/y2; that is 1,036 timelines forcing a
 *    relayout-and-repaint of a 150%-size SVG each frame. Here the same
 *    loops are interpolated in JS (linear, evenly-spaced, exactly as SMIL
 *    `values` does) and stroked in ~300 draw calls at 30fps, on a canvas
 *    the size of the hero at 1× DPR. The 25% overscan is done in the
 *    coordinate mapping, so nothing is rendered off-canvas. Runs only while
 *    the hero is the active section and the tab is visible; otherwise, and
 *    under `prefers-reduced-motion`, it draws one frame and stops.
 * 2. Grain — one small seamless noise tile (pre-rendered by the browser
 *    once, as a CSS background) whose *position* jumps every 90ms. Same
 *    look as re-seeding feTurbulence across the whole hero, without
 *    re-rasterising the noise 11 times a second. Pure CSS.
 * 3. Vignette — ground colour, opaque inside `--vignette-begin`, clear
 *    beyond `--vignette-end`; both are radii from the hero's centre and
 *    live in `styles/design-import.css` on `.u-hero-texture`. It sits above
 *    both the mesh and the grain, so one pair of knobs governs both.
 *
 * @module HeroTexture
 */
import { useEffect, useRef } from 'react';
import { useLandingIndex } from '../lib/landingNav';
import { useReducedMotion } from '../lib/hooks';
import { VERTICES, EDGES, MESH_W, MESH_H } from '../illustrations/voronoiMorphData';

/** The design overscans the drawing 25% past the container on every side. */
const OVERSCAN = 1.5;
const FRAME_MS = 1000 / 30;

/** Position of a vertex at time `t` (s), matching SMIL's linear `values` loop. */
function at(values: number[], dur: number, t: number): number {
  const segs = values.length - 1;
  const u = ((t % dur) + dur) % dur / dur * segs;
  const i = Math.min(segs - 1, Math.floor(u));
  const f = u - i;
  return values[i] + (values[i + 1] - values[i]) * f;
}

export default function HeroTexture() {
  const ref = useRef<HTMLCanvasElement>(null);
  const active = useLandingIndex() === 0;
  const reduced = useReducedMotion();

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    // A soft background at 0.75 opacity does not need device-pixel lines.
    const dpr = 1;
    let w = 0;
    let h = 0;
    let s = 1; // viewBox units → CSS px
    let ox = 0;
    let oy = 0;

    const resize = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // xMidYMid slice onto a box OVERSCAN× the hero, centred on it.
      s = Math.max((w * OVERSCAN) / MESH_W, (h * OVERSCAN) / MESH_H);
      ox = w / 2 - (MESH_W / 2) * s;
      oy = h / 2 - (MESH_H / 2) * s;
    };

    const pos = new Float64Array(VERTICES.length * 2);
    const draw = (t: number) => {
      for (let i = 0; i < VERTICES.length; i++) {
        const v = VERTICES[i];
        pos[2 * i] = ox + at(v.x, v.dur, t) * s;
        pos[2 * i + 1] = oy + at(v.y, v.dur, t) * s;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = s;
      ctx.strokeStyle = 'rgba(129, 173, 170, 0.35)';
      ctx.beginPath();
      for (const [a, b] of EDGES) {
        ctx.moveTo(pos[2 * a], pos[2 * a + 1]);
        ctx.lineTo(pos[2 * b], pos[2 * b + 1]);
      }
      ctx.stroke();
      for (let i = 0; i < VERTICES.length; i++) {
        const accent = VERTICES[i].accent;
        ctx.fillStyle = accent ? '#d93b3c' : '#81adaa';
        ctx.beginPath();
        ctx.arc(pos[2 * i], pos[2 * i + 1], (accent ? 3 : 2) * s, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now() / 1000);
    });
    ro.observe(cv);

    let raf = 0;
    let last = 0;
    const running = () => active && !reduced && !document.hidden;
    const tick = (now: number) => {
      if (!running()) {
        raf = 0;
        return;
      }
      if (now - last >= FRAME_MS) {
        last = now;
        draw(now / 1000);
      }
      raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (running() && !raf) raf = requestAnimationFrame(tick);
    };

    draw(performance.now() / 1000); // always leave a frame on screen
    kick();
    document.addEventListener('visibilitychange', kick);
    return () => {
      ro.disconnect();
      document.removeEventListener('visibilitychange', kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, reduced]);

  return (
    <div className="u-hero-texture" aria-hidden="true">
      <canvas ref={ref} className="u-hero-texture-mesh" />
      <div className="u-hero-texture-grain" />
      <div className="u-hero-texture-vignette" />
    </div>
  );
}
