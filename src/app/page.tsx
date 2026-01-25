import { PokeGallery } from '@/components/pokemon'
import { getPokemonDetailList } from '@/services/pokemon.service'

export default async function Home() {
  const pokeList = await getPokemonDetailList()

  return (
    <main className="flex flex-col gap-8 min-h-screen py-12 px-[4%] md:px-[16%] bg-zinc-950">
      {/* <div className="flex flex-col gap-8 items-center"> */}
      {/* <h1 className="text-center text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Kanto <span className="text-red-600">Pokédex</span>
        </h1> */}
      <PokeGallery content={pokeList} />
      {/* </div> */}
    </main>
  )
}
