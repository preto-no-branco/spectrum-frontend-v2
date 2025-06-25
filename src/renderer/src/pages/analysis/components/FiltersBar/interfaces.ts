export type filter = {
  icon: React.ReactNode
  name: string
  function: () => void
}

export type filterControllersProps = {
  handleUndo: () => void
  handleBackwards: () => void
  handleForwards: () => void
}
