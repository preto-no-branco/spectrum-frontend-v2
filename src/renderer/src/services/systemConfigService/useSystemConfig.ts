import { SettingsService } from '.'
import { AppSettings, UseAppSettingsService } from './interfaces'

export const useSystemConfig = (): UseAppSettingsService => {
  const get = (key: keyof AppSettings) => {
    SettingsService.get(key)
  }
  const set = (key: keyof AppSettings, value: AppSettings[keyof AppSettings]) => {
    SettingsService.set(key, value)
  }
  const reset = () => {
    SettingsService.reset()
  }
  return {
    get,
    set,
    reset
  }
}
