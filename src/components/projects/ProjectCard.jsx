import { Play } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { FACT_FIELDS } from "../../data/projects";
import { getAssetUrl } from "../../utils/media";
import { EngineMark } from "../common/EngineMark";

const TechList = ({ tech, max }) => {
  const shown = max ? tech.slice(0, max) : tech;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((tag) => (
        <li
          key={tag}
          className="text-[0.8rem] font-medium text-ink-2 bg-raised border border-line px-2 py-0.5 rounded-[3px]"
        >
          {tag}
        </li>
      ))}
      {max && tech.length > max && (
        <li className="text-[0.8rem] font-medium text-ink-3 px-1 py-0.5">
          +{tech.length - max}
        </li>
      )}
    </ul>
  );
};

export const ProjectCard = ({ project, variant = "compact" }) => {
  const { lang, t, openProject } = useTheme();
  const facts = FACT_FIELDS.map(
    ({ key }) => project.facts?.[key]?.[lang],
  ).filter(Boolean);
  const hasVideo = project.videos?.length > 0;
  const cover = project.images?.[0];
  const isFeature = variant === "feature";

  const handleClick = (e) => {
    // Let ctrl/cmd-click open the deep link in a new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    openProject(project);
  };

  return (
    <a
      href={`#${project.id}`}
      onClick={handleClick}
      className={`group block h-full ${
        isFeature ? "md:grid md:grid-cols-12 md:gap-10 md:items-center" : ""
      }`}
    >
      {cover && (
        <span
          className={`relative block aspect-video overflow-hidden rounded-[3px] bg-stage outline-[3px] outline-offset-2 outline-transparent group-hover:outline-select transition-[outline-color] ${
            isFeature ? "md:col-span-7" : ""
          }`}
        >
          <img
            src={getAssetUrl(cover)}
            alt=""
            width="1280"
            height="720"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {hasVideo && (
            <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-[3px] bg-stage/85 text-stage-text text-sm font-semibold px-2.5 py-1">
              <Play aria-hidden="true" className="w-3.5 h-3.5 fill-current" />
              {t.videoBadge}
            </span>
          )}
        </span>
      )}

      <span
        className={`block ${isFeature ? "mt-5 md:mt-0 md:col-span-5" : "mt-4"}`}
      >
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-3 mb-2">
          <EngineMark project={project} className="font-semibold text-ink-2" />
          <span>{project.type[lang]}</span>
        </span>
        <span
          className={`block semiwide font-extrabold text-ink tracking-tight decoration-[3px] underline-offset-4 group-hover:underline ${
            isFeature
              ? "text-2xl sm:text-[2rem] leading-tight"
              : "text-xl leading-snug"
          }`}
        >
          {project.title}
        </span>

        {facts.length > 0 && (
          <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-2">
            {facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </span>
        )}

        <span
          className={`block mt-3 text-ink-2 leading-relaxed ${
            isFeature ? "text-[1.05rem]" : "text-[0.95rem] line-clamp-3"
          }`}
        >
          {project.concept[lang]}
        </span>

        <span className="block mt-4">
          <TechList tech={project.tech} max={isFeature ? undefined : 4} />
        </span>

        {isFeature && (
          <span className="mt-6 inline-block px-4 py-2.5 rounded-md border-2 border-ink font-bold text-ink group-hover:bg-select group-hover:border-select group-hover:text-on-select transition-colors">
            {t.viewProject}
          </span>
        )}
      </span>
    </a>
  );
};
