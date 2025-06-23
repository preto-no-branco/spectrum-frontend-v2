import { cn } from '@/lib/utils'
import * as React from 'react'

type InputProps = React.ComponentProps<'input'> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Input({ className, type, leftIcon, rightIcon, ...props }: InputProps) {
  return (
    <div
      className={cn(
        'relative flex items-center h-9 w-full rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow]',
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
      )}
    >
      {leftIcon && (
        <div className="pointer-events-none absolute left-3 text-muted-foreground">{leftIcon}</div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30',
          'flex h-full w-full min-w-0 bg-transparent px-3 py-1 text-base outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          leftIcon ? 'pl-9' : '',
          rightIcon ? 'pr-9' : '',
          className
        )}
        {...props}
      />
      {rightIcon && (
        <div className="pointer-events-none absolute right-3 text-muted-foreground">
          {rightIcon}
        </div>
      )}
    </div>
  )
}

export { Input }
