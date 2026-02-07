# Poke-Nex 🐾

A high-performance Pokédex built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

The core of this project is the implementation of **Clean Architecture** (Fetchers, Adapters, and Services layers) combined with **ISR (Incremental Static Regeneration)** to deliver an instant user experience and highly maintainable, scalable code.

## ✨ Key Features

- **Advanced Search & Filtering:** A high-performance filtering system powered by custom hooks and **Debounce logic**, allowing users to scan the database by name, type, and sort order without compromising CPU performance.
- **Dynamic Favorite System:** Integrated **Zustand + LocalStorage** persistence layer that enables users to curate their own collection. The UI reacts instantly to state changes, providing real-time feedback across the entire application.
- **Seamless Pagination:** Intelligent data windowing that handles large datasets efficiently, ensuring the UI remains snappy while navigating through the global registry or personal archives.
- **Detailed Pokémon Archives:** Comprehensive detail pages for every specimen, showcasing stats, types, and high-fidelity assets, all served via **Next.js Dynamic Routing** for optimal performance.
- **Hybrid View Modes:** Flexible UI that allows users to toggle between **Grid** and **List** views, adapting the data presentation to their specific needs.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PokeAPI](https://pokeapi.co/)

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone git@github.com:codentide/poke-nex.git
   ```
