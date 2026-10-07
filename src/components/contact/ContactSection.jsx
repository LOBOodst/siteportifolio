import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { GithubIcon, LinkedinIcon } from "../common/Icons";

export const ContactSection = ({ onToggleDebugDraw }) => {
  const { t, profileConfig } = useTheme();
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);
  const email = profileConfig.email.replace("mailto:", "");

  const handleCopyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(profileConfig.discordTag);
      setCopied(true);
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable: the username stays visible on the button.
    }
  };

  useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

  const secondary =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-stage-line text-stage-text font-semibold hover:border-stage-text hover:text-white transition-colors";

  return (
    <footer
      id="contact"
      className="on-dark bg-stage text-stage-text border-t border-line"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-10">
        <h2 className="wide font-black text-white tracking-tight leading-[0.95] text-[clamp(2.5rem,7vw,5rem)] max-w-4xl">
          {t.contactHero}
        </h2>
        <p className="mt-5 text-lg text-stage-muted">{t.contactSub}</p>

        <a
          href={profileConfig.email}
          className="mt-10 inline-block semiwide font-bold text-white text-xl sm:text-3xl break-all underline decoration-select decoration-[3px] underline-offset-[6px] hover:text-select transition-colors"
        >
          {email}
        </a>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopyDiscord}
            aria-label={`${t.copyDiscord}: ${profileConfig.discordTag}`}
            className={secondary}
          >
            {copied ? (
              <Check aria-hidden="true" className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy aria-hidden="true" className="w-4 h-4" />
            )}
            <span aria-live="polite">
              {copied ? t.copySuccess : `Discord: ${profileConfig.discordTag}`}
            </span>
          </button>
          <a
            href={profileConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className={secondary}
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={profileConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={secondary}
          >
            <LinkedinIcon className="w-4 h-4" />
            LinkedIn
          </a>
        </div>

        <div className="mt-20 pt-6 border-t border-stage-line flex flex-col sm:flex-row justify-between gap-2 text-sm text-stage-muted">
          <span>
            © {new Date().getFullYear()} Hosch Alef. {t.footerRights}
          </span>
          <button
            type="button"
            onClick={onToggleDebugDraw}
            className="self-start sm:self-auto text-left hover:text-stage-text transition-colors"
          >
            {t.cheatHint}
          </button>
        </div>
      </div>
    </footer>
  );
};
