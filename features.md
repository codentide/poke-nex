# 🗺️ Roadmap: Pokénex Pro

Este documento detalla el camino a seguir para convertir este proyecto en una aplicación de nivel profesional, asegurando mantenibilidad, rendimiento y visibilidad.

## Fase 1: Persistencia y Experiencia de Usuario

### Sistema de Favoritos:

- Crear un contexto o estado global (Zustand/Context API) para manejar los Pokémon favoritos.
- Implementar persistencia de datos mediante LocalStorage para que los favoritos se mantengan tras recargar la página.
- Añadir botón de "Favorito" (corazón) tanto en la galería principal como en la vista de detalle.

### Garantizar Responsividad:

- Auditoría completa de la interfaz en dispositivos móviles (Mobile First).
- Optimización de elementos táctiles (botones y navegación).
- Asegurar que el diseño se adapte correctamente a pantallas grandes (Desktop).

## Fase 2: Mejoras de Interfaz (UI/UX)

### Modos de Visualización en Poke Gallery:

- Implementar un selector de vista: Grilla (actual) vs Lista.
- La vista de lista debe mostrar estadísticas rápidas (HP, Ataque, etc.) para facilitar la comparación.

### Filtros Avanzados:

- Filtrar Pokémon por tipo (Fuego, Agua, etc.).
- Barra de búsqueda con sugerencias en tiempo real (debounce).

## Fase 3: Dominio del SEO y Visibilidad

### Asegurar el SEO:

- Generar un `sitemap.xml` dinámico para que Google indexe los 151 Pokémon.
- Configurar el archivo `robots.txt`.
- Implementar JSON-LD (Datos Estructurados) en las páginas de detalle para mejorar el posicionamiento en buscadores.

### Imágenes de Respaldo y Social:

- Implementar la imagen de fallback (Pokéball) para el metadata cuando no haya imagen disponible.
- Configurar una imagen de OpenGraph por defecto para la página principal.

## Fase 4: Refinamiento Técnico

### Optimización de Imágenes:

- Uso estricto de `next/image` con placeholders de carga (blur effect).

### Manejo de Errores Pro:

- Crear vistas personalizadas para `error.tsx` y mejorar la página de Pokémon no encontrado.
