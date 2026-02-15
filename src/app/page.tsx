import { PokeGallery } from '@/components/pokemon'
import { getPokemonDetailList } from '@/services/pokemon.service'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pokenéx PRO',
  description: 'Discover stats, types, and build your favorite collection.',
  keywords: ['Pokémon', 'PokeAPI', 'Pokémon Gallery'],
  openGraph: {
    title: 'Pokenéx PRO',
    description: 'Discover details and stats of your favorite Pokémon in a polished, modern interface.',
    url: 'https://poke-nex.vercel.app',
    siteName: 'Pokenéx PRO',
    type: 'website',
  },
}

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