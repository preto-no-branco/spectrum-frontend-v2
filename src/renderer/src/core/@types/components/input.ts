import { type Label } from '@renderer/components/ui/label'
import { ComponentProps, ReactNode } from 'react'
import { Control } from 'react-hook-form'

export type CommonInputProps = {
  label?: string
  placeholder?: string
  errorMessage?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  labelProps?: ComponentProps<typeof Label>
  containerProps?: ComponentProps<'div'>
}

type ExtendedCommonInputProps = ComponentProps<'input'> & CommonInputProps

export type InputPropsWithControl = ExtendedCommonInputProps & {
  name: string
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>
  onChange?: never
}

export type InputPropsWithoutControl = ExtendedCommonInputProps & {
  name?: string
  control?: never
}

export type InputProps = InputPropsWithControl | InputPropsWithoutControl
