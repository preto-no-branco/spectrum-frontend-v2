import { PipelineStep } from '../../../interfaces/pipeline'
import { Mat, CV } from '@techstark/opencv-js'
import { EffectType } from '../../..'
import { convertTo16UC1 } from '@renderer/Image-processing/utils'
import {
  denseObject,
  edgeDetection,
  edgeEnhancement,
  emboss,
  invert,
  logarithmEnhancement,
  noiseReduction,
  sharpen,
  smooth
} from './effects'

/**
 * EffectStep applies a series of image processing effects to a 16-bit grayscale image.
 * Effects are defined for 8-bit images and adapted to work in a 16-bit pipeline.
 */
export class EffectStep implements PipelineStep<Mat, EffectType[]> {
  private cv: CV
  private adapters: Record<EffectType, (input: Mat) => Mat>

  constructor(cv: CV) {
    this.cv = cv
    this.adapters = {
      '': this.noneEffect,
      edgeDetection: this.effectAdapter(edgeDetection),
      emboss: this.effectAdapter(emboss),
      denseObject: this.effectAdapter(denseObject),
      edgeEnhancement: this.effectAdapter(edgeEnhancement),
      sharpen: this.effectAdapter(sharpen),
      smooth: this.effectAdapter(smooth),
      noiseReduction: this.effectAdapter(noiseReduction),
      invert: this.effectAdapter(invert),
      logarithmEnhancement: (inputMat) => logarithmEnhancement(this.cv, inputMat)
    }
  }

  /**
   * Applies the stack of effects in order to the input image.
   * @param input - CV_16UC1 input image
   * @param effectStack - Array of effect names to apply
   * @returns CV_16UC1 output image after all effects
   */
  apply(input: Mat, effectStack: EffectType[]): Mat {
    let output = input.clone()

    for (const effect of effectStack) {
      const fn = this.adapters[effect]
      if (fn) {
        const next = fn(output)
        output.delete()
        output = next
      }
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

  /**
   * Adapts an 8-bit effect function to operate on 16-bit images.
   * Internally normalizes 16UC1 to 8UC1, applies the effect, then converts back.
   * @param effectFn - A function that processes a CV_8UC1 image
   * @returns A function that accepts and returns a CV_16UC1 image
   */
  private effectAdapter(effectFn: (cv: CV, input: Mat) => Mat): (input: Mat) => Mat {
    return (input: Mat): Mat => {
      // Normalize 16-bit to 8-bit grayscale
      const input8 = new this.cv.Mat()
      this.cv.normalize(input, input8, 0, 255, this.cv.NORM_MINMAX, this.cv.CV_8UC1)

      // Apply the 8-bit effect
      const result8 = effectFn(this.cv, input8)

      // Convert result back to 16-bit
      const result16 = convertTo16UC1(this.cv, result8)

      // Clean up intermediate Mats
      input8.delete()
      result8.delete()

      return result16
    }
  }
}
