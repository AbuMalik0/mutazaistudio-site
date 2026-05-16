document.addEventListener('DOMContentLoaded', () => {

    const htmlElement = document.documentElement;

    // --- Language Toggle ---
    const langToggleBtn = document.getElementById('lang-toggle');
    if (!langToggleBtn) return;

    const langTextEl = langToggleBtn.querySelector('.lang-text');

    const translations = {
        en: {
            home:         "HOME",
            services:     "SERVICES",
            testimonials: "TESTIMONIALS",
            contact:      "CONTACT",
            status:       "Online & Active",
            heroTitle:    "<span>THE <span class='text-accent'>AI</span></span><span class='text-accent'>SOLUTIONS</span><span class='align-end'>AGENCY</span>",
            heroSub:      "Redefining operational efficiency. Our AI agents drastically reduce overhead and execution time, driving a measurable increase in precision while simultaneously maximizing output quality.",
            cta:          "Book your free consultation",
            about:        "About Us",
            terms:        "Terms & Conditions",
            credentialsFooter: "Credentials",
            followUs:     "Follow Us",
            copyright:    "© 2026 Mutaz AI Studio. All rights reserved.",
            srvBadge:     "Our Services",
            srvTitle:     "Everything you need to scale",
            srvDesc:      "We leverage advanced AI to transform traditional workflows into high-performance digital engines.",
            srv1Title:    "AI Video Production",
            srv1Desc:     "Professional video production for products and brands — commercials, promotional content, and social media campaigns powered by AI.",
            srv2Title:    "AI Image & Product Photography",
            srv2Desc:     "Transform your product visuals into studio-quality content — without a camera, without a set.",
            srv3Title:    "AI Voiceover",
            srv3Desc:     "Natural Arabic and English voiceovers with studio-grade quality — tailored to your brand's tone and audience.",
            srv4Title:    "Content Automation",
            srv4Desc:     "Intelligent automation systems that produce, manage, and publish content at scale — consistently and efficiently.",
            srv5Title:    "Business Process Automation",
            srv5Desc:     "Custom automation solutions that streamline your operations, reduce manual work, and scale your business.",
            srv6Title:    "Web & Digital Design",
            srv6Desc:     "Modern websites and visual identities built to represent your brand at a global standard.",
            testBadge:    "CLIENT TESTIMONIALS",
            testTitle:    "WHAT OUR CLIENTS SAY",
            testDesc:     "",
            contactBadge: "Get in touch",
            contactTitle: "Book a free consultation",
            contactDesc:  "If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.",
            contactNameLabel: "Full name",
            contactNamePlaceholder: "Your name",
            contactEmailLabel: "Email",
            contactEmailPlaceholder: "you@example.com",
            contactPhoneLabel: "Phone number",
            contactPhonePlaceholder: "+966 5X XXX XXXX",
            contactMessageLabel: "Message",
            contactMessagePlaceholder: "What can we help you build?",
            contactSubmit: "Send message",
            contactNote: "We’ll get back to you with the next step.",
            contactSent: "Thanks. We’ll get back to you soon."
        },
        ar: {
            home:         "الرئيسية",
            services:     "خدماتنا",
            testimonials: "آراء العملاء",
            contact:      "تواصل معنا",
            status:       "متصل ونشط",
            heroTitle:    "<span>وكالة <span class='text-accent'>حلول</span></span><span class='text-accent'>الذكاء الاصطناعي</span>",
            heroSub:      "نعيد تعريف الكفاءة التشغيلية. وكلاء الذكاء الاصطناعي لدينا يقللون بشكل جذري من التكاليف العامة ووقت التنفيذ، مما يؤدي إلى زيادة قابلة للقياس في الدقة مع تعظيم جودة المخرجات في نفس الوقت.",
            cta:          "احجز استشارتك مجاناً",
            about:        "من نحن",
            terms:        "الشروط والأحكام",
            credentialsFooter: "الاعتمادات",
            followUs:     "تابعنا",
            copyright:    "© 2026 Mutaz AI Studio. جميع الحقوق محفوظة.",
            srvBadge:     "خدماتنا",
            srvTitle:     "كل ما تحتاجه لتوسيع نطاق أعمالك",
            srvDesc:      "نسخر قوة الذكاء الاصطناعي المتقدم لتحويل العمليات التقليدية<br>إلى محركات رقمية عالية الأداء.",
            srv1Title:    "إنتاج الفيديوهات بالذكاء الاصطناعي",
            srv1Desc:     "إنتاج فيديوهات احترافية للمنتجات والعلامات التجارية — إعلانات تجارية، محتوى ترويجي، وحملات سوشيال ميديا مدعومة بالذكاء الاصطناعي.",
            srv2Title:    "تصوير المنتجات بالذكاء الاصطناعي",
            srv2Desc:     "حوّل صور منتجاتك لمحتوى بصري بجودة استوديو احترافي — بدون كاميرا، بدون تصوير.",
            srv3Title:    "التعليق الصوتي بالذكاء الاصطناعي",
            srv3Desc:     "تعليق صوتي طبيعي بالعربية والإنجليزية بجودة استوديو — مناسب لهوية علامتك التجارية وجمهورك.",
            srv4Title:    "أتمتة المحتوى",
            srv4Desc:     "أنظمة أتمتة ذكية تنتج المحتوى وتديره وتنشره بشكل آلي — باستمرارية وكفاءة عالية.",
            srv5Title:    "أتمتة العمليات التجارية",
            srv5Desc:     "حلول أتمتة مخصصة تُبسّط عملياتك التشغيلية، تقلل العمل اليدوي، وتُوسّع نطاق مشروعك.",
            srv6Title:    "تصميم المواقع والهويات الرقمية",
            srv6Desc:     "مواقع عصرية وهويات بصرية مصممة لتعكس علامتك التجارية بمستوى عالمي.",
            testBadge:    "آراء عملائنا",
            testTitle:    "وش يقولون عملاؤنا",
            testDesc:     "",
            contactBadge: "تواصل معنا",
            contactTitle: "احجز استشارتك المجانية",
            contactDesc:  "إذا عندك أي سؤال عن خدماتنا أو تحتاج مساعدة، يرجى ملء النموذج هنا.<br>نحاول نرد عليك خلال يوم عمل واحد.",
            contactNameLabel: "الاسم الكامل",
            contactNamePlaceholder: "اسمك",
            contactEmailLabel: "البريد الإلكتروني",
            contactEmailPlaceholder: "you@example.com",
            contactPhoneLabel: "رقم الجوال",
            contactPhonePlaceholder: "+966 5X XXX XXXX",
            contactMessageLabel: "الرسالة",
            contactMessagePlaceholder: "وش تبغى نبني لك؟",
            contactSubmit: "إرسال الرسالة",
            contactNote: "بنرجع لك بالخطوة التالية.",
            contactSent: "تم الاستلام. بنرجع لك قريب."
        }
    };

    const mobileLangText = document.querySelector('.mobile-lang-text');

    let currentLang = localStorage.getItem('lang') || 'en';
    applyLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('lang', currentLang);
        window.location.reload(); // Force full page reload to properly reset Spline WebGL context in the new direction
    });

    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const setMobileMenu = (open) => {
        if (!mobileMenuToggle || !mobileMenu) return;
        mobileMenuToggle.classList.toggle('is-open', open);
        mobileMenu.classList.toggle('is-open', open);
        mobileMenuToggle.setAttribute('aria-expanded', String(open));
        mobileMenu.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('mobile-menu-open', open);
    };

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            setMobileMenu(!mobileMenu.classList.contains('is-open'));
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => setMobileMenu(false));
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            setMobileMenu(false);

            const navbar = document.querySelector('.navbar');
            const navHeight = navbar ? navbar.getBoundingClientRect().height : 0;
            const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: Math.max(0, Math.round(targetTop)),
                behavior: 'smooth'
            });

            history.pushState(null, '', targetId);
        });
    });

    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', () => langToggleBtn.click());
    }

    let lastMobileState = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
        const isMobileState = window.innerWidth <= 767;
        if (isMobileState !== lastMobileState) {
            lastMobileState = isMobileState;
            applyLanguage(currentLang);
        }
    });

    function applyLanguage(lang) {
        const t = translations[lang];
        const isAr = lang === 'ar';

        // Button label
        langTextEl.textContent = isAr ? 'EN' : 'AR';
        if (mobileLangText) mobileLangText.textContent = isAr ? 'EN' : 'AR';

        // Document direction & lang
        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');

        // Body font
        document.body.style.fontFamily = isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif";

        // Nav links
        const navHome = document.getElementById('nav-home');
        const navServices = document.getElementById('nav-services');
        const navTestimonials = document.getElementById('nav-testimonials');
        const navContact = document.getElementById('nav-contact');
        
        if (navHome) navHome.textContent = t.home;
        if (navServices) navServices.textContent = t.services;
        if (navTestimonials) navTestimonials.textContent = t.testimonials;
        if (navContact) navContact.textContent = t.contact;

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            const source = document.getElementById(link.dataset.navSource);
            if (source) {
                link.textContent = source.textContent;
                link.setAttribute('href', source.getAttribute('href'));
            }
        });

        // Status badge
        const statusText = document.querySelector('.status-text');
        if (statusText) statusText.textContent = t.status;

        // Hero title — set HTML first, then apply font styles
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = t.heroTitle;
            if (isAr) {
                heroTitle.style.fontFamily = "'Cairo', sans-serif";
                heroTitle.style.lineHeight  = '1.3';
                heroTitle.style.letterSpacing = '0';
                heroTitle.style.paddingBottom = '0.2em';
                
                // Break title naturally in mobile as requested: وكالة حلول / الذكاء الاصطناعي
                if (window.innerWidth <= 767) {
                    heroTitle.innerHTML = "<span>وكالة <span class='text-accent'>حلول</span></span><span class='text-accent'>الذكاء الاصطناعي</span>";
                }
            } else {
                heroTitle.style.fontFamily = "'Outfit', sans-serif";
                heroTitle.style.lineHeight  = '1.1';
                heroTitle.style.letterSpacing = '-2px';
                heroTitle.style.paddingBottom = '0';
                if (window.innerWidth <= 767) {
                    heroTitle.innerHTML = "<span>THE <span class='text-accent'>AI</span></span><span class='text-accent'>SOLUTIONS</span><span>AGENCY</span>";
                    heroTitle.style.letterSpacing = '0';
                }
            }
        }

        // Hero subtitle
        const heroSub = document.querySelector('.hero-subtitle');
        if (heroSub) {
            if (window.innerWidth <= 767) {
                heroSub.innerHTML = isAr
                    ? "نعيد تعريف الكفاءة التشغيلية.<br>نقلل التكاليف ووقت التنفيذ.<br>ونرفع جودة المخرجات."
                    : "Redefining operational efficiency.<br>AI agents reduce time and overhead.<br>And maximize output quality.";
            } else {
                heroSub.textContent = t.heroSub;
            }
        }
        
        // CTA Button
        const heroCta = document.getElementById('hero-cta');
        if (heroCta) heroCta.textContent = t.cta;

        // Body font
        document.body.style.fontFamily = isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif";

        // Footer links
        const footerAbout = document.getElementById('footer-about');
        const footerTerms = document.getElementById('footer-terms');
        const footerCredentials = document.getElementById('footer-credentials');
        if (footerAbout) {
            footerAbout.textContent = t.about;
            footerAbout.href = isAr ? 'about-us.html' : 'about-us-en.html';
        }
        if (footerTerms) {
            footerTerms.textContent = t.terms;
            footerTerms.href = isAr ? 'terms-final-ar.html' : 'terms-final-en.html';
        }
        if (footerCredentials) {
            footerCredentials.textContent = t.credentialsFooter;
            footerCredentials.href = isAr ? 'credentials.html' : 'credentials-en.html';
        }

        const socialTitle = document.getElementById('social-title');
        const copyright = document.getElementById('copyright');
        if (socialTitle) socialTitle.textContent = t.followUs;
        if (copyright) copyright.textContent = t.copyright;

        // Services section
        const srvBadge = document.getElementById('services-badge');
        const srvTitle = document.getElementById('services-title');
        const srvDesc = document.getElementById('services-desc');
        if (srvBadge) srvBadge.textContent = t.srvBadge;
        if (srvTitle) {
            if (window.innerWidth <= 767) {
                srvTitle.innerHTML = isAr ? "كل ما تحتاجه لتوسيع<br>نطاق أعمالك" : "Everything you need<br>to scale";
            } else {
                srvTitle.textContent = t.srvTitle;
            }
        }
        if (srvDesc) srvDesc.innerHTML = t.srvDesc; // innerHTML to support <br> tags

        // Testimonials header
        const testBadge = document.getElementById('test-badge');
        const testTitle = document.getElementById('test-title');
        const testDesc  = document.getElementById('test-desc');
        if (testBadge) testBadge.textContent = t.testBadge;
        if (testTitle) testTitle.textContent = t.testTitle;
        if (testDesc)  testDesc.textContent  = t.testDesc;

        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };
        const setPlaceholder = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.placeholder = value;
        };

        setText('contact-badge', t.contactBadge);
        setText('contact-title', t.contactTitle);
        const contactDesc = document.getElementById('contact-desc');
        if (contactDesc) contactDesc.innerHTML = t.contactDesc;
        setText('contact-name-label', t.contactNameLabel);
        setText('contact-email-label', t.contactEmailLabel);
        setText('contact-phone-label', t.contactPhoneLabel);
        setText('contact-message-label', t.contactMessageLabel);
        setText('contact-submit', t.contactSubmit);
        setText('contact-form-note', t.contactNote);
        setPlaceholder('contact-name', t.contactNamePlaceholder);
        setPlaceholder('contact-email', t.contactEmailPlaceholder);
        setPlaceholder('contact-phone', t.contactPhonePlaceholder);
        setPlaceholder('contact-message', t.contactMessagePlaceholder);

        for (let i = 1; i <= 6; i++) {
            const titleEl = document.getElementById(`srv${i}-title`);
            const descEl = document.getElementById(`srv${i}-desc`);
            if (titleEl) titleEl.textContent = t[`srv${i}Title`];
            if (descEl) descEl.textContent = t[`srv${i}Desc`];
        }
    }

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    const contactFeedback = {
        en: {
            sending: 'Sending...',
            error: 'Sorry, the message could not be sent. Please try again.'
        },
        ar: {
            sending: '\u062c\u0627\u0631\u064a \u0627\u0644\u0625\u0631\u0633\u0627\u0644...',
            error: '\u062a\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629. \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.'
        }
    };

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        let isSendingContact = false;

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (isSendingContact) return;

            const note = document.getElementById('contact-form-note');
            const lang = (localStorage.getItem('lang') || currentLang) === 'ar' ? 'ar' : 'en';
            const feedback = contactFeedback[lang];
            const formData = new FormData(contactForm);
            const payload = {
                name: String(formData.get('name') || '').trim(),
                email: String(formData.get('email') || '').trim(),
                phone: String(formData.get('phone') || '').trim(),
                message: String(formData.get('message') || '').trim(),
                language: lang
            };

            isSendingContact = true;
            if (note) {
                note.textContent = feedback.sending;
                note.classList.remove('is-sent');
            }

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Contact request failed');
                }

                if (note) {
                    note.textContent = translations[lang].contactSent;
                    note.classList.add('is-sent');
                }
                contactForm.reset();
            } catch (error) {
                console.error(error);
                if (note) {
                    note.textContent = feedback.error;
                    note.classList.remove('is-sent');
                }
            } finally {
                isSendingContact = false;
            }
        });
    }

    // ====================== Testimonials Carousel ======================
    const testimonialsData = [
        { quote: "Mutaz AI Studio saved us more than 40 hours a week. The automation manages all of our content with no involvement from us.", name: "Mohammed Al-Otaibi", role: "Freelance Digital Marketer, Riyadh", ar_quote: "Mutaz AI Studio وفر لنا أكثر من 40 ساعه أسبوعياً الأتمتة تدير المحتوى بالكامل بدون اي تدخل منا", ar_name: "محمد العتيبي", ar_role: "مسوّق رقمي حر، الرياض" },
        { quote: "The AI product photos were better than the studio shoot.", name: "Rasha Al-Ghamdi", role: "E-commerce Founder, Jeddah", ar_quote: "صور المنتجات بالذكاء الاصطناعي كانت افضل من تصوير الاستوديو", ar_name: "رشا الغامدي", ar_role: "مؤسسة متجر إلكتروني، جدة" },
        { quote: "Mutaz AI Studio automated client intake, follow-ups, and reports.", name: "Tariq Al-Shamrani", role: "Legal Consultant, Riyadh", ar_quote: "Mutaz AI Studio اتمت استقبال العملاء والمتابعة والتقارير", ar_name: "طارق الشمراني", ar_role: "مستشار قانوني، الرياض" },
        { quote: "I was worried about AI voiceover, but honestly the voiceover came out realistic, like a professional broadcaster's narration.", name: "Sami Al-Zahrani", role: "Podcast Producer & Trainer", ar_quote: "كنت متخوف من التعليق الصوتي بالذكاء الاصطناعي لكن التعليق صراحة طلع واقعي وكأنه تعليق مذيع احترافي", ar_name: "سامي الزهراني", ar_role: "منتج بودكاست ومدرب" },
        { quote: "They redesigned our website and visual identity in three weeks with exceptional quality. They went above and beyond for us, and we truly appreciate them.", name: "Abu Salman", role: "Healthcare Center, Dammam", ar_quote: "أعادوا تصميم موقعنا وهويتنا البصرية في ثلاث اسابيع بجودة استثنائية سو الواجب معانا وزيادة الله يعطيهم العافية", ar_name: "أبو سلمان", ar_role: "مركز رعاية صحية، الدمام" }
    ];

    let currentIndex = 0;
    const isRtl = () => document.documentElement.getAttribute('dir') === 'rtl';

    const renderCards = () => {
        const track = document.getElementById('stagger-track');
        if (!track) return;
        track.innerHTML = '';
        const total = testimonialsData.length;
        const compactSlider = window.innerWidth <= 700;
        const gap = compactSlider ? Math.min(176, window.innerWidth * 0.5) : 305; // Stagger cards out like the reference slider

        // Each card position gets its own size & tilt for the staggered slide effect.
        const cardConfig = compactSlider ? {
            '-2': { w: 230, y: -76, rot: -3.5 },
            '-1': { w: 244, y: -86, rot: 2.2  },
             '0': { w: 268, y: -98, rot: 0    },
             '1': { w: 242, y: -82, rot: -2.4 },
             '2': { w: 232, y: -74, rot: 3.4  }
        } : {
            '-2': { w: 380, y: -128, rot: -3.2 },
            '-1': { w: 405, y: -148, rot: 2.1  },
             '0': { w: 430, y: -205, rot: 0    },
             '1': { w: 392, y: -140, rot: -2.4 },
             '2': { w: 372, y: -124, rot: 3.3  }
        };

        for (let offset = -2; offset <= 2; offset++) {
            const idx = (currentIndex + offset + total) % total;
            const d = testimonialsData[idx];
            const card = document.createElement('div');
            card.className = 't-card' + (offset === 0 ? ' is-center' : '');

            const cfg = cardConfig[String(offset)];
            const absOffset = Math.abs(offset);
            const xShift = offset * gap;
            const yShift = cfg.y;
            const scale  = offset === 0 ? 1.04 : 1 - absOffset * 0.03;
            const zIndex = 10 - absOffset;
            const cardNum = String(idx + 1).padStart(2, '0');

            card.style.cssText = `
                transform: translate(calc(-50% + ${xShift}px), ${yShift}px) rotate(${cfg.rot}deg) scale(${scale});
                opacity: 1;
                z-index: ${zIndex};
                width: ${cfg.w}px;
            `;

            const authorName = isRtl() ? d.ar_name : d.name;

            card.innerHTML = `
                <span class="t-card-num">#${cardNum}</span>
                <p class="t-card-quote">"${isRtl() ? d.ar_quote : d.quote}"</p>
                <div class="t-card-author">
                    <p class="t-card-role">${authorName}</p>
                </div>
            `;

            if (offset !== 0) {
                card.addEventListener('click', () => {
                    currentIndex = (currentIndex + offset + total) % total;
                    renderCards();
                });
            }

            track.appendChild(card);
        }
    };

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const totalCards = testimonialsData.length;

    if (btnPrev) btnPrev.addEventListener('click', () => { currentIndex = (currentIndex - 1 + totalCards) % totalCards; renderCards(); });
    if (btnNext) btnNext.addEventListener('click', () => { currentIndex = (currentIndex + 1) % totalCards; renderCards(); });
    window.addEventListener('resize', renderCards);

    renderCards();
});
