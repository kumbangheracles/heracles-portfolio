"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useStateContext } from "@/hooks/useStateContext";
import { ReactNode } from "react";

interface PropTypes {
  title?: string;
  icon?: ReactNode;
  link: string;
}

const GlowButton = ({ title, icon, link }: PropTypes) => {
  const { isTheme } = useStateContext();
  return (
    <Button
      size="icon"
      className={`
        px-5!
             rounded-xl
                  mt-3
             w-20
             h-10
            font-mono
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
              flex items-center gap-2
              
            `}
      onClick={() => window.open(link, "_blank")}
      rel="noopener noreferrer"
    >
      <p>{title}</p>
      <p>{icon}</p>
    </Button>
  );
};

export default GlowButton;
