import { createContext, useEffect, useState } from "react";
import "./App.css";
import VideoEditor from "./pages/VideoEditor/VideoEditor.jsx";

export const ThemeContext = createContext();

function App() {
  const [mode, setMode] = useState();

  useEffect(() => {
    const userMode = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const prevMode = sessionStorage.getItem("mode");
    (prevMode === undefined || prevMode === null) ? handleDarkMode(userMode) : handleDarkMode(prevMode);
  }, []);

  const handleDarkMode = (mode) => {
    const $root = document.querySelector("#root");
    if (mode === "dark") $root.classList.add("dark");
    else $root.classList.remove("dark");
    sessionStorage.setItem("mode", mode);
    setMode(mode);
  };

  return (
    <ThemeContext.Provider value={[mode, handleDarkMode]}>
      <VideoEditor /> 
    </ThemeContext.Provider>
  );
}

export default App;
