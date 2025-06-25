import { cn } from '@/lib/utils'
import { InputProps } from '@renderer/core/@types/components/input'
import { Controller } from 'react-hook-form'
import { InputErrorMessage } from './errorMessage'
import { Label } from './label'

function RenderInput({
  name,
  type,
  className,
  leftIcon,
  rightIcon,
  label,
  labelProps,
  errorMessage,
  containerProps,
  ...restInputProps
}: Omit<InputProps, 'control'>) {
  const { className: containerClassName, ...restContainerProps } = containerProps || {}
  return (
    <div
      className={`flex flex-col gap-2 pb-6 relative ${containerClassName}`}
      {...restContainerProps}
    >
      {label && (
        <Label {...labelProps} htmlFor={name}>
          {label}
        </Label>
      )}
      <div
        className={cn(
          'relative flex items-center h-9 w-full rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow]',
          'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
        )}
      >
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          name={name}
          id={name}
          type={type}
          data-slot="input"
          onInvalid={() => {
            console.log('invalid')
          }}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30',
            'flex h-full w-full min-w-0 bg-transparent px-3 py-1 text-base outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            leftIcon ? 'pl-9' : '',
            rightIcon ? 'pr-9' : '',
            className
          )}
          {...restInputProps}
        />
        {rightIcon && (
          <div className="pointer-events-none absolute right-3 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
      <div className="absolute bottom-0.5 left-0">
        <InputErrorMessage message={errorMessage} />
      </div>
    </div>
  )
}

function Input({ control, name, ...props }: InputProps) {
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value = '', ...field } }) => {
          return <RenderInput {...props} {...field} value={value} />
        }}
      />
    )
  }

  return <RenderInput name={name} {...props} />
}

export { Input }
