"use client";
import { useState, useRef, JSX } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

interface ScrambleTextProps {
  children: string;
  duration?: number;
  speed?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function ScrambleText({
  children,
  duration = 800,
  speed = 40,
  className,
  as: Tag = "span",
}: ScrambleTextProps) {
  const [text, setText] = useState(children);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let elapsed = 0;
    clearInterval(intervalRef.current!);

    intervalRef.current = setInterval(() => {
      elapsed += speed;
      const progress = elapsed / duration;
      const settledCount = Math.floor(progress * children.length);

      setText(
        children
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < settledCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      if (elapsed >= duration) {
        clearInterval(intervalRef.current!);
        setText(children);
      }
    }, speed);
  };

  const stop = () => {
    clearInterval(intervalRef.current!);
    setText(children);
  };

  return (
    <Tag className={className} onMouseEnter={scramble} onMouseLeave={stop}>
      {text}
    </Tag>
  );
}
