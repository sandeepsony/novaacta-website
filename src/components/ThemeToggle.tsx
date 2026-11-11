import { Moon, Sun } from "lucide-react";

const THEME_COLORS = { dark: "#0b0a09", light: "#f9f8f5" };

const toggleTheme = () => {
  const root = document.documentElement;
  const next = root.classList.contains("light") ? "dark" : "light";

  root.classList.remove("light", "dark");
  root.classList.add(next);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[next]);

  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private browsing: the choice simply lasts for this page view.
  }
};

/**
 * Both icons are always rendered and CSS picks one from the class on <html>,
 * so the button never depends on React knowing the theme and cannot flash.
 */
const ThemeToggle = ({ className = "" }: { className?: string }) => (
  <button
    type="button"
    onClick={toggleTheme}
    aria-label="Switch between light and dark theme"
    className={`inline-flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-accent ${className}`}
  >
    <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
  </button>
);

export default ThemeToggle;
