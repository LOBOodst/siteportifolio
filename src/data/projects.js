// Order in which project facts are displayed, with their translation keys
export const FACT_FIELDS = [
  { key: "team", label: "factTeam" },
  { key: "duration", label: "factDuration" },
  { key: "context", label: "factContext" },
];

// Writing rule for this file: plain words, real numbers, no claims a
// programmer reading the code couldn't confirm. Tags are tools or
// techniques, not slogans.
export const projects = [
  {
    id: "fps-lan",
    featured: true,
    title: "LAN Multiplayer FPS/TPS Game",
    type: {
      en: "LAN multiplayer shooter",
      pt: "Shooter multiplayer em LAN",
      fr: "Jeu de tir multijoueur en LAN",
    },
    tech: [
      "Unreal Engine 5",
      "C++",
      "Replication",
      "Node.js",
      "Express",
      "JWT",
    ],
    role: {
      en: "Gameplay & network programmer",
      pt: "Programador de gameplay e rede",
      fr: "Programmeur gameplay et réseau",
    },
    images: [
      "images/fps_lan_gameplay_map.webp",
      "images/fps_lan_lobby.webp",
      "images/fps_lan_scoreboard.webp",
      "images/fps_lan_weapons.webp",
      "images/fps_lan_powers.webp",
    ],
    videos: ["https://www.youtube-nocookie.com/embed/nlYcvFZwmKY"],
    concept: {
      en: "A first/third-person shooter played over LAN. The server decides what happens; players log in through a small web service before they join a match.",
      pt: "Um shooter em primeira e terceira pessoa jogado em rede local. O servidor decide o que acontece, e os jogadores fazem login num pequeno serviço web antes de entrar na partida.",
      fr: "Un jeu de tir à la première et troisième personne joué en réseau local. Le serveur décide de ce qui se passe, et les joueurs se connectent via un petit service web avant d'entrer en partie.",
    },
    howItWasMade: {
      en: "The game runs on a server-authoritative model in C++: clients send input, the server validates it and replicates the result back. Login lives outside the engine, in a Node.js/Express service that hands out signed JWTs. The game server checks that token before it lets a player in.",
      pt: "O jogo usa um modelo de autoridade do servidor em C++: o cliente manda o input, o servidor valida e replica o resultado. O login fica fora da engine, num serviço em Node.js/Express que entrega tokens JWT assinados. O servidor do jogo confere o token antes de deixar o jogador entrar.",
      fr: "Le jeu repose sur un modèle où le serveur fait autorité, en C++ : le client envoie ses entrées, le serveur les valide et réplique le résultat. La connexion se fait hors du moteur, via un service Node.js/Express qui délivre des JWT signés. Le serveur de jeu vérifie ce jeton avant de laisser entrer le joueur.",
    },
    techWins: {
      en: [
        "Server authority: combat results are decided on the server, so a modified client can't fake them",
        "Client-side prediction for movement, with correction when the server disagrees",
        "Login handshake between the Node.js service and the Unreal server using signed JWTs",
        "Weapon system in C++ where recoil and spread come from editable curves",
      ],
      pt: [
        "Autoridade do servidor: o resultado do combate é decidido no servidor, então um cliente modificado não consegue trapacear",
        "Predição de movimento no cliente, com correção quando o servidor discorda",
        "Handshake de login entre o serviço Node.js e o servidor da Unreal com tokens JWT assinados",
        "Sistema de armas em C++ em que recuo e dispersão vêm de curvas editáveis",
      ],
      fr: [
        "Autorité serveur : l'issue des combats est décidée par le serveur, un client modifié ne peut donc pas tricher",
        "Prédiction du mouvement côté client, corrigée quand le serveur n'est pas d'accord",
        "Handshake de connexion entre le service Node.js et le serveur Unreal avec des JWT signés",
        "Système d'armes en C++ où recul et dispersion viennent de courbes éditables",
      ],
    },
    strengths: {
      en: "Cheating from the client side doesn't work, because the client never decides anything that matters.",
      pt: "Trapacear pelo cliente não funciona, porque o cliente nunca decide nada que importa.",
      fr: "Tricher côté client ne marche pas, parce que le client ne décide jamais rien d'important.",
    },
    weaknesses: {
      en: "It needs a dedicated server running somewhere, and I only tuned it for LAN. Over the internet, past roughly 150 ms of ping, the correction would need more work.",
      pt: "Precisa de um servidor dedicado rodando em algum lugar, e só ajustei para LAN. Pela internet, acima de uns 150 ms de ping, a correção precisaria de mais trabalho.",
      fr: "Il faut un serveur dédié quelque part, et je ne l'ai réglé que pour le LAN. Sur internet, au-delà d'environ 150 ms de ping, la correction demanderait plus de travail.",
    },
    facts: {
      team: { pt: "Projeto solo", en: "Solo project", fr: "Projet solo" },
      // TODO: duration: { pt: "X semanas", en: "X weeks", fr: "X semaines" },
      // TODO: context: { pt: "...", en: "...", fr: "..." },
    },
    links: { demo: "#" },
  },
  {
    id: "psychastenia",
    featured: true,
    title: "Psychastenia",
    type: {
      en: "Psychological stealth horror",
      pt: "Horror psicológico com stealth",
      fr: "Horreur psychologique et infiltration",
    },
    tech: ["Unity", "C#", "AI perception", "State machines", "JSON saves"],
    role: {
      en: "Gameplay & AI programmer",
      pt: "Programador de gameplay e IA",
      fr: "Programmeur gameplay et IA",
    },
    images: [
      "images/psychasteniac_01.webp",
      "images/psychasteniac_02.webp",
      "images/psychasteniac_03.webp",
      "images/psychasteniac_04.webp",
      "images/psychasteniac_05.webp",
      "images/psychasteniac_06.webp",
    ],
    videos: ["https://www.youtube-nocookie.com/embed/aqRrje7DAw8"],
    concept: {
      en: "A horror game where you survive by staying in the dark and keeping quiet. The creature hunting you listens for every step.",
      pt: "Um jogo de horror em que você sobrevive ficando no escuro e em silêncio. A criatura que te caça escuta cada passo.",
      fr: "Un jeu d'horreur où l'on survit en restant dans le noir et en silence. La créature qui vous traque écoute chaque pas.",
    },
    howItWasMade: {
      en: "The creature hears and sees. Each footstep or noisy object emits a sound with a radius, and the creature reacts to anything inside that radius. For sight, it casts spheres in six directions, so walls and corners block it the way you'd expect. Its behaviour runs on a hierarchical state machine. Saves are written to a temporary file first and only replace the real one once the write has finished.",
      pt: "A criatura ouve e enxerga. Cada passo ou objeto barulhento emite um som com um raio, e a criatura reage a tudo que cair dentro desse raio. Para a visão, ela lança esferas (SphereCasts) em seis direções, então paredes e quinas bloqueiam como você espera. O comportamento roda numa máquina de estados hierárquica. O save é gravado primeiro num arquivo temporário e só substitui o verdadeiro quando a gravação termina.",
      fr: "La créature entend et voit. Chaque pas ou objet bruyant émet un son avec un rayon, et la créature réagit à tout ce qui entre dans ce rayon. Pour la vue, elle lance des sphères (SphereCasts) dans six directions, donc murs et coins la bloquent comme on s'y attend. Son comportement tourne sur une machine à états hiérarchique. La sauvegarde est d'abord écrite dans un fichier temporaire et ne remplace la vraie qu'une fois l'écriture terminée.",
    },
    techWins: {
      en: [
        "Sight built from SphereCasts in six directions",
        "Hearing: footsteps and noise emitters each have a radius the creature reacts to",
        "Blinking: closing your eyes makes the creature lose track of you, with a camera occlusion shader",
        "Saves that survive the game being closed mid-write",
      ],
      pt: [
        "Visão feita com SphereCasts em seis direções",
        "Audição: passos e emissores de ruído têm um raio ao qual a criatura reage",
        "Piscar: fechar os olhos faz a criatura perder você de vista, com um shader de oclusão na câmera",
        "Saves que sobrevivem ao jogo ser fechado no meio da gravação",
      ],
      fr: [
        "Vue construite avec des SphereCasts dans six directions",
        "Ouïe : pas et sources de bruit ont un rayon auquel la créature réagit",
        "Cligner des yeux fait perdre votre trace à la créature, avec un shader d'occlusion sur la caméra",
        "Des sauvegardes qui résistent à une fermeture du jeu en pleine écriture",
      ],
    },
    strengths: {
      en: "The hunt comes from what the creature sees and hears, not from a script, so it never plays out the same way twice.",
      pt: "A caçada vem do que a criatura vê e ouve, não de um roteiro, então nunca acontece do mesmo jeito duas vezes.",
      fr: "La traque vient de ce que la créature voit et entend, pas d'un script : elle ne se déroule jamais deux fois de la même façon.",
    },
    weaknesses: {
      en: "The six-direction casts are fine on a PC but expensive. On weaker hardware I'd limit them by distance.",
      pt: "As esferas em seis direções rodam bem no PC, mas custam caro. Em hardware mais fraco eu limitaria por distância.",
      fr: "Les lancers dans six directions passent bien sur PC mais coûtent cher. Sur une machine plus faible, je les limiterais à une distance.",
    },
    facts: {
      team: {
        pt: "Equipe de 8 (único programador)",
        en: "Team of 8 (sole programmer)",
        fr: "Équipe de 8 (seul programmeur)",
      },
      duration: { pt: "3 semanas", en: "3 weeks", fr: "3 semaines" },
      context: {
        pt: "Projeto de fim de ciclo na HEAJ",
        en: "Final-year project at HEAJ",
        fr: "Travail de fin de cycle à la HEAJ",
      },
    },
    myWork: {
      pt: [
        "Todo o código do jogo, como único programador ao lado de 5 artistas e 2 designers",
      ],
      en: [
        "All of the game's code, as the sole programmer alongside 5 artists and 2 designers",
      ],
      fr: [
        "Tout le code du jeu, en tant que seul programmeur aux côtés de 5 artistes et 2 designers",
      ],
    },
    links: {
      demo: "https://decloedt-sarah.itch.io/psychastenia",
    },
  },
  {
    id: "tactical-rpg",
    featured: false,
    title: "Tactical Turn-Based RPG Engine",
    type: {
      en: "Turn-based tactics",
      pt: "Tática por turnos",
      fr: "Tactique au tour par tour",
    },
    tech: ["Unreal Engine 5", "C++", "Dijkstra / BFS", "Utility AI"],
    role: {
      en: "Combat & AI programmer",
      pt: "Programador de combate e IA",
      fr: "Programmeur combat et IA",
    },
    images: [
      "images/taticalRPG_1.webp",
      "images/taticalRPG_2.webp",
      "images/taticalRPG_3.webp",
    ],
    videos: [],
    concept: {
      en: "A turn-based combat system: four hero classes, action points to spend each turn, and enemies that weigh their options before acting.",
      pt: "Um sistema de combate por turnos: quatro classes de herói, pontos de ação para gastar a cada turno e inimigos que pesam as opções antes de agir.",
      fr: "Un système de combat au tour par tour : quatre classes de héros, des points d'action à dépenser chaque tour et des ennemis qui pèsent leurs options avant d'agir.",
    },
    howItWasMade: {
      en: "The grid isn't drawn by hand. It's generated by firing vertical line traces over the level, so it follows whatever terrain is there. Dijkstra and BFS find which tiles a unit can reach, and climbing costs more than walking. The four classes (Vanguard, Duelist, Arcanist, Cleric) share one base class, and a state machine runs the turn order.",
      pt: "O grid não é desenhado à mão. Ele é gerado com line traces verticais sobre o nível, então acompanha o terreno que estiver ali. Dijkstra e BFS calculam até onde cada unidade alcança, e subir custa mais do que andar. As quatro classes (Vanguard, Duelist, Arcanist, Cleric) herdam da mesma classe base, e uma máquina de estados controla a ordem dos turnos.",
      fr: "La grille n'est pas dessinée à la main. Elle est générée en lançant des line traces verticaux sur le niveau, elle suit donc le terrain présent. Dijkstra et BFS calculent les cases accessibles, et monter coûte plus cher que marcher. Les quatre classes (Vanguard, Duelist, Arcanist, Cleric) partagent une même classe de base, et une machine à états gère l'ordre des tours.",
    },
    techWins: {
      en: [
        "Grid generated from line traces, so it adapts to any level",
        "Reachable tiles with Dijkstra and BFS, where height adds cost",
        "Four classes built on one base class",
        "Enemy AI that scores each target and ability, then picks the best one",
      ],
      pt: [
        "Grid gerado por line traces, que se adapta a qualquer nível",
        "Casas alcançáveis com Dijkstra e BFS, em que a altura aumenta o custo",
        "Quatro classes construídas sobre uma classe base",
        "IA inimiga que dá nota a cada alvo e habilidade e escolhe a melhor",
      ],
      fr: [
        "Grille générée par line traces, qui s'adapte à n'importe quel niveau",
        "Cases accessibles avec Dijkstra et BFS, la hauteur augmentant le coût",
        "Quatre classes construites sur une même classe de base",
        "IA ennemie qui note chaque cible et capacité, puis choisit la meilleure",
      ],
    },
    strengths: {
      en: "Combat rules live apart from the HUD, so the UI can change without touching the game logic.",
      pt: "As regras de combate ficam separadas do HUD, então dá para trocar a interface sem mexer na lógica.",
      fr: "Les règles de combat sont séparées du HUD : on peut changer l'interface sans toucher à la logique.",
    },
    weaknesses: {
      en: "The grid is built in one go. On a very large map (200×200 tiles and up) I'd split it into chunks to avoid a hitch.",
      pt: "O grid é gerado de uma vez. Num mapa muito grande (200×200 casas ou mais) eu dividiria em blocos para evitar travadas.",
      fr: "La grille est générée d'un coup. Sur une très grande carte (200×200 cases et plus), je la découperais en blocs pour éviter les saccades.",
    },
    facts: {
      team: { pt: "Projeto solo", en: "Solo project", fr: "Projet solo" },
      // TODO: duration: { pt: "X semanas", en: "X weeks", fr: "X semaines" },
      // TODO: context: { pt: "...", en: "...", fr: "..." },
    },
    links: { demo: "#" },
  },
  {
    id: "garage-war",
    featured: false,
    title: "Garage War: Modular Combat",
    type: {
      en: "4-player physics party game",
      pt: "Party game de física para 4",
      fr: "Party game physique à 4 joueurs",
    },
    tech: [
      "Unity",
      "C#",
      "Input System",
      "Physics joints",
      "Local multiplayer",
    ],
    role: {
      en: "Gameplay & physics programmer",
      pt: "Programador de gameplay e física",
      fr: "Programmeur gameplay et physique",
    },
    images: [
      "images/garage_war_01.webp",
      "images/garage_war_02.webp",
      "images/garage_war_03.webp",
    ],
    videos: [],
    concept: {
      en: "Up to four players on one couch build vehicles out of scrap against the clock and throw parts at each other.",
      pt: "Até quatro jogadores no mesmo sofá montam veículos com sucata contra o relógio e arremessam peças uns nos outros.",
      fr: "Jusqu'à quatre joueurs sur le même canapé construisent des véhicules avec de la ferraille contre la montre et se lancent des pièces.",
    },
    howItWasMade: {
      en: "Parts snap onto magnetic sockets that check type and orientation, and the finished vehicle is compared to the recipe the round asks for. Unity's Input System handles four gamepads, which can be plugged in or out mid-game.",
      pt: "As peças encaixam em sockets magnéticos que conferem tipo e orientação, e o veículo pronto é comparado com a receita que a rodada pede. O Input System da Unity cuida dos quatro controles, que podem ser conectados ou desconectados no meio da partida.",
      fr: "Les pièces s'emboîtent sur des sockets magnétiques qui vérifient type et orientation, puis le véhicule est comparé à la recette demandée par la manche. L'Input System de Unity gère quatre manettes, qu'on peut brancher ou débrancher en pleine partie.",
    },
    techWins: {
      en: [
        "Magnetic sockets that refuse a part in the wrong slot or facing the wrong way",
        "Recipe check that reads the vehicle as it's actually built",
        "Four local gamepads with hot-plugging",
        "Throws that follow a parabolic arc, driven by a physics impulse",
      ],
      pt: [
        "Sockets magnéticos que recusam peça no lugar errado ou virada ao contrário",
        "Conferência de receita que lê o veículo do jeito que ele foi montado",
        "Quatro controles locais com conexão a quente",
        "Arremessos em arco parabólico, feitos com impulso físico",
      ],
      fr: [
        "Sockets magnétiques qui refusent une pièce mal placée ou mal orientée",
        "Vérification de recette qui lit le véhicule tel qu'il est construit",
        "Quatre manettes locales branchables à chaud",
        "Lancers en arc parabolique, propulsés par une impulsion physique",
      ],
    },
    strengths: {
      en: "It's funny to watch. Most of the good moments come from the physics, not from anything scripted.",
      pt: "É engraçado de assistir. Os melhores momentos vêm da física, não de nada roteirizado.",
      fr: "C'est drôle à regarder. Les meilleurs moments viennent de la physique, pas d'un script.",
    },
    weaknesses: {
      en: "Stacking many joints made vehicles shake and sometimes fly off. Damping fixed it, but I'd design the joint chain more carefully from the start.",
      pt: "Empilhar muitas juntas fazia os veículos tremerem e às vezes saírem voando. Amortecimento resolveu, mas eu planejaria a cadeia de juntas com mais cuidado desde o início.",
      fr: "Empiler beaucoup d'articulations faisait trembler les véhicules, parfois jusqu'à les envoyer voler. L'amortissement a réglé ça, mais je concevrais la chaîne d'articulations plus soigneusement dès le départ.",
    },
    facts: {
      team: {
        pt: "Equipe de 6 (único programador)",
        en: "Team of 6 (sole programmer)",
        fr: "Équipe de 6 (seul programmeur)",
      },
      duration: { pt: "2 semanas", en: "2 weeks", fr: "2 semaines" },
      context: {
        pt: "Sprint multijogador na HEAJ",
        en: "Multiplayer sprint at HEAJ",
        fr: "Sprint multijoueur à la HEAJ",
      },
    },
    myWork: {
      pt: [
        "Toda a programação de gameplay e do jogo, como único programador",
        "Conceito original do jogo",
        "Contribuição no game design e no level design",
      ],
      en: [
        "All gameplay and game programming, as the sole programmer",
        "Original game concept",
        "Contributed to game design and level design",
      ],
      fr: [
        "Toute la programmation gameplay et du jeu, en tant que seul programmeur",
        "Concept original du jeu",
        "Participation au game design et au level design",
      ],
    },
    links: {
      demo: "https://loboodst.itch.io/garagewar",
    },
  },
  {
    id: "space-shooter-pro",
    featured: false,
    title: "Space Shooter Pro",
    type: {
      en: "Arcade shoot 'em up",
      pt: "Shoot 'em up arcade",
      fr: "Shoot 'em up d'arcade",
    },
    tech: ["Unity", "C#", "Object pooling", "Coroutines"],
    role: {
      en: "Gameplay programmer",
      pt: "Programador de gameplay",
      fr: "Programmeur gameplay",
    },
    images: ["images/spaceshooter.webp"],
    videos: [],
    concept: {
      en: "A 2.5D arcade shooter with a lot of bullets on screen. The goal was to keep it smooth when the screen fills up.",
      pt: "Um shooter arcade 2.5D com muita bala na tela. O objetivo era manter tudo fluido quando a tela enche.",
      fr: "Un shooter d'arcade 2.5D avec beaucoup de projectiles à l'écran. Le but : rester fluide quand l'écran se remplit.",
    },
    howItWasMade: {
      en: "Lasers, enemy ships and particles all come from one generic object pool, so nothing is created or destroyed in the middle of a wave. Fire modes are stacked on top of the base weapon, and each power-up runs its own timer in a coroutine.",
      pt: "Lasers, naves inimigas e partículas saem todos de um pool genérico de objetos, então nada é criado ou destruído no meio de uma onda. Os modos de tiro se somam à arma base, e cada power-up roda o próprio timer numa corrotina.",
      fr: "Lasers, vaisseaux ennemis et particules sortent tous d'un pool d'objets générique : rien n'est créé ni détruit en pleine vague. Les modes de tir s'ajoutent à l'arme de base, et chaque power-up gère son propre minuteur dans une coroutine.",
    },
    techWins: {
      en: [
        "One generic object pool for lasers, enemies and particles, to avoid GC spikes during waves",
        "Fire modes like triple shot and spread, added on top of the base weapon",
        "Power-ups that stack, each with its own timer",
        "Ship movement clamped and wrapped at the screen edges",
      ],
      pt: [
        "Um pool genérico para lasers, inimigos e partículas, para evitar picos do GC durante as ondas",
        "Modos de tiro como triple shot e spread, somados à arma base",
        "Power-ups acumuláveis, cada um com o próprio timer",
        "Movimento da nave limitado e espelhado nas bordas da tela",
      ],
      fr: [
        "Un pool générique pour lasers, ennemis et particules, pour éviter les pics du GC pendant les vagues",
        "Modes de tir comme le triple tir et la dispersion, ajoutés à l'arme de base",
        "Power-ups cumulables, chacun avec son propre minuteur",
        "Déplacement du vaisseau limité et bouclé aux bords de l'écran",
      ],
    },
    strengths: {
      en: "It stays at 60 FPS when the screen is full, and the ship responds the moment you press a key.",
      pt: "Fica em 60 FPS com a tela cheia, e a nave responde no instante em que você aperta a tecla.",
      fr: "Il reste à 60 FPS écran plein, et le vaisseau répond dès qu'on appuie sur une touche.",
    },
    weaknesses: {
      en: "Everything happens on a single plane. Real 3D flight would be the next step.",
      pt: "Tudo acontece num único plano. Voo em 3D de verdade seria o próximo passo.",
      fr: "Tout se passe sur un seul plan. Un vrai vol en 3D serait l'étape suivante.",
    },
    // TODO: preencha com os dados reais e descomente (campos vazios não aparecem no site)
    // facts: {
    //   team: { pt: "Solo", en: "Solo", fr: "Solo" },
    //   duration: { pt: "X semanas", en: "X weeks", fr: "X semaines" },
    //   context: { pt: "Projeto pessoal", en: "Personal project", fr: "Projet personnel" },
    // },
    // myWork: { pt: ["..."], en: ["..."], fr: ["..."] },
    links: { demo: "#" },
  },
  {
    id: "unreal-playground",
    featured: false,
    title: "Unreal Mechanics Playground",
    type: {
      en: "Mechanics prototypes",
      pt: "Protótipos de mecânicas",
      fr: "Prototypes de mécaniques",
    },
    tech: ["Unreal Engine 5", "C++", "Physics handle", "Line traces"],
    role: {
      en: "Mechanics programmer (C++)",
      pt: "Programador de mecânicas (C++)",
      fr: "Programmeur de mécaniques (C++)",
    },
    images: ["images/unrealmecanins.webp"],
    videos: [
      "videos/bullet_drop.mp4",
      "videos/possession_system.mp4",
      "videos/vats_system.mp4",
    ],
    concept: {
      en: "A grey test level where I prototype mechanics in C++. The three videos show bullet drop, possession and a VATS-style targeting mode.",
      pt: "Um nível cinza de testes onde prototipo mecânicas em C++. Os três vídeos mostram queda de bala, possessão e um modo de mira no estilo VATS.",
      fr: "Un niveau gris de test où je prototype des mécaniques en C++. Les trois vidéos montrent la chute de balle, la possession et un mode de visée façon VATS.",
    },
    howItWasMade: {
      en: "Each mechanic is its own ActorComponent, so it can be dropped onto any actor. Picking objects up uses UPhysicsHandleComponent; interaction uses line traces against an interface, so new interactable objects don't need changes to the player.",
      pt: "Cada mecânica é um ActorComponent separado, então pode ser colocada em qualquer ator. Pegar objetos usa o UPhysicsHandleComponent; a interação usa line traces contra uma interface, então objetos novos não exigem mudanças no jogador.",
      fr: "Chaque mécanique est un ActorComponent à part, qu'on peut poser sur n'importe quel acteur. Ramasser des objets passe par UPhysicsHandleComponent ; l'interaction utilise des line traces sur une interface, donc un nouvel objet interactif ne demande aucun changement côté joueur.",
    },
    techWins: {
      en: [
        "Bullet drop: zoom in and the weapon shows the projectile's arc before you fire",
        "Possession: target another character, then distract it, possess it or make it panic",
        "VATS-style mode: aim at a body part (head, torso, arms, legs) and see the hit chance for each",
        "Physics grabber in C++ with linear and angular damping",
      ],
      pt: [
        "Queda de bala: ao dar zoom, a arma mostra o arco do projétil antes do tiro",
        "Possessão: mirar outro personagem e distraí-lo, possuí-lo ou fazê-lo entrar em pânico",
        "Modo no estilo VATS: mirar numa parte do corpo (cabeça, tronco, braços, pernas) e ver a chance de acerto de cada uma",
        "Garra de física em C++ com amortecimento linear e angular",
      ],
      fr: [
        "Chute de balle : en zoomant, l'arme affiche l'arc du projectile avant le tir",
        "Possession : viser un autre personnage, puis le distraire, le posséder ou le faire paniquer",
        "Mode façon VATS : viser une partie du corps (tête, torse, bras, jambes) et voir la chance de toucher pour chacune",
        "Préhension physique en C++ avec amortissement linéaire et angulaire",
      ],
    },
    strengths: {
      en: "The components are small and independent, so I can carry them into a real project.",
      pt: "Os componentes são pequenos e independentes, então dá para levá-los para um projeto de verdade.",
      fr: "Les composants sont petits et indépendants, je peux donc les reprendre dans un vrai projet.",
    },
    weaknesses: {
      en: "It's a test room, not a game. None of it has been tuned against real level design yet.",
      pt: "É uma sala de testes, não um jogo. Nada disso foi ajustado contra level design de verdade ainda.",
      fr: "C'est une salle de test, pas un jeu. Rien n'a encore été réglé face à un vrai level design.",
    },
    facts: {
      team: { pt: "Projeto solo", en: "Solo project", fr: "Projet solo" },
      // TODO: duration: { pt: "X semanas", en: "X weeks", fr: "X semaines" },
      // TODO: context: { pt: "...", en: "...", fr: "..." },
    },
    links: { demo: "#" },
  },
  {
    id: "elevator-talks",
    featured: false,
    title: "Elevator Talks",
    type: {
      en: "Narrative dialogue game",
      pt: "Jogo narrativo de diálogo",
      fr: "Jeu narratif à dialogues",
    },
    tech: ["Unity", "C#", "JSON", "Dialogue system"],
    role: {
      en: "Gameplay & dialogue programmer",
      pt: "Programador de gameplay e diálogo",
      fr: "Programmeur gameplay et dialogues",
    },
    images: ["images/elevator_talks_01.webp", "images/elevator_talks_02.webp"],
    videos: [],
    concept: {
      en: "A narrative game built on conversations, with choices that branch and a timer that doesn't wait for you to make up your mind.",
      pt: "Um jogo narrativo feito de conversas, com escolhas que se ramificam e um timer que não espera você se decidir.",
      fr: "Un jeu narratif fait de conversations, avec des choix qui se ramifient et un minuteur qui n'attend pas votre décision.",
    },
    howItWasMade: {
      en: "Dialogue is written in JSON and read by a parser I wrote. It checks each choice's conditions and the relationship values, and can trigger camera cuts. Text appears letter by letter, with a click sound timed to the letters.",
      pt: "Os diálogos são escritos em JSON e lidos por um parser que eu fiz. Ele confere as condições de cada escolha e os valores de relacionamento, e pode disparar cortes de câmera. O texto aparece letra por letra, com um clique sincronizado com as letras.",
      fr: "Les dialogues sont écrits en JSON et lus par un parseur que j'ai écrit. Il vérifie les conditions de chaque choix et les valeurs de relation, et peut déclencher des changements de caméra. Le texte s'affiche lettre par lettre, avec un clic calé sur les lettres.",
    },
    techWins: {
      en: [
        "Dialogue tree read recursively from JSON, with state flags",
        "Typewriter text at variable speed, with a click per letter",
        "Choice timer where the music gets tenser as time runs out",
      ],
      pt: [
        "Árvore de diálogo lida recursivamente do JSON, com flags de estado",
        "Texto em máquina de escrever com velocidade variável e um clique por letra",
        "Timer de escolha em que a música fica mais tensa conforme o tempo acaba",
      ],
      fr: [
        "Arbre de dialogue lu récursivement depuis le JSON, avec des drapeaux d'état",
        "Texte machine à écrire à vitesse variable, avec un clic par lettre",
        "Minuteur de choix où la musique se tend à mesure que le temps file",
      ],
    },
    strengths: {
      en: "New branches go straight into the JSON. Adding a conversation doesn't need a code change.",
      pt: "Ramificações novas entram direto no JSON. Adicionar uma conversa não exige mudar o código.",
      fr: "Les nouvelles branches s'écrivent directement dans le JSON. Ajouter une conversation ne demande aucun changement de code.",
    },
    weaknesses: {
      en: "There's no voice acting. Adding it would mean linking an audio file to every dialogue node ID.",
      pt: "Não tem dublagem. Para ter, seria preciso ligar um arquivo de áudio a cada ID de nó de diálogo.",
      fr: "Il n'y a pas de doublage. Pour en ajouter, il faudrait relier un fichier audio à chaque ID de nœud de dialogue.",
    },
    facts: {
      team: {
        pt: "Equipe de 6 (único programador)",
        en: "Team of 6 (sole programmer)",
        fr: "Équipe de 6 (seul programmeur)",
      },
      duration: { pt: "3 dias", en: "3 days", fr: "3 jours" },
      context: {
        pt: "Protótipo de conceito",
        en: "Concept prototype",
        fr: "Prototype de concept",
      },
    },
    myWork: {
      pt: [
        "Toda a programação de gameplay, como único programador ao lado de 3 artistas, 1 tech artist e 1 designer",
      ],
      en: [
        "All gameplay programming, as the sole programmer alongside 3 artists, 1 tech artist and 1 designer",
      ],
      fr: [
        "Toute la programmation gameplay, en tant que seul programmeur aux côtés de 3 artistes, 1 tech artist et 1 designer",
      ],
    },
    links: {
      demo: "https://loboodst.itch.io/elevator-talks",
    },
  },
];
