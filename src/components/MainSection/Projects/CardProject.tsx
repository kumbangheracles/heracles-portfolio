"use client";
import { useState } from "react";
import Image from "next/image";
import TiltCard from "@/components/Effects/TiltCard";
import { useViewport } from "@/hooks/useViewPort";
import { cn } from "@/lib/utils";
import { useStateContext } from "@/hooks/useStateContext";
interface PropTypes {
  id?: string;
  name?: string;
  description?: string;
  images?: ImageProps[];
  styleColor1?: string;
  styleColor2?: string;
}

interface ImageProps {
  id?: number;
  src?: string;
  imageName?: string;
}

const CardProject = ({
  description,
  id,
  images,
  name,
  styleColor1,
  styleColor2,
}: PropTypes) => {
  const [current, setCurrent] = useState<number>(0);
  const { isDesktop } = useViewport();
  const { isTheme } = useStateContext();
  const prev = () => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === images.length - 1 ? 0 : p + 1));
  return (
    <div
      key={id}
      className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-8 items-center"
    >
      <div className="flex flex-col gap-1 sm:gap-3">
        <h4
          className={`font-bold ${cn(isTheme === "dark" ? "text-sky-50" : "text-gray-700")}  text-sm sm:text-lg tracking-widest uppercase`}
        >
          {name}
        </h4>
        <p
          className={`sm:text-sm text-[10px] ${cn(isTheme === "dark" ? "text-gray-200" : "text-gray-700")}  leading-relaxed`}
        >
          {description}
        </p>
      </div>

      <div className="relative h-[200px] max-w-[400px] w-full mx-auto sm:mx-0 sm:max-w-full sm:w-auto sm:h-[350px]">
        <div
          className={`absolute top-0 right-0 w-[55%] h-[45%] ${styleColor1}  rounded-xl z-0`}
        />
        <div
          className={`absolute bottom-[-50px] right-0 w-[55%] h-[45%] ${styleColor1} rounded-xl z-0`}
        />
        <div
          className={`absolute top-[15%] right-[40%] w-[15%] h-[20%] ${styleColor2} rounded-xl z-0`}
        />
        <div
          className={`absolute bottom-0 left-[30%] w-[45%] h-[35%] ${styleColor1}  rounded-xl z-0`}
        />
        <div
          className={`absolute bottom-[10%] left-[10%] w-[10%] h-[15%] ${styleColor2} rounded-xl z-0`}
        />

        <TiltCard
          maxTilt={15}
          glowColor="rgba(255, 255, 255, 0.3)"
          scale={1.03}
          className="absolute shadow-2xl top-[8%] bg-white left-0 sm:left-[15%] w-full sm:w-[75%] h-full rounded-xl overflow-hidden  z-10"
        >
          {/* Slider wrapper */}
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative ${cn(isDesktop ? " min-w-full h-full" : "flex items-center justify-center min-w-full h-full")} `}
              >
                {isDesktop ? (
                  <Image
                    src={img?.src}
                    alt={`slide-${i}`}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <Image
                    src={img?.src}
                    alt={`slide-${i}`}
                    width={500}
                    height={500}
                    className="object-contain w-full h-auto"
                  />
                )}
              </div>
            ))}
          </div>
        </TiltCard>

        {current > 0 && (
          <button
            onClick={prev}
            className={`absolute left-0 sm:left-10 top-1/2 sm:top-50 -translate-y-1/2 z-20 bg-gray-500 ${cn(isTheme === "dark" ? "sm:bg-white/40 hover:bg-white/60" : "sm:bg-gray-500 hover:bg-gray-400")}   text-white rounded-full w-7 sm:w-12 cursor-pointer h-7 sm:h-12 flex items-center justify-center transition-all`}
          >
            ‹
          </button>
        )}

        {current < images.length - 1 && (
          <button
            onClick={next}
            className={`absolute right-2 top-1/2 sm:top-50 -translate-y-1/2 z-20 bg-gray-500  ${cn(isTheme === "dark" ? "sm:bg-white/40 hover:bg-white/60" : "sm:bg-gray-500 hover:bg-gray-400")}    text-white rounded-full w-7 sm:w-12 h-7 sm:h-12 cursor-pointer flex items-center justify-center transition-all`}
          >
            ›
          </button>
        )}

        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-5" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CardProject;
