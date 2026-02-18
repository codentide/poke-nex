import { EvolutionChainSkeleton } from '@/components/skeletons'

export default function Loading() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center gap-12 px-[4%] py-12 lg:py-24">
      <div className="flex flex-col items-center gap-4 w-full animate-pulse">
        {/* N° ID */}
        <small className="h-8 w-24 bg-white/5 rounded" />
        {/* PokemonDetail Image Area con botones de navegación */}
        <div className="relative flex items-center justify-center gap-4 md:gap-12 w-full">
          {/* Botón izquierdo */}
          <div className="absolute xs:static -left-3 w-12 h-12 bg-white/5 rounded-full" />
          {/* Imagen del Pokémon */}
          <div className="relative flex items-center justify-center w-full max-w-md">
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-white/5 rounded-full" />
          </div>
          {/* Botón derecho */}
          <div className="absolute xs:static -right-3 w-12 h-12 bg-white/5 rounded-full" />
        </div>
        {/* Name Placeholder */}
        <h1 className="w-full mt-8 h-10 sm:h-16 lg:h-24 max-w-md bg-white/10 rounded-lg" />
        {/* Type Badges Placeholder */}
        <div className="flex gap-2 w-fit">
          <div className="h-6 w-20 bg-white/5 rounded" />
          <div className="h-6 w-20 bg-white/5 rounded" />
        </div>
        {/* Description Placeholder */}
        <div className="w-full lg:w-[80%] space-y-2 mt-2">
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-5/6 bg-white/5 rounded mx-auto" />
          <div className="h-4 w-4/6 bg-white/5 rounded mx-auto" />
        </div>
      </div>

      {/* --- BENTO GRID SKELETON --- */}
      <div className="w-full lg:w-fit grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-1.5 animate-pulse">
        {/* Weaknesses - Full width */}
        <div className="col-span-2 lg:col-span-4 flex flex-col items-center gap-1 p-4 lg:px-8 rounded-lg border border-zinc-900 bg-zinc-900/50">
          <div className="h-4 w-24 bg-white/10 rounded mb-2" />
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-20 bg-white/5 rounded" />
            ))}
          </div>
        </div>

        {/* Resistances - Full width */}
        <div className="col-span-2 lg:col-span-4 flex flex-col items-center gap-1 p-4 lg:px-8 rounded-lg border border-zinc-900 bg-zinc-900/50">
          <div className="h-4 w-24 bg-white/10 rounded mb-2" />
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 w-full">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 w-20 bg-white/5 rounded" />
            ))}
          </div>
        </div>

        {/* Weight */}
        <div className="flex flex-col items-center gap-1 p-4 lg:px-8 rounded-lg border border-zinc-900 bg-zinc-900/50">
          <div className="h-4 w-16 bg-white/10 rounded" />
          <div className="h-6 lg:h-8 w-20 bg-white/5 rounded mt-1" />
        </div>

        {/* Height */}
        <div className="flex flex-col items-center gap-1 p-4 lg:px-8 rounded-lg border border-zinc-900 bg-zinc-900/50">
          <div className="h-4 w-16 bg-white/10 rounded" />
          <div className="h-6 lg:h-8 w-20 bg-white/5 rounded mt-1" />
        </div>

        {/* Category */}
        <div className="flex flex-col items-center gap-1 p-4 lg:px-8 rounded-lg border border-zinc-900 bg-zinc-900/50">
          <div className="h-4 w-20 bg-white/10 rounded" />
          <div className="h-6 lg:h-8 w-24 bg-white/5 rounded mt-1" />
        </div>

        {/* Ability */}
        <div className="flex flex-col items-center gap-1 p-4 lg:px-8 rounded-lg border border-zinc-900 bg-zinc-900/50">
          <div className="h-4 w-16 bg-white/10 rounded" />
          <div className="h-6 lg:h-8 w-28 bg-white/5 rounded mt-1" />
        </div>
      </div>

      {/* --- STATS SKELETON --- */}
      <div className="w-full flex flex-col gap-0 h-68 lg:h-120 mb-8 animate-pulse">
        <h3 className="h-10 w-48 bg-white/5 rounded-lg mx-auto mb-4" />
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="w-64 h-64 lg:w-96 lg:h-96 border-4 border-dashed border-white/5 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-dashed border-white/5 rounded-full" />
          </div>
        </div>
      </div>

      {/* --- EVOLUTION CHAIN SKELETON --- */}
      <EvolutionChainSkeleton />

      {/* --- BUTTONS SKELETON --- */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-fit animate-pulse">
        <div className="h-12 w-full md:w-48 bg-white/5 rounded-lg" />
        <div className="h-12 w-full md:w-48 bg-white/5 rounded-lg" />
      </div>
    </main>
  )
}
