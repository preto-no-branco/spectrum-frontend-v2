import { STORAGE_KEY } from '@renderer/core/constants/storageKeys'
import { AppSettings, SystemConfig } from './interfaces'

const defaults: AppSettings = {
  SERVER_URL: 'https://meu-server.com',
  THEME: 'dark',
  LANGUAGE: 'pt'
}

export class SettingsService {
  private static storage: Storage

  constructor() {
    SettingsService.storage = localStorage
  }

  static get<K extends keyof typeof STORAGE_KEY.SYSTEM_CONFIG>(key: K) {
    SettingsService.storage.set(key, this.storage.getItem(key))

    return
  }

  static set<K extends SystemConfig>(key: K, value: AppSettings[K]) {
    SettingsService.storage.setItem(key, value)
    return value
  }

  static reset() {
    SettingsService.storage.clear()
    return defaults
  }
}
