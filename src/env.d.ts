/// <reference types="astro/client" />

// permite importar imágenes SVG (y otras extensiones si quieres)
declare module "*.svg" {
  const content: any;
  export default content;
}
