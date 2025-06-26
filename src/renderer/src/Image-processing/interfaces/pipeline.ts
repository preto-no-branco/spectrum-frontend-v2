export interface PipelineStep<T, A = void> {
  apply(input: T, args: A): T
}

export type PipelineStepTuple<T, A> = [step: PipelineStep<T, A>, args: A]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Steps<T> = PipelineStepTuple<T, any>[]