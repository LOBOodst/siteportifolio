// Engineering domains shown in the "Stack" section.
// Each text field is translated: { pt, en, fr }.
export const engineeringDomains = [
  {
    id: "engine",
    family: "unreal",
    tech: "C++ / Unreal Engine 5",
    title: {
      pt: "Engine e arquitetura de baixo nível",
      en: "Core engine & low-level architecture",
      fr: "Moteur & architecture bas niveau",
    },
    concepts: [
      {
        label: {
          pt: "Autoridade de servidor",
          en: "Server authority",
          fr: "Autorité serveur",
        },
        desc: {
          pt: "Servidor autoritativo com predição e reconciliação no cliente, usando a replicação do Net Driver da Unreal.",
          en: "Authoritative server with client-side prediction and reconciliation, built on Unreal's Net Driver replication.",
          fr: "Serveur autoritaire avec prédiction et réconciliation côté client, basé sur la réplication du Net Driver d'Unreal.",
        },
      },
      {
        label: {
          pt: "Pathfinding em grid",
          en: "Grid pathfinding",
          fr: "Pathfinding sur grille",
        },
        desc: {
          pt: "Dijkstra e BFS num grid 3D gerado com LineTraces verticais, com custo de terreno por elevação.",
          en: "Dijkstra and BFS on a 3D grid generated from vertical LineTraces, with terrain elevation costs.",
          fr: "Dijkstra et BFS sur une grille 3D générée par LineTraces verticaux, avec coût d'élévation du terrain.",
        },
      },
      {
        label: {
          pt: "Matemática 3D",
          en: "3D math",
          fr: "Mathématiques 3D",
        },
        desc: {
          pt: "Cinemática vetorial, quaternions, transformações 4x4 entre espaços de coordenadas e impulsos físicos.",
          en: "Vector kinematics, quaternions, 4x4 coordinate space transforms and physics impulses.",
          fr: "Cinématique vectorielle, quaternions, transformations 4x4 entre espaces de coordonnées et impulsions physiques.",
        },
      },
      {
        label: {
          pt: "Gameplay Framework",
          en: "Gameplay Framework",
          fr: "Gameplay Framework",
        },
        desc: {
          pt: "Arquitetura Actor/Component da Unreal, controle de tick e delegates desacoplados.",
          en: "Unreal's Actor/Component architecture, tick management and decoupled delegates.",
          fr: "Architecture Actor/Component d'Unreal, gestion du tick et delegates découplés.",
        },
      },
    ],
    appliedIn: "LAN FPS / TPS, Tactical RPG, Unreal Mechanics Playground",
  },
  {
    id: "gameplay",
    family: "unity",
    tech: "C# / Unity",
    title: {
      pt: "Sistemas de gameplay e IA",
      en: "Gameplay systems & AI",
      fr: "Systèmes de gameplay & IA",
    },
    concepts: [
      {
        label: {
          pt: "Percepção da IA",
          en: "AI perception",
          fr: "Perception de l'IA",
        },
        desc: {
          pt: "SphereCasts em 6 direções combinados com propagação de som em tempo real.",
          en: "6-directional SphereCast arrays combined with real-time sound propagation.",
          fr: "SphereCasts dans 6 directions combinés à une propagation sonore en temps réel.",
        },
      },
      {
        label: {
          pt: "Máquinas de estado",
          en: "State machines",
          fr: "Machines à états",
        },
        desc: {
          pt: "Máquinas de estado hierárquicas para inimigos que perseguem e reagem ao jogador.",
          en: "Hierarchical finite state machines for enemies that stalk and react to the player.",
          fr: "Machines à états hiérarchiques pour des ennemis qui traquent et réagissent au joueur.",
        },
      },
      {
        label: {
          pt: "Object pooling",
          en: "Object pooling",
          fr: "Object pooling",
        },
        desc: {
          pt: "Pools pré-alocados para evitar picos de garbage collection nas ondas de projéteis.",
          en: "Pre-allocated pools to avoid garbage collection spikes during bullet waves.",
          fr: "Pools pré-alloués pour éviter les pics de garbage collection pendant les vagues de projectiles.",
        },
      },
      {
        label: {
          pt: "Multijogador local",
          en: "Local multiplayer",
          fr: "Multijoueur local",
        },
        desc: {
          pt: "Atribuição de 4 controles ao mesmo tempo, reconexão a quente e salvamento em JSON.",
          en: "Assigning 4 gamepads at once, hot-plugging and JSON save data.",
          fr: "Attribution de 4 manettes en simultané, branchement à chaud et sauvegarde JSON.",
        },
      },
    ],
    appliedIn: "Psychastenia, Garage War, Space Shooter, Elevator Talks",
  },
  {
    id: "tooling",
    family: "tools",
    tech: "Python, Node.js, SQL",
    title: {
      pt: "Ferramentas, infraestrutura e dados",
      en: "Tooling, infrastructure & data",
      fr: "Outils, infrastructure & données",
    },
    concepts: [
      {
        label: {
          pt: "Automação",
          en: "Automation",
          fr: "Automatisation",
        },
        desc: {
          pt: "Ferramentas de linha de comando em Python para verificar builds, empacotar assets e ler logs.",
          en: "Python command-line tools to verify builds, package assets and parse logs.",
          fr: "Outils Python en ligne de commande pour vérifier les builds, empaqueter les assets et analyser les logs.",
        },
      },
      {
        label: {
          pt: "Autenticação",
          en: "Authentication",
          fr: "Authentification",
        },
        desc: {
          pt: "Serviço REST em Express.js que emite tokens JWT assinados para o matchmaking em LAN.",
          en: "Express.js REST service issuing signed JWT tokens for LAN matchmaking.",
          fr: "Service REST Express.js qui émet des jetons JWT signés pour le matchmaking LAN.",
        },
      },
      {
        label: {
          pt: "Bancos relacionais",
          en: "Relational databases",
          fr: "Bases relationnelles",
        },
        desc: {
          pt: "Modelagem SQL com chaves estrangeiras e transações.",
          en: "SQL modelling with foreign keys and transactions.",
          fr: "Modélisation SQL avec clés étrangères et transactions.",
        },
      },
    ],
    appliedIn: "LAN FPS / TPS",
  },
];
