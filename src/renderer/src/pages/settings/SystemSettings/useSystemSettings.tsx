import { useForm } from '@renderer/components/custom/Form'
import { SystemSettings } from '@renderer/services/systemSettingsService/interfaces'
import { useSystemSettingsAPI } from '@renderer/services/systemSettingsService/useSystemSettingsAPI'
import { useCallback, useEffect, useState } from 'react'

export type IntegrationServer = {
  server: string
  webHookUrl: string
  webhookToken: string
  webhookType: string
}

export const useSystemSettings = () => {
  const { get } = useSystemSettingsAPI()
  const [systemConfigs, setSystemConfigs] = useState<SystemSettings[]>([])

  const fetchSystemConfigs = useCallback(async () => {
    const data = await get()
    console.log('🚀 ~ data:', data)

    if (data) setSystemConfigs(data)
  }, [get])

  const { Form: IntegrationServerForm } = useForm<IntegrationServer>({
    fields: {
      server: {
        label: 'Servidor'
      },
      webHookUrl: {
        label: 'URL do Webhook',
        placeholder: 'Digite a URL'
      },
      webhookToken: {
        label: 'Token do Webhook'
      },
      webhookType: {
        label: 'Formato do Webhook'
      }
    }
  })

  const { Form: InspectionWindowForm } = useForm<{
    inspectionWindow: number
  }>({
    fields: {
      inspectionWindow: {
        label: 'Janela de inspeção',
        placeholder: 'Em segundos'
      }
    }
  })

  const { Form: LanguageForm } = useForm<{
    language: number
  }>({
    fields: {
      language: {
        label: 'Idioma',
        placeholder: 'Selecione o idioma',
        inputType: 'select',
        options: [{ label: 'Português', value: 'pt-BR' }],
        containerProps: { className: 'flex flex-row gap-2' }
      }
    }
  })

  const { Form: ThemeForm } = useForm<{
    theme: string
  }>({
    fields: {
      theme: {
        label: 'Tema',
        placeholder: 'Selecione o tema',
        inputType: 'select',
        options: [
          { label: 'Claro', value: 'light' },
          { label: 'Escuro', value: 'dark' }
        ],
        containerProps: { className: 'flex flex-row gap-2' }
      }
    }
  })

  useEffect(() => {
    fetchSystemConfigs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    IntegrationServerForm,
    InspectionWindowForm,
    LanguageForm,
    ThemeForm
  }
}
