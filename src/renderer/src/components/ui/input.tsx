import * as React from 'react'
import { cn } from '@/lib/utils'
import * as LabelPrimitive from '@radix-ui/react-label'

interface InputProps extends React.ComponentProps<'input'> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  customFlag?: boolean
  labelProps?: React.ComponentProps<typeof LabelPrimitive.Root>
  label?: string
  icon?: string
  onClickIcon?: () => void
  error?: string
  className?: string
}

function Input({ label, labelProps, icon, onClickIcon, error, className, ...props }: InputProps) {
  const { id, type = 'text' } = props

  return (
    <>
      {label && (
        <LabelPrimitive.Root
          htmlFor={id}
          className={cn(
            'text-[0.850rem] font-semibold leading-[20px] font-plex text-content-secondary',
            labelProps?.className
          )}
          {...labelProps}
        >
          {label}
        </LabelPrimitive.Root>
      )}

      {icon ? (
        <div className={`relative ${props.disabled ? 'cursor-wait' : 'cursor-auto'}`}>
          <input
            id={id}
            type={type}
            data-slot="input"
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              className
            )}
            {...props}
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            onClick={onClickIcon}
          >
            <img
              src={icon}
              alt="icon"
              className={cn('h-4 w-4 object-contain', props.disabled ? 'animate-spin' : '')}
            />
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            className
          )}
          {...props}
        />
      )}

      {error && (
        <span id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </span>
      )}
    </>
  )
}

export { Input }
