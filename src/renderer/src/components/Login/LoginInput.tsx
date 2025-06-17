import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@renderer/lib/utils'

interface LoginInputProps {
  labelProps?: React.ComponentProps<typeof LabelPrimitive.Root>
  inputProps: React.ComponentProps<'input'>
  label: string | React.ReactNode
  id: string
  error?: string
  icon?: string
  onClickIcon?: () => void
}

export const LoginInput = ({
  inputProps,
  labelProps,
  id,
  label,
  error,
  icon,
  onClickIcon
}: LoginInputProps): React.JSX.Element => {
  return (
    <>
      <Label
        htmlFor={id}
        className={cn(
          'text-[0.850rem] font-semibold leading-[20px] font-plex text-content-secondary',
          labelProps?.className
        )}
        {...labelProps}
      >
        {label}
      </Label>
      <div className={`relative ${inputProps.disabled ? 'cursor-wait' : 'cursor-auto'}`}>
        <Input
          id={id}
          {...inputProps}
          className={cn('dark:bg-background pr-10', inputProps.className)}
        />

        {icon && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            onClick={onClickIcon}
          >
            <img
              src={icon}
              alt="icon"
              className={cn('h-4 w-4 object-contain', inputProps.disabled ? 'animate-spin' : '')}
            />
          </div>
        )}
      </div>
      {error && (
        <span id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </span>
      )}
    </>
  )
}
