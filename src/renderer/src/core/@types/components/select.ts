import type * as SelectPrimitive from '@radix-ui/react-select'
import { type Label } from '@renderer/components/ui/label'
import { ComponentProps, ReactNode } from 'react'
import { Control } from 'react-hook-form'

export type SelectProps = ComponentProps<typeof SelectPrimitive.Root>
export type SelectGroupProps = ComponentProps<typeof SelectPrimitive.Group>
export type SelectValueProps = ComponentProps<typeof SelectPrimitive.Value>
export type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
}
export type SelectContentProps = ComponentProps<typeof SelectPrimitive.Content>
export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item>
export type SelectLabelProps = ComponentProps<typeof SelectPrimitive.Label>
export type SelectSeparatorProps = ComponentProps<typeof SelectPrimitive.Separator>
export type SelectScrollUpButtonProps = ComponentProps<typeof SelectPrimitive.ScrollUpButton>
export type SelectScrollDownButtonProps = ComponentProps<typeof SelectPrimitive.ScrollDownButton>

export type SelectOption<T = string> = {
  label: string
  value: T
  icon?: ReactNode
}

export type CommonInputProps = {
  label?: string
  errorMessage?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  labelProps?: ComponentProps<typeof Label>
  containerProps?: ComponentProps<'div'>
}

type ExtendedCommonInputProps = ComponentProps<'input'> & CommonInputProps

export type InputPropsWithControl = ExtendedCommonInputProps & {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  onChange?: never
}

export type InputPropsWithoutControl = ExtendedCommonInputProps & {
  name?: string
  control?: never
}

export type InputProps = InputPropsWithControl | InputPropsWithoutControl

type Select = InputProps & SelectProps

export type CustomSelectProps = Select & {
  options: SelectOption[]

  showExternalLabel?: boolean
  groupProps?: SelectGroupProps
  valueProps?: SelectValueProps
  triggerProps?: SelectTriggerProps
  contentProps?: SelectContentProps
  itemProps?: Omit<SelectItemProps, 'value'>
  separatorProps?: SelectSeparatorProps
}
