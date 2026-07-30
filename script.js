/**
 * Core Logic for Hosch Alef Portfolio - Enhanced with GSAP, Three.js, Anime.js, Motion
 */

// THREE.JS Interactive Background (Moved to birds.js)

// 2. ANIME.JS Loader
const initAnimeLoader = (onComplete) => {
    const loader = document.getElementById('loader');
    if (!loader) {
        if(onComplete) onComplete();
        return;
    }

    const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800,
        complete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    loader.style.display = 'none';
                    if (onComplete) onComplete();
                }
            });
            setupGSAPMascot();
            initLivingPortfolio();

            // Apply scramble to main titles on load
            const titles = document.querySelectorAll('.gradient-text');
            titles.forEach(t => scrambleText(t, t.innerText));
            
            // Add scramble on hover for titles
            titles.forEach(t => {
                t.addEventListener('mouseenter', () => {
                    scrambleText(t, t.innerText);
                });
            });
        }
    });

    tl.add({
        targets: '.loader-progress',
        width: ['0%', '100%'],
        duration: 1500,
        easing: 'easeInOutQuart'
    })
    .add({
        targets: '.loader-text',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
    }, '-=1000')
    .add({
        targets: '.loader-text',
        opacity: 0,
        duration: 400,
        delay: 200
    });
};

// 3. GSAP Animations (Scroll & Mascot)
const initGSAPAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Refresh on resize
    window.addEventListener("resize", () => ScrollTrigger.refresh());

    // Fade up sections
    const sections = document.querySelectorAll('.reveal');
    sections.forEach((section) => {
        // Remove active class if it exists from old logic
        section.classList.remove('active');
        
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            {
                opacity: 1, 
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Stagger skill items
    const skills = document.querySelectorAll('#tour-stack .glass');
    if (skills.length > 0) {
        gsap.fromTo(skills,
            { opacity: 0, scale: 0.8, y: 30 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '#tour-stack',
                    start: 'top 80%',
                }
            }
        );
    }
};

const setupGSAPMascot = () => {
    const mascot = document.getElementById("character-mascot");
    if (!mascot) return;
    
    // Instead of raw JS requestAnimationFrame, let's use GSAP ScrollTrigger to move the mascot
    // Mascot starts left, goes right, goes left
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrubbing
            onUpdate: (self) => {
                // Determine direction for flipping
                if (self.direction === 1) {
                    mascot.classList.remove("flip");
                } else {
                    mascot.classList.add("flip");
                }
            }
        }
    });

    const windowWidth = window.innerWidth;
    const padding = 50;

    tl.to(mascot, {
        x: windowWidth - mascot.offsetWidth - padding,
        y: -300, // Move up as we scroll
        ease: "sine.inOut",
        duration: 1
    })
    .to(mascot, {
        x: padding,
        y: -600,
        ease: "sine.inOut",
        duration: 1
    });
};

const triggerGSAPMascotJump = () => {
    const mascot = document.getElementById("character-mascot");
    if (!mascot) return;
    
    gsap.fromTo(mascot, 
        { y: mascot._gsTransform ? mascot._gsTransform.y : 0 }, 
        { y: "-=60", duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" }
    );
};

// 4. Motion.dev Micro-interactions
const initMotionHover = () => {
    if (typeof Motion === 'undefined') return;
    const { animate, spring } = Motion;

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            animate(card, { y: -10, scale: 1.02 }, { easing: spring({ stiffness: 300, damping: 20 }) });
        });
        card.addEventListener('mouseleave', () => {
            animate(card, { y: 0, scale: 1 }, { easing: spring({ stiffness: 300, damping: 20 }) });
        });
    });

    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            animate(profileImg, { scale: 1.05, rotate: 2 }, { easing: spring({ stiffness: 400, damping: 15 }) });
        });
        profileImg.addEventListener('mouseleave', () => {
            animate(profileImg, { scale: 1, rotate: 0 }, { easing: spring({ stiffness: 400, damping: 15 }) });
        });
    }
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
    gsap.to(bubble, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
    
    if (profileImg) {
        profileImg.classList.add("speaking");
        profileImg.classList.remove("idle");
    }
};

const hideCharacterMessage = () => {
    const bubble = document.getElementById("character-bubble");
    const profileImg = document.getElementById("profile-img");
    
    if (bubble) {
        gsap.to(bubble, { opacity: 0, y: 10, scale: 0.9, duration: 0.3 });
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

    triggerGSAPMascotJump();

    if (section !== "home") {
        const message = reactions[currentLang][section] || "Welcome!";
        showCharacterMessage(message);
        setTimeout(() => hideCharacterMessage(), 2500);
    }
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

const startTour = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash !== 'home' && hash !== 'contact') {
        window.location.hash = 'home';
        setTimeout(() => executeTour(currentLang, translations), 500);
    } else {
        executeTour(currentLang, translations);
    }
};

