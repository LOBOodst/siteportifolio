/**
 * Core Logic for Hosch Alef Portfolio - Enhanced with GSAP, Three.js, Anime.js, Motion.dev
 * Applied UI Motion Principles: Easing, Staging, Anticipation, Spring Physics & Follow-through
 */

// 1. ANIME.JS & GSAP Sequential Loader (Motion Principles: Anticipation + Staging)
const initAnimeLoader = (onComplete) => {
  const loader = document.getElementById("loader");
  if (!loader) {
    if (onComplete) onComplete();
    return;
  }

  const loaderText = document.querySelector(".loader-text");
  const phrases = [
    "HOSCH.CORE // INITIALIZING",
    "ASTRAL_KERNEL // SYNCHRONIZING",
    "UNSC.TELEMETRY // MOUNTED",
    "SPIRIT_LIGHT // ACTIVE",
  ];

  let phraseIndex = 0;
  const phraseInterval = setInterval(() => {
    if (loaderText && phraseIndex < phrases.length) {
      loaderText.textContent = phrases[phraseIndex];
      phraseIndex++;
    }
  }, 350);

  const tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 800,
    complete: () => {
      clearInterval(phraseInterval);
      if (loaderText) loaderText.textContent = "HOSCH.CORE // READY";

      gsap.to(loader, {
        opacity: 0,
        scale: 1.05,
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          loader.style.display = "none";
          if (onComplete) onComplete();
        },
      });

      setupGSAPMascot();
      initGSAPAnimations();
      initMotionHover();
      initGlassGlow();
      initLivingPortfolio();

      // Apply scramble on load and hover
      const titles = document.querySelectorAll(".gradient-text");
      titles.forEach((t) => {
        scrambleText(t);
        t.addEventListener("mouseenter", () => {
          scrambleText(t);
        });
      });
    },
  });

  tl.add({
    targets: ".loader-progress",
    width: ["0%", "100%"],
    duration: 1400,
    easing: "easeInOutQuart",
  }).add(
    {
      targets: ".loader-text",
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 500,
    },
    "-=1100",
  );
};

// 2. GSAP ScrollTrigger Animations (Motion Principle: Staging & Smooth Cascades)
const initGSAPAnimations = () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;
  gsap.registerPlugin(ScrollTrigger);

  // Fade and slide up sections smoothly
  const sections = document.querySelectorAll(".reveal");
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
};

// 3. MOTION.DEV SPRING HOVER PHYSICS (Motion Principles: Inertia & Responsive Feedback)
const initMotionHover = () => {
  if (typeof motion === "undefined" || !motion.animate) return;

  const cards = document.querySelectorAll(".project-card, .skill-node");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      motion.animate(
        card,
        { scale: 1.015, y: -4 },
        { type: "spring", stiffness: 400, damping: 25 },
      );
    });
    card.addEventListener("mouseleave", () => {
      motion.animate(
        card,
        { scale: 1, y: 0 },
        { type: "spring", stiffness: 350, damping: 20 },
      );
    });
  });

  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.addEventListener("mouseenter", () => {
      motion.animate(
        profileImg,
        { scale: 1.05, rotate: 1 },
        { type: "spring", stiffness: 400, damping: 20 },
      );
    });
    profileImg.addEventListener("mouseleave", () => {
      motion.animate(
        profileImg,
        { scale: 1, rotate: 0 },
        { type: "spring", stiffness: 350, damping: 20 },
      );
    });
  }
};

// 4. BIOLUMINESCENT CURSOR TRACKER (Ori & Gris Illumination)
const initGlassGlow = () => {
  const interactiveCards = document.querySelectorAll(".glass-interactive");
  interactiveCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
      const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    });
  });
};

// 5. GSAP MASCOT & DIALOGUE SYSTEM
let mascotFloatingTween;

const setupGSAPMascot = () => {
  const profile = document.getElementById("profile-img");
  if (!profile || typeof gsap === "undefined") return;

  if (mascotFloatingTween) mascotFloatingTween.kill();

  mascotFloatingTween = gsap.to(profile, {
    y: -8,
    duration: 2.4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
};

const triggerGSAPMascotJump = () => {
  const profile = document.getElementById("profile-img");
  if (!profile || typeof gsap === "undefined") return;

  gsap.fromTo(
    profile,
    { y: 0, scale: 1 },
    {
      y: -20,
      scale: 1.06,
      duration: 0.35,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    },
  );
};

const showCharacterMessage = (msg) => {
  const bubble = document.getElementById("character-bubble");
  const text = document.getElementById("bubble-text");
  if (!bubble || !text) return;

  text.textContent = msg;
  gsap.to(bubble, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "back.out(1.7)",
  });
};

const hideCharacterMessage = () => {
  const bubble = document.getElementById("character-bubble");
  if (!bubble) return;

  gsap.to(bubble, {
    opacity: 0,
    y: -10,
    duration: 0.3,
    ease: "power2.in",
  });
};

// 6. INTERACTION HELPERS
window.copyDiscord = (btn, tag, feedbackMsg) => {
  navigator.clipboard.writeText(tag);
  const originalText = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-cyan-300"></i> ${feedbackMsg}`;
  btn.classList.add("copy-feedback");
  lucide.createIcons();

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.remove("copy-feedback");
    lucide.createIcons();
  }, 2000);
};

