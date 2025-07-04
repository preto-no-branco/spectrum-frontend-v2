import { STORAGE_KEY } from '@renderer/core/constants/storageKeys'

export type SorageSystemConfigKey = 'SERVER_URL' | 'THEME' | 'LANGUAGE'

export type SystemConfig = keyof typeof STORAGE_KEY.SYSTEM_CONFIG

export type AppSettings = {
  THEME: 'light' | 'dark'
  LANGUAGE: 'pt' | 'en' | 'es'
  SERVER_URL: string
}

export interface UseAppSettingsService {
  get: (key: keyof AppSettings) => void
  set: (key: AppSettings[keyof AppSettings], value: AppSettings[keyof AppSettings]) => void
  reset: () => void
}
