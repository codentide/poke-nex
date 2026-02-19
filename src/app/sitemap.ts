import { MetadataRoute } from 'next'
import { getPokemonList } from '@/services/pokemon.service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = 'https://poke-nex.vercel.app'
  const { data, error } = await getPokemonList()

  if (error || !data) {
    return [{ url: BASE_URL, lastModified: new Date() }]
  }

  const pokemonEntries: MetadataRoute.Sitemap = data.map((pokemon) => ({
    url: `${BASE_URL}/pokemon/${pokemon.name}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...pokemonEntries,
  ]
}
