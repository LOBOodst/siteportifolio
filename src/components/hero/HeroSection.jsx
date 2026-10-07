import { FileText, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";
import { getAssetUrl } from "../../utils/media";
import { EngineMark } from "../common/EngineMark";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import { SelectedName } from "./SelectedName";

const ease = [0.22, 1, 0.36, 1];

export const HeroSection = () => {
  const { t, lang, profileConfig, projects, openProject } = useTheme();
  const reel = projects.filter((p) => p.images?.length > 0);

  return (
    <header id="home" className="pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem] text-ink-2 mb-4"
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="w-2.5 h-2.5 bg-select" />
            {t.statusAvailable}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="w-4 h-4 text-ink-3" />
            {t.location}
          </span>
        </motion.p>

        <SelectedName>Hosch Alef</SelectedName>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease }}
          className="mt-12 sm:mt-14 max-w-3xl"
        >
          <p className="semiwide text-xl sm:text-[1.65rem] font-bold leading-snug text-ink mb-4">
            Game Programmer
          </p>
          <p className="text-ink-2 text-lg leading-relaxed max-w-[60ch]">
            {t.heroSummary}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#tour-projects"
              className="inline-flex items-center px-5 py-3 rounded-md bg-select text-on-select font-bold hover:bg-select-deep transition-colors"
            >
              {t.exploreProjects}
            </a>
            <a
              href={getAssetUrl(profileConfig.cvPath)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border-2 border-ink text-ink font-bold hover:bg-ink hover:text-paper transition-colors"
            >
              <FileText aria-hidden="true" className="w-4 h-4" />
              {t.downloadCV}
            </a>
            <span className="flex items-center">
              <a
                href={profileConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-md text-ink hover:bg-raised transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={profileConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-md text-ink hover:bg-raised transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Screenshot reel: one real frame per game, each opens its project */}
      <section aria-label={t.reelLabel} className="mt-12 sm:mt-14">
        <ul className="bleed-pad reel flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pt-1 pb-4">
          {reel.map((project, i) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.06, ease }}
              className="snap-start shrink-0 w-[78vw] sm:w-[22rem]"
            >
              <a
                href={`#${project.id}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  openProject(project);
                }}
                className="group block"
              >
                <span className="block aspect-video overflow-hidden rounded-[3px] bg-stage outline-[3px] outline-offset-2 outline-transparent group-hover:outline-select transition-[outline-color]">
                  <img
                    src={getAssetUrl(project.images[0])}
                    alt=""
                    width="640"
                    height="360"
                    loading={i < 3 ? "eager" : "lazy"}
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="mt-3 block font-bold text-ink leading-snug decoration-2 underline-offset-4 group-hover:underline">
                  {project.title}
                </span>
                <EngineMark
                  project={project}
                  className="mt-1 text-sm text-ink-3"
                />
                <span className="sr-only">{project.type[lang]}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </section>
    </header>
  );
};
