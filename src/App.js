import { createContext, useEffect, useState } from "react";
import "./App.css";
import VideoEditor from "./pages/VideoEditor/VideoEditor.jsx";

export const ThemeContext = createContext();

function App() {
  const [mode, setMode] = useState();

  useEffect(() => {
    const useMode = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const prevMode = localStorage.getItem("mode");
    prevMode === null ? toggleDarkMode(useMode) : toggleDarkMode(prevMode);
  }, []);

  const toggleDarkMode = (mode) => {
    const $root = document.querySelector("#root");
    if (mode === "dark") {
      $root.classList.add("dark");
    } else {
      $root.classList.remove("dark");
    }
    sessionStorage.setItem("mode", mode);
    setMode(mode === "dark"? "light" : "dark");
    console.log(mode)
  };

  return (
    <ThemeContext.Provider value={[mode, toggleDarkMode]}>
      <VideoEditor /> 
    </ThemeContext.Provider>
  );
}

export default App;
