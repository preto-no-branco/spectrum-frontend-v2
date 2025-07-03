import SystemSettingsService from '.'
import { SystemSettings, UseSystemSettingsService } from './interfaces'
import { systemSettingsMappers } from './systemSettingsMappers'

export const useSystemSettingsAPI = (): UseSystemSettingsService => {
  const get = async (): Promise<SystemSettings[] | void> => {
    const permissions = await SystemSettingsService.get((data) => {
      return data.map((permission) => systemSettingsMappers.mapDataGet(permission))
    })

    if (!permissions.success) {
      // alert(systemSettingsMappers.translateError[permissions.error])
      return
    }

    return permissions.data
  }

  const post = async (config: SystemSettings): Promise<'system-settings-created' | void> => {
    const response = await SystemSettingsService.post(systemSettingsMappers.mapDataPost(config))

    if (!response.success) {
      alert(systemSettingsMappers.translateError[response.error])
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
