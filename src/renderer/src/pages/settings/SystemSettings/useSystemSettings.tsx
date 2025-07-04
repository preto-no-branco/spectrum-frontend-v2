import { useForm } from '@renderer/components/custom/Form'
import { SystemSettings } from '@renderer/services/systemSettingsService/interfaces'
import { useSystemSettingsAPI } from '@renderer/services/systemSettingsService/useSystemSettingsAPI'
import { useCallback, useEffect, useState } from 'react'

type ServerSettings = Omit<SystemSettings, 'inspectionWindow' | 'alarmWindow'> & {
  server: string
}

export const useSystemSettings = () => {
  const { get, post } = useSystemSettingsAPI()
  const [systemConfigs, setSystemConfigs] = useState<SystemSettings>({} as SystemSettings)

  const fetchSystemConfigs = useCallback(async () => {
    const data = await get()
    console.log('🚀 ~ data:', data)

    if (data) setSystemConfigs(data)
  }, [get])

  const { Form: IntegrationServerForm, submitForm: submitIntegrationServer } =
    useForm<ServerSettings>({
      defaultValues: {
        server: '',
        webhookUrl: systemConfigs.webhookUrl,
        webhookToken: systemConfigs.webhookToken,
        webhookVersion: systemConfigs.webhookVersion || undefined
      },
      fields: {
        server: {
          label: 'Servidor',
          placeholder: 'Endereço do servidor'
        },
        webhookUrl: {
          label: 'URL do Webhook',
          placeholder: 'Digite a URL'
        },
        webhookToken: {
          inputType: 'textarea',
          label: 'Token do Webhook',
          placeholder: 'Digite o token do Webhook'
        },
        webhookVersion: {
          inputType: 'radio',
          label: 'Formato do Webhook',
          options: [
            { label: 'V1', value: 'v1' },
            { label: 'V2', value: 'v2' }
          ]
        }
      }
    })

  const { Form: InspectionWindowForm, submitForm: submitInspectionWindow } = useForm<{
    inspectionWindow: number
  }>({
    defaultValues: {
      inspectionWindow: systemConfigs.inspectionWindow
    },
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

  const handleSubmit = useCallback(async () => {
    submitIntegrationServer(async (data) => {
      console.log('🚀 ~ data:', data)
      post({
        // alarmWindow: 100,
        // inspectionWindow: 100,
        // webhookToken: data.webhookToken,
        // webhookUrl: data.webhookUrl,
        // webhookVersion: data.webhookVersion
      })
    })
  }, [submitIntegrationServer])

  useEffect(() => {
    fetchSystemConfigs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    systemConfigs,
    handleSubmit,
    IntegrationServerForm,
    InspectionWindowForm,
    LanguageForm,
    ThemeForm
  }
}
