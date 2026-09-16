import { ArrowUpRight, Play, Video } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

export const ProjectCard = ({ project }) => {
  const { lang, t, setHoveredProject, openProject } = useTheme();

  const handleMouseEnter = () => {
    setHoveredProject(project);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject(project);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`${t.viewProject}: ${project.title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={() => openProject(project)}
      onKeyDown={handleKeyDown}
      className="engine-surface p-6 sm:p-7 cursor-pointer group flex flex-col justify-between h-full focus:outline-none focus:ring-2 focus:ring-amber-500/60 transition-all border border-slate-800 bg-[#0e121a]"
    >
      <div>
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md border font-mono bg-[#141926] border-slate-800 text-amber-400">
            {project.type[lang]}
          </span>

          <div className="flex items-center gap-2">
            {project.videos && project.videos.length > 0 && (
              <span className="text-[11px] font-mono text-slate-300 bg-[#141926] border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-amber-400" /> {t.videoBadge}
              </span>
            )}
            {project.featured && (
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded border border-amber-500/30 text-amber-400 bg-amber-500/10">
                {t.featuredBadge}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
          {project.title}
        </h3>

        {/* Concept Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-5 font-normal">
          {project.concept[lang]}
        </p>

        {/* Media Preview (Thumbnails) with Video Play Overlay */}
        {project.images && project.images.length > 0 && (
          <div className="mb-5 overflow-hidden rounded-lg border border-slate-800 relative bg-slate-950 group/img aspect-video">
            <img
              src={getAssetUrl(project.images[0])}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
            />
            {project.videos && project.videos.length > 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110 bg-amber-500 text-slate-950">
                  <Play className="w-5 h-5 text-slate-950 fill-slate-950 ml-0.5" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Specs */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono bg-[#141926] border border-slate-800 text-slate-300 px-2 py-0.5 rounded"
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

        <span className="flex items-center gap-1 font-semibold font-mono text-amber-400 group-hover:text-amber-300 transition-colors">
          <span>{t.viewProject}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  );
};
