import { useTheme } from "../../context/ThemeContext";
import { getAssetUrl } from "../../utils/media";

export const AboutSection = () => {
  const { t, profileConfig } = useTheme();
  // The quote is pulled out of the text, so it isn't read twice.
  const paragraphs = t.aboutText
    .replace(t.aboutQuote, "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      id="tour-profile"
      aria-labelledby="about-heading"
      className="py-16 sm:py-24 border-t border-line"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2
            id="about-heading"
            className="wide font-black text-ink tracking-tight text-4xl sm:text-5xl mb-8"
          >
            {t.aboutHeading}
          </h2>
          <img
            src={getAssetUrl(profileConfig.profileImg)}
            alt="Hosch Alef"
            width="730"
            height="730"
            loading="lazy"
            className="w-48 sm:w-64 lg:w-full max-w-xs aspect-square object-cover rounded-[3px]"
          />
        </div>

        <div className="lg:col-span-8 lg:pt-3">
          <blockquote className="semiwide font-extrabold text-ink text-2xl sm:text-[2.1rem] leading-[1.18] tracking-tight max-w-[26ch] mb-10">
            “{t.aboutQuote}”
          </blockquote>
          <div className="space-y-5 text-ink-2 text-lg leading-[1.7] max-w-[64ch]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* The games that made me want to make games: names and my own words, no art */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-20 sm:mt-28">
        <h3 className="semiwide text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-8">
          {t.gamesHeading}
        </h3>
        <ul className="border-b border-line">
          {t.games.map((game) => (
            <li
              key={game.title}
              className="grid gap-3 lg:gap-10 lg:grid-cols-12 py-8 border-t border-line"
            >
              <p className="lg:col-span-6 wide font-black text-ink tracking-tight leading-[0.95] text-3xl sm:text-[2.75rem]">
                {game.title}
              </p>
              <p className="lg:col-span-6 lg:pt-1.5 text-ink-2 text-lg leading-relaxed max-w-[52ch]">
                {game.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
