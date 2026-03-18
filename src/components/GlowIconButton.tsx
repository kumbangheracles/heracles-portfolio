"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import { useStateContext } from "@/hooks/useStateContext";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ButtonHTMLAttributes } from "react";

interface PropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  toolTipContent?: string;
  width?: number;
  height?: number;
}

export default function GlowIconButton({
  icon,
  toolTipContent,
  width,
  height,
  ...props
}: PropTypes) {
  const { isTheme } = useStateContext();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            {...props}
            size="icon"
            className={`
              rounded-full

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
              transition-all duration-300
              
              
            `}
            style={{ width: width, height: height }}
          >
            {icon}
          </Button>
        </TooltipTrigger>

        <TooltipContent
          className={` ${cn(isTheme === "dark" ? "bg-white text-gray-700" : "bg-black/20 text-gray-100")} font-mono border-white!`}
          side="bottom"
        >
          <p>{toolTipContent}</p>
          <TooltipArrow
            className={cn(isTheme === "dark" ? "fill-white" : "fill-black/20")}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
