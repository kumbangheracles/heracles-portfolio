"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useViewport } from "./useViewPort";

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const { isMobile, isDesktop } = useViewport();
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      autoResize: true,
      touchMultiplier: isMobile || isDesktop ? 1 : 0,
      duration: 1.2,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef.current;
};
