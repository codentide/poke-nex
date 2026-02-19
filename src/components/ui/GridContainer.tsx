interface Props {
  children: React.ReactNode
}

export const GridContainer = ({ children }: Props) => {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-24 mt-20">
      {children}
    </div>
  )
}
