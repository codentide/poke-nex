import { StatsChart } from '@/components/pokemon/StatsChart'
import { TypeBadge } from '@/components/pokemon/TypeBadge'
import { POKE_THEMES } from '@/constants'
import { capitalize } from '@/lib/utils/format.util'
import { getMostColorfulType } from '@/lib/utils/pokemon.util'
import { getPokemonDetail, getPokemonList } from '@/services/pokemon.service'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const pokemonList = await getPokemonList()
  return pokemonList.map((pokemon) => ({ slug: pokemon.name }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const pokemon = await getPokemonDetail(slug)
  if (!pokemon) return { title: 'Pokémon not found' }
  return {
    title: `${capitalize(pokemon.name)} | Pokénex Pro`,
    description: `Details, types, and statistics of ${pokemon.name}.`,
    openGraph: {
      images: [pokemon.assets.home.default.front || ''],
    },
  }
}

export default async function PokemonDetailPage({ params }: Props) {
  const { slug } = await params
  const pokemonData = await getPokemonDetail(slug)

  if (!pokemonData) notFound()

  const primaryType = getMostColorfulType(pokemonData.types)
  const theme = POKE_THEMES[primaryType]

  return (
    <main className="min-h-screen flex flex-col items-center gap-12 p-8">
      {/* HERO */}
      <div className="flex flex-col items-center gap-4">
        <small className="block font-rajdhani text-xl text-center text-white/50">
          N° {pokemonData.id.toString().padStart(4, '0')}
        </small>
        <div className="relative flex items-center gap-12">
          <button className="absolute top-0 right-0 py-4 px-4 cursor-pointer bg-white/5 rounded-md transition-all text-md text-white">
            Shiny
          </button>
          <button className="py-4 px-2 cursor-pointer hover:bg-white/5 rounded-md transition-all text-4xl text-white/20 hover:text-white">
            <BiChevronLeft />
          </button>
          <div
            className={`relative w-96 h-96 drop-shadow-2xl ${theme.glow} drop-shadow-[0_0_120px]`}
          >
            <Image
              src={pokemonData.assets.home.default.front}
              alt={pokemonData.name + ' image'}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <button className="py-4 px-2 cursor-pointer hover:bg-white/5 rounded-md transition-all text-4xl text-white/20 hover:text-white">
            <BiChevronRight />
          </button>
        </div>
        <h1 className="w-full mt-8 text-8xl font-rajdhani font-semibold uppercase text-center">
          {pokemonData.name}
        </h1>
        <div className="flex gap-2 w-fit">
          {pokemonData.types.map((type) => (
            <TypeBadge key={type.name} type={type} />
          ))}
        </div>
        <p className="w-[80%] font-inter text-center leading-relaxed text-white/50">
          {pokemonData.description}
        </p>
      </div>
      {/*  BENTO */}
      <div className="grid grid-cols-4 gap-1.5">
        <div className="flex flex-col items-center gap-1 py-4 px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50">
          <span className="text-md text-white/50">Weight</span>
          <span className="text-2xl font-bold">{pokemonData.weight} KG</span>
        </div>
        <div className="flex flex-col items-center gap-1 py-4 px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50">
          <span className="text-md text-white/50">Height</span>
          <span className="text-2xl font-bold">{pokemonData.height} M</span>
        </div>
        <div className="flex flex-col items-center gap-1 py-4 px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50">
          <span className="text-md text-white/50">Category</span>
          <span className="text-2xl font-bold uppercase">
            {pokemonData.genus}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 py-4 px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50">
          <span className="text-md text-white/50">
            {pokemonData.abilities.length > 1 ? 'Abilities' : 'Ability'}
          </span>
          {pokemonData.abilities.map((ability) => (
            <span
              key={ability.name}
              className={`${pokemonData.abilities.length > 1 ? 'text-sm' : 'text-2xl'} font-semibold uppercase leading-none`}
            >
              {ability.name} {ability.hidden && '(h)'}
            </span>
          ))}
        </div>
      </div>
      {/* GRÁFICA */}
      <StatsChart hue={theme.hue} stats={pokemonData.stats} />
    </main>
  )
}
