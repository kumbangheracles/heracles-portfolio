"use client";
import { useStateContext } from "@/hooks/useStateContext";
import { useRef, useEffect } from "react";
import CardProject from "./CardProject";
import ListProjects from "./ListProjects";
import { useViewport } from "@/hooks/useViewPort";
import ScrollVelocity from "@/components/ScrollVelocity";
import { cn } from "@/lib/utils";
const ProjectIndex = () => {
  const {
    setIsInProjects,
    setColors,
    setParticleSize,
    setParticleSpreadsCustom,
    setDisableRotationCustom,
    isTheme,
  } = useStateContext();
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useViewport();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // setIdSection("projects")
          setDisableRotationCustom(false);
          setParticleSpreadsCustom(2);
          setIsInProjects(true);
          // setBgColor("#000000");
          setParticleSize("2vmin");
          setColors(["#f7f5ff", "#b1b5ff", "#4b8fff"]);
        }
      },
      { threshold: isMobile ? 0.2 : 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen w-full flex justify-center flex-col relative items-center sm:mt-0 backdrop-blur-sm"
    >
      <section
        id="divider-section"
        className="min-h-45 flex relative items-center justify-center w-full py-7 backdrop-blur-sm font-dancing overflow-hidden"
      >
        <ScrollVelocity
          texts={[
            "DESIGN'INTERFACES'BUILD'SYSTEMS'CODE'DEBUG'IMPROVE",
            "PROJECTS.'PROJECTS.'PROJECTS.'PROJECTS.'PROJECTS.'",
          ]}
          className={`${cn(isTheme === "dark" ? "text-sky-50" : "text-gray-700")}  text-7xl sm:text-9xl font-mono`}
        />
      </section>
      {/* <div className="flex items-center justify-start w-full px-4">
        <h4 className="font-bold text-[17px] text-start sm:text-2xl text-gray-700 font-mono">
          Projects.
        </h4>
      </div> */}
      <div className="p-6 w-full flex flex-col gap-24 sm:gap-15 text-gray-700 font-mono">
        {ListProjects?.map((item) => (
          <CardProject
            key={item?.id}
            id={item?.id}
            description={item?.description}
            name={item?.name}
            images={item?.images}
            videos={item?.videos}
            styleColor1={isTheme === "light" ? "bg-white/50" : "bg-white/20"}
            styleColor2={isTheme === "light" ? "bg-white/50" : "bg-white/20"}
            linkDemo={item?.linkDemo}
            linkGithub={item?.linkGithub}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectIndex;
