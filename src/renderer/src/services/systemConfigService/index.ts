import { STORAGE_KEY } from '@renderer/core/constants/storageKeys'
import { AppSettings, SystemConfig } from './interfaces'

const defaults: AppSettings = {
  SERVER_URL: 'https://meu-server.com',
  THEME: 'dark',
  LANGUAGE: 'pt'
}

export class SystemConfigService {
  static get(
    key: (typeof STORAGE_KEY.SYSTEM_CONFIG)[SystemConfig]
  ): AppSettings[SystemConfig] | null {
    const value = localStorage.getItem(key) as AppSettings[SystemConfig] | null

    return value
  }

  static set(
    key: (typeof STORAGE_KEY.SYSTEM_CONFIG)[SystemConfig],
    value: AppSettings[SystemConfig]
  ) {
    localStorage.setItem(key, value)
    return value
  }

  static reset() {
    localStorage.clear()
    return defaults
  }
}
