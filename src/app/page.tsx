import { PokeGallery } from '@/components/pokemon'
import { getPokemonDetailList } from '@/services/pokemon.service'

export default async function Home() {
  const pokeList = await getPokemonDetailList()

  return (
    <main className="min-h-screen bg-zinc-50 py-10 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <h1 className="mb-10 text-center text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Kanto <span className="text-red-600">Pokédex</span>
        </h1>
        <PokeGallery content={pokeList} />
      </div>
    </main>
  )
}
