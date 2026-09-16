export const ThreeBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0c10]"
    >
      {/* Subtle architectural ambient gradient at the top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] opacity-35 blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 70%)",
        }}
      />

      {/* Hairline Technical Architectural Grid (Static, 1px at 2% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Subtle edge vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center,_transparent_40%,_#0a0c10_90%] pointer-events-none" />
    </div>
  );
};
