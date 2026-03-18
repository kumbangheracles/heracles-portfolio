"use client";
import AnimatedCardContent from "@/components/AnimatedCardContent";
import FadeUpWrapper from "@/components/FadeUpWrapper";
import GlowIconButton from "@/components/GlowIconButton";
import { useStateContext } from "@/hooks/useStateContext";
import { cn } from "@/lib/utils";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useRef, useEffect } from "react";
const ContactIndex = () => {
  const ref = useRef<HTMLDivElement>(null);

  const {
    setIsInProjects,
    setColors,
    setParticleSize,
    setDisableRotationCustom,
    setParticleSpreadsCustom,
    isTheme,
  } = useStateContext();
  const hours = new Date().toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // setIdSection("projects")
          setDisableRotationCustom(true);
          setParticleSpreadsCustom(10);
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
      id="contact"
      className="min-h-screen w-full flex items-center justify-center font-mono"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className={` ${cn(isTheme === "dark" ? "text-gray-300" : "text-gray-700")}  text-center flex flex-col gap-3 justify-center items-center`}
        >
          <AnimatedCardContent delayChildren={0.5}>
            <h4 className=" text-xl sm:text-3xl font-semibold tracking-tight">
              EVERY PROJECT STARTS WITH A CONVERSATION.
            </h4>
          </AnimatedCardContent>
          <AnimatedCardContent delayChildren={1}>
            <p className="text-[10px] sm:text-sm sm:w-full w-[90%] mx-auto">
              If you're building something interesting, I'd love to hear about
              it.
            </p>
          </AnimatedCardContent>
          <h4 className="font-semibold text-sm sm:text-xl">Let's Connect.</h4>
        </div>

        <div className="flex items-center gap-3">
          <FadeUpWrapper delay={100} repeat={true}>
            <GlowIconButton
              onClick={() => window.open("https://github.com/kumbangheracles")}
              width={50}
              height={50}
              icon={<Github className="w-5! h-5!" />}
              toolTipContent="Github"
            />
          </FadeUpWrapper>
          <FadeUpWrapper delay={200} repeat={true}>
            <GlowIconButton
              width={50}
              onClick={() =>
                window.open("https://www.linkedin.com/in/ahmad-herkal-taqyudin")
              }
              height={50}
              icon={<Linkedin className="w-5! h-5!" />}
              toolTipContent="Linkedin"
            />
          </FadeUpWrapper>
          <FadeUpWrapper delay={300} repeat={true}>
            <GlowIconButton
              width={50}
              height={50}
              icon={<Mail className="w-5! h-5!" />}
              toolTipContent="Mail"
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=ahmadherkaltaqyudin@gmail.com",
                  "_blank",
                )
              }
            />
          </FadeUpWrapper>
          <FadeUpWrapper delay={400} repeat={true}>
            <GlowIconButton
              width={50}
              height={50}
              icon={<Instagram className="w-5! h-5!" />}
              toolTipContent="Instagram"
              onClick={() =>
                window.open("https://www.instagram.com/herkaltqydn_")
              }
            />
          </FadeUpWrapper>
        </div>
        <div
          className={`w-[95%] sm:w-full h-px mt-5 sm:mt-0  ${cn(isTheme === "dark" ? "bg-white/20" : "bg-gray-300")} `}
        ></div>
        <div
          className={` ${cn(isTheme === "dark" ? "text-gray-300" : "text-gray-700")} flex-col gap-4 sm:flex-row  text-[12px] w-full flex items-center justify-between px-2`}
        >
          <p>Ⓒ Herkal Taqyudin</p>
          <p>ahmadherkaltaqyudin@gmail.com</p>
          <p>Tangerang {hours}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactIndex;
