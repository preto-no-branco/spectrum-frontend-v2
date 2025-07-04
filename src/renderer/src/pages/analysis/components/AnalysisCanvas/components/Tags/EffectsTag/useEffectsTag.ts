import { useCallback } from 'react'
import { effectsStore } from '@renderer/pages/analysis/stores/effectsStore'
import { useStore } from '@tanstack/react-store'
import {
  ColorMapType,
  EffectType,
  NonLinearMapType
} from '@renderer/Image-processing/types/effects.types'
import { ROIStore } from '@renderer/pages/analysis/stores/ROIStore'

export const useEffectsTag = () => {
  const RoiRect = useStore(ROIStore, (state) => state)
  const hasROISelected = RoiRect.width > 0 && RoiRect.height > 0

  const { colorMap, linearMap, effectStack, contrast, exposure, histogramROI } = useStore(
    effectsStore,
    (state) => ({
      colorMap: state.colorMap,
      linearMap: state.linearMap,
      effectStack: state.effectStack,
      contrast: state.contrast,
      exposure: state.exposure,
      histogramROI: state.histogramROI
    })
  )

  const hasHistogramROISelected =
    histogramROI.x_start !== 0 ||
    histogramROI.x_end !== 0 ||
    histogramROI.y_start !== 0 ||
    histogramROI.y_end !== 0
  const removeEffectFromStack = useCallback((index: number) => {
    effectsStore.setState((state) => ({
      ...state,
      effectStack: state.effectStack.filter((_, i) => i !== index)
    }))
  }, [])

  const effectsDictionary: Record<EffectType, string> = {
    emboss: 'Relevo',
    denseObject: 'Objeto Denso',
    edgeDetection: 'Detecção de Bordas',
    sharpen: 'Nitidez',
    smooth: 'Suavização',
    noiseReduction: 'Redução de Ruído',
    invert: 'Inversão',
    edgeEnhancement: 'Realce de Bordas',
    logarithmEnhancement: 'Realce Logarítmico',
    none: 'Nenhum'
  }

  const colorMapDictionary: Record<ColorMapType, string> = {
    gray: 'Cinza',
    'velocity-green': 'Verde de Velocidade',
    'velocity-blue': 'Azul de Velocidade',
    phase: 'Fase',
    oxygen: 'Oxigênio',
    magma: 'Magma',
    electric: 'Elétrico',
    copper: 'Cobre',
    hot: 'Quente',
    rainbow: 'Arco-íris',
    'freesurface-blue': 'Azul de Superfície Livre'
  }

  const linearMapDictionary: Record<NonLinearMapType, string> = {
    linearMap: 'Mapa Linear',
    sigmoidMap1: 'Mapa Sigmoide 1',
    sigmoidMap2: 'Mapa Sigmoide 2',
    gammaMap1: 'Mapa Gamma 1',
    gammaMap2: 'Mapa Gamma 2'
  }

  return {
    colorMap: colorMapDictionary[colorMap],
    linearMap: linearMapDictionary[linearMap],
    effectStack: effectStack.map((effect) => effectsDictionary[effect] || effect),
    contrast,
    exposure,
    removeEffectFromStack,
    hasROISelected,
    hasHistogramROISelected
  }
}
