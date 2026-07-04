// Initialize Lucide Icons
const cloudStore=document.querySelector('#project-cloudstore')
const Viver=document.querySelector('#project-viver')
cloudStore.addEventListener('click',()=>{
    window.open('https://cloudstore-5sse.onrender.com/','_blank')
})
Viver.addEventListener('click',()=>{
    window.open('https://www.vivekss.in','_blank')
})
lucide.createIcons();

// Mouse tracking glow effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
});

// Navigation Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.getElementById('nav-links');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    // Toggle menu icon between burger and close
    const isOpened = navLinksContainer.classList.contains('active');
    if (isOpened) {
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons(); // Re-render icon
});

// Close mobile menu when clicking on any nav link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 150; // offset for nav header height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling with visual success feedback
const contactForm = document.getElementById('portfolio-contact-form');
const contactFormContainer = document.getElementById('contact-form-container');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Extract form details
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Perform basic verification
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Show a premium glass success feedback card
        contactFormContainer.style.opacity = '0';
        setTimeout(() => {
            contactFormContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; gap: 20px;">
                    <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); border: 2px solid var(--color-success); display: flex; align-items: center; justify-content: center; color: var(--color-success);">
                        <i data-lucide="check" style="width: 32px; height: 32px;"></i>
                    </div>
                    <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-main);">Message Sent!</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; max-width: 300px;">
                        Thank you, <strong>${name}</strong>. Your message was sent successfully. Vivek will get back to you at <strong>${email}</strong> soon.
                    </p>
                    <button id="btn-form-reset" class="btn btn-secondary" style="margin-top: 10px; font-size: 0.9rem; padding: 10px 20px;">
                        Send Another Message
                    </button>
                </div>
            `;
            lucide.createIcons(); // Initialize the check icon
            contactFormContainer.style.opacity = '1';
            
            // Add listener to reset button
            document.getElementById('btn-form-reset').addEventListener('click', () => {
                location.reload(); // Quick reset
            });
        }, 300);
    });
}

// GSAP ScrollTrigger Animations
const initAnimations = () => {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Animations
        const heroTl = gsap.timeline();
        heroTl.from('#hero-role-tag', {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('#hero-name-heading', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('#hero-summary-para', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-cta', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-content .social-links .social-icon', {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        }, '-=0.4');

    }
};

// Bulletproof execution
if (document.readyState === 'complete') {
    initAnimations();
} else {
    window.addEventListener('load', initAnimations);
}
