import { Mat, CV } from '@techstark/opencv-js'
import { Pipeline } from './pipeline'
import { PipelineStep } from './interfaces/pipeline'

export enum NonLinearMap {
  Linear = 'linearMap',
  Sigmoid1 = 'sigmoidMap1',
  Sigmoid2 = 'sigmoidMap2',
  Gamma1 = 'gammaMap1',
  Gamma2 = 'gammaMap2'
}
export enum ColorMap {
  none = '',
  gray = 'gray',
  velocityGreen = 'velocity-green',
  velocityBlue = 'velocity-blue',
  phase = 'phase',
  oxygen = 'oxygen',
  magma = 'magma',
  electric = 'electric',
  copper = 'copper',
  hot = 'hot',
  rainbow = 'rainbow',
  freesurfaceBlue = 'freesurface-blue'
}
export type ColorMapType = (typeof ColorMap)[keyof typeof ColorMap]

export enum Effect {
  emboss = 'emboss',
  denseObject = 'denseObject',
  edgeDetection = 'edgeDetection',
  sharpen = 'sharpen',
  smooth = 'smooth',
  noiseReduction = 'noiseReduction',
  invert = 'invert',
  edgeEnhancement = 'edgeEnhancement',
  logarithmEnhancement = 'logarithmEnhancement'
}

export interface ImageProcessorStage {
  apply(input: Mat): Mat
}

export interface ROI {
  x_start: number
  x_end: number
  y_start: number
  y_end: number
}

export default class ImageProcessing {
  private cv: CV
  private nonLinearMap: NonLinearMap = NonLinearMap.Linear
  private colorMap: ColorMap = ColorMap.gray
  private effectStack: Effect[] = []
  private originalImage: Mat | null = null
  private currentImage: Mat | null = null
  private histogram: Mat | null = null
  private pipeline: Pipeline<Mat>

  constructor(cvInstance: CV) {
    this.cv = cvInstance
    this.pipeline = new Pipeline<Mat>()
  }

  resetImage(): void {
    this.nonLinearMap = NonLinearMap.Linear
    this.colorMap = ColorMap.gray
    this.effectStack = []
  }

  addColorMapStep(colorMap: ColorMapType, step: PipelineStep<Mat, ColorMapType>): void {
    this.colorMap = colorMap
    this.pipeline.addStep(step, colorMap)
  }
}

// imagem original 16b  -> MAPAS NÃO LINEARES -> HISTOGRAMA ROI -> EFEITOS[] -> MAPAS DE COR -> NORMALIZACAO/FINAL
