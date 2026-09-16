import { ArrowRight, FileText, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";
import { GithubIcon, LinkedinIcon } from "../common/Icons";

const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

export const HeroSection = () => {
  const { t, activeTheme, profileConfig } = useTheme();

  return (
    <header
      id="home"
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Hero Header: Profile Presence & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Left: Authoritative Headline, Mission & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            {/* Availability & Location Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#131722] border border-slate-800 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {t.statusAvailable}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#131722] border border-slate-800 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {t.location}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4">
              Hosch Alef
            </h1>

            <p className="font-display text-xl sm:text-2xl font-medium tracking-tight text-amber-400 mb-6">
              Gameplay Programmer & Systems Architect
            </p>

            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-2xl">
              {t.heroSummary}
            </p>

            {/* CTAs and Fast Links */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#tour-projects"
                className="px-6 py-3 rounded-lg font-semibold text-xs tracking-wide uppercase transition-all hover:opacity-95 flex items-center gap-2 text-slate-950 font-mono shadow-sm"
                style={{ backgroundColor: activeTheme.primary }}
              >
                <span>{t.exploreProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={getAssetUrl(profileConfig.cvPath)}
                target="_blank"
                rel="noopener noreferrer"
                className="engine-surface text-slate-200 px-5 py-3 rounded-lg font-semibold text-xs tracking-wide uppercase transition-all flex items-center gap-2 border border-slate-800 hover:border-slate-700 hover:text-white font-mono"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{t.downloadCV}</span>
              </a>

              <div className="flex items-center gap-2 ml-1">
                <a
                  href={profileConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-3 rounded-lg border border-slate-800 bg-[#0e121a] hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profileConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 rounded-lg border border-slate-800 bg-[#0e121a] hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Authentic Profile Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-xl overflow-hidden border border-slate-800 bg-[#0e121a] shadow-xl">
                <img
                  src={getAssetUrl(profileConfig.profileImg)}
                  alt="Hosch Alef"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Architecture Competencies Strip */}
        <div className="engine-surface p-6 mb-14 border border-slate-800/80 bg-[#0e121a]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            <div className="sm:pr-4 pt-3 sm:pt-0">
              <span className="text-[10px] font-mono text-amber-400 block uppercase tracking-wider mb-1.5 font-semibold">
                ENGINE CORE
              </span>
              <span className="font-display font-bold text-sm text-white block">
                Unreal Engine 5 (C++)
              </span>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                Unity Engine (C#)
              </span>
            </div>

            <div className="sm:px-4 pt-4 sm:pt-0">
              <span className="text-[10px] font-mono text-sky-400 block uppercase tracking-wider mb-1.5 font-semibold">
                NETCODE & REPLICATION
              </span>
              <span className="font-display font-bold text-sm text-white block">
                Zero-Trust Server Authority
              </span>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                Deterministic Client Prediction
              </span>
            </div>

            <div className="sm:px-4 pt-4 sm:pt-0">
              <span className="text-[10px] font-mono text-purple-400 block uppercase tracking-wider mb-1.5 font-semibold">
                SPATIAL SIMULATION
              </span>
              <span className="font-display font-bold text-sm text-white block">
                Hierarchical FSM & Raycasts
              </span>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                Dijkstra / BFS 3D Grid Pathfinding
              </span>
            </div>

            <div className="sm:pl-4 pt-4 sm:pt-0">
              <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-wider mb-1.5 font-semibold">
                DATA & PIPELINE
              </span>
              <span className="font-display font-bold text-sm text-white block">
                Python CLI Verification
              </span>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                REST Microservices & SQL Schemas
              </span>
            </div>
          </div>
        </div>

        {/* Narrative & Engineering Philosophy Section (Editorial Style) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-l-2 border-amber-500/60 pl-6 sm:pl-8 py-2 max-w-4xl"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.philosophyBadge}</span>
          </div>

          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            {t.aboutText.split("\n\n").map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
};
