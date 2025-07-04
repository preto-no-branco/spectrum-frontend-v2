import { Store } from '@tanstack/react-store'
import {
  ColorMapType,
  EffectType,
  NonLinearMapType
} from '@renderer/Image-processing/types/effects.types'

type EffectsState = {
  linearMap: NonLinearMapType
  colorMap: ColorMapType
  effectStack: EffectType[]
  contrast: number
  exposure: number
  histogramROI: {
    x_start: number
    x_end: number
    y_start: number
    y_end: number
  }
}

export const initialEffectsState: EffectsState = {
  linearMap: 'linearMap',
  colorMap: 'gray',
  effectStack: [],
  contrast: 1,
  exposure: 1,
  histogramROI: {
    x_start: 0,
    x_end: 0,
    y_start: 0,
    y_end: 0
  }
}

export const effectsStore = new Store<EffectsState>(initialEffectsState)

export const effectsHistoryStore = new Store<EffectsState[]>([])

effectsStore.subscribe((newState) => {

  const prevState = effectsHistoryStore.state.slice(-1)[0] || initialEffectsState
  const isEqual =
    JSON.stringify({
      ...newState.currentVal,
      contrast: 0,
      exposure: 0
    }) ===
    JSON.stringify({
      ...prevState,
      contrast: 0,
      exposure: 0
    })

  if (isEqual) {
    return
  }

  const snapshot: EffectsState = JSON.parse(JSON.stringify(newState.currentVal))

  const currentHistory = effectsHistoryStore.state
  console.log('Current History:', [...currentHistory, snapshot])
  effectsHistoryStore.setState([...currentHistory, snapshot])
})
