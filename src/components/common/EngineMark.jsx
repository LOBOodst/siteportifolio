// Engine families use the editor transform-gizmo colours as a code:
// X red = Unreal / C++, Y green = Unity / C#, Z blue = tools & web.
// The colour is always paired with the engine name, never used alone.
export const ENGINE_FAMILIES = {
  unreal: { label: "Unreal Engine", swatch: "bg-axis-x" },
  unity: { label: "Unity", swatch: "bg-axis-y" },
  tools: { label: "Python / Node.js", swatch: "bg-axis-z" },
};

export const getEngineFamily = (project) => {
  const tech = project.tech.join(" ");
  if (/Unreal|C\+\+/.test(tech)) return "unreal";
  if (/Unity|C#/.test(tech)) return "unity";
  return "tools";
};

export const EngineSwatch = ({ family, className = "" }) => (
  <span
    aria-hidden="true"
    className={`inline-block w-2.5 h-2.5 shrink-0 ${ENGINE_FAMILIES[family].swatch} ${className}`}
  />
);

export const EngineMark = ({ project, family: familyProp, className = "" }) => {
  const family = familyProp || getEngineFamily(project);
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <EngineSwatch family={family} />
      {ENGINE_FAMILIES[family].label}
    </span>
  );
};
