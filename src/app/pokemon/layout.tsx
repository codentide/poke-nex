type Props = {
  children: React.ReactNode
}

export default function Layout ({children}: Props) {

  return (
    <>
      <h1>Pokemon Layout</h1>
      {children}
    </>
  )
}