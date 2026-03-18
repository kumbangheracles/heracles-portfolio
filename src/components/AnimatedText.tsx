"use client";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  initialDelay?: number;
  once?: boolean;
  variants?: Variants;
  enabled?: boolean;
}

const defaultItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function AnimatedText({
  text,
  className,
  stagger = 0.02,
  delayChildren = 0.2,
  initialDelay,
  once = false,
  variants = defaultItem,
  enabled = true,
}: AnimatedTextProps) {
  const [delay, setDelay] = useState(initialDelay ?? delayChildren);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (enabled) {
      setDelay(delayChildren);
      setKey((prev) => prev + 1);
    }
  }, [enabled]);

  return (
    <motion.h2
      key={key}
      className={`flex flex-wrap gap-[clamp(0.05rem,0.2vw,0.2rem)] ${className}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once }}
      transition={{
        staggerChildren: stagger,
        delayChildren: delay,
      }}
    >
      {text.split("").map((char, i) =>
        char === " " ? (
          <motion.span
            key={i}
            className="w-[clamp(0.5rem,0.8vw,1rem)]"
            variants={variants}
          >
            {" "}
          </motion.span>
        ) : (
          <motion.span key={i} variants={variants}>
            {char}
          </motion.span>
        ),
      )}
    </motion.h2>
  );
}
