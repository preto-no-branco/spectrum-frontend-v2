// src/OpenCV.ts
import cvReadyPromise from '@techstark/opencv-js'
import type { CV } from '@techstark/opencv-js'

export default class OpenCV {
  private static instance: OpenCV | null = null
  public cv: CV | null = null
  private initialized: boolean = false

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static async getInstance(): Promise<OpenCV> {
    if (!OpenCV.instance) {
      OpenCV.instance = new OpenCV()
      await OpenCV.instance.init()
    } else {
      if (!OpenCV.instance.initialized) {
        await OpenCV.instance.init()
      }
    }
    return OpenCV.instance
  }

  public static async getCV(): Promise<CV> {
    const inst = await OpenCV.getInstance()
    if (inst.cv) {
      return inst.cv
    }
    throw new Error('OpenCV não inicializado corretamente')
  }

  private async init() {
    if (this.initialized) {
      return
    }
    try {
      this.cv = await cvReadyPromise
      this.initialized = true
    } catch (err) {
      console.error('[OpenCV] Falha ao carregar cvReadyPromise:', err)
      throw err
    }
  }
}
