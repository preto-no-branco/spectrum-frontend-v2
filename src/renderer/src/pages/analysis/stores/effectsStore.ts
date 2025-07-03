import { Enumerate } from '@renderer/types/general.types'
import { Store } from '@tanstack/react-store'

type ValidByteRange = Enumerate<256>

type EffectsState = {
  linearMap: string
  colorMap: string
  effectStack: string[]
  redScale?: ValidByteRange
  HistogramROI?: {
    x_start: number
    x_end: number
    y_start: number
    y_end: number
  }
  ROI?: {
    x_start: number
    x_end: number
    y_start: number
    y_end: number
  }
  containers: string[]
}

export const effectsStore = new Store<EffectsState>({
  linearMap: '',
  colorMap: '',
  effectStack: [],
  redScale: undefined,
  HistogramROI: undefined,
  ROI: undefined,
  containers: []
})
