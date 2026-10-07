import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { projects } from "../data/projects";
import { profileConfig, translations } from "../data/translations";

const SUPPORTED_LANGS = ["en", "pt", "fr"];
const LANG_STORAGE_KEY = "hosch_lang";

// Saved choice first, then the visitor's browser language, then English.
const detectInitialLang = () => {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode); fall through to detection.
  }
  const browserLangs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || "en"];
  for (const l of browserLangs) {
    const short = l.slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(short)) return short;
  }
  return "en";
};

const projectFromHash = () => {
  const id = decodeURIComponent(window.location.hash.replace("#", ""));
  return projects.find((p) => p.id === id) || null;
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [lang, setLangState] = useState(detectInitialLang);
  const [activeProject, setActiveProject] = useState(projectFromHash);
  // True when the open project was pushed onto history by this page,
  // so closing it can step back instead of leaving a stray entry.
  const pushedRef = useRef(false);

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {
      // Ignore: the choice still applies for this visit.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
  }, [lang]);

  // Back/forward buttons and pasted deep links (#fps-lan) open or close the modal.
  useEffect(() => {
    const sync = () => {
      const found = projectFromHash();
      if (!found) pushedRef.current = false;
      setActiveProject(found);
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const openProject = useCallback((project) => {
    if (window.location.hash !== `#${project.id}`) {
      window.history.pushState(null, "", `#${project.id}`);
      pushedRef.current = true;
    }
    setActiveProject(project);
  }, []);

  const closeProject = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", pathname + search);
    }
    setActiveProject(null);
  }, []);

  const stepProject = useCallback(
    (direction) => {
      if (!activeProject) return;
      const i = projects.findIndex((p) => p.id === activeProject.id);
      const next =
        projects[(i + direction + projects.length) % projects.length];
      window.history.replaceState(null, "", `#${next.id}`);
      setActiveProject(next);
    },
    [activeProject],
  );

  const nextProject = useCallback(() => stepProject(1), [stepProject]);
  const prevProject = useCallback(() => stepProject(-1), [stepProject]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang] || translations.en,
      activeProject,
      openProject,
      closeProject,
      nextProject,
      prevProject,
      profileConfig,
      projects,
    }),
    [
      lang,
      setLang,
      activeProject,
      openProject,
      closeProject,
      nextProject,
      prevProject,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