const executeTour = (currentLang, translations) => {
    // We attach currentTourStep to window so helper functions can access it
    window.currentTourStep = 0;
    const t = translations[currentLang].tour;
    const bubble = document.getElementById('tour-bubble');
    bubble.style.display = 'block';

    window.showTourStep = () => {
        const step = [
            { id: 'tour-start', text: t.step0 },
            { id: 'tour-stack', text: t.step1 },
            { id: 'tour-profile', text: t.step2 },
            { id: 'tour-projects', text: t.step3 },
            { id: 'contact', text: t.step4 }
        ][window.currentTourStep];
        
        const target = document.getElementById(step.id);
        
        document.querySelectorAll('.highlight-target').forEach(el => el.classList.remove('highlight-target'));
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('highlight-target');
        }

        const isLast = window.currentTourStep === 4;
        bubble.innerHTML = `
            <div class="mono text-[10px] text-emerald-400 mb-2 uppercase tracking-widest">HOSCH.GUIDE_V1</div>
            <p class="text-white text-sm leading-relaxed mb-4">${step.text}</p>
            <button onclick="${isLast ? 'endTour()' : 'nextTourStep()'}" class="w-full bg-emerald-500 text-black py-2 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-white transition-colors">
                ${isLast ? t.finish : t.next}
            </button>
        `;
    };

    window.showTourStep();
};

const nextTourStep = () => { window.currentTourStep++; window.showTourStep(); };
const endTour = () => {
    document.getElementById('tour-bubble').style.display = 'none';
    document.querySelectorAll('.highlight-target').forEach(el => el.classList.remove('highlight-target'));
};

// 5. Living Portfolio Systems (HUD, Scramble, Idle)
const initLivingPortfolio = () => {
    // 5.1 HUD Logic
    const timeEl = document.getElementById('hud-time');
    const uptimeEl = document.getElementById('hud-uptime');
    const mouseEl = document.getElementById('hud-mouse');
    
    let startTime = Date.now();
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        currentX = e.clientX;
        currentY = e.clientY;
        if(mouseEl) mouseEl.textContent = `POS: X${String(currentX).padStart(4, '0')} Y${String(currentY).padStart(4, '0')}`;
    });

    setInterval(() => {
        const now = new Date();
        if(timeEl) timeEl.textContent = `T: ${now.toLocaleTimeString('en-US', {hour12: false})}.${String(now.getMilliseconds()).padStart(3, '0').slice(0, 2)}`;
        
        const uptimeStr = Math.floor((Date.now() - startTime) / 1000);
        if(uptimeEl) uptimeEl.textContent = `UP: ${uptimeStr}s`;
    }, 50);

    // 5.2 Mascot Idle Autonomy
    let idleTimer;
    const resetIdle = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            const mascot = document.getElementById('character-mascot');
            const bubble = document.getElementById('character-bubble');
            if(mascot && bubble && (bubble.style.opacity == "" || bubble.style.opacity == "0")) {
                if (typeof triggerGSAPMascotJump === 'function') triggerGSAPMascotJump();
                showCharacterMessage("... System idle. You there? 📡");
                setTimeout(() => hideCharacterMessage(), 4000);
            }
        }, 15000); // 15 seconds of inactivity
    };

    document.addEventListener('mousemove', resetIdle);
    document.addEventListener('keydown', resetIdle);
    document.addEventListener('scroll', resetIdle);
    resetIdle();

    // 5.3 Breathing UI (Muito sutil)
    if (typeof gsap !== 'undefined') {
        gsap.to('.glass', {
            scale: 1.002,
            duration: 6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            stagger: { amount: 1.5, from: "random" }
        });
    }
};

const scrambleText = (element) => {
    const originalText = element.getAttribute('data-original') || element.innerText;
    if (!element.getAttribute('data-original')) {
        element.setAttribute('data-original', originalText);
    }
    
    const chars = '!<>-_\\/[]{}—=+*^?#_';
    let iterations = 0;
    
    clearInterval(element.scrambleInterval);
    
    element.scrambleInterval = setInterval(() => {
        element.innerText = originalText.split('')
            .map((letter, index) => {
                if(index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('');
        
        if(iterations >= originalText.length) {
            clearInterval(element.scrambleInterval);
            element.innerText = originalText;
        }
        iterations += 1/2; // Speed of decoding
    }, 30);
};