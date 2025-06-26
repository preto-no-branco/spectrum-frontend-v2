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

export type ColorMapType = keyof typeof ColorMap | ''

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

export type EffectType = keyof typeof Effect | ''

export default class ImageProcessing {
  private cv: CV
  private pipeline: Pipeline<Mat>
  private originalImageMat: Mat | null = null
  private currentImageMat: Mat | null = null
  private canvas: HTMLCanvasElement

  constructor(cvInstance: CV, canvas: HTMLCanvasElement, imageUrl: string) {
    this.cv = cvInstance
    this.canvas = canvas
    this.pipeline = new Pipeline<Mat>()
    this.initializeImage(imageUrl)
  }

  public processImage(): void {
    if (!this.originalImageMat || !this.currentImageMat) {
      return
    }
    this.resetCurrentImage()
    const result = this.pipeline.getSteps().length
      ? this.pipeline.run(this.currentImageMat)
      : this.currentImageMat
    this.renderMat(result)
  }

  public colorMapStep(colorMap: ColorMapType, step: PipelineStep<Mat, ColorMapType>): void {
    const updated = this.pipeline.updateStepIfExists(
      (s) => s.constructor.name === step.constructor.name,
      colorMap
    )
    if (!updated) {
      this.pipeline.addStep(step, colorMap)
    }
  }

  private initializeImage(imageUrl: string): void {
    this.imageToMat(imageUrl).then((mat) => {
      this.originalImageMat = this.convertTo16UC1(mat)
      this.originalImageMat.copyTo((this.currentImageMat = new this.cv.Mat()))
      mat.delete()
      this.renderMat(this.currentImageMat)
    })
  }

  private async imageToMat(image: string): Promise<Mat> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const tmpCanvas = document.createElement('canvas')
        tmpCanvas.width = img.width
        tmpCanvas.height = img.height
        const ctx = tmpCanvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        const mat = this.cv.imread(tmpCanvas)
        resolve(mat)
      }
      img.onerror = () => reject(new Error('Erro ao carregar imagem'))
      img.src = image
    })
  }

  private resetCurrentImage(): void {
    this.currentImageMat?.delete()
    this.originalImageMat?.copyTo((this.currentImageMat = new this.cv.Mat()))
  }

  private convertTo16UC1(src: Mat): Mat {
    const { cv } = this
    const gray8 = new cv.Mat()
    if (src.channels() === 1) {
      src.copyTo(gray8)
    } else if (src.channels() === 3) {
      cv.cvtColor(src, gray8, cv.COLOR_RGB2GRAY)
    } else {
      cv.cvtColor(src, gray8, cv.COLOR_RGBA2GRAY)
    }
    const dst16 = new cv.Mat()
    gray8.convertTo(dst16, cv.CV_16U)
    gray8.delete()
    return dst16
  }

  private renderMat(mat: Mat): void {
    const { cv, canvas } = this
    let disp: Mat

    switch (mat.type()) {
      case cv.CV_16UC1: {
        const tmp8 = new cv.Mat()
        mat.convertTo(tmp8, cv.CV_8U)
        disp = new cv.Mat()
        cv.cvtColor(tmp8, disp, cv.COLOR_GRAY2RGBA)
        tmp8.delete()
        break
      }
      case cv.CV_8UC1: {
        disp = new cv.Mat()
        cv.cvtColor(mat, disp, cv.COLOR_GRAY2RGBA)
        break
      }
      case cv.CV_8UC3: {
        disp = new cv.Mat()
        cv.cvtColor(mat, disp, cv.COLOR_RGB2RGBA)
        break
      }
      case cv.CV_8UC4: {
        disp = mat
        break
      }
      default: {
        disp = mat
      }
    }

    canvas.width = disp.cols
    canvas.height = disp.rows
    cv.imshow(canvas, disp)

    if (disp !== mat) disp.delete()
  }
}
