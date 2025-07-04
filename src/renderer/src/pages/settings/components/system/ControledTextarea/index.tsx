import { Button } from '@renderer/components/ui/button'
import { Label } from '@renderer/components/ui/label'
import { Textarea } from '@renderer/components/ui/textarea'
import { TextareaPropsWithControl } from '@renderer/core/@types/components/textarea'
import { CheckCircle2Icon } from 'lucide-react'
import { useState } from 'react'

export interface ControledTextareaProps extends TextareaPropsWithControl {
  isValid?: boolean
  onSubmit?: () => void
}

export function ControledTextarea({
  name,
  // isValid,
  label,
  onSubmit,
  ...props
}: ControledTextareaProps) {
  const [isEditing, setIsEditing] = useState(false)

  const toggleActive = () => {
    if (isEditing) {
      onSubmit?.()
      setIsEditing(false)

      return
    }

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
      <div className="relative">
        <Textarea name={name} disabled={!isEditing} placeholder="Endereço do servidor" {...props} />
        <CheckCircle2Icon
          className={`absolute top-2 right-3 ${isEditing ? 'text-content-tertiary' : 'text-primary/60'}`}
          size={20}
        />
      </div>
    </div>
  )
}
