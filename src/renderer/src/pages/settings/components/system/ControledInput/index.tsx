import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { InputPropsWithControl } from '@renderer/core/@types/components/input'
import { CheckCircle2Icon } from 'lucide-react'
import { useRef, useState } from 'react'

export interface ControledInputProps extends InputPropsWithControl {
  isValid?: boolean
  leftContentString?: string
  onSubmit?: () => void
}

export function ControledInput({
  name,
  // isValid,
  label,
  leftContentString,
  onSubmit,
  ...props
}: ControledInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleActive = () => {
    if (isEditing) {
      onSubmit?.()
      setIsEditing(false)

      return
    }

    inputRef.current?.focus()
    console.log('🚀 ~ inputRef.current:', inputRef.current)
    setIsEditing(true)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <Label>{label}</Label>
        <Button
          size="icon"
          variant="link"
          type="submit"
          className={`font-bold ${isEditing ? 'text-primary underline' : 'text-content-tertiary'}`}
          onClick={(e) => {
            e.preventDefault()
            toggleActive()
          }}
        >
          {isEditing ? '( Salvar )' : '( Editar )'}
        </Button>
      </div>
      <Input
        ref={inputRef}
        name={name}
        disabled={!isEditing}
        placeholder="Endereço do servidor"
        className={leftContentString ? 'pl-16' : ''}
        leftIcon={
          leftContentString && <span className="text-muted-foreground">{leftContentString}</span>
        }
        rightIcon={
          <CheckCircle2Icon
            className={isEditing ? 'text-content-tertiary' : 'text-primary/60'}
            size={20}
          />
        }
        {...props}
      />
    </div>
  )
}
