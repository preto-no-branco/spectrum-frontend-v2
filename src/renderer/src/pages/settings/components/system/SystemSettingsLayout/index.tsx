import { Label } from '@renderer/components/ui/label'

export interface SystemSettingsLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function SystemSettingsLayout({ children, title, description }: SystemSettingsLayoutProps) {
  return (
    <div className="min-w-[60rem] p-6 gap-6 flex flex-col items-center justify-between rounded-lg border bg-input/30">
      <div className="flex flex-col w-full justify-center gap-1">
        <Label className="text-lg font-medium">{title}</Label>
        {description && <span className="text-sm text-muted-foreground">{description}</span>}
      </div>
      <div className="flex flex-col flex-1 w-full">{children}</div>
    </div>
  )
}
