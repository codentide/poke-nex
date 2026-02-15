import { TypeCalculator } from '@/components/calculator/TypeCalculator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Type Calculator | Pokenéx',
  description: 'Analyze defensive synergies and effectiveness for any Pokémon type combination. The ultimate tool for competitive strategy.',
  keywords: ['Pokémon', 'Type Calculator', 'Pokenéx', 'Battle Strategy', 'Type Effectiveness'],
  authors: [{ name: 'Codentide' }],
  openGraph: {
    title: 'Pokémon Type Calculator | Pokenéx',
    description: 'Master type advantages with our interactive calculator.',
    type: 'website',
  },
}

export default function TypeCalculatorPage() {

  return (
    <main className="min-h-screen text-white p-6 sm:p-12 pt-16 md:pt-24 font-inter">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-4xl lg:text-7xl font-bold uppercase text-zinc-300 font-rajdhani">
                Type Calculator
            </h1>
            <p className="text-zinc-500 text-md max-w-xl">
                Analyze defensive synergies and effectiveness for any type combination.
            </p>
        </div>
        <TypeCalculator />
      </div>
    </main>
  )
}
