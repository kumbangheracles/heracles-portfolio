import ScrambleText from "../ScrambleText";
import { useStateContext } from "@/hooks/useStateContext";
import ToggleButton from "../ToggleButton";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { setIdSection, isTheme, isNotFoundPage } = useStateContext();

  if (isNotFoundPage) return;
  return (
    <div
      className={`py-2  sm:px-10 px-4 flex items-center justify-between fixed top-0 z-50 ${cn(isTheme === "dark" ? "text-white" : "text-gray-700")} w-full  ${cn(isTheme === "dark" ? "bg-white/5" : "bg-white/40")} backdrop-blur-md transition-colors duration-500`}
    >
      <div
        id="LOGO"
        className={`font-bold tracking-wide text-[13px] sm:text-[16px] flex items-center `}
      >
        <span className="font-mono">HERKAL</span>
        <span className="font-dancing">Taqyudin</span>
      </div>

      <div className="hidden sm:block">
        <div
          className={` transition-all font-mono  tracking-wide flex items-center gap-4`}
        >
          {/* <Link
               className={ `cursor-pointer px-3 py-2 ${ cn(isTheme === "dark" ? "hover:bg-white/20" : "hover:bg-gray-300")}${cn(isInProjects  ? "hover:bg-blue-100" : "hover:bg-gray-600")}  rounded-xl transition-all duration-700 `}
            href={"#home"}
          >
            <ScrambleText duration={800} className="text-[13px]" speed={40}>
              Home
            </ScrambleText>
          </Link> */}

          <div
            className={`cursor-pointer px-3 py-2 ${cn(isTheme === "dark" ? "hover:bg-white/20" : "hover:bg-gray-300")}  rounded-xl transition-all duration-700 `}
            onClick={() => setIdSection("about")}
          >
            <ScrambleText duration={800} className="text-[13px]" speed={40}>
              About
            </ScrambleText>
          </div>
          <div
            className={`cursor-pointer px-3 py-2 ${cn(isTheme === "dark" ? "hover:bg-white/20" : "hover:bg-gray-300")}  rounded-xl transition-all duration-700 `}
            onClick={() => setIdSection("timeline")}
          >
            <ScrambleText duration={800} className="text-[13px]" speed={40}>
              Timeline
            </ScrambleText>
          </div>
          <div
            className={`cursor-pointer px-3 py-2 ${cn(isTheme === "dark" ? "hover:bg-white/20" : "hover:bg-gray-300")}  rounded-xl transition-all duration-700 `}
            onClick={() => setIdSection("projects")}
          >
            <ScrambleText duration={800} className="text-[13px]" speed={40}>
              Projects
            </ScrambleText>
          </div>
          <div
            className={`px-3 py-2 cursor-pointer   rounded-xl ${cn(isTheme === "dark" ? "hover:bg-white/20" : "hover:bg-gray-300")}  transition-all duration-700 `}
            onClick={() => setIdSection("contact")}
          >
            <ScrambleText duration={800} className="text-[13px]" speed={40}>
              Contact
            </ScrambleText>
          </div>

          <ToggleButton />
        </div>
      </div>
      <div className="sm:hidden block">
        <div className={`  text-[10px] font-mono flex items-center gap-4`}>
          {/* <div className="" onClick={() => setIdSection("about")}>
            About
          </div> */}

          {/* <div className="" onClick={() => setIdSection("projects")}>
            Projects
          </div> */}

          {/* <div className="" onClick={() => setIdSection("contact")}>
            Contact
          </div> */}

          <ToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
