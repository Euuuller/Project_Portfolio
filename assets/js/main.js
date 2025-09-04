/**
 * Data Science Portfolio - Main JavaScript
 * Handles navigation, theme switching, smooth scrolling, form validation, and interactive elements.
 */

class Portfolio {
    constructor() {
        this.tsparticles = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initThemeAndParticles();
        this.initNavigation();
        this.initSkillsTabs();
        this.initTypingEffect();
        this.initScrollAnimations();
        this.initContactForm();
        this.initProjectModals();
        this.initCodeEditorAnimation();
        this.updateNavbarStyle(); // Initial check
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // DOM Elements
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.themeToggle = document.querySelector('.theme-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.internalLinks = document.querySelectorAll('a[href^="#"]');
        this.tabLinks = document.querySelectorAll('.tab-link');
        this.contactForm = document.querySelector('.contact-form');
        this.projectCards = document.querySelectorAll('.project-card');
        this.modal = document.getElementById('project-modal');
        this.modalCloseBtn = document.querySelector('.modal-close-btn');

        // Event Bindings
        if (this.navToggle) this.navToggle.addEventListener('click', () => this.toggleNavigation());
        if (this.themeToggle) this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.navLinks.forEach(link => link.addEventListener('click', () => this.closeNavigation()));
        this.tabLinks.forEach(tab => tab.addEventListener('click', (e) => this.switchTab(e)));
        this.internalLinks.forEach(link => link.addEventListener('click', (e) => this.handleSmoothScroll(e)));
        
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
            const inputs = this.contactForm.querySelectorAll('.form-input, .form-textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
        
        this.projectCards.forEach(card => {
            const detailsButton = card.querySelector('.btn-details');
            const image = card.querySelector('.project-image');
            if (detailsButton) detailsButton.addEventListener('click', () => this.openModal(card));
            if (image) image.addEventListener('click', (e) => {
                // Prevent opening modal if an action button inside the overlay was clicked
                if (!e.target.closest('.project-action-btn')) {
                    this.openModal(card);
                }
            });
        });

        if(this.modal) {
            this.modal.addEventListener('click', (e) => this.handleModalClick(e));
            this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }

    /**
     * Initializes theme and particle background.
     */
    initThemeAndParticles() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.setTheme(currentTheme, true); // Initial load

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    /**
     * Loads the particle animation based on the current theme.
     * @param {string} theme - The current theme ('light' or 'dark').
     */
    async loadParticles(theme) {
        if (typeof tsParticles === 'undefined') {
            console.error('tsParticles not loaded.');
            return;
        }

        const isDark = theme === 'dark';

        const options = {
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 150,
                        links: {
                            opacity: 1,
                        },
                    },
                    push: {
                        quantity: 4,
                    },
                },
            },
            particles: {
                color: {
                    value: isDark ? "#ffffff" : "#4f46e5",
                },
                links: {
                    color: isDark ? "#475569" : "#cbd5e1",
                    distance: 150,
                    enable: true,
                    opacity: 0.25,
                    width: 1,
                    triangles: {
                        enable: true,
                        color: isDark ? "#0f172a" : "#f1f5f9",
                        opacity: 0.05
                    }
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 1.5,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                    animation: {
                        enable: true,
                        speed: 0.8,
                        sync: false,
                    }
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                    animation: {
                        enable: true,
                        speed: 4,
                        sync: false,
                    }
                },
            },
            detectRetina: true,
        };

        if (this.tsparticles) {
            this.tsparticles.destroy();
        }
        this.tsparticles = await tsParticles.load("particles-js", options);
    }

    /**
     * Set theme, update UI, and reload particles.
     * @param {string} theme - The theme to set ('light' or 'dark').
     * @param {boolean} [isInitialLoad=false] - Flag for the first time the theme is set.
     */
    setTheme(theme, isInitialLoad = false) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        if (!isInitialLoad) {
            document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        }

