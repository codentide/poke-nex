import Link from 'next/link'

export default function PokemonNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">¡Ese Pokémon se escapó!</h2>
      <p>No pudimos encontrar el ID que buscabas, mor.</p>
      <Link href="/" className="mt-4 text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  )
}
