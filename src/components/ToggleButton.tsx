import { useStateContext } from "@/hooks/useStateContext";
import { motion } from "framer-motion";

export default function ToggleButton() {
  const { isTheme, setIsTheme } = useStateContext();
  const isLight = isTheme === "light";

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(1px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <button
        className={`w-[3rem] lg:w-[5rem] p-[0.15rem] lg:p-[0.25rem] aspect-[5/2] rounded-full border-[1px] lg:border-[2px] flex items-center transition-colors duration-700 cursor-pointer
          ${isLight ? "border-[#101010cc] justify-end" : "border-[#ffffffcc] justify-start"}
        `}
        onClick={() => setIsTheme(isLight ? "dark" : "light")}
        aria-label="Toggle light and dark mode"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={`w-[1rem] lg:w-[1.6rem] aspect-square rounded-full transition-colors duration-700
            ${isLight ? "bg-[#101010cc]" : "bg-[#ffffffcc]"}
          `}
        />
      </button>
    </motion.div>
  );
}
