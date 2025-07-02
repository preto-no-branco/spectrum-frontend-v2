export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type ExtractKeys<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends string
    ? Prefix extends ''
      ? K
      : `${Prefix}.${string & K}`
    : T[K] extends Record<string, any>
      ? ExtractKeys<T[K], Prefix extends '' ? string & K : `${Prefix}.${string & K}`>
      : never
}[keyof T]

export type ExtractValues<T> = T extends string
  ? T
  : T extends Record<string, any>
    ? ExtractValues<T[keyof T]>
    : never
