"use client";
import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CursorTrailProps {
  /** Number of trailing circles */
  count?: number;
  /** Size of each circle in px */
  size?: number;
  /** Easing factor – how tightly each circle follows the next (0–1) */
  ease?: number;
  /** Array of colors for the gradient trail */
  colors?: string[];
}

interface CircleState {
  x: number;
  y: number;
  el: HTMLDivElement;
}

// ─── Default Color Palettes ───────────────────────────────────────────────────

export const PALETTES = {
  /** Original warm orange → deep violet */
  ember: [
    "#ffb56b",
    "#fdaf69",
    "#f89d63",
    "#f59761",
    "#ef865e",
    "#ec805d",
    "#e36e5c",
    "#df685c",
    "#d5585c",
    "#d1525c",
    "#c5415d",
    "#c03b5d",
    "#b22c5e",
    "#ac265e",
    "#9c155f",
    "#950f5f",
    "#830060",
    "#7c0060",
    "#680060",
    "#60005f",
    "#48005f",
    "#3d005e",
  ],
  /** Cool cyan → electric blue */
  ocean: [
    "#00f5ff",
    "#00e8f5",
    "#00d4e8",
    "#00c3d9",
    "#00b0cc",
    "#009dbf",
    "#008db2",
    "#007ba5",
    "#006b99",
    "#005c8d",
    "#004d82",
    "#003f77",
    "#00326d",
    "#002663",
    "#001a5a",
    "#001052",
    "#000849",
    "#000341",
    "#00003a",
    "#000034",
    "#00002e",
    "#000029",
  ],
  /** Lime → forest green */
  forest: [
    "#d4fc79",
    "#c8f56f",
    "#bced64",
    "#b0e55a",
    "#a3dd50",
    "#97d446",
    "#8bcc3c",
    "#7fc332",
    "#73ba28",
    "#68b11f",
    "#5da816",
    "#529f0d",
    "#479605",
    "#3d8d00",
    "#338400",
    "#297b00",
    "#207200",
    "#176900",
    "#0f6000",
    "#075700",
    "#024e00",
    "#004600",
  ],
  /** Gold → crimson */
  sunrise: [
    "#fff176",
    "#ffee58",
    "#ffe83a",
    "#ffd83a",
    "#ffc425",
    "#ffb01a",
    "#ff9a0f",
    "#ff8405",
    "#ff6f00",
    "#ff5c00",
    "#ff4600",
    "#f93300",
    "#f01f00",
    "#e60000",
    "#db0000",
    "#cf0000",
    "#c20000",
    "#b50000",
    "#a80000",
    "#9a0000",
    "#8c0000",
    "#7f0000",
  ],

  indigoDusk: [
    "#b8c0ff",
    "#9ba7f9",
    "#7f8ef2",
    "#6674e8",
    "#4d59d9",
    "#3840c4",
    "#252caa",
    "#141a90",
    "#070e76",
    "#02075c",
    "#000343",
    "#00012e",
  ],
  violetEmber: [
    "#c4b8ff",
    "#b49ef5",
    "#a385e8",
    "#8f6cd8",
    "#7b54c5",
    "#673db0",
    "#52289a",
    "#3f1582",
    "#2e086a",
    "#200252",
    "#14003c",
    "#0a0028",
  ],
  arcticCyan: [
    "#b0d4ff",
    "#90beff",
    "#70a8f8",
    "#5090ec",
    "#3578d8",
    "#2062bf",
    "#104da6",
    "#053a8d",
    "#012972",
    "#001a58",
    "#000e3f",
    "#000629",
  ],
  roseQuartz: [
    "#f0c0e8",
    "#e4a0d8",
    "#d680c5",
    "#c460b0",
    "#ae4299",
    "#982882",
    "#80126c",
    "#680456",
    "#520042",
    "#3c002f",
    "#28001f",
  ],
  midnightAbyss: [
    "#000814",
    "#001d3d",
    "#003566",
    "#002855",
    "#001f3f",
    "#001233",
    "#000d1a",
    "#000814",
  ],
};

export type PaletteName = keyof typeof PALETTES;

// ─── Component ────────────────────────────────────────────────────────────────

export default function CursorTrail({
  count = 20,
  size = 24,
  ease = 0.3,
  colors = PALETTES.ember,
}: CursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create circle elements
    const states: CircleState[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const color = colors[i % colors.length];
      const scale = (count - i) / count;

      Object.assign(el.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: color,
        pointerEvents: "none",
        zIndex: "99999999",
        transform: `scale(${scale})`,
        willChange: "transform, left, top",
        transition: "background-color 0.3s ease",
        mixBlendMode: "difference",
        boxShadow: `0 0 10px ${color}, 0 0 15px ${color}`,
      });

      container.appendChild(el);
      states.push({ x: 0, y: 0, el });
    }

    // Track mouse
    const coords = { x: -999, y: -999 };
    const half = size / 2;

    const onMouseMove = (e: MouseEvent) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    let rafId: number;

    const animate = () => {
      let x = coords.x;
      let y = coords.y;

      states.forEach((state, i) => {
        state.el.style.left = `${x - half}px`;
        state.el.style.top = `${y - half}px`;

        state.x = x;
        state.y = y;

        const next = states[i + 1] ?? states[0];
        x += (next.x - x) * ease;
        y += (next.y - y) * ease;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      states.forEach((s) => s.el.remove());
    };
  }, [count, size, ease, colors]);

  return <div ref={containerRef} aria-hidden="true" />;
}
