"use client";
import { cn } from "@/libs/cn";
import { useRef, useEffect } from "react";

function Dot({
  onVisible,
  onHidden,
  active,
  year,
  threshold = 0.4,
}: {
  onVisible: () => void;
  onHidden: () => void;
  active: boolean;
  year: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const inZone =
        rect.top < windowHeight * threshold &&
        rect.bottom > windowHeight * (1 - threshold);
      const passedAbove = rect.bottom < windowHeight * (1 - threshold);

      if (inZone || passedAbove) {
        onVisible();
      } else {
        onHidden();
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 pt-3">
      <div
        className="flex items-center justify-center w-6 h-6 rounded-full z-10 transition-all duration-500"
        style={{
          backgroundColor: active ? "white" : "rgba(255,255,255,0.3)",
          boxShadow: active
            ? "0 0 8px 2px rgba(255,255,255,0.6)"
            : "0 0 8px 2px rgba(255,255,255,0.2)",
        }}
      >
        <div
          className="w-3 h-3 rounded-full transition-all duration-500"
          style={{
            backgroundColor: active ? "#4b8fff" : "rgba(255,255,255,0.5)",
            boxShadow: active
              ? "0 0 6px 2px #4b8fff, 0 0 12px 4px #4b8fff66"
              : "none",
          }}
        />
      </div>
      <span
        className={`font-semibold text-[12px] ${cn(active ? "text-[#4b8fff]" : "text-gray-600")} text-rgba(255,255,255,0.5)`}
      >
        {year}
      </span>
    </div>
  );
}

export default Dot;
