// src/classes/Pipeline.ts
import { PipelineStep, Steps } from '../interfaces/pipeline'

export class Pipeline<T> {
  private steps: Steps<T> = []

  addStep<A>(step: PipelineStep<T, A>, args: A): this {
    this.steps.push([step, args])
    return this
  }

  updateStepIfExists<A>(predicate: (step: PipelineStep<T, A>) => boolean, newArgs: A): boolean {
    const index = this.findStepIndex(predicate)
    if (index !== -1) {
      const [step] = this.steps[index] as [PipelineStep<T, A>, A]
      this.steps[index] = [step, newArgs]
      return true
    }
    return false
  }

  findStepIndex<A>(predicate: (step: PipelineStep<T, A>) => boolean): number {
    return this.steps.findIndex(([step]) => predicate(step as PipelineStep<T, A>))
  }

  removeStep(index: number): this {
    if (index >= 0 && index < this.steps.length) {
      this.steps.splice(index, 1)
    }
    return this
  }

  clear(): this {
    this.steps.length = 0
    return this
  }

  run(input: T): T {
    return this.steps.reduce((cur, [step, args]) => step.apply(cur, args), input)
  }

  getSteps(): Steps<T> {
    return this.steps
  }
}
