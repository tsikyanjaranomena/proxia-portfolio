import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Choix explicite du visiteur (bouton lune/soleil). Nouvelle clé : l'ancienne enregistrait aussi
 * le thème système, ce qui ouvrait le site en sombre sans que le visiteur l'ait choisi.
 */
const STORAGE_KEY = "proxiatech-theme-choice";

const readStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Le landing s'ouvre toujours en clair, sauf si le visiteur a lui-même choisi le sombre
  const [theme, setTheme] = useState<Theme>(() => (typeof window === "undefined" ? "light" : (readStoredTheme() ?? "light")));

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Stockage indisponible (navigation privée) : le choix vaut pour la session
      }
      return next;
    });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
