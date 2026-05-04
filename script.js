// Sample project data
const projects = [
    {
        id: 1,
        title: "Country Explorer",
        description: "A dynamic web application that allows users to search for countries and view detailed information including population, region, and languages using the REST Countries API.",
        image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800", // Image of a world map/travel
        technologies: ["JavaScript", "HTML5", "CSS3", "REST API", "Particles.js"],
        category: "web",
        liveUrl: "#",
        githubUrl: "https://github.com/Pepsiboy24/CountryApp"
    },
    {
        id: 2,
        title: "Pig DOM Game",
        description: "A classic dice-based game built to demonstrate advanced DOM manipulation, event handling, and game state management in vanilla JavaScript.",
        image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&q=80&w=800", // Image of gaming dice
        technologies: ["JavaScript", "HTML5", "CSS3"],
        category: "web",
        liveUrl: "#",
        githubUrl: "https://github.com/Pepsiboy24/PigDOMGame"
    },
    {
        id: 3,
        title: "Budgty App",
        description: "A robust personal finance tracker designed to manage monthly income and expenses with real-time percentage calculations and a clean UI.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800", // Image of financial accounting/calculator
        technologies: ["JavaScript", "HTML5", "CSS3", "UI/UX Design"],
        category: "web",
        liveUrl: "#",
        githubUrl: "https://github.com/Pepsiboy24/BudgtyApp"
    },
    {
        id: 4,
        title: "My Ledger App",
        description: "A high-performance financial management tool featuring secure transaction logging, data synchronization, and automated advisory services.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800", // Image of digital banking/Ledger
        technologies: ["JavaScript", "Supabase", "React Native", "API Integration"],
        category: "mobile",
        liveUrl: "#",
        githubUrl: "https://github.com/Pepsiboy24/MyLedgerApp"
    },
    {
        id: 5,
        title: "Ultra Tea Landing Page",
        description: "A high-conversion landing page for the Ultra herbal tea brand, featuring product showcases and integrated marketing elements.",
        image: "https://images.unsplash.com/photo-1594631252845-29fc458631b6?auto=format&fit=crop&q=80&w=800", // Image of herbal tea
        technologies: ["HTML5", "CSS3", "Responsive Design"],
        category: "design",
        liveUrl: "#",
        githubUrl: "https://github.com/Pepsiboy24/ultra_tea"
    },
    {
        id: 6,
        title: "MobileNet Classifier",
        description: "An AI-powered image classification system utilizing the MobileNet architecture to detect counterfeit products and analyze image data.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", // Image representing AI/Machine Learning
        technologies: ["Python", "Machine Learning", "Docker", "MobileNet"],
        category: "ai",
        liveUrl: "#",
        githubUrl: "https://github.com/Pepsiboy24/mobile_net"
    }
];
// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.querySelector('.contact-form');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for EmailJS to load
    setTimeout(() => {
        initializeEmailJS();
        initializeNavigation();
        renderProjects();
        initializeFilters();
        initializeContactForm();
        initializeScrollEffects();
        initializeParticles();
    }, 100);
});

// Add test function for debugging
window.testEmailJS = function() {
    console.log('Testing EmailJS...');
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    if (typeof emailjs !== 'undefined') {
        console.log('EmailJS object:', emailjs);
    }
};

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Render projects
function renderProjects(category = 'all') {
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);

    projectsGrid.innerHTML = '';

    filteredProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });

    // Animate cards on render
    animateProjectCards();
}

// Create project card element
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.dataset.category = project.category;

    const imageUrl = project.image || `https://picsum.photos/seed/project${project.id}/400/300.jpg`;

    card.innerHTML = `
        <div class="project-image">
            <img src="${imageUrl}" alt="${project.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="project-image-placeholder" style="display: none;">
                <i class="fas fa-code"></i>
            </div>
            <div class="project-overlay">
                <div class="project-links">
                    <a href="${project.liveUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

// Animate project cards
function animateProjectCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for smoother animation
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
}

// Initialize filter buttons
function initializeFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            const category = this.dataset.filter;
            renderProjects(category);
        });
    });
}

// Initialize EmailJS
function initializeEmailJS() {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded. Check if the script is included in HTML.');
        showNotification('Email service not available. Please try again later.', 'error');
        return;
    }
    
    try {
        // Initialize EmailJS with your public key
        emailjs.init("D1AgqBb3NtR7hGEwQ");
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
        showNotification('Email service initialization failed.', 'error');
    }
}

// Initialize contact form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                showNotification('Email service not available. Please refresh the page.', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Form data:', data); // Debug log
            
            // Simple validation
            if (!data.user_name || !data.user_email || !data.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.user_email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Send email using EmailJS
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // EmailJS parameters
            const templateParams = {
                from_name: data.user_name,
                from_email: data.user_email,
                message: data.message,
                to_name: 'Your Name', // Replace with your name
                reply_to: data.user_email
            };

            console.log('Sending email with params:', templateParams); // Debug log

            // Send the email with timeout and better error handling
            const emailPromise = emailjs.send('service_oltki0r', 'template_l7kxi8g', templateParams);
            
            // Add timeout to prevent infinite loading
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Request timeout')), 10000);
            });

            Promise.race([emailPromise, timeoutPromise])
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS Error:', error);
                    let errorMessage = 'Failed to send message. Please try again later.';
                    
                    // Provide specific error messages
                    if (error.message === 'Request timeout') {
                        errorMessage = 'Request timed out. Please check your connection and try again.';
                    } else if (error.text === 'The user ID is required') {
                        errorMessage = 'Email service configuration error. Please check your setup.';
                    } else if (error.text === 'The service ID is not allowed') {
                        errorMessage = 'Invalid service ID. Please check your EmailJS configuration.';
                    } else if (error.text === 'The template ID is not allowed') {
                        errorMessage = 'Invalid template ID. Please check your EmailJS configuration.';
                    }
                    
                    showNotification(errorMessage, 'error');
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Scroll effects
function initializeScrollEffects() {
    // Debounced navbar background on scroll
    const handleNavbarScroll = debounce(function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }
        }
    }, 10);

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Animate elements on scroll with better observer
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class instead of manipulating animation
                entry.target.classList.add('animate-visible');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
        animateOnScroll.observe(card);
    });
}

// Typing effect for hero title (optional enhancement)
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }

        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for hero section (subtle and optimized)
function initializeParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            // Subtle parallax effect only when in viewport
            const parallaxAmount = scrolled * 0.3;
            hero.style.transform = `translateY(${parallaxAmount}px)`;
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Add hover effect to project cards (optimized)
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Initialize additional effects
document.addEventListener('DOMContentLoaded', function() {
    initializeTypingEffect();
    initializeParallax();
});

// Optimized scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Remove duplicate scroll event setup
// The optimized scroll handling is now in initializeScrollEffects()

// Particle Animation System
function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseX = 0;
    let mouseY = 0;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#00d4ff' : '#ff00ff';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
            
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x -= (dx / distance) * force * 2;
                this.y -= (dy / distance) * force * 2;
            }
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Connect particles with lines
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.globalAlpha = (1 - distance / 120) * 0.3;
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    // Mouse move handler
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Mouse leave handler
    canvas.addEventListener('mouseleave', () => {
        mouseX = -100;
        mouseY = -100;
    });
    
    // Touch support
    canvas.addEventListener('touchmove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseX = touch.clientX - rect.left;
        mouseY = touch.clientY - rect.top;
    });
    
    canvas.addEventListener('touchend', () => {
        mouseX = -100;
        mouseY = -100;
    });
    
    // Initialize and start animation
    createParticles();
    animate();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
