import { useEffect, useState } from "react";

/**
 * useTheme — Manages dark/light mode with:
 * - LocalStorage persistence
 * - System preference fallback
 * - Automatic <html> class toggling
 */

export default function useTheme() {
  const getInitialTheme = () => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;

      // Fallback to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to <html> tag
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    // Remove old classes
    root.classList.remove("light", "dark");

    // Add new theme class
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle helper
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, setTheme, toggleTheme };
}
