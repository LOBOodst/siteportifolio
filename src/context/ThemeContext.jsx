import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { defaultTheme, projects } from "../data/projects";
import { profileConfig, translations } from "../data/translations";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("hosch_lang") || "pt";
  });

  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
    normX: 0.5,
    normY: 0.5,
  });

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem("hosch_lang", newLang);
  }, []);

  const t = translations[lang] || translations.pt;
  const activeTheme =
    hoveredProject?.theme || activeProject?.theme || defaultTheme;

  // Real-time CSS Custom Properties sync with smooth easing
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", activeTheme.primary);
    root.style.setProperty("--theme-secondary", activeTheme.secondary);
    root.style.setProperty("--theme-accent", activeTheme.accent);
    root.style.setProperty("--theme-glow", activeTheme.glow);
    root.style.setProperty("--theme-surface-glow", activeTheme.surfaceGlow);
    root.style.setProperty("--theme-badge-bg", activeTheme.badgeBg);
    root.style.setProperty("--theme-badge-border", activeTheme.badgeBorder);
    root.style.setProperty("--theme-badge-text", activeTheme.badgeText);
  }, [activeTheme]);

  // Track mouse coordinates for interactive glow & particle attraction
  useEffect(() => {
    const handleMouseMove = (e) => {
      const normX = e.clientX / window.innerWidth;
      const normY = e.clientY / window.innerHeight;
      setMousePos({ x: e.clientX, y: e.clientY, normX, normY });
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Hash-based URL navigation for project deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        hash &&
        hash !== "home" &&
        hash !== "tour-stack" &&
        hash !== "tour-projects" &&
        hash !== "tour-profile" &&
        hash !== "contact"
      ) {
        const found = projects.find((p) => p.id === hash);
        if (found) {
          setActiveProject(found);
        }
      } else if (!hash) {
        setActiveProject(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const openProject = useCallback((project) => {
    setActiveProject(project);
    window.location.hash = project.id;
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    window.location.hash = "tour-projects";
  }, []);

  const nextProject = useCallback(() => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    openProject(projects[nextIndex]);
  }, [activeProject, openProject]);

  const prevProject = useCallback(() => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    openProject(projects[prevIndex]);
  }, [activeProject, openProject]);

  return (
    <ThemeContext.Provider
      value={{
        lang,
        setLang,
        t,
        activeTheme,
        setHoveredProject,
        activeProject,
        openProject,
        closeProject,
        nextProject,
        prevProject,
        mousePos,
        profileConfig,
        projects,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
