export interface SpectrumSettingsAPI {
  id: string
  name: string
  code: string
  // active: boolean
}

export interface SpectrumSettings {
  id?: string
  name: string
  code: string
  // active?: boolean
}

export interface SpectrumSettingsPost {
  code: string
  name: string
  // active?: boolean
}

export interface UseSpectrumSettingsService {
  get: () => Promise<SpectrumSettings[] | void>
  post: (config: SpectrumSettings[]) => Promise<'spectrum-settings-created' | void>
  // put: (id: string, config: SystemSettings) => Promise<PermissionAPIPut | void>
  // del: (id: string) => Promise<'permission-deleted' | void>
}
