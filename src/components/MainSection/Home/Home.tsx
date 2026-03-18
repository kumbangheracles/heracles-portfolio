"use client";

import { useStateContext } from "@/hooks/useStateContext";
import { useRef, useEffect } from "react";
import AnimatedText from "@/components/AnimatedText";
import { cn } from "@/lib/utils";
export default function HomeIndex() {
  const {
    setColors,
    setParticleSize,
    setIsInProjects,
    setParticleSpreadsCustom,
    setDisableRotationCustom,
    isContentVisible,
    isTheme,
  } = useStateContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // setIdSection("home");
          setDisableRotationCustom(true);
          setParticleSpreadsCustom(15);
          setIsInProjects(false);
          // setBgColor("#0a0a0a");
          setParticleSize("2vmin");

          setColors(["#1f0b65", "#b7faff", "#4b8fff"]);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      // onMouseMove={handleMouseMove}
      id="home"
      className="relative w-full min-h-screen overflow-hidden transition-all bg-transparent "
    >
      <div className="relative text-center flex items-center justify-center min-h-screen w-full transition-all duration-700 ease-in-out">
        <div className="rounded-xl z-10 flex items-center w-full justify-center">
          {/* <CursorGlow /> */}
          <div className="flex transition-all flex-col gap-2 justify-center w-full items-center">
            <div className="flex items-center justify-center w-full">
              <AnimatedText
                className={`font-bold tracking-wide  text-[17px] sm:text-2xl ${cn(isTheme === "dark" ? "text-white" : "text-gray-700")} w-[80%] flex items-center justify-center sm:w-[40%] font-mono`}
                text="HI, I'M HERKAL."
                initialDelay={20}
                delayChildren={0.5}
                enabled={isContentVisible}
              />
            </div>
            <AnimatedText
              className={`font-light text-[10px] flex items-center justify-center sm:text-xl ${cn(isTheme === "dark" ? "text-white" : "text-gray-700")} w-[80%] sm:w-[40%] font-mono`}
              text="I BUILD MODERN WEB APPLICATIONS AND ENJOY CRAFTING USER INTERFACES."
              initialDelay={20}
              delayChildren={0.5}
              enabled={isContentVisible}
            />
          </div>
        </div>
        <div
          className={`flex items-center transition-all font-normal ${cn(isTheme === "dark" ? "text-sky-50" : "text-gray-700")}  text-[9px] sm:text-sm absolute bottom-5 text-center w-full  justify-center transition-all duration-1000 font-mono`}
        >
          <AnimatedText
            text="Scroll to explore"
            initialDelay={20}
            delayChildren={2}
            enabled={isContentVisible}
          />
        </div>
      </div>
    </section>
  );
}
