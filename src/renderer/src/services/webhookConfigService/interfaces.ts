export interface WebhookConfigAPI {
  id: string
  webhook_url: string
  webhook_token: string
  webhook_version: string | null
  inspection_window: number
  alarm_window: number
  created_at: Date
  updated_at: Date | null
}

export interface WebhookConfig {
  id?: string
  webhookUrl?: string
  webhookToken?: string
  webhookVersion?: string | null
  inspectionWindow?: number
  alarmWindow?: number
  createdAt?: Date
  updatedAt?: Date | null
}

export interface WebhookConfigPost {
  webhook_url?: string
  webhook_token?: string
  webhook_version?: string | null
  inspection_window?: number
  alarm_window?: number
}

export interface UseWebhookConfigService {
  get: () => Promise<WebhookConfig | void>
  post: (config: WebhookConfig) => Promise<'webhook-config-created' | void>
  // put: (id: string, config: WebhookConfig) => Promise<PermissionAPIPut | void>
  // del: (id: string) => Promise<'permission-deleted' | void>
}
