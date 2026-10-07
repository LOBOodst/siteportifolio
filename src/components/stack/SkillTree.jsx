import { useTheme } from "../../context/ThemeContext";
import { engineeringDomains } from "../../data/skills";
import { EngineSwatch } from "../common/EngineMark";

export const SkillTree = () => {
  const { t, lang } = useTheme();

  return (
    <section
      id="tour-stack"
      aria-labelledby="stack-heading"
      className="py-16 sm:py-24 border-t border-line"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <h2
            id="stack-heading"
            className="wide font-black text-ink tracking-tight text-4xl sm:text-5xl"
          >
            {t.stackHeading}
          </h2>
          <p className="mt-4 text-ink-2 text-lg leading-relaxed">
            {t.stackIntro}
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {engineeringDomains.map((domain) => (
            <article
              key={domain.id}
              className="py-10 grid gap-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink-2 mb-3">
                  <EngineSwatch family={domain.family} />
                  {domain.tech}
                </p>
                <h3 className="semiwide text-2xl font-extrabold text-ink leading-tight tracking-tight">
                  {domain.title[lang]}
                </h3>
                <p className="mt-4 text-sm text-ink-3">
                  {t.appliedIn}{" "}
                  <span className="text-ink-2">{domain.appliedIn}</span>
                </p>
              </div>

              <dl className="lg:col-span-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {domain.concepts.map((concept) => (
                  <div key={concept.label.en}>
                    <dt className="font-bold text-ink">
                      {concept.label[lang]}
                    </dt>
                    <dd className="mt-1 text-ink-2 text-[0.95rem] leading-relaxed">
                      {concept.desc[lang]}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
