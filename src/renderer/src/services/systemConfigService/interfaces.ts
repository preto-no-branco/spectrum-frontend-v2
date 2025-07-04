import { STORAGE_KEY } from '@renderer/core/constants/storageKeys'

export type SorageSystemConfigKey = 'SERVER_URL' | 'THEME' | 'LANGUAGE'

export type SystemConfig = keyof typeof STORAGE_KEY.SYSTEM_CONFIG
export type SystemConfigKey = (typeof STORAGE_KEY.SYSTEM_CONFIG)[SystemConfig]

export type AppSettings = {
  THEME: 'light' | 'dark'
  LANGUAGE: 'pt' | 'en' | 'es'
  SERVER_URL: string
}

export interface UseAppSettingsService {
  getSystemConfig: (key: SystemConfigKey) => AppSettings[SystemConfig]
  setSystemConfig: (key: SystemConfigKey, value: AppSettings[keyof AppSettings]) => void
  resetSystemConfig: () => void
}
