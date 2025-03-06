// Inicializar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Función para inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Animación para el texto principal
  gsap.from(".neon-text", {
    duration: 1.5,
    opacity: 0,
    y: -50,
    ease: "power3.out"
  });
  
  // Animación para la sección hero
  gsap.from("#hero p", {
    duration: 1.2,
    opacity: 0,
    y: 30,
    delay: 0.5,
    ease: "power3.out"
  });
  
  gsap.from("#hero a", {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    delay: 0.8,
    ease: "back.out(1.7)"
  });
  
  // Animaciones al hacer scroll
  initScrollAnimations();
  
  // Inicializar navegación suave
  initSmoothScrolling();
  
  // Efecto parallax para fondos
  initParallaxEffect();
  
  // Inicializar interacciones de la UI
  initUIInteractions();
  
  // Inicializar carga perezosa de imágenes
  initLazyLoading();
});

// Función para inicializar animaciones al hacer scroll
function initScrollAnimations() {
  // Animación para los títulos de sección
  gsap.utils.toArray('section h2').forEach(heading => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      duration: 1,
      opacity: 0,
      y: 30,
      ease: "power3.out"
    });
  });

  // Animación para la sección de categorías
  gsap.utils.toArray('.category-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      duration: 0.8,
      opacity: 0,
      y: 30,
      delay: i * 0.1,
      ease: "power3.out"
    });
  });
  
  // Animación para las tarjetas de películas
  const movieSections = gsap.utils.toArray('.movies-section');
  movieSections.forEach(section => {
    const cards = section.querySelectorAll('.movie-card');
    gsap.from(cards, {
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none"
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.15,
      ease: "power3.out"
    });
  });
}

// Navegación suave entre secciones
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Cerrar el menú móvil si está abierto
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        
        // Scroll suave a la sección
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 70 // Ajustar para la barra de navegación fija
          },
          ease: "power3.inOut"
        });
      }
    });
  });
}

// Efecto parallax para fondos
function initParallaxEffect() {
  // Parallax suave para el héroe
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const hero = document.querySelector('#hero');
    
    if (hero) {
      // Mover el contenido del héroe a diferentes velocidades
      const heroContent = hero.querySelector('.container');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }
  });
}

// Inicializar interacciones de la UI
function initUIInteractions() {
  // Toggle para el menú móvil
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      
      // Animar la apertura/cierre del menú
      if (!mobileMenu.classList.contains('hidden')) {
        gsap.from(mobileMenu.children, {
          opacity: 0,
          y: -20,
          stagger: 0.1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  }
  
  // Cambiar estilo de la barra de navegación al hacer scroll
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('py-2', 'shadow-lg');
        nav.classList.remove('py-4');
      } else {
        nav.classList.add('py-4');
        nav.classList.remove('py-2', 'shadow-lg');
      }
    }
  });
  
  // Hover mejorado para tarjetas de películas
  const movieCards = document.querySelectorAll('.movie-card');
  
  movieCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this.querySelector('.movie-image'), {
        scale: 1.1,
        filter: "blur(2px)",
        duration: 0.5
      });
      
      gsap.to(this.querySelector('.movie-info'), {
        opacity: 1,
        scale: 1,
        duration: 0.5
      });
      
      gsap.to(this.querySelector('.movie-button'), {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.1
      });
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this.querySelector('.movie-image'), {
        scale: 1,
        filter: "blur(0px)",
        duration: 0.5
      });
      
      gsap.to(this.querySelector('.movie-info'), {
        opacity: 0,
        scale: 0.9,
        duration: 0.5
      });
      
      gsap.to(this.querySelector('.movie-button'), {
        y: 20,
        opacity: 0,
        duration: 0.3
      });
    });
  });
}

// Inicializar carga perezosa de imágenes
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src') || img.getAttribute('src');
          
          if (src) {
            img.src = src;
            img.classList.add('fade-in');
          }
          
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Animación de conteo para números
function animateCounter(element, target, duration = 2) {
  let startTime = null;
  const startValue = 0;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / (duration * 1000), 1);
    const value = Math.floor(progress * (target - startValue) + startValue);
    
    element.textContent = value;
    
    if (progress < 1) {
      window.requestAnimationFrame(animation);
    } else {
      element.textContent = target;
    }
  }
  
  window.requestAnimationFrame(animation);
}

// Inicializar contadores cuando estén visibles
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}