        this.loadParticles(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    initNavigation() {
        this.updateActiveNavLink();
    }

    toggleNavigation() {
        if (!this.navToggle || !this.navMenu) return;
        const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
        this.navToggle.setAttribute('aria-expanded', !isExpanded);
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('modal-open', !isExpanded);
    }

    closeNavigation() {
        if (!this.navToggle || !this.navMenu) return;
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + (document.querySelector('.navbar')?.offsetHeight || 64) + 20;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    initSkillsTabs() {
        const firstTab = document.querySelector('.tab-link');
        const firstPane = document.querySelector('.tab-pane');
        if (firstTab && firstPane) {
            firstTab.classList.add('active');
            firstPane.classList.add('active');
        }
    }

    switchTab(e) {
        e.preventDefault();
        const tabId = e.target.getAttribute('data-tab');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        this.tabLinks.forEach(tab => tab.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        e.target.classList.add('active');
        const targetPane = document.getElementById(tabId);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    }

    initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;
        
        const texts = ['Data Scientist', 'Cientista de Dados', 'Graduando em Engenharia Elétrica'];
        let textIndex = 0, charIndex = 0, isDeleting = false;

        const type = () => {
            const currentText = texts[textIndex];
            let typeSpeed = 100;

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        };
        
        type();
    }

    initCodeEditorAnimation() {
        const codeEditor = document.querySelector('.code-editor');
        const codeContentEl = document.querySelector('.code-content');
        const lineNumbersEl = document.querySelector('.line-numbers');

        if (!codeContentEl || !lineNumbersEl) return;

        const codeLines = [
            { text: '# Análise exploratória de dados de vendas', html: '<span class="comment"># Análise exploratória de dados de vendas</span>' },
            { text: 'import pandas as pd', html: '<span class="keyword">import</span> <span class="module">pandas</span> <span class="keyword">as</span> <span class="module">pd</span>' },
            { text: 'import numpy as np', html: '<span class="keyword">import</span> <span class="module">numpy</span> <span class="keyword">as</span> <span class="module">np</span>' },
            { text: 'import matplotlib.pyplot as plt', html: '<span class="keyword">import</span> <span class="module">matplotlib.pyplot</span> <span class="keyword">as</span> <span class="module">plt</span>' },
            { text: 'from sklearn.linear_model import LinearRegression', html: '<span class="keyword">from</span> <span class="module">sklearn.linear_model</span> <span class="keyword">import</span> <span class="class">LinearRegression</span>' },
            { text: '', html: '' },
            { text: '# Carregamento e preparação dos dados', html: '<span class="comment"># Carregamento e preparação dos dados</span>' },
            { text: "df = pd.read_csv('vendas_2024.csv')", html: '<span class="variable">df</span> = <span class="module">pd</span>.<span class="function">read_csv</span>(<span class="string">\'vendas_2024.csv\'</span>)' },
            { text: "df['data'] = pd.to_datetime(df['data'])", html: '<span class="variable">df</span>[<span class="string">\'data\'</span>] = <span class="module">pd</span>.<span class="function">to_datetime</span>(<span class="variable">df</span>[<span class="string">\'data\'</span>])' },
            { text: "vendas_mensais = df.groupby(df['data'].dt.month)['valor'].sum()", html: '<span class="variable">vendas_mensais</span> = <span class="variable">df</span>.<span class="function">groupby</span>(<span class="variable">df</span>[<span class="string">\'data\'</span>].<span class="property">dt</span>.<span class="property">month</span>)[<span class="string">\'valor\'</span>].<span class="function">sum</span>()' },
            { text: '', html: '' },
            { text: '# Análise estatística e predição', html: '<span class="comment"># Análise estatística e predição</span>' },
            { text: 'modelo = LinearRegression().fit(X, y)', html: '<span class="variable">modelo</span> = <span class="class">LinearRegression</span>().<span class="function">fit</span>(<span class="variable">X</span>, <span class="variable">y</span>)' },
            { text: 'previsao = modelo.predict(X_futuro)', html: '<span class="variable">previsao</span> = <span class="variable">modelo</span>.<span class="function">predict</span>(<span class="variable">X_futuro</span>)' },
            { text: 'plt.plot(vendas_mensais).show()', html: '<span class="module">plt</span>.<span class="function">plot</span>(<span class="variable">vendas_mensais</span>).<span class="function">show</span>()' },
        ];

        const sleep = ms => new Promise(res => setTimeout(res, ms));

        const typeLine = async (lineDiv, line) => {
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            
            const textNode = document.createTextNode('');
            lineDiv.appendChild(textNode);
            lineDiv.appendChild(cursor);

            const typingSpeed = 40; // ms per character
            
            for (let i = 0; i < line.text.length; i++) {
                textNode.nodeValue += line.text[i];
                await sleep(typingSpeed + (Math.random() * 50 - 25)); // Add some randomness
            }
            
            // Replace plain text with highlighted HTML and remove cursor
            lineDiv.innerHTML = line.html;
        };

        const animateCode = async () => {
            while (true) {
                // Reset
                codeContentEl.innerHTML = '';
                lineNumbersEl.innerHTML = '';
                codeEditor.classList.remove('fading-out');
                
                for (let i = 0; i < codeLines.length; i++) {
                    const line = codeLines[i];
                    
                    // Add line number
                    const lineNumberSpan = document.createElement('span');
                    lineNumberSpan.textContent = i + 1;
                    lineNumbersEl.appendChild(lineNumberSpan);

                    // Add code line div
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'code-line';
                    codeContentEl.appendChild(lineDiv);

                    await typeLine(lineDiv, line);
                    await sleep(line.text.length > 0 ? 150 : 50); // Pause between lines
                }

                // Wait before restarting
                await sleep(3000);

                // Fade out and restart
                codeEditor.classList.add('fading-out');
                await sleep(500); // Wait for fade-out transition
            }
        };
        
        // Use IntersectionObserver to start animation only when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCode();
                observer.unobserve(codeEditor); // Animate only once
            }
        }, { threshold: 0.5 });
        
