import { animate } from "animejs";
import { ArrowUpRight, Play, Video } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

export const ProjectCard = ({ project }) => {
  const { lang, t, setHoveredProject, openProject } = useTheme();
  const cardRef = useRef(null);
  const arrowRef = useRef(null);

  const handleMouseEnter = () => {
    setHoveredProject(project);
    if (arrowRef.current) {
      animate(arrowRef.current, {
        translateX: [0, 4],
        translateY: [0, -4],
        scale: [1, 1.2, 1],
        ease: "outElastic(1, .6)",
        duration: 400,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
    if (arrowRef.current) {
      animate(arrowRef.current, {
        translateX: 0,
        translateY: 0,
        scale: 1,
        ease: "outQuad",
        duration: 200,
      });
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={() => openProject(project)}
      className="bento-card p-6 sm:p-7 cursor-pointer group flex flex-col justify-between h-full"
    >
      <div>
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-md border font-mono transition-colors"
            style={{
              backgroundColor: project.theme.badgeBg,
              borderColor: project.theme.badgeBorder,
              color: project.theme.primary,
            }}
          >
            {project.type[lang]}
          </span>

          <div className="flex items-center gap-2">
            {project.videos && project.videos.length > 0 && (
              <span className="text-[11px] font-mono text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-cyan-400" /> {t.videoBadge}
              </span>
            )}
            {project.featured && (
              <span
                className="text-[11px] font-mono font-bold px-2 py-0.5 rounded border"
                style={{
                  color: project.theme.primary,
                  borderColor: project.theme.badgeBorder,
                  backgroundColor: project.theme.badgeBg,
                }}
              >
                {t.featuredBadge}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>

        {/* Concept Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-5">
          {project.concept[lang]}
        </p>

        {/* Media Preview (Thumbnails) with Video Play Overlay */}
        {project.images && project.images.length > 0 && (
          <div className="mb-5 overflow-hidden rounded-xl border border-slate-800 relative bg-slate-950 group/img aspect-video">
            <img
              src={project.images[0]}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
            />
            {project.videos && project.videos.length > 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: project.theme.primary }}
                >
                  <Play className="w-5 h-5 text-slate-950 fill-slate-950 ml-0.5" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-0.5 rounded font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {t.roleLabel}:{" "}
          <strong className="text-slate-200">{project.role[lang]}</strong>
        </span>

        <button
          type="button"
          className="flex items-center gap-1 font-semibold transition-all font-mono"
          style={{ color: project.theme.primary }}
        >
          <span>{t.viewProject}</span>
          <span ref={arrowRef} className="inline-block">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </article>
  );
};
