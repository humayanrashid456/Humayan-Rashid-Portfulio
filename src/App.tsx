import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Sub-component imports
import AdminDashboard from "./components/dashboard/AdminDashboard";
import PortfolioHome from "./components/PortfolioHome";
import AbroadPage from "./components/AbroadPage";
import BlogDetail from "./components/BlogDetail";
import ProjectDetail from "./components/ProjectDetail";
import ServiceDetail from "./components/ServiceDetail";
import VideoDetail from "./components/VideoDetail";
import DetailPageLayout from "./components/DetailPageLayout";
import BookingModal from "./components/BookingModal";

export default function App() {
  // Load and preserve theme state
  const [theme, setTheme] = useState<"light" | "dark" | "stone">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "light" | "dark" | "stone") || "dark";
  });

  // Global booking modal state — shared across homepage and detail pages
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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

  // Global listener — any component (Navbar, Hero, About, etc.) can request opening the modal
  useEffect(() => {
    const handleOpenBooking = () => setIsBookingOpen(true);
    window.addEventListener("portfolio:open-booking", handleOpenBooking);
    return () => window.removeEventListener("portfolio:open-booking", handleOpenBooking);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const openBookingModal = () => setIsBookingOpen(true);
  const closeBookingModal = () => setIsBookingOpen(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<PortfolioHome openBookingModal={openBookingModal} />} />
        <Route path="/abroad" element={<AbroadPage />} />
        <Route path="/admin/*" element={<AdminDashboard theme={theme} toggleTheme={toggleTheme} />} />

        {/* Detail pages share the global Header + Footer + ambient background */}
        <Route element={<DetailPageLayout theme={theme} toggleTheme={toggleTheme} />}>
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/videos/:id" element={<VideoDetail />} />
        </Route>
      </Routes>

      {/* Single global booking modal — accessible from any page via the custom event */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBookingModal} />
    </>
  );
}
