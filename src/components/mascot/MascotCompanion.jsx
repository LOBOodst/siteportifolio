import { Bot, Check, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export const MascotCompanion = () => {
  const {
    t,
    activeTheme,
    isTourActive,
    tourStep,
    nextTourStep,
    endTour,
    startTour,
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const stepTargets = [
    "#home",
    "#tour-stack",
    "#tour-profile",
    "#tour-projects",
    "#contact",
  ];

  const handleStepNext = () => {
    const nextIdx = tourStep + 1;
    if (nextIdx < stepTargets.length) {
      const targetEl = document.querySelector(stepTargets[nextIdx]);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
    nextTourStep();
  };

  const getStepText = () => {
    switch (tourStep) {
      case 0:
        return t.tour.step0;
      case 1:
        return t.tour.step1;
      case 2:
        return t.tour.step2;
      case 3:
        return t.tour.step3;
      case 4:
        return t.tour.step4;
      default:
        return t.tour.step0;
    }
  };

  const showBubble = isTourActive || isOpen;

  return (
    <aside
      aria-label="Interactive Companion"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none"
    >
      {/* Speech Bubble */}
      {showBubble && (
        <div
          className="glass p-5 max-w-sm mb-3 border tactical-brackets pointer-events-auto shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3"
          style={{ borderColor: activeTheme.primary }}
        >
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/10">
            <span className="mono text-[9px] font-black uppercase tracking-widest text-zinc-400">
              {"HOSCH // COMPANION UNIT ["}
              {tourStep + 1}
              {" / 5]"}
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                endTour();
              }}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed mb-4">
            {getStepText()}
          </p>

          <div className="flex justify-end gap-2">
            {isTourActive && (
              <button
                onClick={handleStepNext}
                className="px-3.5 py-1.5 mono font-black uppercase text-[10px] flex items-center gap-1 text-black transition-all shadow-md"
                style={{ backgroundColor: activeTheme.primary }}
              >
                <span>{tourStep >= 4 ? t.tour.finish : t.tour.next}</span>
                {tourStep >= 4 ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Mascot Avatar Button */}
      <button
        onClick={() => {
          if (!isTourActive && !isOpen) {
            startTour();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="w-12 h-12 rounded-none border pointer-events-auto flex items-center justify-center transition-all hover:scale-110 shadow-2xl group"
        style={{
          borderColor: activeTheme.primary,
          backgroundColor: "#030712",
          boxShadow: `0 0 25px ${activeTheme.glow}`,
        }}
        title="Hosch Companion Unit"
      >
        <Bot
          className="w-6 h-6 transition-transform group-hover:rotate-12"
          style={{ color: activeTheme.primary }}
        />
      </button>
    </aside>
  );
};
