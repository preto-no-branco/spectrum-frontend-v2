import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { RadioGroupProps } from '@renderer/core/@types/components/radio-group'
import { Controller } from 'react-hook-form'
import { InputErrorMessage } from './errorMessage'
import { Label } from './label'

function RadioGroupCN({ className, ...props }: Omit<RadioGroupProps, 'control' | 'options'>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

function RenderRadioGroup({
  name,
  label,
  options,
  errorMessage,
  labelProps,
  labelItemProps,
  containerProps,
  containerItemProps,
  itemComponentProps,
  groupClassName,
  value = '',
  ...restInputProps
}: Omit<RadioGroupProps, 'control'>) {
  const { className: containerClassName, ...restContainerProps } = containerProps || {}
  const { className: containerItemClassName, ...restContainerItemProps } = containerItemProps || {}
  return (
    <div
      className={cn('flex flex-col gap-2 pb-6 relative', containerClassName)}
      {...restContainerProps}
    >
      {label && (
        <Label {...labelProps} htmlFor={name}>
          {label}
        </Label>
      )}
      <RadioGroupCN
        name={name}
        id={name}
        defaultValue={value || undefined}
        // value={value}
        {...restInputProps}
        className={cn('flex gap-2', groupClassName)}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={cn('flex items-center gap-1', containerItemClassName)}
            {...restContainerItemProps}
          >
            <Label htmlFor={option.value} {...labelItemProps}>
              {option.label}
            </Label>
            <RadioGroupItem value={option.value} {...itemComponentProps} />
          </div>
        ))}
      </RadioGroupCN>
      <div className="absolute bottom-0.5 left-0">
        <InputErrorMessage message={errorMessage} />
      </div>
    </div>
  )
}

function RadioGroup({ control, name, ...props }: RadioGroupProps) {
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value = '', onChange, ...field } }) => {
          return (
            <RenderRadioGroup
              {...props}
              {...field}
              value={value}
              onChange={(value) => {
                onChange(value)
              }}
            />
          )
        }}
      />
    )
  }

  return <RenderRadioGroup name={name} {...props} />
}

export { RadioGroup, RadioGroupItem }
