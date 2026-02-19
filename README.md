# Poke-Nex 🐾

A high-performance Pokédex built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

The core of this project is the implementation of **Clean Architecture** (Fetchers, Adapters, and Services layers) combined with **SSG (Static Site Generation)** and **ISR (Incremental Static Regeneration)** to deliver an instant user experience and highly maintainable, scalable code.

## ✨ Key Features

- **Static-First Architecture (SSG/ISR):** Pre-rendering of **1025+ specimens** in record time (~11.7s), providing instant LCP (Largest Contentful Paint) and SEO-ready pages. Configured with a weekly **ISR** cycle to keep data fresh without sacrificing performance.
- **Advanced Search & Filtering:** A high-performance filtering system powered by custom hooks and **Debounce logic**, allowing users to scan the database by name, type, and sort order without compromising CPU performance.
- **Persisted Tweaks Engine:** An advanced state management system using **Zustand** that preserves user preferences (Filters, Types, Regions, and View Modes) across sessions via `sessionStorage`, while intelligently resetting volatile data like pagination for a fresh navigation experience.
- **Pokémon Variations & Forms:** Full support for switching between different Pokémon forms (Mega Evolutions, Regional Forms, Gigantamax) with a dynamic **Type-Theme Engine** that adapts the UI palette based on the specimen's dominant type.
- **Hybrid View Modes:** Flexible UI that allows users to toggle between **Grid** and **Table/List** views. The layout choice is persisted, ensuring the application looks exactly how the user prefers every time they return.
- **Dynamic Favorite System:** Integrated **Zustand + LocalStorage** persistence layer that enables users to curate their own collection. The UI reacts instantly to state changes, providing real-time feedback across the entire application.

## ⚡ Performance Highlights

- **Parallel Build:** 1030+ static pages generated in **< 12 seconds** using multi-threaded worker pools.
- **Smart Hydration:** Custom hydration guard implementation to prevent UI flickering between Server-Side HTML and Persisted Client-Side State.
- **Optimized Assets:** High-fidelity image handling with Next.js Image optimization for minimal layout shift.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (with Middleware Persist)
- **Styling:** [Tailwind CSS](https://tailwind-css.com/)
- **API:** [PokeAPI](https://pokeapi.co/)

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone git@github.com:codentide/poke-nex.git
   cd poke-nex
   pnpm i & pnpm dev
   ```
