import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { GithubIcon, LinkedinIcon } from "../common/Icons";

export const ContactSection = () => {
  const { t, activeTheme, profileConfig } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(profileConfig.discordTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      className="pt-12 pb-20 border-t border-white/5 bg-[#05070d]"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <h2
          className="text-xs font-bold uppercase tracking-wider mb-3 font-mono"
          style={{ color: activeTheme.primary }}
        >
          {t.contactBtn}
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          {t.contactHero}
        </h3>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          {t.contactSub}
        </p>

        {/* Contact Buttons Grid */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {/* Email */}
          <a
            href={profileConfig.email}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl font-semibold text-xs transition-all hover:opacity-90 text-slate-950 flex items-center gap-2 shadow-xl"
            style={{ backgroundColor: activeTheme.primary }}
          >
            <Mail className="w-4 h-4" />
            <span>{profileConfig.email.replace("mailto:", "")}</span>
          </a>

          {/* Discord Button with Copy feedback */}
          <button
            type="button"
            onClick={handleCopyDiscord}
            className="bento-card px-6 py-3.5 rounded-xl font-semibold text-xs text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/60 transition-all flex items-center gap-2"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>
              {copied ? t.copySuccess : `Discord: ${profileConfig.discordTag}`}
            </span>
          </button>

          {/* GitHub Button */}
          <a
            href={profileConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card px-6 py-3.5 rounded-xl font-semibold text-xs text-slate-300 border border-slate-700/60 hover:text-white transition-all flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href={profileConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card px-6 py-3.5 rounded-xl font-semibold text-xs text-blue-300 border border-blue-500/30 hover:border-blue-400/60 transition-all flex items-center gap-2"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Minimal Footer Signature */}
        <div className="text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-900">
          <span>
            © {new Date().getFullYear()} Hosch Alef. All rights reserved.
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            Gameplay Programmer & Systems Architect
          </span>
        </div>
      </div>
    </footer>
  );
};
