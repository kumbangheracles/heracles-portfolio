"use client";
import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  scale?: number;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 10,
  glowColor = "rgba(255,255,255,0.15)",
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX; // -1 to 1
    const deltaY = (y - centerY) / centerY; // -1 to 1

    const rotateX = -deltaY * maxTilt;
    const rotateY = deltaX * maxTilt;
    const shadowX = deltaX * 20;
    const shadowY = deltaY * 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    card.style.boxShadow = `${shadowX}px ${shadowY}px 40px ${glowColor}, 0 0 20px ${glowColor}`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "";
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease, box-shadow 0.2s ease" }}
    >
      {children}
    </div>
  );
}
