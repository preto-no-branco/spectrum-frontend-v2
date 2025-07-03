import { convertTo16UC1 } from '@renderer/Image-processing/utils'
import { Mat, CV } from '@techstark/opencv-js'

export function denseObject(cv: CV, input: Mat): Mat {
  const clahe = new cv.CLAHE(30.0, new cv.Size(30, 30))
  const enhanced = new cv.Mat()
  clahe.apply(input, enhanced)
  return enhanced
}

export function edgeDetection(cv: CV, input: Mat): Mat {
  const blurred = new cv.Mat()
  cv.GaussianBlur(input, blurred, new cv.Size(3, 3), 0)

  const edges = new cv.Mat()
  cv.Canny(blurred, edges, 50, 100)

  blurred.delete()
  return edges
}

export function emboss(cv: CV, input: Mat): Mat {
  const strength = 2
  const kernel = cv.matFromArray(3, 3, cv.CV_32F, [
    +1 * strength,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    -1 * strength
  ])

  const output = new cv.Mat()
  cv.filter2D(input, output, cv.CV_8U, kernel)

  return output
}

export function invert(cv: CV, input: Mat): Mat {
  const result = new cv.Mat()
  if (input.type() === cv.CV_8UC4) {
    const rgbaPlanes = new cv.MatVector()
    cv.split(input, rgbaPlanes)

    for (let i = 0; i < 3; i++) {
      const chan = rgbaPlanes.get(i)
      cv.bitwise_not(chan, chan)
      chan.delete()
    }

    cv.merge(rgbaPlanes, result)
    rgbaPlanes.delete()
  } else {
    cv.bitwise_not(input, result)
  }
  return result
}

export function logarithmEnhancement(cv: CV, input: Mat): Mat {
  const grayImageFloat = new cv.Mat()
  input.convertTo(grayImageFloat, cv.CV_32F)

  cv.normalize(grayImageFloat, grayImageFloat, 1, 65535, cv.NORM_MINMAX, cv.CV_32F)

  const logImage = new cv.Mat()
  cv.log(grayImageFloat, logImage)

  const logImageNormalized = new cv.Mat()
  cv.normalize(logImage, logImageNormalized, 0, 255, cv.NORM_MINMAX, cv.CV_8U)

  const clahe = new cv.CLAHE(3.0, new cv.Size(16, 16))
  const enhancedImage = new cv.Mat()
  clahe.apply(logImageNormalized, enhancedImage)

  const enhancedRGBA = new cv.Mat()
  cv.cvtColor(enhancedImage, enhancedRGBA, cv.COLOR_GRAY2RGBA)

  return convertTo16UC1(cv, enhancedRGBA)
}

export function smooth(cv: CV, input: Mat): Mat {
  const result = new cv.Mat()
  cv.GaussianBlur(input, result, new cv.Size(5, 5), 0)
  return result
}

export function noiseReduction(cv: CV, input: Mat): Mat {
  const result = new cv.Mat()
  cv.medianBlur(input, result, 5)
  return result
}

export function sharpen(cv: CV, input: Mat): Mat {
  const kernel = cv.matFromArray(3, 3, cv.CV_32F, [0, -1, 0, -1, 5, -1, 0, -1, 0])

  const output = new cv.Mat()
  cv.filter2D(input, output, cv.CV_8U, kernel)

  kernel.delete()
  return output
}

export function edgeEnhancement(cv: CV, input: Mat): Mat {
  const smoothedImage = new cv.Mat()
  cv.GaussianBlur(input, smoothedImage, new cv.Size(3, 3), 0)

  const prewittXKernel = cv.matFromArray(3, 3, cv.CV_32F, [-1, 0, 1, -1, 0, 1, -1, 0, 1])
  const prewittYKernel = cv.matFromArray(3, 3, cv.CV_32F, [-1, -1, -1, 0, 0, 0, 1, 1, 1])

  const prewittX = new cv.Mat()
  const prewittY = new cv.Mat()
  cv.filter2D(smoothedImage, prewittX, cv.CV_8U, prewittXKernel)
  cv.filter2D(smoothedImage, prewittY, cv.CV_8U, prewittYKernel)

  const prewittXAbs = new cv.Mat()
  const prewittYAbs = new cv.Mat()
  cv.convertScaleAbs(prewittX, prewittXAbs)
  cv.convertScaleAbs(prewittY, prewittYAbs)

  const prewittEdges = new cv.Mat()
  cv.addWeighted(prewittXAbs, 1.5, prewittYAbs, 0.5, 0, prewittEdges)

  prewittEdges.convertTo(prewittEdges, cv.CV_8U)
  cv.cvtColor(prewittEdges, prewittEdges, cv.COLOR_GRAY2RGBA)

  prewittXKernel.delete()
  prewittYKernel.delete()
  prewittX.delete()
  prewittY.delete()
  prewittXAbs.delete()
  prewittYAbs.delete()

  return prewittEdges
}
