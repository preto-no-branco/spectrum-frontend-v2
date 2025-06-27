import { CommonInputProps } from './input'
import { SelectOption } from './select'

export type FormInputType = 'input' | 'select' | 'checkbox' | 'date'

export type FormConfig = CommonInputProps &
  (
    | {
        colSpan?: number
        inputType?: Exclude<FormInputType, 'select'>
        options?: never
        showExternalLabel?: boolean
      }
    | {
        colSpan?: number
        inputType: 'select'
        options: SelectOption[]
      }
  )

// type ExpectedFields<T> = Record<keyof T, FormConfig>

// type ExactKeys<T extends U, U> = T & Record<Exclude<keyof T, keyof U>, never>

// export type FormField<T> = ExactKeys<ExpectedFields<T>, ExpectedFields<T>>
export type FormField<T> = Record<keyof T, FormConfig>
