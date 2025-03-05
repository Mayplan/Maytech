document.addEventListener('DOMContentLoaded', function() {
    /* ====================================
       1. Menú de Navegación Desplegable
    ==================================== */
    var menuIcon = document.querySelector('.menu-icon');
    var navMenu = document.querySelector('header nav ul');

    function toggleMenu() {
        navMenu.classList.toggle('show');
        menuIcon.classList.toggle('active');
    }

    menuIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMenu();
    });

    navMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    document.addEventListener('click', function() {
        navMenu.classList.remove('show');
        menuIcon.classList.remove('active');
    });

    var navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            menuIcon.classList.remove('active');
        });
    });

    /* ====================================
       2. Carrusel de Imágenes en Proyectos
    ==================================== */
    var slideIndex = 0;
    var slides = document.querySelector('.slides');
    var slideItems = document.querySelectorAll('.slides .proyecto');
    var totalSlides = slideItems.length;
    var prevButton = document.querySelector('.prev');
    var nextButton = document.querySelector('.next');

    function showSlide(index) {
        if (index >= totalSlides) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = totalSlides - 1;
        } else {
            slideIndex = index;
        }
        var offset = -slideIndex * 100;
        slides.style.transform = 'translateX(' + offset + '%)';
    }

    // Mostrar la primera diapositiva
    showSlide(slideIndex);

    // Navegación manual
    nextButton.addEventListener('click', function() {
        showSlide(++slideIndex);
    });
    prevButton.addEventListener('click', function() {
        showSlide(--slideIndex);
    });

    // Ajustar el intervalo a 7s para que no pase tan rápido
    var slideInterval = setInterval(function() {
        slideIndex++;
        showSlide(slideIndex);
    }, 7000);

    // Pausar reproducción automática al interactuar con el mouse
    slides.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    slides.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            slideIndex++;
            showSlide(slideIndex);
        }, 7000);
    });

    // Control táctil para dispositivos móviles
    var startX = 0;
    var isDragging = false;

    slides.addEventListener('touchstart', function(event) {
        isDragging = true;
        startX = event.touches[0].clientX;
    });

    slides.addEventListener('touchmove', function(event) {
        if (!isDragging) return;
        var currentX = event.touches[0].clientX;
        var diffX = startX - currentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Deslizar a la izquierda
                showSlide(++slideIndex);
            } else {
                // Deslizar a la derecha
                showSlide(--slideIndex);
            }
            isDragging = false;
        }
    });

    slides.addEventListener('touchend', function() {
        isDragging = false;
    });

    /* ====================================
       3. Botón "Volver al Inicio"
    ==================================== */
    var volverArribaBtn = document.createElement('button');
    volverArribaBtn.innerText = '↑';
    volverArribaBtn.id = 'volver-arriba';
    volverArribaBtn.setAttribute('aria-label', 'Volver al Inicio');
    document.body.appendChild(volverArribaBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            volverArribaBtn.classList.add('show');
        } else {
            volverArribaBtn.classList.remove('show');
        }
    });

    volverArribaBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ====================================
       4. Animaciones en la Carga de Secciones
    ==================================== */
    var secciones = document.querySelectorAll('section');

    function verificarVisibilidad() {
        secciones.forEach(function(seccion) {
            var posicion = seccion.getBoundingClientRect();
            if (posicion.top < window.innerHeight - 100) {
                seccion.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', verificarVisibilidad);
    window.addEventListener('load', verificarVisibilidad);

    /* ====================================
       5. Manejo de Eventos y Accesibilidad
    ==================================== */
    menuIcon.setAttribute('tabindex', '0');
    menuIcon.setAttribute('role', 'button');
    menuIcon.setAttribute('aria-label', 'Menú de navegación');

    menuIcon.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleMenu();
        }
    });

    navMenu.setAttribute('role', 'navigation');
});

/* ====================================
   6. Formulario de Contacto (envío asíncrono)
==================================== */
var contactForm = document.getElementById('contact-form');
var mensajeExito = document.getElementById('mensajeExito');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita la recarga de página
    var formData = new FormData(contactForm);

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(function(response) {
        if (response.ok) {
            // Mostrar mensaje de éxito
            mensajeExito.style.display = 'block';
            // Limpiar campos
            contactForm.reset();
            // Ocultar el mensaje tras 3 segundos
            setTimeout(function() {
                mensajeExito.style.display = 'none';
            }, 3000);
        } else {
            alert('Ocurrió un error al enviar el formulario. Inténtalo de nuevo.');
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('No se pudo enviar el formulario.');
    });
});
