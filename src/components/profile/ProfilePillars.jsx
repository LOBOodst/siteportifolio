import { Cpu, Eye, Network, Zap } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const ProfilePillars = () => {
  const { t, activeTheme } = useTheme();

  const pillarIcons = [
    <Zap key="zap" className="w-5 h-5 text-amber-400" />,
    <Network key="net" className="w-5 h-5 text-sky-400" />,
    <Eye key="eye" className="w-5 h-5 text-purple-400" />,
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

        {/* 3 Core Engineering Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="engine-surface p-7 flex flex-col justify-between border border-slate-800 bg-[#0e121a]"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#141926] border border-slate-800 flex items-center justify-center mb-5">
                  {pillarIcons[idx] || (
                    <Cpu className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-3 leading-snug">
                  {pillar.title}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {pillar.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  STANDARDS 0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
