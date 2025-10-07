# Portafolio Personal con Astro y Tailwind CSS

Este repositorio contiene el código fuente de mi portafolio personal, desarrollado con el framework **Astro** y estilizado con **Tailwind CSS**. A continuación, se detalla la estructura del proyecto, el enfoque de estilización y el proceso de despliegue.

## 🚀 Comandos Básicos

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala las dependencias del proyecto. |
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:4321`. |
| `npm run build` | Compila el sitio para producción en la carpeta `./dist/`. |
| `npm run preview` | Previsualiza el sitio compilado localmente. |

---

## 📖 Documentación del Proyecto

### 1. Migración de Bootstrap a Astro y Tailwind

El proyecto se construyó utilizando Astro, un framework moderno enfocado en el rendimiento que genera sitios web estáticos ultrarrápidos. Para el diseño, se optó por **Tailwind CSS**, un framework *utility-first* que permite crear interfaces personalizadas de manera eficiente directamente en el HTML.

Esta elección representa una migración desde enfoques más tradicionales como Bootstrap, buscando varias ventajas:
- **Mayor Rendimiento**: Astro reduce el JavaScript enviado al cliente al mínimo, resultando en tiempos de carga más rápidos.
- **Control Total del Diseño**: A diferencia de los componentes predefinidos de Bootstrap, Tailwind ofrece clases de utilidad que permiten un control granular sobre cada aspecto visual.
- **Desarrollo Ágil**: Escribir clases directamente en los componentes de Astro (`.astro`) agiliza el proceso de maquetación.

### 2. Organización de Carpetas

La estructura del proyecto sigue las convenciones de Astro para mantener el código organizado y escalable:

```
/src
├───assets/       # Iconos, imágenes y otros recursos estáticos.
├───components/   # Componentes reutilizables de Astro (ej: Header, Footer).
├───layouts/      # Plantillas base para las páginas (ej: BaseLayout.astro).
├───pages/        # Cada archivo .astro aquí se convierte en una página del sitio.
├───scripts/      # Archivos JavaScript para interactividad (ej: efectos de tipeo).
└───styles/       # Archivos de estilos globales.
```

### 3. CSS Aislado por Componente (.astro)

Astro procesa las etiquetas `<style>` dentro de los archivos `.astro` como **estilos aislados (scoped)** por defecto. Esto significa que las reglas de CSS escritas en un componente no afectan a otros, evitando conflictos de estilos y facilitando el mantenimiento.

```astro
---
// lógica del componente
---
<p>Este texto será rojo.</p>

<style>
  /* Estos estilos solo se aplican a este componente */
  p {
    color: red;
  }
</style>
```

### 4. Uso de `global.css`

El archivo `src/styles/global.css` es el punto de entrada para los estilos que deben aplicarse en todo el sitio. Su función principal es:
1.  **Importar Tailwind CSS**: Incluye las directivas `@import "tailwindcss";` para que las clases de utilidad estén disponibles globalmente.
2.  **Definir Estilos Base**: Establece estilos para la tipografía (`font-family`), colores de fondo y texto para los modos claro y oscuro.
3.  **Declarar Animaciones Globales**: Contiene los `@keyframes` para animaciones personalizadas como `fadeIn` y `blink`, junto con clases de utilidad para aplicarlas.

Este archivo se importa una sola vez en el layout principal (`src/layouts/BaseLayout.astro`) para asegurar su aplicación en todas las páginas.

### 5. Animaciones

Las animaciones se gestionan de dos maneras:
- **CSS Puro**: A través de `keyframes` y clases definidas en `global.css`. Por ejemplo, el efecto `fadeIn` se aplica a elementos usando clases como `.fade-in-1`, `.fade-in-2`, etc., que controlan la opacidad y el retardo de la animación.
- **JavaScript**: Para interacciones más complejas, se utilizan scripts ubicados en `src/scripts/`. Por ejemplo, `typing-effect.js` y `terminal-effect.js` manipulan el DOM para crear efectos de tipeo dinámicos. Estos scripts se importan en las páginas o componentes donde se necesitan.

### 6. Publicación en Vercel

El despliegue del sitio se realiza en **Vercel**, una plataforma optimizada para frameworks modernos como Astro. El proceso es automático:
1.  Se conecta el repositorio de GitHub a un nuevo proyecto en Vercel.
2.  Vercel detecta que es un proyecto de Astro y configura los comandos de construcción automáticamente.
3.  Al hacer `git push` a la rama principal, Vercel ejecuta el comando `npm run build` y despliega el contenido estático generado en la carpeta `dist/`.

Esto permite un flujo de integración y despliegue continuo (CI/CD) de manera sencilla y sin configuración adicional.
