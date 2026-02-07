interface Props {
  title: string
  description?: string
  children?: React.ReactNode
  full?: boolean
}

export const BentoItem = ({ title, description, children, full }: Props) => {
  return (
    <div
      className={`${full ? 'col-span-2 lg:col-span-4' : ''} flex flex-col items-center gap-1 p-4 lg:px-8 rounded-lg border font-rajdhani border-zinc-900 bg-zinc-900/50 `}
    >
      <span className="text-md text-white/50">{title}</span>
      <span className="text-xl lg:text-2xl font-bold">{description}</span>
      {children}
    </div>
  )
}
