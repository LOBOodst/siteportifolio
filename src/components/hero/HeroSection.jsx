import {
  ArrowRight,
  Code2,
  Cpu,
  FileText,
  Globe,
  MapPin,
  Terminal,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

export const HeroSection = () => {
  const { t, activeTheme, profileConfig } = useTheme();

  return (
    <header
      id="home"
      className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Status & Availability */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeTheme.primary }}
            />
            <span className="text-xs font-medium text-slate-300">
              {t.statusAvailable}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.location}</span>
          </div>
        </motion.div>

        {/* Hero Grid: Title + Headline (Left) & Manifesto Bento (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-12">
          {/* Left Column: Heading, Role & Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-3">
              Hosch Alef
            </h1>

            <p
              className="text-lg sm:text-2xl font-medium tracking-tight mb-6"
              style={{ color: activeTheme.primary }}
            >
              Gameplay Programmer & Systems Architect
            </p>

            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-xl">
              {t.heroSummary}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center mb-10">
              <a
                href="#tour-projects"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-95 flex items-center gap-2 text-slate-950 shadow-xl"
                style={{ backgroundColor: activeTheme.primary }}
              >
                <span>{t.exploreProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={profileConfig.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 border border-slate-700/60 hover:bg-slate-800/80"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>{t.downloadCV}</span>
              </a>
            </div>

            {/* 4 Fast Architecture Metric Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bento-card p-3 text-left">
                <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">
                  {t.statEngine}
                </span>
                <span className="font-display font-bold text-sm text-white">
                  Unreal 5 (C++)
                </span>
              </div>
              <div className="bento-card p-3 text-left">
                <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">
                  {t.statGameplay}
                </span>
                <span className="font-display font-bold text-sm text-white">
                  Unity (C#)
                </span>
              </div>
              <div className="bento-card p-3 text-left">
                <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">
                  {t.statNetcode}
                </span>
                <span className="font-display font-bold text-sm text-white">
                  Zero-Trust Server
                </span>
              </div>
              <div className="bento-card p-3 text-left">
                <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1">
                  {t.statTooling}
                </span>
                <span className="font-display font-bold text-sm text-white">
                  Python & SQL
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Architectural Manifesto Bento Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bento-card p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  {t.philosophyBadge}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: activeTheme.primary }}
                />
              </div>

              <div className="text-slate-300 text-sm leading-relaxed mb-6 font-normal space-y-4">
                {t.aboutText.split("\n\n").map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" /> C++ / C#
                </span>
                <span className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" /> FSM & Raycasts
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" /> Zero-Trust
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
