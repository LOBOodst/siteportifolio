import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const LANGS = ["pt", "en", "fr"];

export const Navbar = () => {
  const { lang, setLang, t } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#tour-projects", label: t.navProjects },
    { href: "#tour-stack", label: t.navStack },
    { href: "#tour-profile", label: t.navAbout },
    { href: "#contact", label: t.contactBtn },
  ];

  const languageSwitch = (
    <fieldset className="flex items-center gap-0.5 text-sm">
      <legend className="sr-only">{t.languageLabel}</legend>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`min-w-9 px-2 py-1.5 rounded-md font-semibold uppercase transition-colors ${
            lang === l
              ? "bg-ink text-paper"
              : "text-ink-2 hover:text-ink hover:bg-raised"
          }`}
        >
          {l}
        </button>
      ))}
    </fieldset>
  );

  return (
    <nav
      aria-label="Main"
      className="fixed top-0 inset-x-0 z-40 bg-paper/90 backdrop-blur-md border-b border-line"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <a
          href="#home"
          className="wide font-extrabold text-lg tracking-tight text-ink"
        >
          Hosch Alef
        </a>

        <ul className="hidden md:flex items-center gap-7 text-[0.95rem] font-medium text-ink-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-ink underline-offset-8 decoration-[3px] decoration-select hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{languageSwitch}</div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden p-2 -mr-2 rounded-md text-ink hover:bg-raised"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-line bg-paper px-5 pb-5"
        >
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-lg font-semibold text-ink border-b border-line"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-2 sm:hidden">{languageSwitch}</div>
        </div>
      )}
    </nav>
  );
};
