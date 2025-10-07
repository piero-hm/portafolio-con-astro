/**
 * Configura un efecto de escritura de "terminal" en un elemento HTML.
 * @param {string} elementId - El ID del elemento <pre> donde se mostrará el texto.
 * @param {Array<Array<{text: string, class: string}>>} lines - Un array de líneas. Cada línea es un array de segmentos. Cada segmento es un objeto con texto y una clase CSS.
 */
export default function setupTerminalEffect(elementId, lines) {
  // 1. Obtener el elemento del DOM donde se escribirá el texto.
  const terminal = document.getElementById(elementId);
  // Si no se encuentra el elemento, muestra un error en la consola y no hace nada.
  if (!terminal) {
    console.error(`Elemento con id "${elementId}" no encontrado.`);
    return;
  }

  // 2. Variables de estado para rastrear la posición actual de la escritura.
  let lineIndex = 0; // Índice de la línea actual que se está escribiendo.
  let segmentIndex = 0; // Índice del segmento actual dentro de la línea.

  /**
   * Función recursiva que escribe un segmento de texto y se llama a sí misma
   * para el siguiente segmento, creando el efecto de escritura.
   */
  function typeSegment() {
    // Verificar si todavía hay líneas por escribir.
    if (lineIndex < lines.length) {
      const currentLine = lines[lineIndex];

      // Verificar si hay segmentos por escribir en la línea actual.
      if (segmentIndex < currentLine.length) {
        const segmentData = currentLine[segmentIndex];

        // 3. Crear un <span> para el segmento, asignarle su clase y texto.
        const span = document.createElement('span');
        span.className = segmentData.class;
        span.textContent = segmentData.text;

        // Añadir el <span> al elemento terminal.
        terminal.appendChild(span);

        // Moverse al siguiente segmento.
        segmentIndex++;

        // 4. Esperar un breve momento antes de escribir el siguiente segmento (velocidad de escritura).
        // La función se llama a sí misma (recursión) después de un tiempo.
        setTimeout(typeSegment, 50);
      } else {
        // 5. Si se terminaron los segmentos de la línea, añadir un salto de línea.
        terminal.innerHTML += "<br>";

        // Moverse a la siguiente línea.
        lineIndex++;
        segmentIndex = 0; // Reiniciar el índice de segmentos para la nueva línea.

        // 6. Esperar un poco más antes de empezar la siguiente línea (pausa entre líneas).
        setTimeout(typeSegment, 300);
      }
    }
  }

  // 7. Iniciar el efecto de escritura llamando a la función por primera vez.
  typeSegment();
}