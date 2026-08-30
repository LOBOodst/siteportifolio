import {
  CheckCircle2,
  Code2,
  Database,
  Layers,
  Terminal,
  Workflow,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

export const SkillTree = () => {
  const { t, activeTheme } = useTheme();

  const languageSkills = [
    {
      lang: "C++",
      level: "Native & Unreal Engine 5",
      badge: "Engine & Core",
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10",
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      skills: [
        "Unreal Engine 5 Gameplay Framework & Native Game Loop",
        "Zero-Trust Server Authority & Net Driver Replication",
        "Dijkstra / BFS 3D Grid Pathfinding & LineTrace Topology",
        "Linear Algebra (Vectors, Quaternions, 4x4 Matrices)",
      ],
      projects: "LAN FPS / TPS • Tactical RPG Engine • Mechanics Playground",
    },
    {
      lang: "C#",
      level: "Unity Engine & Architecture",
      badge: "Systems & IA",
      color: "border-teal-500/30 text-teal-400 bg-teal-500/10",
      icon: <Workflow className="w-5 h-5 text-teal-400" />,
      skills: [
        "Hierarchical Finite State Machines (HFSM) for Complex AI",
        "Volumetric 6-Dir SphereCasts & Acoustic Perception Propagation",
        "4-Player Local Input System Device Routing & Hotplugging",
        "Atomic JSON State Persistence & GC-Zero Object Pooling",
      ],
      projects: "Psychastenia • Garage War • Space Shooter • Elevator Talks",
    },
    {
      lang: "Python",
      level: "Automation & Tooling",
      badge: "DevOps & CLI",
      color: "border-amber-500/30 text-amber-400 bg-amber-500/10",
      icon: <Terminal className="w-5 h-5 text-amber-400" />,
      skills: [
        "Automated Build & CI/CD Pipeline Automation",
        "Batch Asset Processing & File Format Conversion",
        "Custom CLI Utilities for Game Data Verification",
        "Telemetry & Performance Profiling Log Parsing",
      ],
      projects: "DevOps Automation • Asset Pipeline Tooling",
    },
    {
      lang: "JavaScript",
      level: "Node.js & Backend Services",
      badge: "Matchmaking & Auth",
      color: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10",
      icon: <Layers className="w-5 h-5 text-yellow-400" />,
      skills: [
        "Express.js REST Microservices for Matchmaking & Auth",
        "Cryptographic Handshakes with JWT Tokens & bcrypt",
        "Full-Stack Web Portfolio Architecture (React 19, Vite)",
      ],
      projects: "LAN FPS Authentication Service • Web Portfolio",
    },
    {
      lang: "SQL",
      level: "Relational Databases",
      badge: "Persistence & Schema",
      color: "border-rose-500/30 text-rose-400 bg-rose-500/10",
      icon: <Database className="w-5 h-5 text-rose-400" />,
      skills: [
        "Relational Schema Modeling (PK/FK Constraints)",
        "CRUD Queries, Joins, Aggregations & Transactions",
        "Player Account & Inventory Persistence Schemas",
      ],
      projects: "Database Persistence • Player Data Modeling",
    },
  ];

  return (
    <section id="tour-stack" className="mb-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-2 font-mono"
            style={{ color: activeTheme.primary }}
          >
            {t.techTitle}
          </h2>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {t.stackMatrixSubtitle}
          </h3>
        </div>

        {/* 5 Languages Technical Bento Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {languageSkills.map((item, idx) => (
            <motion.div
              key={item.lang}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bento-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display text-2xl font-bold text-white leading-tight">
                        {item.lang}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.level}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${item.color}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                  {item.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-3.5 h-3.5 mt-0.5 shrink-0"
                        style={{ color: activeTheme.primary }}
                      />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold mb-0.5 font-mono">
                  {t.appliedIn}
                </span>
                <span className="font-medium text-slate-300">
                  {item.projects}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
