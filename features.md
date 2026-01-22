# Roadmap: Pokénex Pro (Next.js + Clean Architecture)

### Fase 1: Cimientos y Data (El Core) ✅

- [x] Configuración de capas: Fetcher (API), Adaptador y Servicio.
- [x] Tipado estricto: Interfaces para la API y Tipos de Dominio.
- [x] Estrategia de Caché: Implementación de ISR (Incremental Static Regeneration).

### Fase 2: El Detalle del Pokémon (Visualización) 🎨

- [ ] Imagen de alta calidad: Integración de official-artwork con el componente <Image /> de Next.js.
- [ ] Diccionario de colores: Mapeo de tipos (fire, water, etc.) a colores de Tailwind.
- [ ] Manejo de estados: Implementación de notFound() para IDs inexistentes.
- [ ] Datos físicos: Conversión de unidades (Altura en metros, Peso en kg).

### Fase 3: Optimización y UX ⚡

- [ ] Static Params: Generación estática de los primeros 151 Pokémones (generateStaticParams).
- [ ] Skeleton Loader: Pantalla de carga elegante mientras se genera la página.
- [ ] SEO dinámico: Configuración de generateMetadata para que cada Pokémon tenga su título propio.

### Fase 4: El Listado (Home) 🏠

- [ ] Infinite Scroll o Paginación: Carga eficiente de la lista principal.
- [ ] Buscador en tiempo real: Filtrado por nombre o ID.
