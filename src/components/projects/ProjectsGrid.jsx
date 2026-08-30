import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { ProjectCard } from "./ProjectCard";

export const ProjectsGrid = () => {
  const { t, activeTheme, projects } = useTheme();
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "featured") return p.featured;
    if (filter === "cpp")
      return p.tech.some((t) => t.includes("C++") || t.includes("Unreal"));
    if (filter === "csharp")
      return p.tech.some((t) => t.includes("C#") || t.includes("Unity"));
    return true;
  });

  return (
    <section id="tour-projects" className="mb-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: activeTheme.primary }}
            >
              {t.projectTitle}
            </h2>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Case Studies & Systems
            </h3>
          </div>

          {/* Filter Pills with Motion.dev Layout Animation */}
          <div className="flex flex-wrap gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-lg relative">
            {[
              { id: "all", label: t.filterAll },
              { id: "featured", label: t.filterFeatured },
              { id: "cpp", label: t.filterCpp },
              { id: "csharp", label: t.filterCsharp },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors z-10 ${
                  filter === tab.id
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="activeFilterPill"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-slate-800 rounded-md shadow-sm -z-10"
                  />
                )}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Motion Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={project.featured ? "lg:col-span-2" : ""}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
