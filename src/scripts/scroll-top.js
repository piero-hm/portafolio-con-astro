// Este script controla la visibilidad y la acción de un botón para volver al inicio de la página.

document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollTopBtn");
  const showThreshold = 300; // Distancia en píxeles para mostrar el botón

  if (!scrollBtn) return; // Si no hay botón, no hacer nada

  // Muestra el botón con una transición de opacidad
  function showScrollBtn() {
    scrollBtn.classList.remove("hidden");
    scrollBtn.classList.add("inline-flex", "items-center", "justify-center");
    scrollBtn.classList.remove("opacity-0");
    scrollBtn.classList.add("opacity-100");
  }

  // Oculta el botón
  function hideScrollBtn() {
    scrollBtn.classList.add("opacity-0");
    scrollBtn.classList.remove("opacity-100");
    // Espera a que la transición termine para ocultarlo completamente
    setTimeout(() => {
      if (window.scrollY < showThreshold) { // Doble chequeo por si el usuario vuelve a scrollear
        scrollBtn.classList.add("hidden");
        scrollBtn.classList.remove("inline-flex", "items-center", "justify-center");
      }
    }, 300); // La duración debe coincidir con la transición de CSS
  }

  // Decide si mostrar u ocultar el botón según la posición del scroll
  function handleScroll() {
    if (window.scrollY > showThreshold) {
      showScrollBtn();
    } else {
      hideScrollBtn();
    }
  }

  // Añade los listeners para el scroll y la carga de la página
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Añade el listener para el clic en el botón
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Estado inicial del botón al cargar la página
  handleScroll();
});