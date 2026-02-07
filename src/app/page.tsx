import { PokeGallery } from '@/components/pokemon'
import { getPokemonDetailList } from '@/services/pokemon.service'

export default async function Home() {
  const { data: pokeList, error } = await getPokemonDetailList()
  if (error) throw new Error(JSON.stringify(error))

  return (
    <main className="flex flex-col gap-8 min-h-screen py-12 px-[4%] md:px-[12%] lg:px-[20%] ">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold uppercase font-rajdhani text-zinc-300">
          Explore
        </h1>
        <p className="text-zinc-500 text-md">
          Discover information and statistics about your favorite Pokémon.
        </p>
      </div>
      <PokeGallery content={pokeList} />
    </main>
  )
}