        observer.observe(codeEditor);
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        document.querySelectorAll('.skill-item, .project-card, .contact-item, .about-text, .section-title, .contact-form, .about-image').forEach(el => {
            el.classList.add('animated-element');
            observer.observe(el);
        });
    }

    initContactForm() {
        // Event listeners are set in setupEventListeners
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('.form-submit');
        const formStatus = form.querySelector('.form-status');

        if (!this.validateForm(form)) return;

        this.setButtonLoading(submitBtn, true);
        const formData = new FormData(form);
        const endpoint = form.action;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showFormStatus(formStatus, 'success', 'Mensagem enviada com sucesso!');
                form.reset();
            } else {
                // Try to get error message from FormSubmit, otherwise use a generic one
                const data = await response.json();
                const message = data.error || 'Ocorreu um erro. Tente novamente mais tarde.';
                this.showFormStatus(formStatus, 'error', message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus(formStatus, 'error', 'Erro ao enviar. Verifique sua conexão.');
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) isValid = false;
        });
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um email válido.';
        } else if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'A mensagem precisa ter pelo menos 10 caracteres.';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.style.display = 'none';
        }
    }

    setButtonLoading(button, isLoading) {
        const text = button.querySelector('.submit-text');
        const loading = button.querySelector('.submit-loading');
        button.disabled = isLoading;
        if (text) text.style.display = isLoading ? 'none' : 'inline';
        if (loading) loading.style.display = isLoading ? 'inline-flex' : 'none';
    }

    showFormStatus(statusElement, type, message) {
        if (!statusElement) return;
        statusElement.className = `form-status ${type}`;
        statusElement.textContent = message;
        statusElement.style.display = 'block';
        setTimeout(() => statusElement.style.display = 'none', 5000);
    }
    
    initProjectModals() {
        // Event listeners are already set in setupEventListeners
    }

    getIconForTech(techName) {
        const tech = techName.toLowerCase().trim();
        const iconMap = {
            'python': 'devicon-python-plain colored',
            'random forest': 'fas fa-sitemap',
            'xgboost': 'fas fa-rocket',
            'tableau': 'fas fa-chart-bar',
            'scikit-learn': 'devicon-scikitlearn-plain colored',
            'pandas': 'devicon-pandas-original colored',
            'tensorflow': 'devicon-tensorflow-original colored',
            'lstm': 'fas fa-brain',
            'nlp': 'fas fa-comments',
            'api': 'fas fa-cogs',
            'keras': 'devicon-keras-plain colored',
            'power bi': 'fas fa-chart-pie',
            'sql server': 'devicon-microsoftsqlserver-plain colored',
            'real-time': 'fas fa-bolt',
            'healthcare': 'fas fa-heart-pulse',
            'dax': 'fas fa-table-cells'
        };
        return iconMap[tech] || 'fas fa-microchip'; // Default icon
    }
    
    openModal(card) {
        if (!card || !this.modal) return;
        
        const data = card.dataset;
        
        document.getElementById('modal-title').textContent = data.projectTitle;
        document.getElementById('modal-img').src = data.projectImageSrc;
        document.getElementById('modal-img').alt = `Screenshot of ${data.projectTitle}`;
        document.getElementById('modal-desc').textContent = data.projectLongDesc;
        document.getElementById('modal-github').href = data.projectGithubLink;
        document.getElementById('modal-live').href = data.projectLiveLink;

        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = ''; // Clear previous content

        const techTitle = document.createElement('h4');
        techTitle.className = 'tech-title';
        techTitle.textContent = 'Tecnologias Usadas';
        techContainer.appendChild(techTitle);

        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'tech-icons';
        
        if (data.projectTech) {
            data.projectTech.split(',').forEach(techName => {
                const icon = document.createElement('i');
                const iconClass = this.getIconForTech(techName);
                icon.className = iconClass;
                icon.title = techName.trim();
                iconsContainer.appendChild(icon);
            });
        }
        
        techContainer.appendChild(iconsContainer);

        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }
    
    handleModalClick(e) {
        if (e.target === this.modal) {
            this.closeModal();
        }
    }

    handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            this.closeNavigation();
        }
    }

    handleScroll() {
        this.updateActiveNavLink();
        this.updateScrollIndicator();
        this.updateNavbarStyle();
    }

    updateNavbarStyle() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    updateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
        }
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeNavigation();
        }
    }
}

// Initialize the portfolio script once the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
