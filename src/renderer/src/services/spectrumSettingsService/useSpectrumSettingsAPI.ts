import SpectrumSettingsService from '.'
import { SpectrumSettings, UseSpectrumSettingsService } from './interfaces'
import { spectrumSettingsMappers } from './spectrumSettingsMappers'

export const useSpectrumSettingsAPI = (): UseSpectrumSettingsService => {
  const get = async (): Promise<SpectrumSettings[] | void> => {
    const permissions = await SpectrumSettingsService.get((data) => {
      return data.map((permission) => spectrumSettingsMappers.mapDataGet(permission))
    })

    if (!permissions.success) {
      // alert(systemSettingsMappers.translateError[permissions.error])
      return
    }

    return permissions.data
  }

  const post = async (config: SpectrumSettings[]): Promise<'spectrum-settings-created' | void> => {
    const response = await SpectrumSettingsService.post(spectrumSettingsMappers.mapDataPost(config))

    if (!response.success) {
      alert(spectrumSettingsMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  // const del = async (id: string): Promise<'permission-deleted' | void> => {
  //   const response = await PermissionService.del(id)
  //   if (!response.success) {
  //     alert(permissionMappers.translateError[response.error])
  //     return
  //   }
  //   return response.data
  // }

  // const put = async (id: string, permission: Permission): Promise<PermissionAPIPut | void> => {
  //   const response = await PermissionService.put(
  //     id,
  //     permissionMappers.mapDataPut(permission),
  //     (response) => {
  //       return permissionMappers.mapDataPut(response)
  //     }
  //   )
  //   if (!response.success) {
  //     alert(permissionMappers.translateError[response.error])
  //     return
  //   } else {
  //     return response.data
  //   }
  // }

  return {
    get,
    post
    // put,
    // del
  }
}
