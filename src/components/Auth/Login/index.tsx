"use client";

const LoginIndex = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen font-mono">
      <div className="bg-white/10  p-4 min-w-1/4 rounded-xl backdrop-blur-md">
        <h4 className=" font-semibold text-center tracking-wider text-3xl">
          Login
        </h4>
        <form>
          <div className="flex flex-col gap-1">
            <label className="tracking-wider text-sm">Username</label>

            <input
              type="text"
              required
              className="outline-none bg-white/10 rounded-md px-3 py-1 text-[12px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="tracking-wider text-sm">Password</label>

            <input
              type="password"
              required
              className="outline-none bg-white/10 rounded-md px-3 py-1 text-[12px]"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <button className="px-3 py-2 text-[12px] mx-auto mt-4 bg-blue-400/30 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginIndex;
