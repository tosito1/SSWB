/**
 * Script principal para el sitio web del Museo Arqueológico y Etnológico de Granada
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Añadir clase 'scrolled' al navbar cuando se hace scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Animación para los números en la sección de estadísticas (si existe)
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                }
            });
        };

        // Iniciar animación cuando la sección es visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
            }
        });

        observer.observe(statsSection);
    }

    // Filtrado de obras en la página de obras singulares
    const filterButtons = document.querySelectorAll('[data-filter]');
    const obraItems = document.querySelectorAll('.obra-item');
    
    if (filterButtons.length > 0 && obraItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Quitar clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Añadir clase active al botón clickeado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Mostrar u ocultar obras según el filtro
                if (filter === 'all') {
                    obraItems.forEach(item => item.style.display = 'block');
                } else {
                    obraItems.forEach(item => {
                        const category = item.getAttribute('data-category');
                        if (category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Búsqueda de obras
    const searchInput = document.getElementById('searchObras');
    if (searchInput && obraItems.length > 0) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            
            obraItems.forEach(item => {
                const title = item.querySelector('.card-title').textContent.toLowerCase();
                const description = item.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Formulario de búsqueda general
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[type="search"]');
            if (searchInput.value.trim() === '') {
                e.preventDefault();
                searchInput.classList.add('is-invalid');
            } else {
                searchInput.classList.remove('is-invalid');
            }
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (field.value.trim() === '') {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Simulación de envío
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
                
                setTimeout(() => {
                    // Mostrar mensaje de éxito
                    contactForm.reset();
                    const successAlert = document.createElement('div');
                    successAlert.classList.add('alert', 'alert-success', 'mt-3');
                    successAlert.innerHTML = 'Su mensaje ha sido enviado correctamente. Nos pondremos en contacto con usted lo antes posible.';
                    contactForm.appendChild(successAlert);
                    
                    // Restaurar botón
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Eliminar alerta después de 5 segundos
                    setTimeout(() => {
                        successAlert.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }

    // Botón "Volver arriba"
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Añadir botón "Volver arriba" si no existe
    if (!document.getElementById('backToTop')) {
        const backToTopBtn = document.createElement('a');
        backToTopBtn.setAttribute('id', 'backToTop');
        backToTopBtn.setAttribute('href', '#');
        backToTopBtn.setAttribute('title', 'Volver arriba');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.classList.add('back-to-top');
        
        document.body.appendChild(backToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Añadir estilos para el botón "Volver arriba" si no existen
    if (!document.getElementById('backToTopStyles')) {
        const style = document.createElement('style');
        style.setAttribute('id', 'backToTopStyles');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background-color: var(--primary);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }
            
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background-color: var(--primary-dark);
                transform: translateY(-3px);
                color: white;
            }
        `;
        
        document.head.appendChild(style);
    }
}); 