import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import {
  EvolutionChain,
  PokeCover,
  StatsChart,
  TypeBadge,
} from '@/components/pokemon'
import { POKE_THEMES } from '@/constants'
import { capitalize, getEffectivities, getMostColorfulType } from '@/lib/utils'
import { getPokemonDetail, getPokemonList } from '@/services/pokemon.service'

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

  if (error && error.code != 404) throw new Error(JSON.stringify(error))
  if (!pokemonData) notFound()

  const { weaknesses, multipliers, resistances, immunities } = getEffectivities(
    pokemonData.types.map((type) => type.name)
  )
  const type = getMostColorfulType(pokemonData.types)
  const theme = POKE_THEMES[type]

  return (
    <main className="w-full min-h-screen flex flex-col items-center gap-12 p-8 ">
      {/* HERO */}
      <div className="flex flex-col items-center gap-4 w-full">
        <small className="block font-rajdhani text-xl text-center text-white/50">
          N° {pokemonData.id.toString().padStart(4, '0')}
        </small>
        <div className="relative flex items-center gap-12">
          {pokemonData.id > 1 && (
            <Link
              className="absolute top-[64%] translate-y-[-50%] -left-12 lg:-left-24 py-4 px-0 cursor-pointer hover:bg-white/5 rounded-md transition-all text-4xl text-white/20 hover:text-white"
              href={`/pokemon/${pokemonData.id - 1}`}
            >
              <BiChevronLeft className="text-5xl" />
            </Link>
          )}
          <PokeCover data={pokemonData} />
          {pokemonData.id < 1025 && (
            <Link
              className="absolute top-[64%] translate-y-[-50%] -right-12 lg:-right-24 py-4 px-0 cursor-pointer hover:bg-white/5 rounded-md transition-all text-4xl text-white/20 hover:text-white"
              href={`/pokemon/${pokemonData.id + 1}`}
            >
              <BiChevronRight className="text-5xl" />
            </Link>
          )}
        </div>
        <h1 className="w-full mt-8 text-4xl sm:text-6xl lg:text-8xl font-rajdhani font-semibold uppercase text-center">
          {pokemonData.name}
        </h1>
        <div className="flex gap-2 w-fit">
          {pokemonData.types.map((type) => (
            <TypeBadge key={type.name} type={type.name} />
          ))}
        </div>
        <p className="w-full lg:w-[80%] font-inter text-center leading-relaxed text-white/50">
          {pokemonData.description}
        </p>
      </div>
      {/*  BENTO */}
      <div className="w-full lg:w-fit grid grid-cols-2 lg:grid-cols-4 gap-1.5 ">
        {/* WEAKNESSES */}
        {weaknesses.length > 0 && (
          <div className="flex flex-col items-center gap-1 py-4 px-2 lg:px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50 col-span-4">
            <span className="text-md text-white/50">Weaknesses</span>
            <div className="flex gap-2 w-fit">
              {weaknesses.map((type) => (
                <TypeBadge
                  key={type}
                  type={type}
                  multiplier={multipliers[type]}
                />
              ))}
            </div>
          </div>
        )}
        {/* R */}
        {resistances.length > 0 && (
          <div className="flex flex-col items-center gap-1 py-4 px-2 lg:px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50 col-span-4">
            <span className="text-md text-white/50">Resistances</span>
            <div className="flex items-center gap-2 w-fit">
              {resistances.map((type) => (
                <TypeBadge
                  key={type}
                  type={type}
                  multiplier={multipliers[type]}
                />
              ))}
            </div>
          </div>
        )}
        {immunities.length > 0 && (
          <div className="flex flex-col items-center gap-1 py-4 px-2 lg:px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50 col-span-4">
            <span className="text-md text-white/50">Immunities</span>
            <div className="flex items-center gap-2 w-fit">
              {immunities.map((type) => (
                <TypeBadge
                  key={type}
                  type={type}
                  multiplier={multipliers[type]}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col items-center gap-1 py-4 px-2 lg:px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50">
          <span className="text-md text-white/50">Weight</span>
          <span className="text-xl lg:text-2xl font-bold">
            {pokemonData.weight} KG
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 py-4 px-2 lg:px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50">
          <span className="text-md text-white/50">Height</span>
          <span className="text-xl lg:text-2xl font-bold">
            {pokemonData.height} M
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 py-4 px-2 lg:px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50">
          <span className="text-md text-white/50">Category</span>
          <span className="text-xl lg:text-2xl font-bold uppercase">
            {pokemonData.genus}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 py-4 px-2 lg:px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50">
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
      <StatsChart hue={theme?.hue} stats={pokemonData.stats} />
      {/* EVOLUTION CHAIN */}
      {pokemonData.evolution && (
        <EvolutionChain theme={theme} id={pokemonData.evolution.id} />
      )}
    </main>
  )
}
