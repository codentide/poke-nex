import { Pokemon } from '@/types'

interface Props {
  children: React.ReactNode
}

export const GridContainer = ({ children }: Props) => {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">{children}</div>
}
