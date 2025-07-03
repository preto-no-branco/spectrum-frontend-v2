import { effectsStore } from '@renderer/pages/analysis/stores/effectsStore'
import { useStore } from '@tanstack/react-store'

export const useImageAdjustments = () => {
  const { contrast, exposure } = useStore(effectsStore, (state) => ({
    contrast: state.contrast,
    exposure: state.exposure
  }))

  const updateContrast = (value: number) => {
    effectsStore.setState((prev) => ({
      ...prev,
      contrast: value
    }))
  }

  const updateExposure = (value: number) => {
    effectsStore.setState((prev) => ({
      ...prev,
      exposure: value
    }))
  }

  return {
    contrast,
    exposure,
    updateContrast,
    updateExposure
  }
}
