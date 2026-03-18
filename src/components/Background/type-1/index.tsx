"use client";
import React from "react";
import "./type-1.css";

interface PropTypes {
  style?: React.CSSProperties;
  className?: string;
  bgColor?: string;
  colors?: [string, string, string];

  particleSize?: string;
}

const Type1BG = ({
  className,
  style,
  bgColor = "#121a3b",
  colors = ["#604bff", "#ffffff", "#1f0b65"],
  particleSize = "2vmin",
}: PropTypes) => {
  return (
    <div
      className={`background transition-all duration-500 ${className}`}
      style={
        {
          ...style,
          backgroundColor: bgColor,
          "--color-1": colors[0],
          "--color-2": colors[1],
          "--color-3": colors[2],
          "--particle-size": particleSize,
        } as React.CSSProperties
      }
    >
      {[...Array(100)].map((_, index) => (
        <span className="transition-all duration-500" key={index}></span>
      ))}
    </div>
  );
};

export default Type1BG;
