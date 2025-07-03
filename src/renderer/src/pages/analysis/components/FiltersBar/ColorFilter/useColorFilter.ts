import { ColorMapType } from '@renderer/Image-processing/types/effects.types'
import { effectsStore } from '@renderer/pages/analysis/stores/effectsStore'
import { useStore } from '@tanstack/react-store'

export const useColorFilter = () => {
  const colorMap = useStore(effectsStore, (state) => state.colorMap)

  const handleChange = (newValue: ColorMapType) => {
    effectsStore.setState((prev) => ({
      ...prev,
      colorMap: newValue
    }))
  }

  return {
    colorMap,
    handleChange
  }
}
