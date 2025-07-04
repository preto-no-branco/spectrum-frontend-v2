import { useForm } from '@renderer/components/custom/Form'
import { useTheme } from '@renderer/components/themeProvider'
import { STORAGE_KEY } from '@renderer/core/constants/storageKeys'
import { useSystemConfig } from '@renderer/services/systemConfigService/useSystemConfig'
import { WebhookConfig } from '@renderer/services/webhookConfigService/interfaces'
import { useWebhookConfigAPI } from '@renderer/services/webhookConfigService/useWebhookConfigAPI'
import { useCallback, useEffect, useState } from 'react'
import { ControledInput } from '../components/system/ControledInput'
import { ControledTextarea } from '../components/system/ControledTextarea'

type WebhookConfigSession = Omit<
  WebhookConfig,
  'inspectionWindow' | 'alarmWindow' | 'createdAt' | 'updatedAt' | 'id'
> & {}

type ServerConfig = {
  server: string
}

export const useSystemSettings = () => {
  const { theme, setTheme } = useTheme()
  const { get, post } = useWebhookConfigAPI()
  const { setSystemConfig, getSystemConfig } = useSystemConfig()
  const [systemConfigs, setSystemConfigs] = useState<WebhookConfig>({} as WebhookConfig)

  const fetchSystemConfigs = useCallback(async () => {
    const data = await get()

    if (data) setSystemConfigs(data)
  }, [get])

  const handleSubmitServerConfig = useCallback(
    (data: ServerConfig) => {
      setSystemConfig(STORAGE_KEY.SYSTEM_CONFIG.SERVER_URL, data.server)
    },
    [setSystemConfig]
  )

  const handleSubmit = useCallback(
    async (data: WebhookConfigSession) => {
      post(data)
    },
    [post]
  )

  const { Form: ServerInput, submitForm: submitServer } = useForm<ServerConfig>({
    defaultValues: {
      server: getSystemConfig(STORAGE_KEY.SYSTEM_CONFIG.SERVER_URL) || ''
    },
    fields: {
      server: {
        inputType: 'custom',
        label: 'Servidor',
        placeholder: 'Endereço do servidor',
        component(props) {
          return <ControledInput {...props} leftContentString="http://" onSubmit={submitServer} />
        }
      }
    }
  })

  const { Form: WebhookForm, submitForm: submitIntegrationServer } = useForm<WebhookConfigSession>({
    defaultValues: {
      webhookUrl: systemConfigs.webhookUrl || '',
      webhookToken: systemConfigs.webhookToken || '',
      webhookVersion: systemConfigs.webhookVersion || ''
    },
    fields: {
      webhookUrl: {
        inputType: 'custom',
        label: 'URL do Webhook',
        placeholder: 'Digite a URL',
        component(props) {
          return <ControledInput {...props} onSubmit={submitIntegrationServer} />
        }
      },
      webhookToken: {
        inputType: 'custom',
        label: 'Token do Webhook',
        placeholder: 'Digite o token do Webhook',
        component: (props) => {
          return <ControledTextarea {...props} value={''} onSubmit={submitIntegrationServer} />
        }
      },
      webhookVersion: {
        inputType: 'radio',
        label: 'Formato do Webhook',
        options: [
          { label: 'v1', value: '1' },
          { label: 'v2', value: '2' }
        ]
      }
    }
  })

  const { Form: InspectionWindowForm } = useForm<{
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
    language: string
  }>({
    defaultValues: {
      language: 'pt-BR'
    },
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

  useEffect(() => {
    fetchSystemConfigs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    theme,
    setTheme,
    systemConfigs,
    handleSubmit,
    handleSubmitServerConfig,
    ServerInput,
    WebhookForm,
    InspectionWindowForm,
    LanguageForm
  }
}
