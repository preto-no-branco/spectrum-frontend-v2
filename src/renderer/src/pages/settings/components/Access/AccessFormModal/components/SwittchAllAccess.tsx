import { Label } from '@renderer/components/ui/label'
import { Switch } from '@renderer/components/ui/switch'
import { CustomComponentProps } from '@renderer/core/@types/components/form'
import { Controller } from 'react-hook-form'
import { SwitchAccessLayout } from './SwitchAccessLayout'

export function SwitchAllAccess({ control, name, label, options }: CustomComponentProps) {
  return (
    <Controller
      name={name || ''}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <SwitchAccessLayout>
            <div className="flex w-full justify-between items-center">
              <Label className="text-sm font-medium">{label}</Label>
              {options?.map((opt) => (
                <Switch
                  key={opt.value}
                  defaultChecked={opt.checked}
                  value={value}
                  onCheckedChange={onChange}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Conceder todas as permissões disponíveis.
            </span>
          </SwitchAccessLayout>
        )
      }}
    />
  )
}
