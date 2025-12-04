// Quickserve IT - Complete Application JavaScript
// Production-ready with all features

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const CONFIG = {
        whatsappNumber: '916388224877',
        email: 'letsquickserveit@gmail.com',
        address: 'Gorakhpur Rural, UP, India',
        phone: '6388224877',
        workingHours: {
            weekday: { start: 10, end: 16 },
            saturday: { start: 9, end: 12 },
            sunday: { closed: true }
        }
    };

    // ===== LANGUAGE TRANSLATIONS =====
    const TRANSLATIONS = {
        greetings: {
            morning: {
                en: "good morning! let's make your digital work shine ✨",
                hi: "सुप्रभात! आपके डिजिटल काम को चमकदार बनाएं ✨"
            },
            afternoon: {
                en: "good afternoon! ready to elevate your digital presence?",
                hi: "नमस्कार! अपनी डिजिटल उपस्थिति बढ़ाने के लिए तैयार?"
            },
            evening: {
                en: "good evening! we're here to help you succeed 🌆",
                hi: "शुभ संध्या! हम आपकी सफलता में मदद के लिए यहाँ हैं 🌆"
            },
            night: {
                en: "still working? let quickserve it handle your stress 🌙",
                hi: "अभी काम कर रहे? quickserve it को संभालने दें 🌙"
            }
        },
        typewriterLines: {
            en: [
                'bring structure to your digital work',
                'improve your school workflow',
                'make your videos stand out',
                'create error-free documents',
                'help teachers work faster',
                'make creators grow consistently',
                'keep your files professional',
                'reduce your daily digital stress',
                'improve academic clarity',
                'turn raw files into premium output',
                'serve rural India with metro quality'
            ],
            hi: [
                'आपके डिजिटल काम को संरचित करें',
                'आपके स्कूल वर्कफ्लो में सुधार करें',
                'आपके वीडियो को अलग बनाएं',
                'त्रुटि मुक्त दस्तावेज़ बनाएं',
                'शिक्षकों को तेजी से काम करने में मदद करें',
                'निर्माताओं को लगातार बढ़ने में मदद करें',
                'आपकी फाइलों को पेशेवर रखें',
                'आपके दैनिक डिजिटल तनाव को कम करें',
                'शैक्षणिक स्पष्टता में सुधार करें',
                'कच्ची फाइलों को प्रीमियम आउटपुट में बदलें',
                'ग्रामीण भारत को मेट्रो गुणवत्ता के साथ सेवा दें'
            ]
        },
        toast: {
            copied: { en: 'Copied to clipboard! ✓', hi: 'क्लिपबोर्ड पर कॉपी किया गया! ✓' },
            error: { en: 'Failed to copy. Please try again.', hi: 'कॉपी करने में विफल। कृपया पुनः प्रयास करें।' },
            formError: { en: 'Please fill all required fields', hi: 'कृपया सभी आवश्यक फ़ील्ड भरें' },
            preparing: { en: 'Message ready! Opening WhatsApp...', hi: 'संदेश तैयार! WhatsApp खोल रहे हैं...' },
            langSwitch: { en: 'Language switched to', hi: 'भाषा बदली गई' }
        }
    };

    // ===== STATE MANAGEMENT =====
    let currentLang = 'en';

    // ===== UTILITY FUNCTIONS =====
    function showToast(messageKey, type = 'success') {
        const message = typeof messageKey === 'string' && messageKey.includes(' ') 
            ? messageKey 
            : TRANSLATIONS.toast[messageKey] ? TRANSLATIONS.toast[messageKey][currentLang] : messageKey;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        if (type === 'error') {
            toast.style.background = '#EF4444';
            toast.style.color = '#FFFFFF';
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    }

    // ===== CURSOR GLOW REMOVED =====
    // No cursor glow for static background.



    // ===== TIME-BASED GREETING =====
    function updateGreeting() {
        const hour = new Date().getHours();
        const greetingEl = document.getElementById('greeting');
        if (!greetingEl) return;
        
        let greeting;
        if (hour >= 6 && hour < 12) {
            greeting = currentLang === 'en' 
                ? "Good morning! Let's elevate your digital presence ✨" 
                : "सुप्रभात! आइए अपनी डिजिटल उपस्थिति को ऊंचा करें ✨";
        } else if (hour >= 12 && hour < 17) {
            greeting = currentLang === 'en' 
                ? "Good afternoon! Ready to transform your digital work?" 
                : "शुभ दोपहर! अपने डिजिटल काम को बदलने के लिए तैयार?";
        } else if (hour >= 17 && hour < 21) {
            greeting = currentLang === 'en' 
                ? "Good evening! Let's create something amazing together 🌆" 
                : "शुभ संध्या! आइए साथ में कुछ अद्भुत बनाएं 🌆";
        } else {
            greeting = currentLang === 'en' 
                ? "Still working? Let QuickServe IT handle your stress 🌙" 
                : "अभी भी काम कर रहे? QuickServe IT को अपना तनाव संभालने दें 🌙";
        }
        
        greetingEl.textContent = greeting;
    }

    // ===== ONLINE STATUS =====
    function updateOnlineStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 6 = Saturday
        const hour = now.getHours();
        const statusChip = document.getElementById('statusChip');
        const statusText = document.getElementById('statusText');
        
        if (!statusChip || !statusText) return;
        
        let isOnline = false;
        
        if (day >= 1 && day <= 5) { // Monday to Friday
            isOnline = hour >= 10 && hour < 16;
        } else if (day === 6) { // Saturday
            isOnline = hour >= 9 && hour < 12;
        }
        
        if (isOnline) {
            statusChip.classList.remove('offline');
            statusText.setAttribute('data-en', 'Online');
            statusText.setAttribute('data-hi', 'ऑनलाइन');
            statusText.textContent = currentLang === 'en' ? 'Online' : 'ऑनलाइन';
        } else {
            statusChip.classList.add('offline');
            statusText.setAttribute('data-en', 'Offline');
            statusText.setAttribute('data-hi', 'ऑफलाइन');
            statusText.textContent = currentLang === 'en' ? 'Offline' : 'ऑफलाइन';
        }
    }

    // ===== TYPEWRITER ANIMATION (PRODUCTION FINAL) =====
    function initTypewriter() {
      const typewriterEl = document.getElementById('typewriter');
      if (!typewriterEl) return;

      const lines = [
        'brings professional quality to your work',
        'saves you time and reduces stress daily',
        'delivers results you can trust always',
        'supports your growth consistently',
        'provides solutions that actually work',
        'creates lasting professional impact',
        'streamlines your digital workflow',
        'ensures excellence in every project',
        'transforms raw files into premium output',
        'makes digital work effortless for you',
        'serves rural India with metro quality',
        'understands your needs deeply',
        'delivers on time, every time',
        'builds long-term partnerships',
        'offers transparent honest pricing'
      ];

      let lineIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      function typewriterStep() {
        const currentLine = lines[lineIdx];

        if (!isDeleting) {
          typewriterEl.textContent = currentLine.substring(0, charIdx + 1);
          charIdx++;

          if (charIdx === currentLine.length) {
            isDeleting = true;
            setTimeout(typewriterStep, 1500);
            return;
          }
        } else {
          typewriterEl.textContent = currentLine.substring(0, charIdx - 1);
          charIdx--;

          if (charIdx === 0) {
            isDeleting = false;
            lineIdx = (lineIdx + 1) % lines.length;
            setTimeout(typewriterStep, 500);
            return;
          }
        }
        setTimeout(typewriterStep, isDeleting ? 25 : 60);
      }

      typewriterStep();
    }

    // ===== SCROLL REVEAL (ENHANCED) =====
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                // Add staggered delay for grid items
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 50);
            }
        });
    }

    // ===== IMMEDIATE REVEAL FOR HERO SECTION =====
    function revealHeroSection() {
        const heroElements = document.querySelectorAll('.hero-centered .reveal, .hero-centered');
        heroElements.forEach(element => {
            element.classList.add('active');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // ===== THEME TOGGLE =====
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            
            const icon = themeToggle.querySelector('i');
            icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // ===== LANGUAGE SWITCHING =====
    function switchLanguage(lang) {
        currentLang = lang;
        const html = document.documentElement;
        html.setAttribute('data-lang', lang);

        // Update all translatable elements
        document.querySelectorAll('[data-en]').forEach(element => {
            const enText = element.getAttribute('data-en');
            const hiText = element.getAttribute('data-hi');
            
            if (lang === 'hi' && hiText) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = hiText;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = hiText;
                } else {
                    element.textContent = hiText;
                }
            } else if (lang === 'en' && enText) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = enText;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = enText;
                } else {
                    element.textContent = enText;
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-placeholder-en]').forEach(element => {
            const enPlaceholder = element.getAttribute('data-placeholder-en');
            const hiPlaceholder = element.getAttribute('data-placeholder-hi');
            element.placeholder = lang === 'hi' ? hiPlaceholder : enPlaceholder;
        });

        // Update greeting
        updateGreeting();

        // Update language button
        const langSwitch = document.getElementById('langSwitch');
        if (langSwitch) {
            langSwitch.textContent = lang === 'en' ? 'हिंदी' : 'English';
        }

        showToast(`${TRANSLATIONS.toast.langSwitch[lang]} ${lang === 'en' ? 'English' : 'हिंदी'}`);
    }

    function initLanguageSwitch() {
        const langSwitch = document.getElementById('langSwitch');
        if (!langSwitch) return;

        langSwitch.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'hi' : 'en';
            switchLanguage(newLang);
        });
    }

    // ===== COPY TO CLIPBOARD (SIMPLE TOAST) =====
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            const toast = document.createElement('div');
            toast.textContent = 'Copied! ✓';
            toast.style.cssText = `
                position: fixed; bottom: 20px; right: 20px;
                background: #4ADE80; color: #0B0B0B; padding: 12px 16px;
                border-radius: 4px; font-weight: 600; z-index: 1000;
                animation: fadeInOut 2s ease-in-out;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        });
    };

    // ===== CONTACT FORM HANDLER =====
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name') || '',
                mobile: formData.get('mobile') || '',
                email: formData.get('email') || '',
                service: formData.get('service') || '',
                message: formData.get('message') || ''
            };

            // Validate
            if (!data.name || !data.mobile || !data.email || !data.service) {
                showToast('formError', 'error');
                return;
            }

            // Generate professional message
            const whatsappMessage = currentLang === 'en'
                ? `Hello Quickserve IT,\n\nI would like to inquire about your professional services.\n\nName: ${data.name}\nMobile: ${data.mobile}\nEmail: ${data.email}\nService Required: ${data.service}\n\nProject Details:\n${data.message || 'Will discuss further'}\n\nI would appreciate receiving a detailed quotation and expected timeline at your earliest convenience.\n\nThank you for your attention to this matter.\n\nBest regards,\n${data.name}`
                : `नमस्ते Quickserve IT,\n\nमैं आपकी पेशेवर सेवाओं के बारे में पूछताछ करना चाहूंगा/चाहूंगी।\n\nनाम: ${data.name}\nमोबाइल: ${data.mobile}\nईमेल: ${data.email}\nआवश्यक सेवा: ${data.service}\n\nपरियोजना विवरण:\n${data.message || 'आगे चर्चा करेंगे'}\n\nकृपया विस्तृत मूल्य निर्धारण और अपेक्षित समयसीमा यथाशीघ्र प्रदान करें।\n\nइस मामले पर आपके ध्यान के लिए धन्यवाद।\n\nसादर,\n${data.name}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

            showToast('preparing');

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                form.reset();
            }, 500);
        });
    }

    // ===== SMOOTH SCROLLING =====
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }

    // ===== MOBILE MENU (ENHANCED) =====
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const navItems = document.querySelectorAll('.nav-item');

        if (!mobileMenuBtn || !navMenu) return;

        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Handle dropdown toggles on mobile
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const dropdown = item.querySelector('.dropdown-menu');
            
            if (dropdown && window.innerWidth <= 768) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        item.classList.toggle('open');
                    }
                });
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
                navItems.forEach(item => item.classList.remove('open'));
            }
        });
    }

    // ===== PREMIUM PARTICLE ANIMATION (EXACT CODE AS PROVIDED) =====
    function initParticleAnimation() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#D4AF37','#F3D27B','#fff','#E0E0E0'];
        const numParticles = window.innerWidth < 768 ? 40 : 80;
        const repulseRadius = 100;

        let mouse = { x: null, y: null };

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });
        window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 3 + 1;
            this.color = colors[Math.floor(Math.random()*colors.length)];
            this.opacity = Math.random()*0.4+0.3;
            this.baseOpacity = this.opacity;
        }
        Particle.prototype.draw = function() {
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        };
        Particle.prototype.update = function() {
            // Mouse repulsion
            if(mouse.x && mouse.y) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < repulseRadius) {
                    let angle = Math.atan2(dy,dx);
                    let force = (repulseRadius - distance)/repulseRadius;
                    this.x += Math.cos(angle) * force * 5;
                    this.y += Math.sin(angle) * force * 5;
                    this.opacity = Math.min(1, this.baseOpacity + force * 0.6);
                } else {
                    this.x += this.vx;
                    this.y += this.vy;
                    if(this.opacity > this.baseOpacity) {
                        this.opacity -= 0.01;
                    } else if(this.opacity < this.baseOpacity) {
                        this.opacity = this.baseOpacity;
                    }
                }
            } else {
                this.x += this.vx;
                this.y += this.vy;
            }
            // Respawn if out of bounds
            if(this.x > canvas.width) this.x = 0;
            if(this.x < 0) this.x = canvas.width;
            if(this.y > canvas.height) this.y = 0;
            if(this.y < 0) this.y = canvas.height;
        };

        function setup() {
            for(let i=0;i<numParticles;i++) {
                particles.push(new Particle());
            }
        }
        function animate() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            particles.forEach(p=>{ p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        setup();
        animate();
    }



    // ===== HEADER SCROLL EFFECT =====
    function initHeaderScroll() {
        const header = document.querySelector('header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.padding = '12px 0';
                header.style.background = 'rgba(11, 11, 11, 0.95)';
            } else {
                header.style.padding = '16px 0';
                header.style.background = 'rgba(11, 11, 11, 0.85)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ===== INITIALIZATION =====
    function init() {
        // Initialize premium particle animation FIRST (most important)
        initParticleAnimation();

        // Update greeting based on time
        updateGreeting();

        // Update online status
        updateOnlineStatus();
        setInterval(updateOnlineStatus, 60000); // Check every minute

        // Initialize typewriter
        initTypewriter();

        // Initialize scroll reveal
        revealHeroSection();
        revealOnScroll();
        window.addEventListener('scroll', revealOnScroll);
        
        // Add smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Initialize theme toggle
        initThemeToggle();

        // Initialize language switching
        initLanguageSwitch();

        // Initialize contact form
        initContactForm();

        // Initialize smooth scrolling
        initSmoothScrolling();

        // Initialize mobile menu
        initMobileMenu();
        
        // Initialize header scroll effect
        initHeaderScroll();
        
        // Add loading complete class
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose utilities globally
    window.QuickserveIT = {
        switchLanguage,
        showToast,
        CONFIG
    };

})();
