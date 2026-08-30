import { Cpu, Eye, FileText, Network } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const ProfilePillars = () => {
  const { t, activeTheme, profileConfig } = useTheme();

  const pillarIcons = [
    <Cpu key="cpu" className="w-5 h-5 text-cyan-400" />,
    <Network key="net" className="w-5 h-5 text-blue-400" />,
    <Eye key="eye" className="w-5 h-5 text-rose-400" />,
  ];

  return (
    <section id="tour-profile" className="mb-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2 font-mono"
            style={{ color: activeTheme.primary }}
          >
            {t.principlesTitle}
          </h2>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {t.principlesSubtitle}
          </h3>
        </div>

        {/* 3 Core Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {t.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bento-card p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5">
                  {pillarIcons[idx] || (
                    <Cpu className="w-5 h-5 text-cyan-400" />
                  )}
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-2.5">
                  {pillar.title}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Profile Box */}
        <div className="bento-card p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 border border-slate-800">
          <div className="shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-slate-900 relative group">
              <img
                src={profileConfig.profileImg}
                alt="Hosch Alef"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <span
              className="text-xs font-semibold uppercase tracking-wider block mb-1 font-mono"
              style={{ color: activeTheme.primary }}
            >
              Hosch Alef • {t.location}
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Gameplay Programmer & Systems Architect
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {t.bio}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href={profileConfig.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                style={{ backgroundColor: activeTheme.primary }}
              >
                <FileText className="w-4 h-4" />
                <span>{t.downloadCV}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
