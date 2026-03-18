"use client";
import { useStateContext } from "@/hooks/useStateContext";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import LoadingType3 from "../CustomLoading/LoadingType3/LoadingType3";
import Navbar from "./Navbar";
import { useViewport } from "@/hooks/useViewPort";
import Particles from "../Particles";
import CustomCursor from "../CustomCursor";
import CursorTrail, { PALETTES } from "../CustomCursorType2/CustomCursorType2";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [loadingVisible, setLoadingVisible] = useState<boolean>(true);
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [introVisible, setIntroVisible] = useState<boolean>(false);
  const [curtainOpen, setCurtainOpen] = useState<boolean>(false);
  const [curtainDone, setCurtainDone] = useState<boolean>(false);
  const [curtainReady, setCurtainReady] = useState<boolean>(false);
  const {
    setLoadingContext,
    colors,
    bgColor,
    idSection,
    setIdSection,
    particleSpreadsCustom,
    particleCountCustom,
    setBgColor,
    setIsContentVisible,
    isTheme,
  } = useStateContext();
  const { isMobile } = useViewport();

  useEffect(() => {
    setLoadingContext(loadingVisible || introVisible || curtainDone);
  }, [loadingVisible, introVisible]);

  useEffect(() => {
    setIsContentVisible(contentVisible);
  }, [contentVisible]);
  useEffect(() => {
    const fadeLoading = setTimeout(() => setLoadingVisible(false), 3000);
    const introIn = setTimeout(() => setIntroVisible(true), 3000);
    const introOut = setTimeout(() => setIntroVisible(false), 5000);
    const readyCurtain = setTimeout(() => setCurtainReady(true), 5900);
    const openCurtain = setTimeout(() => setCurtainOpen(true), 6200);
    const showContent = setTimeout(() => setContentVisible(true), 7000);
    const doneCurtain = setTimeout(() => setCurtainDone(true), 7500);

    setIdSection(null);
    return () => {
      clearTimeout(fadeLoading);
      clearTimeout(introIn);
      clearTimeout(introOut);
      clearTimeout(readyCurtain);
      clearTimeout(openCurtain);
      clearTimeout(showContent);
      clearTimeout(doneCurtain);
    };
  }, []);

  useEffect(() => {
    if (!idSection) return;
    setIdSection(idSection);
    const el = document.getElementById(idSection);
    if (!el) return;

    const targetY =
      el.getBoundingClientRect().top +
      window.scrollY -
      (isMobile ? 20 : idSection === "projects" ? -120 : 80); // 80 = offset navbar
    const duration = 1700;
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime: number | null = null;

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [idSection]);

  useEffect(() => {
    if (
      idSection === "about" ||
      idSection === "contact" ||
      idSection === "home" ||
      idSection === "projects" ||
      idSection === "timeline"
    ) {
      setTimeout(() => {
        setIdSection(null);
      }, 500);
    }
  }, [idSection]);

  useEffect(() => {
    if (!curtainDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [curtainDone]);
  const isDark = isTheme === "dark";

  useEffect(() => {
    setBgColor(isDark ? "#14161d" : "#e6e9ff");
  }, [isTheme]);

  return (
    <div className="w-full bg-[#14161d] relative">
      {/* Background */}
      <div className="hidden [@media(pointer:fine)]:block fixed inset-0 z-[1] mix-blend-screen pointer-events-none">
        {/* <MouseEffectScene
          intensity={5}
          dissipation={0.85}
          color={isDark ? hexToVec3("#c2ddff") : hexToVec3("#4b1cf5")}
        /> */}
        {/* <MouseEffectSceneDef /> */}
        <CursorTrail
          colors={isDark ? PALETTES.arcticCyan : PALETTES.midnightAbyss}
          count={15}
        />
      </div>
      <div
        className="fixed flex items-center justify-center w-full inset-0 z-0 transition-all duration-700 ease-in-out"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "scale(1)" : "scale(0.97)",
        }}
      >
        <Particles
          particleCount={particleCountCustom}
          particleSpread={particleSpreadsCustom}
          bgColor={bgColor}
          speed={0.33}
          particleColors={colors}
          moveParticlesOnHover={false}
          particleHoverFactor={1.5}
          alphaParticles={true}
          particleBaseSize={140}
          sizeRandomness={7}
          cameraDistance={20}
          disableRotation={true}
        />
        {/* <Type1BG
          bgColor={bgColor}
          colors={colors}
          particleSize={particleSize}
        /> */}
      </div>

      {/* Loading overlay */}
      <div
        className="fixed inset-0 flex items-center justify-center bg-[#14161d] z-50 pointer-events-none"
        style={{
          opacity: loadingVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          transform: loadingVisible ? "scale(1)" : "scale(1.03)",
        }}
      >
        <div
          // delay={100}
          className="flex text-white items-center justify-center text-xl sm:text-2xl flex-col gap-1.5 tracking-wider"
        >
          <h4 className="font-semibold text-[16px] sm:text-[18px] font-mono">
            Loading
          </h4>
          <LoadingType3 />
        </div>
      </div>

      <div
        className="fixed inset-0 flex items-center justify-center bg-[#14161d]! z-51 pointer-events-none"
        style={{
          opacity: introVisible ? 1 : 0,
          transform: introVisible ? "scale(1)" : "scale(1.03)",
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
        }}
      >
        <div className="flex items-center text-white justify-center text-xl sm:text-4xl flex-col gap-1.5 tracking-tighter">
          <div className="flex flex-col gap-1 justify-center w-[70%] items-center text-center">
            <div className="flex line-intro ">
              <h4 className="font-mono font-bold">HERKAL</h4>
              <h4 className="font-dancing">Taqyudin</h4>
            </div>
            <h4 className="italic font-normal tracking-wide text-sm text-gray-500">
              Turning logic into meaningful digital experiences.
            </h4>
          </div>
        </div>
      </div>

      {curtainReady && !curtainDone && (
        <div
          className="fixed top-0 opacity-30 h-full z-40 bg-[#d0ceff] transition-all duration-[2000ms] ease-in-out"
          style={{
            width: "1.5px",
            left: "calc(50% - 1.5px)",
            transform: curtainOpen ? "translateX(-100vw)" : "translateX(0)",
          }}
        />
      )}

      {curtainReady && !curtainDone && (
        <div
          className="fixed top-0 opacity-30 h-full z-40 bg-[#d0ceff] transition-all duration-[2000ms] ease-in-out"
          style={{
            width: "1.5px",
            right: "calc(50% - 1.5px)",
            transform: curtainOpen ? "translateX(100vw)" : "translateX(0)",
          }}
        />
      )}

      <div
        className="select-none transition-all duration-700 ease-in-out "
        style={{
          opacity: curtainDone && contentVisible ? 1 : 0,
        }}
      >
        <div className="hidden [@media(pointer:fine)]:block">
          <CustomCursor />
        </div>
        <Navbar />
        <div className="relative z-10 overflow-hidden w-full">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
