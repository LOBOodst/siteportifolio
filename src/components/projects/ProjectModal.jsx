import { ArrowLeft, ArrowRight, Award, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { GithubIcon } from "../common/Icons";

const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  if (url.includes("youtube.com/embed/")) return url;

  // Handles https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}`;
  }

  // Handles https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}`;
  }

  return url;
};

export const ProjectModal = () => {
  const {
    activeProject,
    closeProject,
    nextProject,
    prevProject,
    lang,
    t,
    projects,
    profileConfig,
  } = useTheme();

  const closeButtonRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Close modal on Escape key press, navigate with arrows, and manage focus
  useEffect(() => {
    if (!activeProject) return;

    previousActiveElement.current = document.activeElement;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeProject();
      } else if (e.key === "ArrowRight") {
        nextProject();
      } else if (e.key === "ArrowLeft") {
        prevProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      if (
        previousActiveElement.current &&
        previousActiveElement.current.focus
      ) {
        previousActiveElement.current.focus();
      }
    };
  }, [activeProject, closeProject, nextProject, prevProject]);

  const p = activeProject;
  const currentIndex = p ? projects.findIndex((proj) => proj.id === p.id) : 0;
  const nextProj = projects[(currentIndex + 1) % projects.length];
  const prevProj =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeProject();
            }
          }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0c10]/95 backdrop-blur-md px-4 py-8 sm:p-12"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-w-5xl mx-auto engine-surface p-6 sm:p-10 border border-slate-700/60 shadow-2xl bg-[#0e121a]"
          >
            {/* Top Navigation Control */}
            <div className="flex justify-between items-center pb-6 mb-8 border-b border-slate-800">
              <button
                type="button"
                onClick={closeProject}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors font-mono"
              >
                <ArrowLeft
                  className="w-4 h-4"
                  style={{ color: p.theme.primary }}
                />
                <span>{t.backBtn}</span>
              </button>

              <span className="text-xs text-slate-400 font-medium font-mono">
                {p.type[lang]}
              </span>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeProject}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all bg-[#141926] focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Technical Breakdown */}
              <div className="lg:col-span-8">
                <h2
                  id="modal-project-title"
                  className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-6"
                >
                  {p.title}
                </h2>

                <div className="space-y-8 mb-12">
                  {/* Concept Section */}
                  <section className="p-6 rounded-lg border border-slate-800/80 bg-[#121622]/60">
                    <h3
                      className="text-xs font-bold uppercase tracking-wider mb-2.5 font-mono"
                      style={{ color: p.theme.primary }}
                    >
                      {t.conceptTitle}
                    </h3>
                    <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                      {p.concept[lang]}
                    </p>
                  </section>

                  {/* Technical Implementation Section */}
                  <section className="p-6 rounded-lg border border-slate-800/80 bg-[#121622]/60">
                    <h3
                      className="text-xs font-bold uppercase tracking-wider mb-2.5 font-mono"
                      style={{ color: p.theme.primary }}
                    >
                      {t.howTitle}
                    </h3>
                    <div className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {p.howItWasMade[lang]}
                    </div>
                  </section>

                  {/* Strengths & Challenges Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-lg bg-[#121622]/60 border border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 font-mono">
                        {t.strengthsTitle}
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {p.strengths ? p.strengths[lang] : "---"}
                      </p>
                    </div>

                    <div className="p-5 rounded-lg bg-[#121622]/60 border border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-mono">
                        {t.weaknessesTitle}
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {p.weaknesses ? p.weaknesses[lang] : "---"}
                      </p>
                    </div>
                  </div>

                  {/* Technical Wins Checklist */}
                  {p.techWins && (
                    <div className="p-6 rounded-lg border border-slate-800/80 bg-[#121622]/60">
                      <h3
                        className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 font-mono"
                        style={{ color: p.theme.primary }}
                      >
                        <Award className="w-4 h-4" /> {t.techWinsTitle}
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {p.techWins[lang].map((win, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm"
                          >
                            <span
                              className="font-mono text-sm leading-none mt-0.5 shrink-0"
                              style={{ color: p.theme.primary }}
                            >
                              ▸
                            </span>
                            <span>{win}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Media Gallery: Supports MP4 Video + YouTube Embeds + Images */}
                <div className="space-y-6">
                  {p.videos &&
                    p.videos.map((v, i) => {
                      const isYouTube =
                        v.includes("youtube.com") || v.includes("youtu.be");
                      const embedUrl = isYouTube ? getYouTubeEmbedUrl(v) : null;

                      return (
                        <div
                          key={i}
                          className="aspect-video overflow-hidden rounded-lg border border-slate-800 bg-black shadow-xl"
                        >
                          {isYouTube ? (
                            <iframe
                              src={embedUrl}
                              title={`${p.title} video ${i + 1}`}
                              loading="lazy"
                              sandbox="allow-scripts allow-same-origin allow-presentation"
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              className="w-full h-full object-contain"
                              controls
                              preload="metadata"
                              playsInline
                            >
                              <source src={getAssetUrl(v)} type="video/mp4" />
                            </video>
                          )}
                        </div>
                      );
                    })}

                  {p.images.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden border border-slate-800 shadow-xl bg-slate-950"
                    >
                      <img
                        src={getAssetUrl(img)}
                        alt={`${p.title} frame ${i + 1}`}
                        loading="lazy"
                        className="w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky Tech Specs Sidebar */}
              <aside className="lg:col-span-4">
                <div className="p-6 sm:p-7 sticky top-24 border border-slate-800 rounded-lg bg-[#121622]/60">
                  <h3
                    className="text-xs font-bold uppercase tracking-wider mb-5 border-b border-slate-800 pb-3 font-mono"
                    style={{ color: p.theme.primary }}
                  >
                    {t.techSheet}
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <p className="text-[11px] text-slate-500 uppercase font-semibold mb-1 font-mono">
                        {t.mainRole}
                      </p>
                      <p className="text-white font-medium text-xs">
                        {p.role[lang]}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500 uppercase font-semibold mb-2 font-mono">
                        {t.stackLabel}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2 py-0.5 font-medium rounded bg-[#141926] border border-slate-800 text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500 uppercase font-semibold mb-1 font-mono">
                        {t.commsLabel}
                      </p>
                      <p className="text-slate-300 font-medium text-xs font-mono">
                        Discord: {profileConfig.discordTag}
                      </p>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="mt-6 space-y-2.5">
                    {p.links?.demo && p.links.demo !== "#" && (
                      <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition-all text-xs text-slate-950 shadow-sm font-mono"
                        style={{ backgroundColor: p.theme.primary }}
                      >
                        {t.viewProject} <Zap className="w-4 h-4" />
                      </a>
                    )}

                    {p.links?.github && p.links.github !== "#" && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-lg font-semibold flex justify-center items-center gap-2 transition-all text-xs text-white border border-slate-700 bg-[#182030] hover:bg-[#202b40] font-mono shadow-sm"
                      >
                        <GithubIcon className="w-4 h-4 text-slate-300" />
                        <span>GitHub Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            </div>

            {/* Carousel Next / Prev Footer */}
            <div className="mt-14 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={prevProject}
                className="p-5 rounded-lg text-left border border-slate-800 hover:border-slate-700 bg-[#121622]/40 group transition-all"
              >
                <span className="text-[11px] text-slate-500 uppercase font-semibold flex items-center gap-1 mb-1 font-mono">
                  <ArrowLeft className="w-3.5 h-3.5" /> {t.prevProject}
                </span>
                <p className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {prevProj.title}
                </p>
              </button>

              <button
                type="button"
                onClick={nextProject}
                className="p-5 rounded-lg text-right border border-slate-800 hover:border-slate-700 bg-[#121622]/40 group transition-all"
              >
                <span className="text-[11px] text-slate-500 uppercase font-semibold flex items-center justify-end gap-1 mb-1 font-mono">
                  {t.nextProject} <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <p className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {nextProj.title}
                </p>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
