import { ReactNode } from 'react'
import { CommonInputProps, InputPropsWithControl } from './input'
import { SelectOption } from './select'
import { TextareaPropsWithControl } from './textarea'

export type FormInputType =
  | 'input'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'custom'

export type CustomComponentProps = (TextareaPropsWithControl & InputPropsWithControl) & {
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
  inputType: 'select' | 'radio'
  options: SelectOption[]
}

type InputWithoutOptions = {
  colSpan?: number
  inputType?: Exclude<FormInputType, 'select' | 'custom' | 'radio'>
  options?: never
  showExternalLabel?: boolean
}

export type FormConfig = CommonInputProps &
  (InputWithoutOptions | InputWithOptions | CustomFormInput)

export type FormField<T> = Record<keyof T, FormConfig>
