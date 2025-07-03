import { ComponentProps } from 'react'
import { Control } from 'react-hook-form'
import { CommonInputProps } from './input'

type ExtendedCommonTextareaProps = ComponentProps<'textarea'> &
  Omit<CommonInputProps, 'leftIcon' | 'rightIcon'>

export type TextareaPropsWithControl = ExtendedCommonTextareaProps & {
  name: string
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>
  onChange?: never
}

export type TextareaPropsWithoutControl = ExtendedCommonTextareaProps & {
  name?: string
  control?: never
}

export type TextareaProps = TextareaPropsWithControl | TextareaPropsWithoutControl
