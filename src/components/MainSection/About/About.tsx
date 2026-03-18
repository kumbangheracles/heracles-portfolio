import FadeUpWrapper from "@/components/FadeUpWrapper";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/hooks/useStateContext";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
const listData = [
  {
    id: 1,
    title: "6+",
    subTitle: "Projects Built",
  },
  {
    id: 2,
    title: "10+",
    subTitle: "Technologies Used",
  },
  {
    id: 3,
    title: "500+",
    subTitle: "Git Commits",
  },
  {
    id: 4,
    title: "∞",
    subTitle: "Passion For Learning",
  },
];

const listLangAndFramework = [
  {
    id: 1,
    title: "Javascript",
  },
  {
    id: 3,
    title: "Typescript",
  },
  {
    id: 4,
    title: "PHP",
  },
  {
    id: 5,
    title: "Golang",
  },
  {
    id: 6,
    title: "HTML",
  },
  {
    id: 7,
    title: "CSS",
  },
  {
    id: 8,
    title: "TailwindCSS",
  },
  {
    id: 12312,
    title: "Material UI",
  },
  {
    id: 9,
    title: "React",
  },
  {
    id: 10,
    title: "NextJs",
  },
  {
    id: 2131,
    title: "Zustand",
  },
  {
    id: 112312,
    title: "Redux",
  },
  {
    id: 11231,
    title: "Tanstack Query",
  },
  {
    id: 11,
    title: "VueJs",
  },
  {
    id: 12,
    title: "Laravel",
  },
  {
    id: 13,
    title: "ExpressJs",
  },
  {
    id: 14,
    title: "PostgreSQL",
  },
  {
    id: 15,
    title: "MySQL",
  },
  {
    id: 16,
    title: "MongoDB",
  },
];

const listTools = [
  {
    id: 1,
    title: "VS Code",
  },
  {
    id: 2,
    title: "Git",
  },
  {
    id: 3,
    title: "Github",
  },
  {
    id: 4,
    title: "Docker",
  },
  {
    id: 5,
    title: "Figma",
  },
];
const listSkills = [
  ...listLangAndFramework,
  ...listTools.map((item) => ({
    ...item,
    id: item.id + 100,
  })),
];
const AboutIndex = () => {
  const {
    setColors,
    setParticleSize,
    setIsInProjects,
    setParticleSpreadsCustom,
    setDisableRotationCustom,
    isTheme,
  } = useStateContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // setIdSection(null);
          setDisableRotationCustom(false);
          setParticleSpreadsCustom(10);
          setIsInProjects(false);
          setParticleSize("2vmin");
          // setBgColor("#0a0a0a");
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
      id="about"
      className="min-h-screen w-full scroll-mt-0 sm:scroll-mt-0 my-10 flex items-center justify-center"
    >
      <div className="flex items-center justify-center flex-col gap-0 sm:gap-4 w-[90%] sm:w-[70%]  my-4">
        <div
          className={` ${cn(isTheme === "dark" ? "text-sky-50" : "text-gray-700")} rounded-xl w-full sm:m-0`}
        >
          <FadeUpWrapper repeat={true} delay={100}>
            <h4 className="font-mono text-start sm:text-start text-[16px] sm:text-xl font-bold">
              About me.
            </h4>
          </FadeUpWrapper>
          <FadeUpWrapper repeat={true} delay={200}>
            <div className="px-4 py-2 sm:py-4">
              <p className=" font-mono text-[12px] text-start sm:text-start sm:text-2xl font-light">
                I'm a developer currently focusing on frontend development.
                While I've worked across both frontend and backend, building
                user interfaces is what excites me the most. I'm constantly
                learning and improving how I design and build modern web
                applications.
              </p>
              <Button
                size="icon"
                className={`
             rounded-xl
                  mt-3
             w-20
             h-10

                ${cn(
                  isTheme === "dark"
                    ? `text-gray-300 bg-white/20 hover:bg-white
                active:bg-white
                hover:text-black hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)]`
                    : "text-gray-100 bg-black/20 hover:shadow-[0_0_20px_5px_rgba(131, 178, 255, 0.7)]",
                )} 

             
              backdrop-blur-sm
              border
              border-muted
              transition-all duration-400
              
              
            `}
                onClick={() =>
                  window.open("/cv/Ahmad_Herkal_Taqyudin_CV.pdf", "_blank")
                }
                rel="noopener noreferrer"
              >
                CV
              </Button>
            </div>
          </FadeUpWrapper>
        </div>
        <div
          className={`${cn(isTheme === "dark" ? "text-sky-50" : "text-gray-700")} rounded-xl w-full mt-2 sm:m-0`}
        >
          <FadeUpWrapper repeat={true} delay={300}>
            <h4
              className={`font-mono text-start sm:text-start ${cn(isTheme === "dark" ? "text-sky-50" : "text-gray-700")}  text-[16px] sm:text-xl font-bold`}
            >
              Tech Stack & Tools.
            </h4>
          </FadeUpWrapper>

          <FadeUpWrapper
            delay={400}
            repeat={true}
            className="flex items-center justify-start px-4 py-2 sm:py-4 sm:justify-start  w-full gap-2 mt-2 flex-wrap"
          >
            {listSkills?.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer text-[10px]  sm:text-sm px-3 py-2 backdrop-blur-md hover:bg-white/20 ${cn(isTheme === "dark" ? "bg-white/10 text-sky-50" : "bg-white/40 text-gray-700")} font-mono rounded-xl transition-all duration-300 `}
              >
                {item?.title}
              </div>
            ))}
          </FadeUpWrapper>
        </div>
        {/* <div className="my-2">
          <TechStack variant="dark" />
        </div> */}
        <div
          className={`w-[95%] sm:w-full h-px mt-3 sm:mt-0  ${cn(isTheme === "dark" ? "bg-white/20 " : "bg-gray-300 ")}   `}
        ></div>
        <div className="flex justify-center flex-wrap gap-4 sm:flex-nowrap sm:justify-between w-full font-mono">
          {listData?.map((item, index) => (
            <FadeUpWrapper
              repeat={true}
              key={index}
              delay={index * 100}
              className="p-4 flex w-auto flex-col justify-center items-center   rounded-xl"
            >
              <h4 className="font-bold text-[12px] text-[#604bff] sm:text-2xl">
                {item?.title}
              </h4>
              <p
                className={`text-[9px] sm:text-[12px] ${cn(isTheme === "dark" ? "text-sky-50" : "text-gray-700")}`}
              >
                {item?.subTitle}
              </p>
            </FadeUpWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AboutIndex;
