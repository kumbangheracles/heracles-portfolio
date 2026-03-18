"use client";
import { useStateContext } from "@/hooks/useStateContext";
import { useRef, useEffect, useState } from "react";
import Dot from "./Dot";
import AnimatedLine from "./AnimatedLine";
import { useViewport } from "@/hooks/useViewPort";
import FadeUpWrapper from "@/components/FadeUpWrapper";
import { cn } from "@/lib/utils";

const TimelineIndex = () => {
  const {
    setColors,
    setParticleSize,
    setIsInProjects,
    setParticleSpreadsCustom,
    setDisableRotationCustom,
    isTheme,
  } = useStateContext();
  const { isMobile } = useViewport();
  const ref = useRef<HTMLDivElement>(null);

  const [activeLines, setActiveLines] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [activeLinesM, setActiveLinesM] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const activateLine = (index: number, active: boolean) => {
    setActiveLines((prev) => {
      const next = [...prev];
      next[index] = active;
      return next;
    });
  };

  const activateLineM = (index: number, active: boolean) => {
    setActiveLinesM((prev) => {
      const next = [...prev];
      next[index] = active;
      return next;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // setIdSection("timeline");
          setDisableRotationCustom(true);
          setParticleSpreadsCustom(7);
          setIsInProjects(false);
          // setBgColor("#000000");
          setParticleSize("2vmin");
          setColors(["#1f0b65", "#b7faff", "#4b8fff"]);
        }
      },
      { threshold: isMobile ? 0.3 : 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="timeline"
      className="min-h-screen w-full scroll-mt-16 sm:scroll-mt-17 mb-2"
    >
      <div className="flex font-mono flex-col items-center min-h-screen justify-center w-full">
        <div
          className={`flex flex-col gap-2 justify-center ${cn(isTheme === "dark" ? "text-sky-50" : "text-gray-700")} text-center  w-[95%] sm:w-auto p-4 rounded-xl `}
        >
          <h4 className="font-mono text-[16px] sm:text-xl font-bold">
            CARRER TIMELINE
          </h4>
          <p className="text-[14px]">
            Tracing the path of my growth as a developer.
          </p>
        </div>

        {/* Desktop view ========================= */}

        {/* Wrapper timeline */}
        <div className="relative sm:w-full hidden sm:block mt-5">
          <FadeUpWrapper
            delay={100}
            className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start"
          >
            <div className="flex justify-end">
              <div
                className={`p-4 rounded-xl ${activeLines[0] ? "border-[#4b8fff]" : "border-transparent"} border transition-all max-w-[370px] bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-end gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Computer Science Foundation
                  </h4>
                  <CodeIcon />
                </div>
                <div
                  className={`mt-2 text-[12px] px-2 text-start ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")} `}
                >
                  Started my Computer Science journey, building a strong
                  foundation in programming fundamentals and algorithms.
                </div>
              </div>
            </div>
            <Dot
              year="Sept - 2022"
              active={activeLines[0]}
              onHidden={() => activateLine(0, false)}
              onVisible={() => activateLine(0, true)}
            />
            <div />
          </FadeUpWrapper>

          <AnimatedLine active={activeLines[0]} />

          <FadeUpWrapper
            delay={200}
            className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start"
          >
            <div />
            <Dot
              year="2023"
              active={activeLines[1]}
              onHidden={() => activateLine(1, false)}
              onVisible={() => activateLine(1, true)}
            />
            <div className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLines[1] ? "border-[#4b8fff]" : "border-transparent"} border transition-all max-w-[370px] bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center gap-2">
                  <CodeIcon />
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Exploring Programming Languages & Finding Focus
                  </h4>
                </div>
                <div
                  className={`mt-2 text-[12px] px-2 ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")} text-start space-y-1`}
                >
                  Explored multiple languages including C++, Java, Python, and
                  JavaScript, gaining broad exposure before finding my direction
                  in web development.
                </div>
              </div>
            </div>
          </FadeUpWrapper>

          <AnimatedLine active={activeLines[1]} />

          {/* Item 3 — kiri */}
          <FadeUpWrapper
            delay={100}
            className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start"
          >
            <div className="flex justify-end">
              <div
                className={`p-4 rounded-xl ${activeLines[2] ? "border-[#4b8fff]" : "border-transparent"} border transition-all max-w-[370px] bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-end gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Diving into Web Development
                  </h4>
                  <CodeIcon />
                </div>
                <div
                  className={`mt-2 text-[12px] px-2 text-start ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")} `}
                >
                  Focused on web development, learning HTML, CSS, and
                  JavaScript, then expanding into frameworks like React and Vue
                  through personal and collaborative projects, while also
                  exploring backend development by building REST APIs with PHP
                  and Express and working with databases.
                </div>
              </div>
            </div>
            <Dot
              year="2024"
              active={activeLines[2]}
              onHidden={() => activateLine(2, false)}
              onVisible={() => activateLine(2, true)}
            />
            <div />
          </FadeUpWrapper>

          <AnimatedLine active={activeLines[2]} />

          {/* Item 2 — kanan */}
          <FadeUpWrapper
            delay={200}
            className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start"
          >
            <div />
            <Dot
              year="Jan - 2025"
              active={activeLines[3]}
              onHidden={() => activateLine(3, false)}
              onVisible={() => activateLine(3, true)}
            />
            <div className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLines[3] ? "border-[#4b8fff]" : "border-transparent"} border transition-all max-w-[370px] bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-start gap-2">
                  <CodeIcon />
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Full Stack Developer Intern
                  </h4>
                </div>
                <p
                  className={`text-start text-[11px] ${cn(isTheme === "dark" ? "text-white/60" : "text-gray-600")} mt-1`}
                >
                  PT. Vanz Inovatif Teknologi.
                </p>
                <p
                  className={`text-start text-[11px] ${cn(isTheme === "dark" ? "text-white/60" : "text-gray-600")}`}
                >
                  West Jakarta, Indonesia
                </p>
                <p
                  className={`mt-2 text-[12px] ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  My first professional experience building web and CMS systems,
                  developing responsive interfaces, full CRUD features, and
                  modular RESTful APIs.
                </p>
              </div>
            </div>
          </FadeUpWrapper>

          <AnimatedLine active={activeLines[3]} />

          {/* Item 3 — kiri */}
          <FadeUpWrapper
            delay={300}
            className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start"
          >
            <div className="flex justify-end">
              <div
                className={`p-4 rounded-xl ${activeLines[4] ? "border-[#4b8fff]" : "border-transparent"} border transition-all max-w-[370px] bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-end gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    IT Developer Internship
                  </h4>
                  <CodeIcon />
                </div>
                <div className="flex flex-col text-right">
                  <p
                    className={`text-[11px] ${cn(isTheme === "dark" ? "text-white/60" : "text-gray-600")} mt-1`}
                  >
                    Alphabet Incubator. Universitas Raharja
                  </p>
                  <p
                    className={`text-[11px] ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-600")}`}
                  >
                    Tangerang, Indonesia
                  </p>
                </div>
                <p
                  className={`mt-2 text-[12px] ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  Developed core system features including payment gateway
                  integration, IoT monitoring dashboard, and RBAC-based access
                  control with full CRUD functionality.
                </p>
              </div>
            </div>
            <Dot
              year="Aug - 2025"
              active={activeLines[4]}
              onHidden={() => activateLine(4, false)}
              onVisible={() => activateLine(4, true)}
            />
            <div />
          </FadeUpWrapper>

          <AnimatedLine active={activeLines[4]} />

          {/* Item 4 — kanan */}
          <FadeUpWrapper
            delay={400}
            className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start"
          >
            <div />
            <Dot
              year="2026"
              active={activeLines[5]}
              onHidden={() => activateLine(5, false)}
              onVisible={() => activateLine(5, true)}
            />
            <div className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLines[5] ? "border-[#4b8fff]" : "border-transparent"} border transition-all max-w-[370px] bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4b8fff"
                      d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"
                    />
                  </svg>
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Continuous Learning & Improvement
                  </h4>
                </div>
                <p
                  className={`mt-2 text-[12px] ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  The journey of becoming a better developer never truly ends. I
                  keep exploring new technologies, refining my problem-solving
                  skills, and building meaningful digital experiences. Always
                  curious, always improving.
                </p>
              </div>
            </div>
          </FadeUpWrapper>
        </div>

        {/* Mobile view ========================= */}

        <div className="sm:hidden flex flex-col gap-5 w-[95%] mt-4">
          {/* Item 1 */}
          <div className="flex justify-between relative">
            <FadeUpWrapper delay={100} className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLinesM[0] ? "border-[#4b8fff]" : "border-transparent"} border transition-all w-[100%] h-35 bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Computer Science Foundation
                  </h4>
                  <CodeIcon />
                </div>
                <div
                  className={`mt-2 text-[10px] px-2 text-start ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  Started my Computer Science journey, building a strong
                  foundation in programming fundamentals and algorithms.
                </div>
              </div>
            </FadeUpWrapper>
            <div className="flex items-center gap-2 flex-col">
              <Dot
                year="2022"
                active={activeLinesM[0]}
                threshold={0.4}
                onHidden={() => activateLineM(0, false)}
                onVisible={() => activateLineM(0, true)}
              />

              <AnimatedLine active={activeLinesM[0]} customHeight={80} />
            </div>
            <div />
          </div>
          {/* Item 2 */}
          <div className="flex justify-between relative">
            <FadeUpWrapper delay={100} className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLinesM[1] ? "border-[#4b8fff]" : "border-transparent"} border transition-all w-[100%] h-40 bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Exploring Programming Languages & Finding Focus
                  </h4>
                  <CodeIcon />
                </div>
                <div
                  className={`mt-2 text-[10px] px-2 text-start ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  Explored multiple languages including C++, Java, Python, and
                  JavaScript, gaining broad exposure before finding my direction
                  in web development.
                </div>
              </div>
            </FadeUpWrapper>
            <div className="flex items-center gap-2 flex-col">
              <Dot
                year="2023"
                active={activeLinesM[1]}
                threshold={0.4}
                onHidden={() => activateLineM(1, false)}
                onVisible={() => activateLineM(1, true)}
              />

              <AnimatedLine active={activeLinesM[1]} customHeight={100} />
            </div>
            <div />
          </div>
          {/* Item 3 */}
          <div className="flex justify-between relative">
            <FadeUpWrapper delay={100} className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLinesM[2] ? "border-[#4b8fff]" : "border-transparent"} border transition-all w-[100%] h-auto bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Diving into Web Development
                  </h4>
                  <CodeIcon />
                </div>
                <div
                  className={`mt-2 text-[10px] px-2 text-start ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  Focused on web development, learning HTML, CSS, and
                  JavaScript, then expanding into frameworks like React and Vue
                  through personal and collaborative projects, while also
                  exploring backend development by building REST APIs with PHP
                  and Express and working with databases.
                </div>
              </div>
            </FadeUpWrapper>
            <div className="flex items-center gap-2 flex-col">
              <Dot
                year="2024"
                active={activeLinesM[2]}
                threshold={0.4}
                onHidden={() => activateLineM(2, false)}
                onVisible={() => activateLineM(2, true)}
              />

              <AnimatedLine active={activeLinesM[2]} customHeight={100} />
            </div>
            <div />
          </div>
          {/* Item 3 */}
          <div className="flex justify-between relative">
            <FadeUpWrapper delay={300} className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLinesM[3] ? "border-[#4b8fff]" : "border-transparent"} border transition-all w-[100%] h-auto bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Full Stack Developer Intern
                  </h4>
                  <CodeIcon />
                </div>
                <p
                  className={`text-left text-[11px] ${cn(isTheme === "dark" ? "text-white/60" : "text-gray-600")} mt-1`}
                >
                  PT. Vanz Inovatif Teknologi.
                </p>
                <p
                  className={`text-left text-[11px] ${cn(isTheme === "dark" ? "text-white/60" : "text-gray-600")}`}
                >
                  West Jakarta, Indonesia
                </p>
                <p
                  className={`mt-2 text-[10px] ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  My first professional experience building web and CMS systems,
                  developing responsive interfaces, full CRUD features, and
                  modular RESTful APIs.
                </p>
              </div>
            </FadeUpWrapper>
            <div className="flex items-center gap-2 flex-col">
              <Dot
                threshold={0.6}
                year="2025"
                active={activeLinesM[3]}
                onHidden={() => activateLineM(3, false)}
                onVisible={() => activateLineM(3, true)}
              />

              <AnimatedLine active={activeLinesM[3]} customHeight={120} />
            </div>

            <div />
          </div>
          {/* Item 4 */}
          <div className="flex justify-between w-full relative">
            <FadeUpWrapper delay={400} className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLinesM[4] ? "border-[#4b8fff]" : "border-transparent"} border transition-all w-[100%] h-auto bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    IT Developer Internship
                  </h4>
                  <CodeIcon />
                </div>
                <div className="flex flex-col text-left">
                  <p
                    className={`text-[11px] ${cn(isTheme === "dark" ? "text-white/60" : "text-gray-600")} mt-1`}
                  >
                    Alphabet Incubator. Universitas Raharja
                  </p>
                  <p
                    className={`text-[11px] ${cn(isTheme === "dark" ? "text-white/60" : "text-gray-600")}`}
                  >
                    Tangerang, Indonesia
                  </p>
                </div>
                <p
                  className={`mt-2 text-[10px] ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  Developed core system features including payment gateway
                  integration, IoT monitoring dashboard, and RBAC-based access
                  control with full CRUD functionality.
                </p>
              </div>
            </FadeUpWrapper>
            <div className="flex items-center gap-2 flex-col">
              <Dot
                threshold={0.6}
                year="2025"
                active={activeLinesM[4]}
                onHidden={() => activateLineM(4, false)}
                onVisible={() => activateLineM(4, true)}
              />

              <AnimatedLine active={activeLinesM[4]} customHeight={140} />
            </div>

            <div />
          </div>
          {/* Item 5 */}
          <div className="flex  justify-between relative">
            <FadeUpWrapper delay={500} className="flex justify-start">
              <div
                className={`p-4 rounded-xl ${activeLinesM[5] ? "border-[#4b8fff]" : "border-transparent"} border transition-all w-[100%] bg-white/10  backdrop-blur-md`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-[12px] text-[#4b8fff]">
                    Continuous Learning & Improvement
                  </h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4b8fff"
                      d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"
                    />
                  </svg>
                </div>
                <p
                  className={`mt-2 text-[10px] ${cn(isTheme === "dark" ? "text-white/70" : "text-gray-700")}`}
                >
                  The journey of becoming a better developer never truly ends. I
                  keep exploring new technologies, refining my problem-solving
                  skills, and building meaningful digital experiences. Always
                  curious, always improving.
                </p>
              </div>
            </FadeUpWrapper>
            <div className="flex items-center gap-2 flex-col">
              <Dot
                threshold={0.8}
                year="2026"
                active={activeLinesM[5]}
                onHidden={() => activateLineM(5, false)}
                onVisible={() => activateLineM(5, true)}
              />
              <div className="grid grid-cols-[1fr_auto_1fr] gap-6">
                <div />
                <div className="flex justify-center w-6">
                  <div className="relative w-[3px] bg-white/20 overflow-hidden">
                    <div
                      className="absolute top-0 left-0 w-full bg-[#4b8fff] transition-all duration-700 ease-in-out"
                      // style={{
                      //   height: active ? "100%" : "0%",
                      //   boxShadow: active ? "0 0 6px #4b8fff" : "none",
                      // }}
                    />
                  </div>
                </div>
                <div />
              </div>
            </div>

            <div />
          </div>
        </div>
      </div>
    </section>
  );
};

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    color="white"
    style={{ color: "#4b8fff" }}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M13.5 6L10 18.5m-3.5-10L3 12l3.5 3.5m11-7L21 12l-3.5 3.5"
    />
  </svg>
);

export default TimelineIndex;
