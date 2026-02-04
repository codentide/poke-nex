# Roadmap: Pokénex Pro (Next.js + Clean Architecture)

### Fase 1: Cimientos y Data (El Core) ✅

- [x] Configuración de capas: Fetcher (API), Adaptador y Servicio.
- [x] Tipado estricto: Interfaces para la API y Tipos de Dominio.
- [x] Estrategia de Caché: Implementación de ISR (Incremental Static Regeneration).

### Fase 2: El Detalle del Pokémon (Visualización) ✅

- [x] Imagen de alta calidad: Integración de official-artwork.
- [x] Diccionario de colores: Mapeo de tipos a colores de Tailwind.
- [x] Manejo de errores: Implementación de notFound() para slugs inexistentes.
- [x] Datos físicos: Conversión de unidades (Altura en metros, Peso en kg).

Fase 3: Optimización y SSG ⚡

- [x] Static Params: Generación estática basada en slug (nombres).
- [x] Validación de Build: Verificación de los 151 paths generados en producción.
- [x] SEO dinámico: Configuración de generateMetadata para títulos y descripciones únicas.
- [ ] Optimización de Imágenes: Uso del componente <Image /> de Next.js para evitar Cumulative Layout Shift (CLS).

Fase 4: El Listado (Home) e Interacción 🏠

- [x] Data Fetching Pro: Implementación de getFullPokemonList con Promise.all para hidratar el Home.
- [x] Arquitectura de Componentes: Separación en /components/ui (Badges) y /components/pokemon (Cards).
- [x] Grid Estático: Renderizado de las 151 tarjetas con toda su info (ID, Tipos, Sprites) desde el servidor.
- [x] Buscador Client-Side: Filtrado rápido sobre la lista estática ya cargada.
