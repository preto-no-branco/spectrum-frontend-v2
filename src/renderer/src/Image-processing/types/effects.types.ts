export type ColorMapType =
  | 'gray'
  | 'velocity-green'
  | 'velocity-blue'
  | 'phase'
  | 'oxygen'
  | 'magma'
  | 'electric'
  | 'copper'
  | 'hot'
  | 'rainbow'
  | 'freesurface-blue'

export type EffectType =
  | 'emboss'
  | 'denseObject'
  | 'edgeDetection'
  | 'sharpen'
  | 'smooth'
  | 'noiseReduction'
  | 'invert'
  | 'edgeEnhancement'
  | 'logarithmEnhancement'
  | 'none'

export type NonLinearMapType =
  | 'linearMap'
  | 'sigmoidMap1'
  | 'sigmoidMap2'
  | 'gammaMap1'
  | 'gammaMap2'

export type HistogramROI = {
  x_start: number
  x_end: number
  y_start: number
  y_end: number
}
