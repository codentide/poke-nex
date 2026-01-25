import { TYPE_COLORS } from '@/constants/pokemon.constant'
import { capitalize } from '@/lib/utils/format.util'
import { getPokemonDetail, getPokemonList } from '@/services/pokemon.service'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Cabecera con ID y Nombre */}
        <div className="bg-slate-600 p-6 text-white flex justify-between items-center">
          <h1 className="text-3xl font-bold capitalize">{pokemonData.name}</h1>
          <span className="text-slate-400 font-mono text-xl">
            #{pokemonData.id.toString().padStart(3, '0')}
          </span>
        </div>

        {/* Contenedor de la Imagen */}
        <div className="relative flex justify-center bg-linear-to-b from-slate-600 to-white pt-4">
          <div className="relative w-64 h-64 drop-shadow-2xl">
            <Image
              src={pokemonData.assets.home.shiny.front}
              alt={pokemonData.name + ' image'}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Info y Tipos */}
        <div className="p-8">
          <div className="flex justify-center gap-3 mb-8">
            {pokemonData.types.map(({ name: type }) => {
              const colorClass = TYPE_COLORS[type] || TYPE_COLORS.default
              return (
                <span
                  key={type}
                  className={`px-6 py-1.5 rounded-full text-sm font-black uppercase tracking-wider shadow-sm ${colorClass}`}
                >
                  {type}
                </span>
              )
            })}
          </div>

          {/* Stats Básicas */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
                Height
              </p>
              <p className="text-xl font-bold text-slate-800">
                {pokemonData.height} m
              </p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
                Weight
              </p>
              <p className="text-xl font-bold text-slate-800">
                {pokemonData.weight} kg
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
