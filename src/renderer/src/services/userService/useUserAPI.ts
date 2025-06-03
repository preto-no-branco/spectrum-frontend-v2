import UserService from '.'
import { User, UseUserService } from './interfaces'
import { userMappers } from './userMappers'

export const useUserAPI = (): UseUserService => {
  const get = async (): Promise<User[] | void> => {
    const teste = await UserService.getUsers((data) => {
      return data.map((user) => userMappers.mapDataGet(user))
    })
    if (!teste.success) {
      // TODO: Use a equivalent of chakra's toast in shadcn/ui
      alert(userMappers.translateError[teste.error])
      return
    } else {
      return teste.data
    }
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

  return {
    get,
    post
  }
}
