import { NonLinearMapType } from '@renderer/Image-processing/types/effects.types'
import { effectsStore } from '@renderer/pages/analysis/stores/effectsStore'
import { useStore } from '@tanstack/react-store'

export const useLinearMap = () => {
  const linearMap = useStore(effectsStore, (state) => state.linearMap)

  const handleChange = (newValue: NonLinearMapType) => {
    effectsStore.setState((prev) => ({
      ...prev,
      linearMap: newValue
    }))
  }

  return {
    linearMap,
    handleChange
  }
}
