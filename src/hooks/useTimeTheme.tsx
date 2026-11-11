import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDaytime: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", isDaytime: false });

export const useTheme = () => useContext(ThemeContext);

function getTimeBasedTheme(): Theme {
  const hour = new Date().getHours();
  // Day: 6am - 7pm, Night: 7pm - 6am
  return hour >= 6 && hour < 19 ? "light" : "dark";
}

export const TimeThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getTimeBasedTheme);

  useEffect(() => {
    // Apply theme class to html
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Re-check every minute
    const interval = setInterval(() => {
      const newTheme = getTimeBasedTheme();
      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isDaytime: theme === "light" }}>
      {children}
    </ThemeContext.Provider>
  );
};
