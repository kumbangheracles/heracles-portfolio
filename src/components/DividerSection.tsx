"use client";
import { useStateContext } from "@/hooks/useStateContext";
import ScrollVelocity from "./ScrollVelocity";

const DividerSection = () => {
  return (
    <section
      id="divider-section"
      className="min-h-55 flex relative items-center justify-center w-full py-7 backdrop-blur-sm font-dancing overflow-hidden"
    >
      <ScrollVelocity
        texts={["DESIGN'BY'LOGIC'BUILT'WITH'ART"]}
        className="text-gray-700 text-7xl sm:text-9xl font-mono"
      />
    </section>
  );
};
export default DividerSection;
