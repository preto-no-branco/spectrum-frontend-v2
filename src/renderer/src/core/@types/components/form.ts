import { ReactNode } from 'react'
import { CommonInputProps, InputPropsWithControl } from './input'
import { SelectOption } from './select'

export type FormInputType = 'input' | 'select' | 'checkbox' | 'date' | 'custom'

export type CustomComponentProps = InputPropsWithControl & {
  options?: SelectOption[]
}

export type CustomFormInput = {
  colSpan?: number
  inputType: 'custom'
  options?: SelectOption[]
  component: (props: CustomComponentProps) => ReactNode
}

type InputWithOptions = {
  colSpan?: number
  inputType: 'select'
  options: SelectOption[]
}

type InputWithoutOptions = {
  colSpan?: number
  inputType?: Exclude<FormInputType, 'select' | 'custom'>
  options?: never
  showExternalLabel?: boolean
}

export type FormConfig = CommonInputProps &
  (InputWithoutOptions | InputWithOptions | CustomFormInput)

export type FormField<T> = Record<keyof T, FormConfig>
