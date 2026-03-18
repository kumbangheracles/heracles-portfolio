import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
export type sectionId = "home" | "about" | "timeline" | "projects" | "contact";
export type ThemeType = "dark" | "light";
interface StateProps {
  idSection: sectionId | null;
  setIdSection: Dispatch<SetStateAction<sectionId | null>>;
  loadingContext: boolean;
  setLoadingContext: Dispatch<SetStateAction<boolean>>;
  bgColor: string | null;
  setBgColor: Dispatch<SetStateAction<string | null>>;
  colors?: [string, string, string] | null;
  setColors: Dispatch<SetStateAction<[string, string, string] | null>>;
  particleSize: string | null;
  setParticleSize: Dispatch<SetStateAction<string | null>>;
  isScrolling: boolean;
  setIsScrolling: Dispatch<SetStateAction<boolean>>;
  isInProjects: boolean;
  setIsInProjects: Dispatch<SetStateAction<boolean>>;
  idSectionForBg: sectionId | null;
  setIdSectionForBg: Dispatch<SetStateAction<sectionId | null>>;
  particleSpreadsCustom: number;
  setParticleSpreadsCustom: Dispatch<SetStateAction<number>>;
  particleCountCustom: number;
  setParticleCountCustom: Dispatch<SetStateAction<number>>;
  disableRotationCustom: boolean;
  setDisableRotationCustom: Dispatch<SetStateAction<boolean>>;
  isContentVisible: boolean;
  setIsContentVisible: Dispatch<SetStateAction<boolean>>;
  isTheme: ThemeType;
  setIsTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const StateContext = createContext<StateProps | null>(null);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [idSection, setIdSection] = useState<sectionId | null>(null);
  const [idSectionForBg, setIdSectionForBg] = useState<sectionId | null>(null);
  const [loadingContext, setLoadingContext] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isInProjects, setIsInProjects] = useState<boolean>(false);
  const [particleSize, setParticleSize] = useState<string | null>(null);
  const [particleSpreadsCustom, setParticleSpreadsCustom] = useState<number>(0);
  const [particleCountCustom, setParticleCountCustom] = useState<number>(390);
  const [disableRotationCustom, setDisableRotationCustom] =
    useState<boolean>(false);
  const [colors, setColors] = useState<[string, string, string]>([
    "#604bff",
    "#ffffff",
    "#1f0b65",
  ]);
  const [bgColor, setBgColor] = useState<string>("#14161d");
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
  const [isTheme, setIsTheme] = useState<ThemeType>("dark");
  return (
    <StateContext.Provider
      value={{
        setIsTheme,
        isTheme,
        isContentVisible,
        setIsContentVisible,
        isInProjects,
        setIsInProjects,
        setIsScrolling,
        isScrolling,
        particleSize,
        setParticleSize,
        idSection,
        setIdSection,
        loadingContext,
        setLoadingContext,
        setBgColor,
        bgColor,
        colors,
        setColors,
        idSectionForBg,
        setIdSectionForBg,
        particleSpreadsCustom,
        setParticleSpreadsCustom,
        particleCountCustom,
        setParticleCountCustom,
        disableRotationCustom,
        setDisableRotationCustom,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
