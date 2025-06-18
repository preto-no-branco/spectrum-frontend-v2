import RoleService from '.'
import { Role, RoleAPIPut, UseRoleService } from './interfaces'
import { roleMappers } from './roleMappers'

export const useRoleAPI = (): UseRoleService => {
  const get = async (): Promise<Role[] | void> => {
    const roles = await RoleService.get((data) => {
      return data.map((role) => roleMappers.mapDataGet(role))
    })
    if (!roles.success) {
      alert(roleMappers.translateError[roles.error])
      return
    } else {
      return roles.data
    }
  }

  const getById = async (id: string): Promise<Role | void> => {
    const response = await RoleService.getById(id, (response) => {
      return roleMappers.mapDataGet(response)
    })
    if (!response.success) {
      alert(roleMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const post = async (role: Role): Promise<'role-created' | void> => {
    const response = await RoleService.post(roleMappers.mapDataPost(role))
    if (!response.success) {
      alert(roleMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  const del = async (id: string): Promise<'role-deleted' | void> => {
    const response = await RoleService.del(id)
    if (!response.success) {
      alert(roleMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const put = async (id: string, role: Role): Promise<RoleAPIPut | void> => {
    const response = await RoleService.put(id, roleMappers.mapDataPut(role), (response) => {
      return roleMappers.mapDataPut(response)
    })
    if (!response.success) {
      alert(roleMappers.translateError[response.error])
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
