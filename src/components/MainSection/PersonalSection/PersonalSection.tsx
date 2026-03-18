"use client";
import { useStateContext } from "@/hooks/useStateContext";
import { useRef, useEffect } from "react";
import AnimatedCardContent from "@/components/AnimatedCardContent";
import { cn } from "@/lib/utils";

const PersonalSectionIndex = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    setIsInProjects,
    setColors,
    setParticleSize,
    setDisableRotationCustom,
    setParticleSpreadsCustom,
    isTheme,
  } = useStateContext();
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
          setColors(["#f7f5ff", "#ffb1b1", "#ff4b4b"]);
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
      id="personal-section"
      className="min-h-[50vh] w-full mt-50 flex items-center justify-center"
    >
      {/* <div className="p-4 text-gray-100 font-mono">
        <FadeUpWrapper delay={100} repeat={true}>
          <h4 className="tracking-tighter uppercase text-6xl">Nerdy Stuff.</h4>
        </FadeUpWrapper>
        <p>A few things that inspire me outside of development</p>
        <p>
          "The man who loves walking will walk further than the man who loves
          the destination"
        </p>

        <section id="fiction" className="p-4">
          <h4 className="tracking-tighter uppercase text-xl">Peak Fiction.</h4>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: false }}
            variants={containerVariants}
            className=" pt-3 flex gap-3"
          >
            {listPeakFiction.map((item, index) => (
              <AnimatedCardContent key={index} delayChildren={0.2 * index} once>
                <SpotlightCard
                  className="custom-spotlight-card w-100 h-100 backdrop-blur-sm!"
                  spotlightColor="rgba(255, 213, 202, 0.2)"
                >
                  <Image
                    src={item?.image}
                    width={500}
                    height={500}
                    alt={item?.id}
                    className="rounded-xl h-40 w-full object-cover"
                  />
                  <div className="p-2">
                    <h4>{item?.title}</h4>
                    <p className="mt-2 font-light text-sm">{item?.desc}</p>
                  </div>
                </SpotlightCard>
              </AnimatedCardContent>
            ))}
          </motion.div>
        </section>
      </div> */}
      <div className="mx-4 w-full flex justify-center items-center">
        <AnimatedCardContent delayChildren={0.5}>
          <h4
            className={`font-semibold tracking-tight text-xl text-[15px] mx-auto sm:text-4xl w-full sm:w-[70%] font-mono text-center  ${cn(isTheme === "dark" ? "text-gray-300" : "text-gray-700")}   `}
          >
            The man who loves walking will walk further than the man who loves
            the destination.
          </h4>
        </AnimatedCardContent>
      </div>
    </section>
  );
};

export default PersonalSectionIndex;
