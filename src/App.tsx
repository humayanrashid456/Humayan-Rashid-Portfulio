import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Sub-component imports
import AdminDashboard from "./components/dashboard/AdminDashboard";
import PortfolioHome from "./components/PortfolioHome";

export default function App() {
  // Load and preserve theme state
  const [theme, setTheme] = useState<"light" | "dark" | "stone">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "light" | "dark" | "stone") || "dark";
  });

  // Sync active theme with document DOM root
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    root.classList.remove("dark", "stone");
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "stone") {
      root.classList.add("stone");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/admin/*" element={<AdminDashboard theme={theme} toggleTheme={toggleTheme} />} />
    </Routes>
  );
}
