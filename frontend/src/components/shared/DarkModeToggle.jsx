import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/themeSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 transition-all duration-300 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
