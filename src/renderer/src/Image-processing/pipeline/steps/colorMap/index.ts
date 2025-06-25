import { PipelineStep } from '../../../interfaces/pipeline'
import { Mat, COLOR_RGBA2GRAY, COLOR_GRAY2RGBA, LUT, cvtColor } from '@techstark/opencv-js'
import createColormap from 'colormap'
import { ColorMapType } from '../../..'

export class ApplyColorMapStep implements PipelineStep<Mat, ColorMapType> {
  apply(input: Mat, colorMap: ColorMapType): Mat {
    if (colorMap === '') {
      return input
    }

    const gray = new Mat()
    cvtColor(input, gray, COLOR_RGBA2GRAY, 0)

    const gradientColors = createColormap({
      colormap: colorMap,
      nshades: 256,
      format: 'rgba',
      alpha: 1
    })

    const lut = new Mat(256, 1, input.type())

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

    const grayColor = new Mat()
    cvtColor(gray, grayColor, COLOR_GRAY2RGBA)

    const dst = new Mat()
    LUT(grayColor, lut, dst)

    input.delete()
    gray.delete()
    grayColor.delete()
    lut.delete()

    return dst
  }
}
