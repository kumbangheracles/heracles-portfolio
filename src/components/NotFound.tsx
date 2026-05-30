"use client";
import { useStateContext } from "@/hooks/useStateContext";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const NotFoundIndex = () => {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const {
    setIsInProjects,
    setBgColor,
    setColors,
    setParticleSize,
    setDisableRotationCustom,
    setParticleSpreadsCustom,
    setIsNotFoundPage,
  } = useStateContext();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // setIdSection("projects")
          setDisableRotationCustom(true);
          setParticleSpreadsCustom(10);
          setIsInProjects(false);
          setBgColor("#0a0a0a");
          setParticleSize("2vmin");
          setColors(["#f7f5ff", "#ffb1b1", "#ff4b4b"]);
          setIsNotFoundPage(true);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <motion.main
      ref={ref}
      className={` ${cn(path.startsWith("/admin") ? "w-full minh-h-screen" : "w-screen h-screen")}  px-[10vw] lg:pl-[15vw] lg:pr-[10vw] flex items-center justify-center`}
      initial={{ opacity: 0, filter: "blur(1px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(1px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-full flex flex-col">
        <div className="w-full text-white flex items-end justify-center text-[clamp(1rem,1.5vw,2rem)] lg:portrait:text-[clamp(1.5rem,3vw,8rem)] lg:landscape:text-[clamp(1rem,1.5vw,2rem)] font-light">
          <h1 className="flex gap-[clamp(1rem,2vw,5rem)]">
            <span>404</span>
            <span>PAGE NOT FOUND</span>
          </h1>
        </div>
        <div className="w-full h-[1px] bg-[#888888aa]" />
      </div>
    </motion.main>
  );
};
export default NotFoundIndex;
