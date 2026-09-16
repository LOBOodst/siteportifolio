import { Code2, Database, Workflow } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

export const SkillTree = () => {
  const { t, activeTheme } = useTheme();

  const engineeringDomains = [
    {
      title: "Core Engine & Low-Level Architecture",
      primaryTech: "C++ • Unreal Engine 5",
      subtitle: "Deterministic Simulation, Netcode & Memory Discipline",
      badge: "Core & Engine",
      icon: <Code2 className="w-5 h-5 text-amber-400" />,
      concepts: [
        {
          label: "Server Authority",
          desc: "Zero-Trust authoritative server model with client prediction, reconciliation, and Net Driver replication.",
        },
        {
          label: "Spatial Pathfinding",
          desc: "Dijkstra and BFS 3D grid pathfinding generated via vertical LineTrace topology and terrain elevation costs.",
        },
        {
          label: "Linear Algebra",
          desc: "Vector kinematics, Quaternions, 4x4 coordinate space transformations, and physics impulses.",
        },
        {
          label: "Gameplay Framework",
          desc: "Native Unreal Engine Actor/Component architecture, tick management, and decoupled delegates.",
        },
      ],
      appliedIn: "LAN FPS / TPS • Tactical RPG Engine • Mechanics Playground",
    },
    {
      title: "Gameplay Systems & Spatial AI",
      primaryTech: "C# • Unity Engine",
      subtitle: "Perception Arrays, State Machines & GC-Zero Pipelines",
      badge: "Gameplay & AI",
      icon: <Workflow className="w-5 h-5 text-sky-400" />,
      concepts: [
        {
          label: "Spatial AI & Perception",
          desc: "6-directional volumetric SphereCast arrays combined with real-time acoustic sound propagation calculations.",
        },
        {
          label: "State Management",
          desc: "Hierarchical Finite State Machines (HFSM) for reactive, emergent enemy stalking and tactical behaviors.",
        },
        {
          label: "GC-Zero Optimization",
          desc: "Pre-allocated Object Pooling architecture ensuring zero garbage collection spikes during bullet hell waves.",
        },
        {
          label: "Multi-Device Routing",
          desc: "4-player concurrent gamepad device assignment, hotplugging resilience, and atomic JSON state persistence.",
        },
      ],
      appliedIn: "Psychastenia • Garage War • Space Shooter • Elevator Talks",
    },
    {
      title: "Tooling, Infrastructure & Data",
      primaryTech: "Python • Node.js • SQL",
      subtitle: "Build Automation, Microservices & Data Integrity",
      badge: "Pipeline & Data",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      concepts: [
        {
          label: "Pipeline Automation",
          desc: "Python CLI tools for automated game build verification, asset packaging, and telemetry log parsing.",
        },
        {
          label: "Microservices & Auth",
          desc: "Decoupled Express.js REST microservice issuing signed JWT tokens for LAN matchmaking handshakes.",
        },
        {
          label: "Relational Schemas",
          desc: "Relational SQL database modeling with strict foreign key constraints, atomic transactions, and persistence.",
        },
      ],
      appliedIn: "LAN Matchmaking Auth • Game Data CLI • Web Portfolio",
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

        {/* 3 Engineering Domains Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {engineeringDomains.map((domain, idx) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="engine-surface p-6 sm:p-7 flex flex-col justify-between border border-slate-800 bg-[#0e121a]"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-slate-800/80">
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      {domain.primaryTech}
                    </span>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                      {domain.title}
                    </h4>
                  </div>
                  <div className="p-2 rounded-md bg-[#141926] border border-slate-800 shrink-0">
                    {domain.icon}
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-mono mb-6">
                  {domain.subtitle}
                </p>

                {/* Architecture Concepts */}
                <div className="space-y-4 mb-8">
                  {domain.concepts.map((concept, cIdx) => (
                    <div key={cIdx} className="text-xs">
                      <span className="font-mono font-semibold text-slate-200 block mb-1">
                        ▸ {concept.label}
                      </span>
                      <p className="text-slate-400 leading-relaxed pl-3 border-l border-slate-800">
                        {concept.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applied in */}
              <div className="pt-4 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold mb-1 font-mono">
                  {t.appliedIn}
                </span>
                <span className="font-mono text-slate-300">
                  {domain.appliedIn}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
