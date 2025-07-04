import { SystemConfigService } from '.'
import { AppSettings, SystemConfigKey, UseAppSettingsService } from './interfaces'

export const useSystemConfig = (): UseAppSettingsService => {
  const getSystemConfig = (key: SystemConfigKey) => {
    return SystemConfigService.get(key) ?? ''
  }
  const setSystemConfig = (key: SystemConfigKey, value: AppSettings[keyof AppSettings]) => {
    return SystemConfigService.set(key, value)
  }
  const resetSystemConfig = () => {
    return SystemConfigService.reset()
  }
  return {
    getSystemConfig,
    setSystemConfig,
    resetSystemConfig
  }
}
