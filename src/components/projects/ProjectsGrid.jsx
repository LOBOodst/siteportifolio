import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { EngineSwatch } from "../common/EngineMark";
import { ProjectCard } from "./ProjectCard";

const usesCpp = (p) =>
  p.tech.some((t) => t.includes("C++") || t.includes("Unreal"));
const usesCsharp = (p) =>
  p.tech.some((t) => t.includes("C#") || t.includes("Unity"));

export const ProjectsGrid = () => {
  const { t, projects } = useTheme();
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: t.filterAll, match: () => true },
    { id: "cpp", label: t.filterCpp, match: usesCpp, family: "unreal" },
    { id: "csharp", label: t.filterCsharp, match: usesCsharp, family: "unity" },
  ];
  const active = filters.find((f) => f.id === filter) || filters[0];
  const visible = projects.filter(active.match);

  // With no filter, featured projects get the large layout up top.
  const featured = filter === "all" ? visible.filter((p) => p.featured) : [];
  const rest = visible.filter((p) => !featured.includes(p));

  return (
    <section
      id="tour-projects"
      aria-labelledby="projects-heading"
      className="py-16 sm:py-24 border-t border-line"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2
              id="projects-heading"
              className="wide font-black text-ink tracking-tight text-4xl sm:text-5xl"
            >
              {t.projectsHeading}
            </h2>
            <p className="mt-4 text-ink-2 text-lg leading-relaxed">
              {t.projectsIntro}
            </p>
          </div>

          <fieldset className="flex gap-1 shrink-0">
            <legend className="sr-only">{t.stackLabel}</legend>
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  filter === f.id
                    ? "bg-ink text-paper"
                    : "text-ink-2 hover:text-ink hover:bg-raised"
                }`}
              >
                {f.family && <EngineSwatch family={f.family} />}
                {f.label}
              </button>
            ))}
          </fieldset>
        </div>

        {featured.length > 0 && (
          <ul className="space-y-16 sm:space-y-20 mb-16 sm:mb-20">
            {featured.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} variant="feature" />
              </li>
            ))}
          </ul>
        )}

        <motion.ul
          layout
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {rest.map((project) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
};
