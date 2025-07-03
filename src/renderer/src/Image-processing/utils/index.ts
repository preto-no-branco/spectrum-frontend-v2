import { CV, Mat } from '@techstark/opencv-js/dist/src/types/opencv'

export function convertTo16UC1(cv: CV, src: Mat): Mat {
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

/**
 * Converte uma Mat 16UC1 em uma Mat 8UC4 (RGBA).
 *
 * @param src  Mat de entrada com type() == cv.CV_16UC1
 * @param cv   objeto OpenCV.js
 * @returns    nova Mat em 8UC4
 */
export function m16UC1to8UC1(src: Mat, cv: CV): Mat {
  const input8 = new cv.Mat()
  cv.normalize(src, input8, 0, 255, cv.NORM_MINMAX, cv.CV_8UC1)
  return input8
}
