document.addEventListener('DOMContentLoaded', () => {

    const barraLateral = document.getElementById('barra-lateral');
    const botonInterruptor = document.getElementById('interruptor-barra-lateral');

    if (botonInterruptor) {
        botonInterruptor.addEventListener('click', () => {
            barraLateral.classList.toggle('colapsado');
        });
    }

    const secciones = document.querySelectorAll('section[id]');
    const enlacesNav = document.querySelectorAll('.nav-barra-lateral .enlace-nav');

    const activarEnlaceNav = () => {
        let indice = secciones.length;
        while(--indice && window.scrollY + 100 < secciones[indice].offsetTop) {} 
        
        enlacesNav.forEach((enlace) => enlace.classList.remove('activo'));
        
        if (enlacesNav[indice] && !enlacesNav[indice].closest('.pie-barra-lateral')) {
             enlacesNav[indice].classList.add('activo');
        }
    };
    activarEnlaceNav();
    window.addEventListener('scroll', activarEnlaceNav);

    const lineaTiempoHero = anime.timeline({
        easing: 'easeOutExpo',
        delay: 500
    });
    
    lineaTiempoHero
    .add({
        targets: '.saludo-hero',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    })
    .add({
        targets: '.titulo-hero',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=600')
    .add({
        targets: '.subtitulo-hero',
        opacity: [0, 1],
        duration: 500
    }, '-=600')
    .add({
        targets: '.descripcion-hero',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=600')
    .add({
        targets: '.botones-hero',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=600')
    .add({
        targets: '.contenedor-logos-tech',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
    }, '-=600')
    .add({
        targets: '.contenedor-estatico-tech', 
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000
    }, '-=600');

    lineaTiempoHero.finished.then(iniciarEscritura);

    anime({
        targets: '#inicio .btn-principal',
        scale: [1, 1.03],
        boxShadow: [
            '0 0 0 0 rgba(95, 125, 155, 0.4)',
            '0 0 0 12px rgba(95, 125, 155, 0)'
        ],
        duration: 2500,
        easing: 'easeOutExpo',
        loop: true,
        delay: 2000
    });

    function iniciarEscritura() {
        const elementoEscribiendo = document.getElementById('subtitulo-escribiendo');
        if (elementoEscribiendo) {
            const textoAEscribir = elementoEscribiendo.getAttribute('data-text');
            let indice = 0;
            elementoEscribiendo.innerHTML = '';
            
            function escribir() {
                if (indice < textoAEscribir.length) {
                    elementoEscribiendo.innerHTML += textoAEscribir.charAt(indice);
                    indice++;
                    setTimeout(escribir, 80);
                } else {
                    elementoEscribiendo.innerHTML += '<span class="typing-cursor">|</span>';
                }
            }
            escribir();
        }
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                anime({
                    targets: entrada.target,
                    translateY: [30, 0],
                    scale: [0.98, 1],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutExpo',
                    delay: entrada.target.dataset.delay || 0
                });
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animar').forEach(elemento => {
        observador.observe(elemento);
    });

});

function manejarClick(elemento) {
    const enlace = elemento.dataset.link;
    if (enlace) {
        window.open(enlace, '_blank');
    }
}

function manejarMouseSobre(elemento) {
    elemento.style.borderColor = 'var(--color-medium-blue)';
    elemento.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'; 
}

function manejarMouseFuera(elemento) {
    elemento.style.borderColor = 'transparent'; 
    elemento.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)'; 
}

function validarEmail(input) {
    const email = input.value;
    const mensajeValidacion = document.getElementById('mensaje-validacion');
    
    if (email && !email.includes('@')) {
        mensajeValidacion.textContent = 'Por favor, introduce un correo válido.';
        mensajeValidacion.style.color = 'red';
    } else if (email) {
        mensajeValidacion.textContent = 'Formato de correo correcto.';
        mensajeValidacion.style.color = 'green';
    } else {
        mensajeValidacion.textContent = '';
    }
}

function manejarEnvioFormulario(evento) {
    evento.preventDefault(); 
    
    const formularioContacto = document.getElementById('formulario-contacto');
    const botonEnviar = document.getElementById('boton-enviar');
    const mensajeValidacion = document.getElementById('mensaje-validacion');

    botonEnviar.innerHTML = '<i class="fa-solid fa-check me-2"></i> ¡Enviado!';
    botonEnviar.disabled = true;

    setTimeout(() => {
         botonEnviar.innerHTML = 'Enviar Mensaje';
         botonEnviar.disabled = false;
         formularioContacto.reset(); 
         if(mensajeValidacion) {
            mensajeValidacion.textContent = ''; 
         }
    }, 3000);
}

function mostrarContacto(boton) {
    const contenedorContacto = boton.previousElementSibling;
    const estaVisible = contenedorContacto.classList.contains('visible');

    if (estaVisible) {
        contenedorContacto.classList.remove('visible');
        boton.textContent = 'Ver Contacto';
    } else {
        contenedorContacto.classList.add('visible');
        boton.textContent = 'Ocultar Contacto';
    }
}