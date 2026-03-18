"use client";
import { useMounted } from "@/hooks/useMounted";
import StackIcon from "tech-stack-icons";
import LoadingType4 from "./CustomLoading/LoadingType4/LoadingType4";

interface PropTypes {
  variant: "dark" | "grayscale" | "light";
}
const icons = [
  "nextjs2",
  "vuejs",
  "remix",
  "laravel",
  "nodejs",
  "expressjs",
  "cloudinary",
  "nestjs",
  "tailwindcss",
  "mongodb",
  "postgresql",
  "mysql",
  "tanstack",
  "zustand",
  "redux",
];
const TechStack = ({ variant }: PropTypes) => {
  const mounted = useMounted();

  return (
    <div className="tech-stack overflow-hidden w-full">
      <div className="tech-stack overflow-hidden w-full">
        <div className="flex">
          <div className="flex items-center shrink-0 animate-marquee">
            {icons.map((name, i) => (
              <div key={i} className="px-2 shrink-0">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
                  {!mounted ? (
                    <LoadingType4 />
                  ) : (
                    <StackIcon
                      name={name}
                      variant={variant}
                      className="w-[40px] h-[40px]"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center shrink-0 animate-marquee"
            aria-hidden
          >
            {icons.map((name, i) => (
              <div key={i} className="px-2 shrink-0">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
                  {!mounted ? (
                    <LoadingType4 />
                  ) : (
                    <StackIcon
                      name={name}
                      variant={variant}
                      className="w-[40px] h-[40px]"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
