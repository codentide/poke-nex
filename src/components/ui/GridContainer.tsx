interface Props {
  children: React.ReactNode
}

export const GridContainer = ({ children }: Props) => {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
      {children}
    </div>
  )
}
