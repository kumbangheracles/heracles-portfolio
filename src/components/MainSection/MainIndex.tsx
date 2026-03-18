"use client";
import AboutIndex from "./About/About";
import HomeIndex from "./Home/Home";
import { useStateContext } from "@/hooks/useStateContext";
import TimelineIndex from "./Timeline/Timeline";
import ProjectIndex from "./Projects/Project";
import PersonalSectionIndex from "./PersonalSection/PersonalSection";
import ContactIndex from "./Contact/Contact";

export default function MainIndex() {
  const { loadingContext } = useStateContext();
  return (
    <>
      {loadingContext !== true && (
        <>
          <HomeIndex />
          <AboutIndex />
          <TimelineIndex />
          <ProjectIndex />
          <PersonalSectionIndex />
          <ContactIndex />
        </>
      )}
    </>
  );
}
