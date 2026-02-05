import { TYPE_DEFENSE_CHART } from '@/constants'
import { ApiEvolutionChainResponse, Evolution, PokeType } from '@/types'

export const getPokemonOfTheDay = (totalPokemons: number = 1025) => {
  const today = new Date()

  // Creamos un número único basado en Año, Mes y Día
  // Ej: 20240523
  const dateSeed =
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

  // Usamos una función de hash simple para que el orden no sea lineal
  const pseudoRandom = (dateSeed * 16807) % 2147483647

  // Obtenemos el ID dentro del rango de Pokémon existentes
  const pokemonId = (pseudoRandom % totalPokemons) + 1

  return pokemonId
}

export const getMostColorfulType = (types: PokeType[]): PokeType['name'] => {
  if (!types) return 'normal'

  if (types.length > 1) {
    const isGrayType =
      types[0].name === 'normal' ||
      types[0].name === 'rock' ||
      types[0].name === 'steel'

    if (isGrayType) return types[1].name
  }
  return types[0].name
}

export const flatEvolutionChain = (
  node: ApiEvolutionChainResponse['chain']
): Evolution[] => {
  const flattened: Evolution[] = []

  const dive = (current: ApiEvolutionChainResponse['chain']) => {
    const id = current.species.url.split('/').filter(Boolean).pop()

    flattened.push({
      id: Number(id),
      name: current.species.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
    })

    current.evolves_to.forEach((next) => dive(next))
  }

  dive(node)
  return flattened
}

export const getEffectivities = (types: PokeType['name'][]) => {
  const damageMultipliers: Record<string, number> = {}

  // Inicializamos todos los tipos de ataque posibles con 1x
  Object.keys(TYPE_DEFENSE_CHART).forEach((type) => {
    damageMultipliers[type] = 1
  })

  // Calculamos el acumulado defensivo
  types.forEach((pokemonType) => {
    const typeLower = pokemonType.toLowerCase()
    const defenseRelations = TYPE_DEFENSE_CHART[typeLower]

    if (defenseRelations) {
      Object.keys(defenseRelations).forEach((attackerType) => {
        damageMultipliers[attackerType] *= defenseRelations[attackerType]
      })
    }
  })

  // Filtramos los resultados para la UI
  const weaknesses = Object.keys(damageMultipliers).filter(
    (t) => damageMultipliers[t] > 1
  ) as PokeType['name'][]

  const resistances = Object.keys(damageMultipliers).filter(
    (t) => damageMultipliers[t] < 1 && damageMultipliers[t] > 0
  ) as PokeType['name'][]

  const immunities = Object.keys(damageMultipliers).filter(
    (t) => damageMultipliers[t] === 0
  ) as PokeType['name'][]

  return { weaknesses, resistances, immunities, multipliers: damageMultipliers }
}
