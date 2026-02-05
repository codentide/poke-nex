import { PokeGallery } from '@/components/pokemon'
import { getPokemonDetailList } from '@/services/pokemon.service'

export default async function Home() {
  const { data: pokeList, error } = await getPokemonDetailList()
  if (error) throw new Error(JSON.stringify(error))

  return (
    <main className="flex flex-col gap-8 min-h-screen py-12 px-[4%] md:px-[20%] ">
      <PokeGallery content={pokeList} />
    </main>
  )
}
