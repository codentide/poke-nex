import Link from 'next/link'

export default function PokemonNotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 font-rajdhani ">
      <h2 className="text-9xl font-bold text-zinc-400 uppercase tracking-tighter">
        404
      </h2>

      <div className="my-4 max-w-lg">
        <p className="text-white/50 text-xl font-medium font-rajdhani">
          We couldn&apos;t find the Pokémon you were looking for.
        </p>
      </div>

      <Link
        href="/"
        className="px-8 py-2 rounded-md border border-white/10 hover:border-red-400/40 hover:text-white transition-all uppercase font-rajdhani text-xl bg-white/5 text-white/60 cursor-pointer"
      >
        Back to home
      </Link>
    </main>
  )
}
