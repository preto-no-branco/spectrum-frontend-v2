import { PipelineStep } from '../../../interfaces/pipeline'
import { Mat, CV } from '@techstark/opencv-js'
import { gammaMapping, sigmoidMapping } from './effects'
import { NonLinearMapType } from '@renderer/Image-processing/types/effects.types'
/**
 * LinearMapStep applies non-linear mappings to a CV_16UC1 image.
 * It supports various mappings such as sigmoid and gamma.
 */
export class LinearMapStep implements PipelineStep<Mat, NonLinearMapType> {
  private cv: CV
  private functions: Record<NonLinearMapType, (input: Mat) => Mat>

  constructor(cv: CV) {
    this.cv = cv
    this.functions = {
      linearMap: this.noneEffect,
      sigmoidMap1: (input: Mat) => sigmoidMapping(this.cv, input, 6.0, 0.7),
      sigmoidMap2: (input: Mat) => sigmoidMapping(this.cv, input, 5.0, 0.35),
      gammaMap1: (input: Mat) => gammaMapping(this.cv, input, 0.3, 1.0),
      gammaMap2: (input: Mat) => gammaMapping(this.cv, input, 0.15, 1.0)
    }
  }

  /**
   * Applies the selected map to the input image.
   * @param input - CV_16UC1 input image
   * @param selectedMap - selected map type to apply
   * @returns CV_16UC1 output image after all effects
   */
  apply(input: Mat, selectedMap: NonLinearMapType): Mat {
    let output = input.clone()

    const fn = this.functions[selectedMap]
    if (fn) {
      const next = fn(output)
      output.delete()
      output = next
    }

    return output
  }

  /**
   * No-op effect: returns a clone of the input image.
   * @param input - Mat to clone
   * @returns A cloned Mat
   */
  private noneEffect(input: Mat): Mat {
    return input.clone()
  }
}
