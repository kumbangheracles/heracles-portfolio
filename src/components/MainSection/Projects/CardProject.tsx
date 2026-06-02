"use client";
import { useState } from "react";
import Image from "next/image";
import TiltCard from "@/components/Effects/TiltCard";
import { useViewport } from "@/hooks/useViewPort";
import { cn } from "@/lib/utils";
import { useStateContext } from "@/hooks/useStateContext";
import GlowButton from "@/components/CustomButton/GlowButton";
import { MoveUpRight } from "lucide-react";

interface PropTypes {
  id?: string;
  name?: string;
  description?: string;
  images?: ImageProps[];
  styleColor1?: string;
  styleColor2?: string;
  videos?: VideoProps[];
  linkDemo?: string;
  linkGithub?: string;
}

interface VideoProps {
  id?: number;
  src?: string;
  videoName?: string;
}

interface ImageProps {
  id?: number;
  src?: string;
  imageName?: string;
}

// Unified slide type agar images & videos bisa diiterasi bersama
type Slide =
  | { type: "image"; src: string; name: string }
  | { type: "video"; src: string; name: string };

const CardProject = ({
  description,
  id,
  images,
  name,
  styleColor1,
  styleColor2,
  videos,
  linkDemo,
  linkGithub,
}: PropTypes) => {
  const slides: Slide[] = [
    ...(images ?? []).map((img) => ({
      type: "image" as const,
      src: img.src ?? "",
      name: img.imageName ?? "",
    })),
    ...(videos ?? []).map((vid) => ({
      type: "video" as const,
      src: vid.src ?? "",
      name: vid.videoName ?? "",
    })),
  ];

  const [current, setCurrent] = useState<number>(0);
  const { isDesktop, isMobile } = useViewport();
  const { isTheme } = useStateContext();

  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <div
      key={id}
      className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-8 items-center"
    >
      <div className="flex flex-col gap-1 sm:gap-3">
        <h4
          className={`font-bold text-sm sm:text-lg tracking-widest uppercase ${cn(
            isTheme === "dark" ? "text-sky-50" : "text-gray-700",
          )}`}
        >
          {name}
        </h4>
        <p
          className={`sm:text-sm text-[10px]  leading-relaxed ${cn(
            isTheme === "dark" ? "text-gray-200" : "text-gray-700",
          )}`}
        >
          {description}
        </p>

        <div className="flex items-center gap-3">
          {linkGithub && (
            <GlowButton
              link={linkGithub}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  />
                </svg>
              }
              title="Github"
            />
          )}
          {linkDemo && (
            <GlowButton link={linkDemo} icon={<MoveUpRight />} title="Demo" />
          )}
        </div>
      </div>

      <div className="relative h-[200px] max-w-[400px] w-full mx-auto sm:mx-0 sm:max-w-full sm:w-auto sm:h-[350px]">
        <div
          className={`absolute top-0 right-0 w-[55%] h-[45%] ${styleColor1} rounded-xl z-0`}
        />
        <div
          className={`absolute bottom-[-50px] right-0 w-[55%] h-[45%] ${styleColor1} rounded-xl z-0`}
        />
        <div
          className={`absolute top-[15%] right-[40%] w-[15%] h-[20%] ${styleColor2} rounded-xl z-0`}
        />
        <div
          className={`absolute bottom-0 left-[30%] w-[45%] h-[35%] ${styleColor1} rounded-xl z-0`}
        />
        <div
          className={`absolute bottom-[10%] left-[10%] w-[10%] h-[15%] ${styleColor2} rounded-xl z-0`}
        />

        <TiltCard
          maxTilt={15}
          glowColor="rgba(255, 255, 255, 0.3)"
          scale={1.03}
          className="absolute shadow-2xl top-[8%] bg-white left-0 sm:left-[15%] w-full sm:w-[75%] h-full rounded-xl overflow-hidden z-10"
        >
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`relative ${cn(
                  isDesktop
                    ? "min-w-full h-full"
                    : "flex items-center justify-center min-w-full h-full",
                )}`}
              >
                {slide.type === "image" ? (
                  isDesktop ? (
                    <Image
                      src={slide.src}
                      alt={`slide-${i}`}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={`slide-${i}`}
                      width={500}
                      height={500}
                      className="object-contain w-full h-auto"
                    />
                  )
                ) : (
                  <div
                    className={cn(
                      isDesktop
                        ? "p-4 w-full h-full flex items-center justify-center"
                        : "w-full h-auto",
                    )}
                  >
                    <video
                      className="w-full h-full object-contain rounded"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      key={slide.src}
                    >
                      <source src={slide.src} type="video/mp4" />
                      Your browser did not support video.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TiltCard>

        {/* {isMobile && videos && <></>} */}
        {current > 0 && (
          <button
            onClick={prev}
            className={`absolute left-0 sm:left-10 top-1/2 sm:top-50 -translate-y-1/2 z-20 bg-gray-500 ${cn(
              isTheme === "dark"
                ? "sm:bg-white/40 hover:bg-white/60"
                : "sm:bg-gray-500 hover:bg-gray-400",
            )} text-white rounded-full w-7 sm:w-12 cursor-pointer h-7 sm:h-12 flex items-center justify-center transition-all`}
          >
            ‹
          </button>
        )}

        {current < slides.length - 1 && (
          <button
            onClick={next}
            className={`absolute right-2 top-1/2 sm:top-50 -translate-y-1/2 z-20 bg-gray-500 ${cn(
              isTheme === "dark"
                ? "sm:bg-white/40 hover:bg-white/60"
                : "sm:bg-gray-500 hover:bg-gray-400",
            )} text-white rounded-full w-7 sm:w-12 h-7 sm:h-12 cursor-pointer flex items-center justify-center transition-all`}
          >
            ›
          </button>
        )}

        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-5" : "bg-white/50 w-2.5"
              }`}
              title={slide.type === "video" ? "Video" : `Gambar ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardProject;