window.startTour = () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && hash !== "home" && hash !== "contact") {
    window.location.hash = "home";
    setTimeout(
      () => executeTour(window.currentLang || "pt", window.translations || {}),
      500,
    );
  } else {
    executeTour(window.currentLang || "pt", window.translations || {});
  }
};

const executeTour = (lang, dict) => {
  window.currentTourStep = 0;
  const langDict = dict[lang] || dict.pt || {};
  const t = langDict.tour || {
    step0: "Explore meu portfólio!",
    step1: "Stack técnica",
    step2: "Perfil",
    step3: "Projetos",
    step4: "Contato",
    finish: "Entendido",
    next: "Próximo",
  };

  const bubble = document.getElementById("tour-bubble");
  if (!bubble) return;
  bubble.style.display = "block";

  window.showTourStep = () => {
    const steps = [
      { id: "tour-start", text: t.step0 },
      { id: "tour-stack", text: t.step1 },
      { id: "tour-profile", text: t.step2 },
      { id: "tour-projects", text: t.step3 },
      { id: "contact", text: t.step4 },
    ];
    const step = steps[window.currentTourStep] || steps[0];
    const target = document.getElementById(step.id);

    document.querySelectorAll(".highlight-target").forEach((el) => {
      el.classList.remove("highlight-target");
    });

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("highlight-target");
    }

    const isLast = window.currentTourStep === 4;
    bubble.innerHTML = `
      <div class="mono text-[10px] text-cyan-400 mb-2 uppercase tracking-widest">HOSCH.GUIDE_V1</div>
      <p class="text-white text-sm leading-relaxed mb-4">${step.text}</p>
      <button onclick="${isLast ? "window.endTour()" : "window.nextTourStep()"}" class="w-full bg-cyan-400 text-black py-2 rounded-none font-black uppercase text-[10px] tracking-widest hover:bg-white transition-colors">
        ${isLast ? t.finish : t.next}
      </button>
    `;
  };

  window.showTourStep();
};

window.nextTourStep = () => {
  window.currentTourStep++;
  window.showTourStep();
};

window.endTour = () => {
  const bubble = document.getElementById("tour-bubble");
  if (bubble) bubble.style.display = "none";
  document.querySelectorAll(".highlight-target").forEach((el) => {
    el.classList.remove("highlight-target");
  });
};

// 7. LIVING PORTFOLIO SYSTEMS (Telemetry HUD, Text Scramble, Idle AI)
const initLivingPortfolio = () => {
  const timeEl = document.getElementById("hud-time");
  const uptimeEl = document.getElementById("hud-uptime");
  const mouseEl = document.getElementById("hud-mouse");

  const startTime = Date.now();

  document.addEventListener("mousemove", (e) => {
    if (mouseEl) {
      mouseEl.textContent = `POS: X${String(e.clientX).padStart(4, "0")} Y${String(e.clientY).padStart(4, "0")}`;
    }
  });

  setInterval(() => {
    const now = new Date();
    if (timeEl) {
      timeEl.textContent = `T: ${now.toLocaleTimeString("en-US", { hour12: false })}.${String(now.getMilliseconds()).padStart(3, "0").slice(0, 2)}`;
    }

    const uptimeStr = Math.floor((Date.now() - startTime) / 1000);
    if (uptimeEl) uptimeEl.textContent = `UP: ${uptimeStr}s`;
  }, 50);

  // Mascot Idle State
  let idleTimer;
  const resetIdle = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const bubble = document.getElementById("character-bubble");
      if (
        bubble &&
        (bubble.style.opacity === "" || bubble.style.opacity === "0")
      ) {
        triggerGSAPMascotJump();
        showCharacterMessage("... System idle. Ready to deploy? 📡");
        setTimeout(() => hideCharacterMessage(), 4000);
      }
    }, 15000);
  };

  document.addEventListener("mousemove", resetIdle);
  document.addEventListener("keydown", resetIdle);
  document.addEventListener("scroll", resetIdle);
  resetIdle();
};

const scrambleText = (element) => {
  const originalText =
    element.getAttribute("data-original") || element.innerText;
  if (!element.getAttribute("data-original")) {
    element.setAttribute("data-original", originalText);
  }

  const chars = "!<>-_\\/[]{}—=+*^?#_";
  let iterations = 0;

  clearInterval(element.scrambleInterval);

  element.scrambleInterval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((_, index) => {
        if (index < iterations) return originalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iterations >= originalText.length) {
      clearInterval(element.scrambleInterval);
      element.innerText = originalText;
    }
    iterations += 0.6;
  }, 25);
};

// Global exports
window.initAnimeLoader = initAnimeLoader;
window.initGSAPAnimations = initGSAPAnimations;
window.initMotionHover = initMotionHover;
window.initGlassGlow = initGlassGlow;
window.initLivingPortfolio = initLivingPortfolio;
window.scrambleText = scrambleText;
window.setupGSAPMascot = setupGSAPMascot;
window.showCharacterMessage = showCharacterMessage;
window.hideCharacterMessage = hideCharacterMessage;
