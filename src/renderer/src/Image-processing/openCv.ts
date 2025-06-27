import cvReadyPromise from '@techstark/opencv-js'
import { CV } from '@techstark/opencv-js'

class OpenCV {
  private static instance: OpenCV
  public cv: CV | null = null
  private initialized: boolean = false
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static async getInstance(): Promise<OpenCV> {
    if (!OpenCV.instance) {
      OpenCV.instance = new OpenCV()
      await OpenCV.instance.init()
    }
    return OpenCV.instance
  }

  private async init() {
    if (this.initialized) return
    this.cv = await cvReadyPromise
    this.initialized = true
    console.log('[OpenCV] Ready!')
  }
}

export default OpenCV
