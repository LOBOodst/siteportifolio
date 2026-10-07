import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

// Editor transform gizmo drawn at the actor's pivot (bottom-left corner).
// Screen mapping: X (red) to the right, Z (blue) up, Y (green) toward the viewer.
const Gizmo = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 80 80"
    className="absolute -left-[14px] -bottom-[14px] w-20 h-20 overflow-visible origin-[16.25%_83.75%] scale-[0.6] sm:scale-100"
  >
    {/* Z axis (up) */}
    <line
      x1="13"
      y1="67"
      x2="13"
      y2="16"
      className="stroke-axis-z"
      strokeWidth="3"
    />
    <polygon points="13,6 7,18 19,18" className="fill-axis-z" />
    {/* X axis (right) */}
    <line
      x1="13"
      y1="67"
      x2="64"
      y2="67"
      className="stroke-axis-x"
      strokeWidth="3"
    />
    <polygon points="74,67 62,61 62,73" className="fill-axis-x" />
    {/* Y axis (toward viewer, foreshortened) */}
    <line
      x1="13"
      y1="67"
      x2="-6"
      y2="86"
      className="stroke-axis-y"
      strokeWidth="3"
    />
    <polygon points="-12,92 -9,79 2,88" className="fill-axis-y" />
    {/* Pivot */}
    <rect x="8" y="62" width="10" height="10" className="fill-ink" />
  </svg>
);

const Handle = ({ className }) => (
  <span
    aria-hidden="true"
    className={`absolute w-2 h-2 bg-select ${className}`}
  />
);

/**
 * The name, presented as the selected actor in a level editor.
 * It can be dragged sideways and springs back to its pivot.
 */
export const SelectedName = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease }}
    className="relative inline-block mt-9 ml-3 sm:ml-4"
  >
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 420, bounceDamping: 11 }}
      whileDrag={{ scale: 1.01 }}
      className="relative cursor-grab active:cursor-grabbing select-none touch-pan-y"
    >
      <h1 className="wide font-black text-ink tracking-[-0.035em] leading-[0.88] text-[clamp(2.9rem,11vw,8.75rem)]">
        {children}
      </h1>

      {/* Selection frame: appears just after the name lands */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.75 }}
        className="pointer-events-none absolute -inset-x-3 -top-2 -bottom-3 sm:-inset-x-4 sm:-top-3 sm:-bottom-4 border-2 border-select"
      >
        <Handle className="-left-[5px] -top-[5px]" />
        <Handle className="-right-[5px] -top-[5px]" />
        <Handle className="-right-[5px] -bottom-[5px]" />
        <span className="absolute left-[-2px] -top-7 bg-select text-on-select text-xs font-bold px-1.5 py-1 leading-none">
          BP_HoschAlef
        </span>
        <Gizmo />
      </motion.span>
    </motion.div>
  </motion.div>
);
