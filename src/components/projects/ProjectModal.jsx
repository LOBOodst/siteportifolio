import { ArrowLeft, ArrowRight, ExternalLink, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FACT_FIELDS } from "../../data/projects";
import { getProjectMedia } from "../../utils/media";
import { GithubIcon } from "../common/Icons";

// Keys pressed inside these elements belong to them (seek a video, type in a field).
const OWNS_ARROW_KEYS =
  "video, input, textarea, select, iframe, [data-own-keys]";

const MediaViewer = ({ project, t }) => {
  const media = useMemo(() => getProjectMedia(project), [project]);
  const [index, setIndex] = useState(0);
  const current = media[index];

  if (!current) return null;

  return (
    <div className="on-dark bg-stage">
      <div className="max-w-6xl mx-auto px-0 sm:px-8 pt-0 sm:pt-8 pb-6">
        <div className="aspect-video bg-black sm:rounded-[3px] overflow-hidden">
          {current.kind === "youtube" && (
            <iframe
              key={current.src}
              src={current.src}
              title={`${project.title} — ${t.videoThumb}`}
              sandbox="allow-scripts allow-same-origin allow-presentation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
          {current.kind === "video" && (
            <video
              key={current.src}
              src={current.src}
              controls
              preload="metadata"
              playsInline
              className="w-full h-full object-contain"
            />
          )}
          {current.kind === "image" && (
            <img
              key={current.src}
              src={current.src}
              alt={`${project.title} — ${t.mediaItem} ${index + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {media.length > 1 && (
          <ul
            data-own-keys
            className="reel mt-4 px-5 sm:px-1 flex gap-3 overflow-x-auto pt-1 pb-2"
            aria-label={t.mediaItem}
          >
            {media.map((item, i) => (
              <li key={item.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${item.kind === "image" ? t.mediaItem : t.videoThumb} ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`relative block w-28 sm:w-36 aspect-video overflow-hidden rounded-[3px] transition ${
                    i === index
                      ? "outline-[3px] outline-offset-2 outline-select"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {item.thumb ? (
                    <img
                      src={item.thumb}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center bg-stage-line text-stage-text text-xs font-semibold">
                      {t.videoThumb} {i + 1}
                    </span>
                  )}
                  {item.kind !== "image" && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-stage/80 flex items-center justify-center">
                        <Play
                          aria-hidden="true"
                          className="w-3.5 h-3.5 text-white fill-white ml-0.5"
                        />
                      </span>
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Block = ({ title, children }) => (
  <section>
    <h3 className="semiwide text-lg font-extrabold text-ink mb-3">{title}</h3>
    {children}
  </section>
);

const Bullets = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-ink-2 leading-relaxed">
        <span
          aria-hidden="true"
          className="mt-[0.6em] w-1.5 h-1.5 shrink-0 bg-ink"
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const ProjectModal = () => {
  const {
    activeProject: p,
    closeProject,
    nextProject,
    prevProject,
    lang,
    t,
    projects,
  } = useTheme();
  const headingRef = useRef(null);
  const scrollerRef = useRef(null);
  const returnFocusRef = useRef(null);
  const isOpen = Boolean(p);

  // Lock page scroll and remember where focus was, once per open/close.
  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  // On every project shown: start at the top and move focus to its title.
  useEffect(() => {
    if (!p) return;
    scrollerRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [p]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeProject();
        return;
      }
      if (e.target instanceof Element && e.target.closest(OWNS_ARROW_KEYS))
        return;
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeProject, nextProject, prevProject]);

  const index = p ? projects.findIndex((proj) => proj.id === p.id) : 0;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const facts = p
    ? FACT_FIELDS.filter(({ key }) => p.facts?.[key]?.[lang]).map(
        ({ key, label }) => ({
          label: t[label],
          value: p.facts[key][lang],
        }),
      )
    : [];
  const demo = p?.links?.demo && p.links.demo !== "#" ? p.links.demo : null;
  const repo =
    p?.links?.github && p.links.github !== "#" ? p.links.github : null;

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="project-dialog"
          ref={scrollerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-paper"
        >
          {/* Top bar */}
          <div className="on-dark sticky top-0 z-10 bg-stage/95 backdrop-blur text-stage-text border-b border-stage-line">
            <div className="max-w-6xl mx-auto px-3 sm:px-8 h-14 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeProject}
                className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md font-semibold hover:text-white"
              >
                <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                {t.backBtn}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label={`${t.prevProject}: ${prev.title}`}
                  className="p-2 rounded-md hover:bg-stage-line hover:text-white"
                >
                  <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                </button>
                <span className="text-sm tabular-nums px-1" aria-hidden="true">
                  {index + 1} / {projects.length}
                </span>
                <button
                  type="button"
                  onClick={nextProject}
                  aria-label={`${t.nextProject}: ${next.title}`}
                  className="p-2 rounded-md hover:bg-stage-line hover:text-white"
                >
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={closeProject}
                  aria-label={t.closeModal}
                  className="ml-2 p-2 rounded-md hover:bg-stage-line hover:text-white"
                >
                  <X aria-hidden="true" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <MediaViewer project={p} t={t} />

            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-sm text-ink-3 mb-2">{p.type[lang]}</p>
                <h2
                  id="modal-project-title"
                  ref={headingRef}
                  tabIndex={-1}
                  className="wide font-black text-ink tracking-tight leading-[0.95] text-4xl sm:text-5xl outline-none"
                >
                  {p.title}
                </h2>
                <p className="mt-6 text-xl text-ink leading-relaxed max-w-[60ch]">
                  {p.concept[lang]}
                </p>

                <div className="mt-12 space-y-10 max-w-[68ch]">
                  {p.myWork?.[lang]?.length > 0 && (
                    <Block title={t.myWorkTitle}>
                      <Bullets items={p.myWork[lang]} />
                    </Block>
                  )}

                  {p.howItWasMade?.[lang] && (
                    <Block title={t.howTitle}>
                      <p className="text-ink-2 leading-relaxed">
                        {p.howItWasMade[lang]}
                      </p>
                    </Block>
                  )}

                  {p.techWins?.[lang] && (
                    <Block title={t.techWinsTitle}>
                      <Bullets items={p.techWins[lang]} />
                    </Block>
                  )}

                  {(p.strengths?.[lang] || p.weaknesses?.[lang]) && (
                    <div className="grid gap-8 sm:grid-cols-2">
                      {p.strengths?.[lang] && (
                        <Block title={t.strengthsTitle}>
                          <p className="text-ink-2 leading-relaxed">
                            {p.strengths[lang]}
                          </p>
                        </Block>
                      )}
                      {p.weaknesses?.[lang] && (
                        <Block title={t.weaknessesTitle}>
                          <p className="text-ink-2 leading-relaxed">
                            {p.weaknesses[lang]}
                          </p>
                        </Block>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 rounded-md bg-raised border border-line p-6">
                  <h3 className="semiwide font-extrabold text-ink mb-5">
                    {t.techSheet}
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-ink-3">{t.mainRole}</dt>
                      <dd className="font-semibold text-ink">{p.role[lang]}</dd>
                    </div>
                    {facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="text-sm text-ink-3">{fact.label}</dt>
                        <dd className="font-semibold text-ink">{fact.value}</dd>
                      </div>
                    ))}
                    <div>
                      <dt className="text-sm text-ink-3 mb-2">
                        {t.stackLabel}
                      </dt>
                      <dd>
                        <ul className="flex flex-wrap gap-1.5">
                          {p.tech.map((tech) => (
                            <li
                              key={tech}
                              className="text-[0.8rem] font-medium text-ink-2 bg-paper border border-line px-2 py-0.5 rounded-[3px]"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>

                  {(demo || repo) && (
                    <div className="mt-6 space-y-2.5">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-select text-on-select font-bold hover:bg-select-deep transition-colors"
                        >
                          {t.openGamePage}
                          <ExternalLink
                            aria-hidden="true"
                            className="w-4 h-4"
                          />
                        </a>
                      )}
                      {repo && (
                        <a
                          href={repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-md border-2 border-ink text-ink font-bold hover:bg-ink hover:text-paper transition-colors"
                        >
                          <GithubIcon className="w-4 h-4" />
                          {t.githubRepo}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </aside>
            </div>

            <nav
              aria-label={t.allProjects}
              className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 grid gap-4 sm:grid-cols-2"
            >
              <button
                type="button"
                onClick={prevProject}
                className="group text-left p-5 rounded-md border border-line hover:border-ink transition-colors"
              >
                <span className="flex items-center gap-1.5 text-sm text-ink-3">
                  <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                  {t.prevProject}
                </span>
                <span className="block mt-1 semiwide font-extrabold text-ink decoration-2 underline-offset-4 group-hover:underline">
                  {prev.title}
                </span>
              </button>
              <button
                type="button"
                onClick={nextProject}
                className="group text-right p-5 rounded-md border border-line hover:border-ink transition-colors"
              >
                <span className="flex items-center justify-end gap-1.5 text-sm text-ink-3">
                  {t.nextProject}
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </span>
                <span className="block mt-1 semiwide font-extrabold text-ink decoration-2 underline-offset-4 group-hover:underline">
                  {next.title}
                </span>
              </button>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
