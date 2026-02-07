import {
  DetailBento,
  DetailHero,
  EvolutionChain,
  StatsChart,
} from '@/components/pokemon'
import { Button } from '@/components/ui/Button'
import { ShareButton } from '@/components/ui/ShareButton'
import { POKE_THEMES } from '@/constants'
import { capitalize, getMostColorfulType } from '@/lib/utils'
import { getPokemonDetail, getPokemonList } from '@/services/pokemon.service'
import { notFound } from 'next/navigation'
import { BiShare } from 'react-icons/bi'
import { IoHeart } from 'react-icons/io5'
import { MdShare } from 'react-icons/md'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const { data, error } = await getPokemonList()
  if (error) throw new Error(JSON.stringify(error))
  return data.map((pokemon) => ({ slug: pokemon.name }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data, error } = await getPokemonDetail(slug)
  if (!data || error) return { title: 'Pokémon not found' }
  return {
    title: `${capitalize(data.name)} | Pokénex Pro`,
    description: `Details, types, and statistics of ${data.name}.`,
    openGraph: {
      images: [data.assets.home.default || ''],
    },
  }
}

export default async function PokemonDetailPage({ params }: Props) {
  const { slug } = await params
  const { data: pokemonData, error } = await getPokemonDetail(slug)

  // Validations
  if (error && error.code != 404) throw new Error(JSON.stringify(error))
  if (!pokemonData) notFound()

  const type = getMostColorfulType(pokemonData.types)
  const theme = POKE_THEMES[type]

  return (
    <main className="w-full min-h-screen flex flex-col items-center gap-12 px-[4%] py-12 lg:pn-24 ">
      <DetailHero data={pokemonData} />
      <DetailBento data={pokemonData} />
      <StatsChart hue={theme?.hue} stats={pokemonData.stats} />
      {/* Suspense + Bones */}
      {pokemonData.evolution && (
        <EvolutionChain theme={theme} id={pokemonData.evolution.id} />
      )}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-fit">
        <Button className="flex items-center justify-center gap-3 w-full md:w-fit">
          <IoHeart size={20} />
          Add to Favorites
        </Button>
        <ShareButton />
      </div>
    </main>
  )
}
