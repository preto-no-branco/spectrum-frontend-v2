export type filter<T = string> = {
  icon: React.ReactNode
  name: string
  function: () => void,
  value: T
}

export type filterControllersProps = {
  handleReset: () => void
  handleBackwards: () => void
  handleForwards: () => void
}

export type FiltersBarProps = {
  inspectionDetailsControls: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}
