/**
 * Core Logic for Hosch Alef Portfolio
 * Separation of concerns: Data and Logic are now decoupled from the View (HTML)
 */

const initScrollReveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("active");
            });
        },
        { threshold: 0.1 },
    );
    reveals.forEach((el) => observer.observe(el));
};

const initGlassGlow = () => {
    const cards = document.querySelectorAll(".glass-interactive");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            card.style.setProperty("--mouse-x", `${x}%`);
            card.style.setProperty("--mouse-y", `${y}%`);
        });
    });
};

const showCharacterMessage = (message) => {
    const bubble = document.getElementById("character-bubble");
    const bubbleText = document.getElementById("bubble-text");
    const profileImg = document.getElementById("profile-img");
    
    if (!bubble || !bubbleText) return;
    
    bubbleText.textContent = message;
    bubble.style.opacity = "1";
    bubble.style.transform = "translateY(0)";
    
    if (profileImg) {
        profileImg.classList.add("speaking");
        profileImg.classList.remove("idle");
    }
};

const hideCharacterMessage = () => {
    const bubble = document.getElementById("character-bubble");
    const profileImg = document.getElementById("profile-img");
    
    if (bubble) {
        bubble.style.opacity = "0";
        bubble.style.transform = "translateY(-10px)";
    }
    
    if (profileImg) {
        profileImg.classList.remove("speaking");
        profileImg.classList.add("idle");
    }
};

const triggerMascotReaction = (section, currentLang) => {
    const mascot = document.getElementById("character-mascot");
    if (!mascot) return;

    const reactions = {
        en: { tech: "Love the stack! 🔥", profile: "That's me! 😎", projects: "My best work! 💪", contact: "Let's talk! 🤝" },
        pt: { tech: "Amo essa stack! 🔥", profile: "Esse sou eu! 😎", projects: "Meus melhores projetos! 💪", contact: "Vamos conversar! 🤝" },
        fr: { tech: "J'adore cette stack! 🔥", profile: "C'est moi! 😎", projects: "Mon meilleur travail! 💪", contact: "Parlons! 🤝" }
    };

    mascot.classList.remove("excited");
    void mascot.offsetWidth; 
    mascot.classList.add("excited");

    if (section !== "home") {
        const message = reactions[currentLang][section] || "Welcome!";
        showCharacterMessage(message);
        setTimeout(() => hideCharacterMessage(), 2500);
    }
};

const animateMascot = (mascotState) => {
    const mascot = document.getElementById("character-mascot");
    if (!mascot) return;

    mascotState.x += (mascotState.targetX - mascotState.x) * 0.1;
    mascotState.y += (mascotState.targetY - mascotState.y) * 0.1;

    mascot.style.transform = `translate(${mascotState.x}px, ${mascotState.y - window.innerHeight + 120}px)`;
    
    requestAnimationFrame(() => animateMascot(mascotState));
};

const copyDiscord = (btn, tag, successMsg) => {
    navigator.clipboard.writeText(tag);
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check"></i> ${successMsg}`;
    btn.classList.add('copy-feedback');
    lucide.createIcons();
    setTimeout(() => { 
        btn.innerHTML = originalText; 
        btn.classList.remove('copy-feedback'); 
        lucide.createIcons(); 
    }, 2000);
};

const executeTour = (currentLang, translations) => {
    let currentTourStep = 0;
    const t = translations[currentLang].tour;
    const bubble = document.getElementById('tour-bubble');
    bubble.style.display = 'block';

    const steps = [
        { id: 'tour-start', text: t.step0 },
        { id: 'tour-stack', text: t.step1 },
        { id: 'tour-profile', text: t.step2 },
        { id: 'tour-projects', text: t.step3 },
        { id: 'contact', text: t.step4 }
    ];

    const showStep = () => {
        const step = steps[currentTourStep];
        const target = document.getElementById(step.id);
        
        document.querySelectorAll('.highlight-target').forEach(el => el.classList.remove('highlight-target'));
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('highlight-target');
        }

        const isLast = currentTourStep === steps.length - 1;
        bubble.innerHTML = `
            <div class="mono text-[10px] text-emerald-400 mb-2 uppercase tracking-widest">HOSCH.GUIDE_V1</div>
            <p class="text-white text-sm leading-relaxed mb-4">${step.text}</p>
            <button id="tour-next-btn" class="w-full bg-emerald-500 text-black py-2 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-white transition-colors">
                ${isLast ? t.finish : t.next}
            </button>
        `;

        document.getElementById('tour-next-btn').onclick = () => {
            if (isLast) {
                bubble.style.display = 'none';
                document.querySelectorAll('.highlight-target').forEach(el => el.classList.remove('highlight-target'));
            } else {
                currentTourStep++;
                showStep();
            }
        };
    };

    showStep();
};