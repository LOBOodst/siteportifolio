import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export const TelemetryHUD = () => {
  const { mousePos, activeTheme } = useTheme();
  const [timeString, setTimeString] = useState("");
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      const ms = String(now.getMilliseconds()).padStart(3, "0");
      setTimeString(`${hours}:${mins}:${secs}.${ms}`);
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none px-4 sm:px-8 py-2.5 flex justify-between items-center text-[9px] mono uppercase tracking-widest text-zinc-500 border-b border-white/5 bg-[#030712]/40 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="flex h-2 w-2 relative">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: activeTheme.primary }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: activeTheme.primary }}
          />
        </span>
        <span className="text-zinc-300 font-bold hidden sm:inline">
          SYSTEM.TELEMETRY // RUNTIME.ONLINE
        </span>
        <span className="text-zinc-600 hidden md:inline">|</span>
        <span className="text-zinc-400 hidden md:inline">
          SYS.TIME:{" "}
          <span className="text-white font-mono">
            {timeString || "00:00:00.000"}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-zinc-500">THEME AURA:</span>
          <span
            className="font-bold px-2 py-0.5 border"
            style={{
              color: activeTheme.primary,
              borderColor: activeTheme.badgeBorder,
              backgroundColor: activeTheme.badgeBg,
            }}
          >
            {activeTheme.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 hidden sm:inline">MATRIX:</span>
          <span className="text-zinc-300">
            X:{mousePos.normX.toFixed(3)} Y:{mousePos.normY.toFixed(3)}
          </span>
        </div>

        <span className="text-zinc-600 hidden sm:inline">|</span>
        <span className="text-zinc-400">UPTIME: {uptime}s</span>
      </div>
    </div>
  );
};
