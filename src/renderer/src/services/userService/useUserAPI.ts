import UserService from '.'
import { User, UserAPIPut, UseUserService } from './interfaces'
import { userMappers } from './userMappers'

export const useUserAPI = (): UseUserService => {
  const get = async (): Promise<User[] | void> => {
    const teste = await UserService.getUsers((data) => {
      return data.map((user) => userMappers.mapDataGet(user))
    })
    if (!teste.success) {
      alert(userMappers.translateError[teste.error])
      return
    } else {
      return teste.data
    }
  }

  const getById = async (id: string): Promise<User | void> => {
    const response = await UserService.getUser(id, userMappers.mapDataGet)
    if (!response.success) {
      alert(userMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const post = async (user: User): Promise<'user-created' | void> => {
    const response = await UserService.postUser(userMappers.mapDataPost(user))
    if (!response.success) {
      // TODO: Use a equivalent of chakra's toast in shadcn/ui
      alert(userMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  const toggleStatus = async (id: string): Promise<'user-block-status-updated' | void> => {
    const response = await UserService.postUserStatus(id)
    if (!response.success) {
      alert(userMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const put = async (id: string, user: User): Promise<UserAPIPut | void> => {
    const response = await UserService.putUser(id, userMappers.mapDataPost(user), (response) => {
      return userMappers.mapDataPut(response.id)
    })
    if (!response.success) {
      alert(userMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  const updatePassword = async (data: {
    new: string
    old: string
  }): Promise<'user-password-updated' | void> => {
    const response = await UserService.patchUserPasswordUpdate(
      userMappers.mapDataUpdatePassword(data)
    )
    if (!response.success) {
      alert(userMappers.translateError[response.error])
      return
    }
    return response.data
  }

  return {
    get,
    getById,
    post,
    toggleStatus,
    put,
    updatePassword
  }
}
