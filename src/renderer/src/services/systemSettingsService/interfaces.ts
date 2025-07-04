export interface SystemSettingsAPI {
  id: string
  webhook_url: string
  webhook_token: string
  webhook_version: string | null
  inspection_window: number
  alarm_window: number
  created_at: Date
  updated_at: Date | null
}

export interface SystemSettings {
  id?: string
  webhookUrl: string
  webhookToken: string
  webhookVersion: string | null
  inspectionWindow: number
  alarmWindow: number
  createdAt: Date
  updatedAt: Date | null
}

export interface SystemSettingsPost {
  webhook_url: string
  webhook_token: string
  webhook_version: string | null
  inspection_window: number
  alarm_window: number
}

export interface UseSystemSettingsService {
  get: () => Promise<SystemSettings | void>
  post: (config: SystemSettings) => Promise<'system-settings-created' | void>
  // put: (id: string, config: SystemSettings) => Promise<PermissionAPIPut | void>
  // del: (id: string) => Promise<'permission-deleted' | void>
}
