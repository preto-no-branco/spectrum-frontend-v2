import {
  effectsHistoryStore,
  effectsStore,
  initialEffectsState
} from '@renderer/pages/analysis/stores/effectsStore'

export const useFiltersBar = (
  inspectionDetailsControls: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
) => {
  const resetEffects = () => {
    effectsStore.setState(initialEffectsState)
    effectsHistoryStore.setState([])
  }

  const undo = () => {
    const history = effectsHistoryStore.state

    if (history.length <= 1) {
      resetEffects()
      return
    }

    const previous = history[history.length - 2]
    const newHistory = history.slice(0, -1)

    effectsStore.setState(previous)
    effectsHistoryStore.setState(newHistory)
  }
  const [isOpen, setIsOpen] = inspectionDetailsControls

  const handleToggleInspectionDetails = () => {
    setIsOpen((prev) => !prev)
  }

  return {
    resetEffects,
    handleToggleInspectionDetails,
    isOpen,
    undo
  }
}
