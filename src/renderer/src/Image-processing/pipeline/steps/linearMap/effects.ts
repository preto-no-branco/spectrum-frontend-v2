import { Mat, CV } from '@techstark/opencv-js'

export function gammaMapping(cv: CV, src: Mat, gamma: number, scale: number): Mat {
  const actualGamma = gamma

  const actualScale = scale

  const MAX_VAL = 65535
  const lut = new Uint16Array(MAX_VAL + 1)

  // Monta LUT usando s = c * (r ^ gamma) com parâmetros dinâmicos
  for (let i = 0; i <= MAX_VAL; i++) {
    const normalized = i / MAX_VAL // r ∈ [0,1]
    let mapped = actualScale * Math.pow(normalized, actualGamma) // c * r^γ
    mapped = Math.min(Math.max(mapped, 0), 1) // clip em [0,1]
    lut[i] = Math.round(mapped * MAX_VAL)
  }

  // Cria imagem de saída
  const dst = new cv.Mat(src.rows, src.cols, cv.CV_16UC1)
  const srcBuf = src.data16U
  const dstBuf = dst.data16U

  // Aplica LUT
  const total = src.rows * src.cols
  for (let idx = 0; idx < total; idx++) {
    dstBuf[idx] = lut[srcBuf[idx]]
  }

  return dst
}

export function sigmoidMapping(cv: CV, src: Mat, GAIN: number, OFFSET: number): Mat {
  const actualGAIN = GAIN

  const actualOFFSET = OFFSET

  const MAX_VAL = 65535

  const lut = new Uint16Array(MAX_VAL + 1)
  for (let i = 0; i <= MAX_VAL; i++) {
    const normalized = i / MAX_VAL
    const mapped = 1.0 / (1.0 + Math.exp(-actualGAIN * (normalized - actualOFFSET)))
    let out = Math.round(mapped * MAX_VAL)
    if (out < 0) out = 0
    if (out > MAX_VAL) out = MAX_VAL
    lut[i] = out
  }

  const dst = new cv.Mat(src.rows, src.cols, cv.CV_16UC1)
  const srcBuf = src.data16U
  const dstBuf = dst.data16U

  const total = src.rows * src.cols
  for (let idx = 0; idx < total; idx++) {
    dstBuf[idx] = lut[srcBuf[idx]]
  }

  return dst
}
