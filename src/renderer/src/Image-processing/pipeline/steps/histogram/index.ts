import { PipelineStep } from '../../../interfaces/pipeline'
import { Mat, CV } from '@techstark/opencv-js'
import { HistogramROI } from '@renderer/Image-processing/types/effects.types'

export class HistogramStep implements PipelineStep<Mat, HistogramROI> {
  private cv: CV

  constructor(cv: CV) {
    this.cv = cv
  }

  /**
   * Applies histogram equalization to the entire image based on ROI statistics.
   * @param input - CV_16UC1 input image
   * @param roi - Region of interest for histogram calculation
   * @returns CV_16UC1 output image after histogram equalization
   */
  apply(input: Mat, roi: HistogramROI): Mat {
    // Se ROI for vazio ou inválido, retorna a imagem original
    if (roi.x_start === 0 && roi.x_end === 0 && roi.y_start === 0 && roi.y_end === 0) {
      return input.clone()
    }

    // Valida se a imagem é CV_16UC1
    if (input.type() !== this.cv.CV_16UC1) {
      throw new Error("A imagem de entrada deve ser CV_16UC1")
    }

    return this.equalizeHistROI16(input, roi)
  }

  /**
   * Equaliza o histograma de toda a imagem baseado na ROI especificada.
   * @param src16 - Mat CV_16UC1 de entrada
   * @param roi - Região de interesse para calcular o histograma (valores normalizados 0-1)
   * @returns Mat CV_16UC1 equalizada
   */
  private equalizeHistROI16(src16: Mat, roi: HistogramROI): Mat {
    const cv = this.cv

    // Converte coordenadas normalizadas (0-1) para pixels
    const x = Math.floor(roi.x_start * src16.cols)
    const y = Math.floor(roi.y_start * src16.rows)
    const x_end = Math.floor(roi.x_end * src16.cols)
    const y_end = Math.floor(roi.y_end * src16.rows)
    
    // Calcula dimensões da ROI
    const w = x_end - x
    const h = y_end - y

    // Valida ROI
    if (w <= 0 || h <= 0 || x < 0 || y < 0 || 
        x + w > src16.cols || y + h > src16.rows) {
      throw new Error("ROI inválida ou fora dos limites da imagem")
    }

    // Extrai ROI
    const roiMat = src16.roi(new cv.Rect(x, y, w, h))

    // Calcula histograma de 65536 bins na ROI
    const hist = new cv.Mat()
    const images = new cv.MatVector()
    images.push_back(roiMat)
    
    cv.calcHist(
      images,
      [0],           // canais
      new cv.Mat(),  // máscara
      hist,
      [65536],       // bins
      [0, 65536],    // ranges
      false          // accumulate
    )

    // Constrói CDF (Cumulative Distribution Function)
    const cdf = new Float64Array(65536)
    cdf[0] = hist.data32F[0]
    for (let i = 1; i < 65536; i++) {
      cdf[i] = cdf[i - 1] + hist.data32F[i]
    }

    const totalPixels = roiMat.rows * roiMat.cols

    // Encontra o primeiro valor não-zero da CDF
    let minCdf = 0
    for (let i = 0; i < 65536; i++) {
      if (cdf[i] > 0) {
        minCdf = cdf[i]
        break
      }
    }

    const scale = 65535 / (totalPixels - minCdf)

    // Cria LUT (Look-Up Table)
    const lut = new Uint16Array(65536)
    for (let i = 0; i < 65536; i++) {
      let v = Math.round((cdf[i] - minCdf) * scale)
      if (v < 0) v = 0
      else if (v > 65535) v = 65535
      lut[i] = v
    }

    // Aplica LUT na imagem inteira (não apenas na ROI)
    const dst16 = new cv.Mat(src16.rows, src16.cols, cv.CV_16UC1)
    const srcBuf = src16.data16U
    const dstBuf = dst16.data16U
    const totalImagePixels = src16.rows * src16.cols

    for (let i = 0; i < totalImagePixels; i++) {
      dstBuf[i] = lut[srcBuf[i]]
    }

    // Libera memória
    roiMat.delete()
    hist.delete()
    images.delete()

    return dst16
  }
}