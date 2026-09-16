import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export const Navbar = () => {
  const { lang, setLang, t, activeTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#tour-stack", label: t.techTitle },
    { href: "#tour-projects", label: t.projectTitle },
    { href: "#tour-profile", label: t.aboutTitle },
    { href: "#contact", label: t.contactBtn },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-5 sm:px-10 py-3.5 bg-[#0a0c10]/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand / Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-slate-950 transition-transform group-hover:scale-105 font-mono"
            style={{ backgroundColor: activeTheme.primary }}
          >
            H
          </div>
          <div>
            <span className="font-display font-bold tracking-tight text-sm text-white group-hover:text-amber-300 transition-colors block leading-tight">
              Hosch Alef
            </span>
            <span className="font-mono text-[10px] text-slate-400 block">
              Gameplay Programmer & Systems Architect
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls: Language Switcher + Contact CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language selector"
            className="flex items-center bg-[#0e121a] border border-slate-800 rounded-lg p-0.5"
          >
            {["pt", "en", "fr"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                aria-label={`Mudar idioma para ${l.toUpperCase()}`}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md uppercase transition-all font-mono ${
                  lang === l
                    ? "bg-[#1c2436] text-amber-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all hover:opacity-95 text-slate-950 shadow-sm"
            style={{ backgroundColor: activeTheme.primary }}
          >
            {t.contactBtn}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg bg-[#0e121a] border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Alternar menu de navegação"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 pb-2 border-t border-slate-800 flex flex-col gap-2.5 text-xs font-medium text-slate-300 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-md hover:bg-[#0e121a] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-2 text-center py-2 px-3 rounded-lg text-xs font-semibold text-slate-950 shadow-sm font-mono"
            style={{ backgroundColor: activeTheme.primary }}
          >
            {t.contactBtn}
          </button>
        </div>
      )}
    </nav>
  );
};
