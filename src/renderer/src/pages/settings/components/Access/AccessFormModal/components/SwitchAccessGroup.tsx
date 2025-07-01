import { Label } from '@renderer/components/ui/label'
import { Switch } from '@renderer/components/ui/switch'
import { CustomComponentProps } from '@renderer/core/@types/components/form'
import { Controller } from 'react-hook-form'
import { SwitchAccessLayout } from './SwitchAccessLayout'

export interface SwitchAccessGroupProps {
  label: string
  options: {
    label: string
    value: string
    checked?: boolean
  }[]
}

export function SwitchAccessGroup({
  label,
  options,
  control,
  name,
  disabled
}: CustomComponentProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <SwitchAccessLayout>
            <Label className="text-sm font-medium">{label}</Label>
            <div className="flex flex-col gap-1">
              {options?.map((opt) => (
                <div
                  key={`switch-access-group-opt-${opt.value}`}
                  className="flex w-full justify-between items-center"
                >
                  <span className="text-sm text-muted-foreground">{opt.label}</span>
                  <Switch
                    disabled={disabled}
                    defaultChecked={opt.checked}
                    value={value}
                    onCheckedChange={(checked) => onChange({ ...value, [opt.value]: checked })}
                  />
                </div>
              ))}
            </div>
          </SwitchAccessLayout>
        )
      }}
    />
  )
}
