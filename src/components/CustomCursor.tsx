"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useStateContext } from "@/hooks/useStateContext";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const { isInProjects, isTheme } = useStateContext();
  const pathname = usePathname();
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (pathname.startsWith("/admin")) {
    return (
      <style jsx global>{`
        * {
          cursor: default !important;
        }
      `}</style>
    );
  } else {
    return (
      <motion.div
        className={cn(
          "fixed w-[clamp(1.5rem,2vw,2rem)]  h-[clamp(1.5rem,2vw,2rem)] flex items-center justify-center rounded-full border-solid border border-[#ffffffaa] pointer-events-none select-none z-100 transition-colors",
          isInProjects && "bg-black",
          !isInProjects && isTheme !== "dark" && "bg-gray-700",
          !isInProjects && isTheme === "dark" && "bg-transparent",
        )}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={"hidden"}
        transition={{ duration: 0.3 }}
        //   variants={cursorVariants}
      >
        <span className="text-[clamp(4px,4vw,6px)] font-semibold text-[#ffffffaa] bg-white whitespace-nowrap"></span>
      </motion.div>
    );
  }
}
