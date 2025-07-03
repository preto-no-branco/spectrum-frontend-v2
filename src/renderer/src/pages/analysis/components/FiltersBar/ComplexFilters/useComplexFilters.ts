import { EffectType } from '@renderer/Image-processing/types/effects.types'
import { effectsStore } from '@renderer/pages/analysis/stores/effectsStore'
import { useStore } from '@tanstack/react-store'

export const useComplexFilters = () => {
  const effectStack = useStore(effectsStore, (state) => state.effectStack)

  const addToEffectStack = (newValue: EffectType) => {
    effectsStore.setState((prev) => {
      const alreadyExists = prev.effectStack.includes(newValue)
      return {
        ...prev,
        effectStack: alreadyExists
          ? prev.effectStack.filter((effect) => effect !== newValue)
          : [...prev.effectStack, newValue]
      }
    })
  }

  return {
    effectStack,
    addToEffectStack
  }
}
