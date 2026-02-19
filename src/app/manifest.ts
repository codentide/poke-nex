import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pokénex PRO',
    short_name: 'Pokénex',
    description: 'The ultimate high-performance Pokédex',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#bef264',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
