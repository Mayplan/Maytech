// script.js

document.addEventListener('DOMContentLoaded', function() {

    /* ====================================
       1. Menú de Navegación Desplegable
    ==================================== */

    // Selecciona el ícono del menú y el menú de navegación
    var menuIcon = document.querySelector('.menu-icon');
    var navMenu = document.querySelector('header nav ul');

    // Función para mostrar u ocultar el menú
    function toggleMenu() {
        navMenu.classList.toggle('show');
        menuIcon.classList.toggle('active');
    }

    // Mostrar/ocultar menú al hacer clic en el ícono
    menuIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMenu();
    });

    // Evitar que el menú se cierre al hacer clic dentro de él
    navMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Ocultar menú al hacer clic fuera de él
    document.addEventListener('click', function() {
        navMenu.classList.remove('show');
        menuIcon.classList.remove('active');
    });

    // Cerrar el menú al hacer clic en un enlace
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

    // Mostrar la diapositiva inicial
    showSlide(slideIndex);

    // Función para mostrar la diapositiva actual
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

    // Eventos para los botones de navegación
    nextButton.addEventListener('click', function() {
        showSlide(slideIndex + 1);
    });

    prevButton.addEventListener('click', function() {
        showSlide(slideIndex - 1);
    });

    // Reproducción automática
    var slideInterval = setInterval(function() {
        showSlide(slideIndex + 1);
    }, 5000);

    // Pausar reproducción automática al interactuar
    slides.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });

    slides.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            showSlide(slideIndex + 1);
        }, 5000);
    });

    // Variables para el control táctil
    var startX = 0;
    var isDragging = false;

    // Eventos táctiles para dispositivos móviles
    slides.addEventListener('touchstart', function(event) {
        isDragging = true;
        startX = event.touches[0].clientX;
    });

    slides.addEventListener('touchmove', function(event) {
        if (!isDragging) return;
        var currentX = event.touches[0].clientX;
        var diffX = startX - currentX;

        // Umbral para considerar el gesto como un deslizamiento
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Deslizar a la izquierda, mostrar siguiente diapositiva
                showSlide(slideIndex + 1);
            } else {
                // Deslizar a la derecha, mostrar diapositiva anterior
                showSlide(slideIndex - 1);
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

    // Crear el botón
    var volverArribaBtn = document.createElement('button');
    volverArribaBtn.innerText = '↑';
    volverArribaBtn.id = 'volver-arriba';
    volverArribaBtn.setAttribute('aria-label', 'Volver al Inicio');
    document.body.appendChild(volverArribaBtn);

    // Mostrar/ocultar el botón al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            volverArribaBtn.classList.add('show');
        } else {
            volverArribaBtn.classList.remove('show');
        }
    });

    // Desplazamiento suave hacia arriba al hacer clic
    volverArribaBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ====================================
       4. Animaciones en la Carga de Secciones
    ==================================== */

    // Seleccionar todas las secciones que se animarán
    var secciones = document.querySelectorAll('section');

    // Función para verificar si la sección está en el viewport
    function verificarVisibilidad() {
        secciones.forEach(function(seccion) {
            var posicion = seccion.getBoundingClientRect();
            if (posicion.top < window.innerHeight - 100) {
                seccion.classList.add('visible');
            }
        });
    }

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', verificarVisibilidad);
    window.addEventListener('load', verificarVisibilidad);

    /* ====================================
       5. Manejo de Eventos y Accesibilidad
    ==================================== */

    // Asegurar que el menú sea accesible con el teclado
    menuIcon.setAttribute('tabindex', '0');
    menuIcon.setAttribute('role', 'button');
    menuIcon.setAttribute('aria-label', 'Menú de navegación');

    // Evento de teclado para el ícono del menú
    menuIcon.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleMenu();
        }
    });

    // Agregar roles y descripciones ARIA donde sea necesario
    navMenu.setAttribute('role', 'navigation');

});

    /* ====================================
       6. Enlace para Abrir Gmail Directamente
    ==================================== */

    var enlaceGmail = document.getElementById('enlace-gmail');

    enlaceGmail.addEventListener('click', function(event) {
        event.preventDefault();

        var email = 'mayplantech@gmail.com';
        var urlGmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(email);

        // Abrir Gmail en una nueva pestaña
        window.open(urlGmail, '_blank');
    });