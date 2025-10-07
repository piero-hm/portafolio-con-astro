/**
 * Configura las interacciones para el encabezado principal del sitio.
 * Este script se divide en dos partes:
 * 1. Listeners de eventos globales (menú móvil, scroll) que se configuran una sola vez.
 * 2. Lógica de estado (enlace activo) que se actualiza en cada navegación.
 */

// Se usa una bandera en el objeto `window` para asegurar que los listeners globales
// se adjunten una sola vez, evitando duplicados durante la navegación de Astro.
if (!window.headerListenersAttached) {
  // Lógica para el Menú Móvil con Delegación de Eventos
  document.addEventListener('click', (event) => {
    // `closest` busca hacia arriba en el DOM desde el elemento clickeado
    // hasta encontrar un elemento que coincida con el selector '#mobile-menu-button'.
    const button = event.target.closest('#mobile-menu-button');
    
    // Si no se encontró el botón (el clic fue en otro lugar), no se hace nada.
    if (button) {
      const mobileMenu = document.getElementById("mobile-menu");
      const iconOpen = button.querySelector(".icon-open");
      const iconClose = button.querySelector(".icon-close");

      if (mobileMenu && iconOpen && iconClose) {
        mobileMenu.classList.toggle("hidden");
        iconOpen.classList.toggle("hidden");
        iconClose.classList.toggle("hidden");
        
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isExpanded));
      }
    }
  });

  // Lógica para el Efecto de Fondo con Scroll
  window.addEventListener("scroll", () => {
    const headerBg = document.getElementById("header-bg");
    if (headerBg) {
      if (window.scrollY > 50) {
        headerBg.style.opacity = '1';
      } else {
        headerBg.style.opacity = '0';
      }
    }
  }, { passive: true });

  // Se marca la bandera como `true` para que este bloque no se vuelva a ejecutar.
  window.headerListenersAttached = true;
}

/**
 * Esta función se exporta para ser llamada desde el componente Astro.
 * Se encarga de la lógica que SÍ debe ejecutarse en cada cambio de página.
 */
export default function setupHeader() {
  // --- Lógica para Marcar Enlace Activo ---
  function setActiveLink() {
    const header = document.getElementById("main-header");
    if (!header) return;

    const hasServerActive = header.dataset.hasServerActive === 'true';
    // Si el servidor ya se encargó, no hacemos nada.
    if (hasServerActive) return;

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');

    navLinks.forEach(link => {
      link.classList.remove('is-active');
      if (link.getAttribute('data-href') === currentPath) {
        link.classList.add('is-active');
      }
    });
  }

  // `astro:after-swap` es el evento clave para que esto funcione con View Transitions.
  document.addEventListener('astro:after-swap', setActiveLink);
  
  // Se llama una vez al inicio para la carga inicial de la página.
  setActiveLink();
}
