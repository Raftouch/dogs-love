import { useEffect, useState } from "react";
import "./App.css";
import BreedList from "./components/BreedList";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? "dark-mode" : "";

  const handleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className={theme}>
      <button className="theme-toggler" onClick={handleTheme}>
        <span
          className={`material-symbols-outlined ${isDarkMode ? "" : "active"}`}
        >
          light_mode
        </span>
        <span
          className={`material-symbols-outlined ${isDarkMode ? "active" : ""}`}
        >
          dark_mode
        </span>
      </button>

      <h1>Dog Breeds</h1>
      <BreedList />
    </div>
  );
}

export default App;
