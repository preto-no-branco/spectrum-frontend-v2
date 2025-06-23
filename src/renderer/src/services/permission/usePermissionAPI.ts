import PermissionService from '.'
import { Permission, PermissionAPIPut, UsePermissionService } from './interfaces'
import { permissionMappers } from './permissionMappers'

export const usePermissionAPI = (): UsePermissionService => {
  const get = async (): Promise<Permission[] | void> => {
    const permissions = await PermissionService.get((data) => {
      return data.map((permission) => permissionMappers.mapDataGet(permission))
    })
    if (!permissions.success) {
      alert(permissionMappers.translateError[permissions.error])
      return
    } else {
      return permissions.data
    }
  }

  const getById = async (id: string): Promise<Permission | void> => {
    const response = await PermissionService.getById(id, (response) => {
      return permissionMappers.mapDataGet(response)
    })
    if (!response.success) {
      alert(permissionMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const post = async (permission: Permission): Promise<'permission-created' | void> => {
    const response = await PermissionService.post(permissionMappers.mapDataPost(permission))
    if (!response.success) {
      alert(permissionMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  const del = async (id: string): Promise<'permission-deleted' | void> => {
    const response = await PermissionService.del(id)
    if (!response.success) {
      alert(permissionMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const put = async (id: string, permission: Permission): Promise<PermissionAPIPut | void> => {
    const response = await PermissionService.put(
      id,
      permissionMappers.mapDataPut(permission),
      (response) => {
        return permissionMappers.mapDataPut(response)
      }
    )
    if (!response.success) {
      alert(permissionMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  return {
    get,
    getById,
    post,
    put,
    del
  }
}
