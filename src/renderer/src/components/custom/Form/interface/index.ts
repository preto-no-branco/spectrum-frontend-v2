import { FormField } from '@renderer/core/@types/components/form'
import { HTMLAttributes, ReactNode } from 'react'
import { Control, DefaultValues, FieldValues, Path } from 'react-hook-form'
import { ZodTypeAny } from 'zod'

export interface FormComponentProps<T extends FieldValues> {
  control?: Control<T, unknown>
  fields: FormField<T>
  schema?: ZodTypeAny
  children?: ReactNode
  columns?: number
  onSubmit?: (data: T) => void
  showSubmitButton?: boolean
  isLoading?: boolean
  isDisabled?: boolean
  defaultValues?: DefaultValues<T>
  containerProps?: HTMLAttributes<HTMLFormElement>
  watch?: {
    watchList: Path<T>[]
    onStateChange: (data: { field: keyof T; state: T[keyof T] }) => void
  }
}
