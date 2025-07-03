import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { type Label } from '@renderer/components/ui/label'
import { type RadioGroupItem } from '@renderer/components/ui/radio-group'
import { ComponentProps } from 'react'
import { Control } from 'react-hook-form'
import { CommonInputProps } from './input'
import { SelectOption } from './select'

type CommonRadioGroupProps = Omit<CommonInputProps, 'leftIcon' | 'rightIcon'> & {
  options: SelectOption[]
  containerItemProps?: ComponentProps<'div'>
  itemComponentProps?: Omit<ComponentProps<typeof RadioGroupItem>, 'value'>
  labelItemProps?: Omit<ComponentProps<typeof Label>, 'htmlFor'>
  groupClassName?: ComponentProps<typeof RadioGroupPrimitive.RadioGroup>['className']
}

type ExtendedCommonRadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root> &
  CommonRadioGroupProps

export type RadioGroupPropsWithControl = ExtendedCommonRadioGroupProps & {
  name: string
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>
  onChange?: never
}

export type RadioGroupPropsWithoutControl = ExtendedCommonRadioGroupProps & {
  name?: string
  control?: never
}

export type RadioGroupProps = RadioGroupPropsWithControl | RadioGroupPropsWithoutControl
