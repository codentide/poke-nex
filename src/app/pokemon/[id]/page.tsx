import { getPokemonDetail } from '@/services/pokemon.service'

export default async function PokemonDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const pokemonData = await getPokemonDetail(id)

  return (
    <div>
      {/* Su magia aquí con Tailwind */}
      <p>id: {pokemonData?.id}</p>
      <p>Name: {pokemonData?.name}</p>
      <p>Height: {pokemonData?.height}</p>
      <p>Weight: {pokemonData?.weight}</p>
      <div>
        <h3 className="text-[24px] font-bold">Types</h3>
        <ul>
          {pokemonData?.types.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
