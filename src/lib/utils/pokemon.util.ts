import { PokeType } from '@/types'

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

export const getMostColorfulType = (types: PokeType[]) => {
  if (types.length > 1) {
    const isGrayType =
      types[0].name === 'normal' ||
      types[0].name === 'rock' ||
      types[0].name === 'steel'

    if (isGrayType) return types[1].name
  }
  return types[0].name
}
