import { PipelineStep } from '../../../interfaces/pipeline'
import { Mat, CV } from '@techstark/opencv-js'
import { EffectType } from '../../..'

export class EffectStep implements PipelineStep<Mat, EffectType[]> {
  private cv: CV

  constructor(cv: CV) {
    this.cv = cv
  }

  apply(input: Mat, effectStack: EffectType[]): Mat {
    console.log('[EffectStep] Applying effect:', effectStack)
    return input // Placeholder for effect application logic
  }
}
