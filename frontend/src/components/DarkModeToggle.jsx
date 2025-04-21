import React from "react";
import useDarkMode from "../hooks/useDarkMode";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 text-xl rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
      title="Toggle Dark Mode"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;
