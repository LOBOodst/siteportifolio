import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ContactSection } from "./components/contact/ContactSection";
import { HeroSection } from "./components/hero/HeroSection";
import { Navbar } from "./components/navigation/Navbar";
import { AboutSection } from "./components/profile/AboutSection";
import { ProjectModal } from "./components/projects/ProjectModal";
import { ProjectsGrid } from "./components/projects/ProjectsGrid";
import { SkillTree } from "./components/stack/SkillTree";
import { useTheme } from "./context/ThemeContext";
import { useCheatCode } from "./hooks/useCheatCode";

export const App = () => {
  const { activeProject, t } = useTheme();
  const modalOpen = Boolean(activeProject);

  // Easter egg: the Konami code (or the hint in the footer) toggles "debug draw"
  const [debugDraw, setDebugDraw] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const toggleDebugDraw = useCallback(() => {
    setDebugDraw((on) => {
      const next = !on;
      setToast(next ? "debugOn" : "debugOff");
      return next;
    });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useCheatCode(toggleDebugDraw);

  useEffect(() => {
    if (debugDraw) document.documentElement.dataset.debug = "";
    else delete document.documentElement.dataset.debug;
  }, [debugDraw]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-ink focus:text-paper"
      >
        {t.skipToContent}
      </a>

      {/* While a project is open, the page behind it is inert (no focus, no clicks). */}
      <div inert={modalOpen}>
        <Navbar />
        <HeroSection />
        <main id="main" tabIndex={-1} className="outline-none">
          <ProjectsGrid />
          <SkillTree />
          <AboutSection />
        </main>
        <ContactSection onToggleDebugDraw={toggleDebugDraw} />
      </div>

      <ProjectModal />

      <div
        role="status"
        aria-live="polite"
        className="fixed left-4 bottom-4 z-[70]"
      >
        <AnimatePresence>
          {toast && (
            <motion.p
              key={toast}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              className="bg-select text-on-select font-bold text-sm px-3 py-2 rounded-[3px] shadow-lg"
            >
              {t[toast]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};
