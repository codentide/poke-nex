import {
  PokemonDetailView,
  EvolutionChain,
  ShareButton,
} from '@/components/pokemon'
import { FavoriteButton } from '@/components/pokemon/FavoriteButton'
import { EvolutionChainSkeleton } from '@/components/skeletons'
import { POKE_THEMES } from '@/constants'
import { getMostColorfulType } from '@/lib/utils'
import { detailToSummary } from '@/lib/utils/detailToSummary'
import { getPokemonDetail, getPokemonList } from '@/services/pokemon.service'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

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
    title: `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} | Pokénex Pro`,
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

  const type = getMostColorfulType(pokemonData.types.map((t) => t.name))
  const theme = POKE_THEMES[type]

  return (
    <main className="w-full min-h-screen flex flex-col items-center gap-12 px-[4%] py-12 lg:pn-24 ">
      <PokemonDetailView data={pokemonData} />
      {pokemonData.evolution && (
        <Suspense fallback={<EvolutionChainSkeleton />}>
          <EvolutionChain theme={theme} id={pokemonData.evolution.id} />
        </Suspense>
      )}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-fit">
        <FavoriteButton pokemon={detailToSummary(pokemonData)} />
        <ShareButton />
      </div>
    </main>
  )
}
