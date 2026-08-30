import { useTheme } from "../../context/ThemeContext";

export const Navbar = () => {
  const { lang, setLang, t, activeTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 py-4 bg-[#080c14]/85 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand / Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-slate-900 transition-transform group-hover:scale-105"
            style={{ backgroundColor: activeTheme.primary }}
          >
            H
          </div>
          <div>
            <span className="font-display font-bold tracking-tight text-sm text-white group-hover:text-cyan-400 transition-colors block leading-tight">
              Hosch Alef
            </span>
            <span className="font-mono text-[10px] text-slate-400 block">
              Gameplay Programmer & Systems Architect
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <a href="#tour-stack" className="hover:text-white transition-colors">
            {t.techTitle}
          </a>
          <a
            href="#tour-projects"
            className="hover:text-white transition-colors"
          >
            {t.projectTitle}
          </a>
          <a
            href="#tour-profile"
            className="hover:text-white transition-colors"
          >
            {t.aboutTitle}
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            {t.contactBtn}
          </a>
        </div>

        {/* Controls: Language Switcher + Contact CTA */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            {["pt", "en", "fr"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md uppercase transition-all ${
                  lang === l
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 text-slate-950 shadow-md"
            style={{ backgroundColor: activeTheme.primary }}
          >
            {t.contactBtn}
          </a>
        </div>
      </div>
    </nav>
  );
};
