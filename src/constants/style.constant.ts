export interface TypeTheme {
  bg: string
  text: string
  border: string
  hover: string
  glow: string
}

export const POKE_THEMES: Record<string, TypeTheme> = {
  fire: {
    bg: 'bg-red-600/20',
    text: 'text-red-400',
    border: 'border-red-500/50',
    hover: 'hover:bg-red-500/30',
    glow: 'shadow-[0_0_12px] shadow-red-500/20 outline-red-400/20',
  },
  water: {
    bg: 'bg-blue-600/20',
    text: 'text-blue-400',
    border: 'border-blue-500/50',
    hover: 'hover:bg-blue-500/30',
    glow: 'shadow-[0_0_12px] shadow-blue-500/20 outline-blue-400/20',
  },
  grass: {
    bg: 'bg-green-600/20',
    text: 'text-green-400',
    border: 'border-green-500/50',
    hover: 'hover:bg-green-500/30',
    glow: 'shadow-[0_0_12px] shadow-green-500/20 outline-green-400/20',
  },
  electric: {
    bg: 'bg-yellow-600/20',
    text: 'text-yellow-400',
    border: 'border-yellow-400/50',
    hover: 'hover:bg-yellow-400/30',
    glow: 'shadow-[0_0_12px] shadow-yellow-400/20 outline-yellow-400/20',
  },
  ice: {
    bg: 'bg-cyan-600/20',
    text: 'text-cyan-400',
    border: 'border-cyan-400/50',
    hover: 'hover:bg-cyan-400/30',
    glow: 'shadow-[0_0_12px] shadow-cyan-400/20 outline-cyan-400/20',
  },
  fighting: {
    bg: 'bg-orange-600/20',
    text: 'text-orange-400',
    border: 'border-orange-500/50',
    hover: 'hover:bg-orange-500/30',
    glow: 'shadow-[0_0_12px] shadow-orange-500/20 outline-orange-400/20',
  },
  poison: {
    bg: 'bg-purple-600/20',
    text: 'text-purple-400',
    border: 'border-purple-500/50',
    hover: 'hover:bg-purple-500/30',
    glow: 'shadow-[0_0_12px] shadow-purple-500/20 outline-purple-400/20',
  },
  ground: {
    bg: 'bg-amber-600/20',
    text: 'text-amber-400',
    border: 'border-amber-600/50',
    hover: 'hover:bg-amber-600/30',
    glow: 'shadow-[0_0_12px] shadow-amber-600/20 outline-amber-400/20',
  },
  flying: {
    bg: 'bg-indigo-600/20',
    text: 'text-indigo-400',
    border: 'border-indigo-400/50',
    hover: 'hover:bg-indigo-400/30',
    glow: 'shadow-[0_0_12px] shadow-indigo-400/20 outline-indigo-400/20',
  },
  psychic: {
    bg: 'bg-pink-600/20',
    text: 'text-pink-400',
    border: 'border-pink-500/50',
    hover: 'hover:bg-pink-500/30',
    glow: 'shadow-[0_0_12px] shadow-pink-500/20 outline-pink-400/20',
  },
  bug: {
    bg: 'bg-lime-600/20',
    text: 'text-lime-400',
    border: 'border-lime-500/50',
    hover: 'hover:bg-lime-500/30',
    glow: 'shadow-[0_0_12px] shadow-lime-500/20 outline-lime-400/20',
  },
  rock: {
    bg: 'bg-stone-600/50',
    text: 'text-stone-300',
    border: 'border-stone-500/50',
    hover: 'hover:bg-stone-500/30',
    glow: 'shadow-[0_0_12px] shadow-stone-500/20 outline-stone-400/20',
  },
  ghost: {
    bg: 'bg-violet-600/20',
    text: 'text-violet-400',
    border: 'border-violet-500/50',
    hover: 'hover:bg-violet-500/30',
    glow: 'shadow-[0_0_12px] shadow-violet-500/20 outline-violet-400/20',
  },
  dragon: {
    bg: 'bg-indigo-600/20',
    text: 'text-indigo-400',
    border: 'border-indigo-500/50',
    hover: 'hover:bg-indigo-500/30',
    glow: 'shadow-[0_0_12px] shadow-indigo-500/20 outline-indigo-400/20',
  },
  steel: {
    bg: 'bg-slate-600/50',
    text: 'text-slate-200',
    border: 'border-slate-500/50',
    hover: 'hover:bg-slate-500/30',
    glow: 'shadow-[0_0_12px] shadow-slate-500/20 outline-slate-400/20',
  },
  fairy: {
    bg: 'bg-rose-600/20',
    text: 'text-rose-400',
    border: 'border-rose-400/50',
    hover: 'hover:bg-rose-400/30',
    glow: 'shadow-[0_0_12px] shadow-rose-400/20 outline-rose-400/20',
  },
  normal: {
    bg: 'bg-zinc-600/80',
    text: 'text-zinc-200',
    border: 'border-zinc-500/50',
    hover: 'hover:bg-zinc-500/30',
    glow: 'shadow-[0_0_12px] shadow-zinc-500/20 outline-zinc-400/20',
  },
  default: {
    bg: 'bg-white/10',
    text: 'text-white',
    border: 'border-white/20',
    hover: 'hover:bg-white/20',
    glow: 'shadow-[0_0_12px] shadow-wh2te/10 outline-wh4te/20',
  },
}
