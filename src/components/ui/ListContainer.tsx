interface Props {
  children: React.ReactNode
}

export const ListContainer = ({ children }: Props) => {
  return <div className="flex flex-col gap-2">{children}</div>
}
