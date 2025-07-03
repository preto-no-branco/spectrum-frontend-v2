import { PipelineStep } from '../../../interfaces/pipeline'
import createColormap from 'colormap'
import { Mat, CV } from '@techstark/opencv-js'
import { m16UC1to8UC1 } from '@renderer/Image-processing/utils'
import { ColorMapType } from '@renderer/Image-processing/types/effects.types'

// TODO: Implement hardcoded colormaps ou cache colormaps

export class ColorMapStep implements PipelineStep<Mat, ColorMapType> {
  private cv: CV

  constructor(cv: CV) {
    this.cv = cv
  }

  apply(input: Mat, colorMap: ColorMapType): Mat {
    const { cv } = this
    if (input.type() !== cv.CV_8UC1) {
      const tmp8 = m16UC1to8UC1(input, cv)
      cv.cvtColor(tmp8, input, cv.COLOR_GRAY2RGBA)
      tmp8.delete()
    }
    if (colorMap === 'gray') {
      return input.clone()
    }
    const gradientColors = createColormap({
      colormap: colorMap,
      nshades: 256,
      format: 'rgba',
      alpha: 1
    })

    const lut = new cv.Mat(256, 1, cv.CV_8UC4)

    if (colorMap === 'rainbow') {
      for (let i = 0; i < 256; i++) {
        lut.ucharPtr(255 - i, 0)[0] = gradientColors[i][0]
        lut.ucharPtr(255 - i, 0)[1] = gradientColors[i][1]
        lut.ucharPtr(255 - i, 0)[2] = gradientColors[i][2]
        lut.ucharPtr(255 - i, 0)[3] = gradientColors[i][3] * 255
      }
    } else {
      for (let i = 0; i < 256; i++) {
        lut.ucharPtr(i, 0)[0] = gradientColors[i][0]
        lut.ucharPtr(i, 0)[1] = gradientColors[i][1]
        lut.ucharPtr(i, 0)[2] = gradientColors[i][2]
        lut.ucharPtr(i, 0)[3] = gradientColors[i][3] * 255
      }
    }

    const gray = new cv.Mat()
    cv.cvtColor(input, gray, cv.COLOR_RGBA2GRAY, 0)

    const grayColor = new cv.Mat()
    cv.cvtColor(gray, grayColor, cv.COLOR_GRAY2RGBA)

    const dst = new cv.Mat()
    cv.LUT(grayColor, lut, dst)

    gray.delete()
    grayColor.delete()
    lut.delete()

    return dst
  }
}
