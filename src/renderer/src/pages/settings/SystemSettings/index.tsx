import { Button } from '@renderer/components/ui/button'
import { Label } from '@renderer/components/ui/label'
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

export default function SystemSettings() {
  const { handleSubmit, IntegrationServerForm, InspectionWindowForm, LanguageForm, ThemeForm } =
    useSystemSettings()

  return (
    <div className="flex flex-col flex-1 items-center w-full gap-12">
      <SettingsItem title="Servidores e conexões">
        <Button className="w-fit absolute top-0 right-0" size="sm" onClick={handleSubmit}>
          Salvar configurações
        </Button>
        <SystemSettingsLayout
          title="Servidores de integração"
          description="Selecione ou edite o servidor de integração"
        >
          <IntegrationServerForm
            containerProps={{
              className: 'w-full'
            }}
          />
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
          <ThemeForm containerProps={{ className: 'w-2/6' }} />
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
