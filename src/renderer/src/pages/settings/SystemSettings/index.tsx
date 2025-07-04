import { Label } from '@renderer/components/ui/label'
import { Select } from '@renderer/components/ui/select'
import { themeOptions } from '@renderer/core/configs/forms/systemConfig'
import { SystemSettingsLayout } from '@renderer/pages/settings/components/system/SystemSettingsLayout'
import { ReactNode } from 'react'
import { useSystemSettings } from './useSystemSettings'

function SettingsItem({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="flex flex-col gap-3 relative">
      <Label className="text-xl font-medium">{title}</Label>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

export default function WebhookConfig() {
  const {
    theme,
    setTheme,
    handleSubmit,
    handleSubmitServerConfig,
    ServerInput,
    WebhookForm,
    InspectionWindowForm,
    LanguageForm
  } = useSystemSettings()

  return (
    <div className="flex flex-col flex-1 items-center w-full gap-12">
      <SettingsItem title="Servidores e conexões">
        <SystemSettingsLayout
          title="Servidores de integração"
          description="Selecione ou edite o servidor de integração"
        >
          <ServerInput onSubmit={handleSubmitServerConfig} />
          <WebhookForm onSubmit={handleSubmit} />
        </SystemSettingsLayout>
      </SettingsItem>

      <SettingsItem title="Inspeção">
        <SystemSettingsLayout
          title="Janela de inspeção"
          description="Define o tempo que o sistema considera como janela de inspeção"
        >
          <InspectionWindowForm containerProps={{ className: 'w-2/6' }} />
        </SystemSettingsLayout>
      </SettingsItem>

      <SettingsItem title="Interface e tema">
        <SystemSettingsLayout
          title="Idioma do sistema"
          description="Selecione o idioma da interface"
        >
          <LanguageForm containerProps={{ className: 'w-2/6' }} />
        </SystemSettingsLayout>

        <SystemSettingsLayout
          title="Tema da interface"
          description="Selecione o esquema de cores da interface"
        >
          <Select
            name="theme"
            containerProps={{ className: 'w-2/6' }}
            options={themeOptions}
            defaultValue={theme}
            onValueChange={setTheme}
          />
        </SystemSettingsLayout>
      </SettingsItem>

      <SettingsItem title="Outros">
        <SystemSettingsLayout title="Versão do sistema">
          <Label className="textsm font-medium text-muted-foreground">1.0.0</Label>
        </SystemSettingsLayout>
      </SettingsItem>
    </div>
  )
}
