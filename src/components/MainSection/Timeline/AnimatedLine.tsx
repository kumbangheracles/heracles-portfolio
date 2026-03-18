"use client";
function AnimatedLine({
  active,
  customHeight = 80,
}: {
  active: boolean;
  customHeight?: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-6">
      <div />
      <div className="flex justify-center w-6">
        <div
          className="relative w-[3px] bg-white/20 overflow-hidden"
          style={{ height: customHeight }}
        >
          <div
            className="absolute top-0 left-0 w-full bg-[#4b8fff] transition-all duration-700 ease-in-out"
            style={{
              height: active ? "100%" : "0%",
              boxShadow: active ? "0 0 6px #4b8fff" : "none",
            }}
          />
        </div>
      </div>
      <div />
    </div>
  );
}
export default AnimatedLine;
