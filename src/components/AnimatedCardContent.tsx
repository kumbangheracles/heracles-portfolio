"use client";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";

interface AnimatedCardContentProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  once?: boolean;
  variants?: Variants;
  enabled?: boolean;
}

const defaultVariants: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

export default function AnimatedCardContent({
  children,
  className,
  delayChildren = 0,
  once = false,
  variants = defaultVariants,
  enabled = true,
}: AnimatedCardContentProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (enabled) {
      setKey((prev) => prev + 1);
    }
  }, [enabled]);

  return (
    <motion.div
      key={key}
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once }}
      variants={variants}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: delayChildren,
      }}
    >
      {children}
    </motion.div>
  );
}
