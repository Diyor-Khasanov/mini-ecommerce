import React from "react";
import useTheme from "../context/useTheme";

const Loading = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex items-center justify-center text-3xl font-medium text-slate-800 ${theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-800"}`}>
      Loading...
    </div>
  );
};

export default Loading;
