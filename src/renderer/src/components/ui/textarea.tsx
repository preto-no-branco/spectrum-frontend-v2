import { cn } from '@/lib/utils'
import { TextareaProps } from '@renderer/core/@types/components/textarea'
import { Controller } from 'react-hook-form'
import { InputErrorMessage } from './errorMessage'
import { Label } from './label'

function RenderTextarea({
  name,
  label,
  value,
  className,
  errorMessage,
  labelProps,
  containerProps,
  ...restInputProps
}: Omit<TextareaProps, 'control'>) {
  const { className: containerClassName, ...restContainerProps } = containerProps || {}
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
      <textarea
        name={name}
        id={name}
        data-slot="textarea"
        value={value || ''}
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        {...restInputProps}
      />
      <div className="absolute bottom-0.5 left-0">
        <InputErrorMessage message={errorMessage} />
      </div>
    </div>
  )
}

function Textarea({ control, name, ...props }: TextareaProps) {
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value = '', ...field } }) => {
          return <RenderTextarea {...props} {...field} value={value} />
        }}
      />
    )
  }

  return <RenderTextarea name={name} {...props} />
}
export { Textarea }
