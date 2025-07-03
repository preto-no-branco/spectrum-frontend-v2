import UserService from '.'
import { User, UserAPIPut, UseUserService } from './interfaces'
import { userMappers } from './userMappers'

export const useUserAPI = (): UseUserService => {
  const get = async (): Promise<User[] | void> => {
    const teste = await UserService.getUsers((data) => {
      return data.map((user) => userMappers.mapDataGet(user))
    })
    if (!teste.success) {
      // TODO: Use a equivalent of chakra's toast in shadcn/ui
      // (ShadCN UI (built on top of Radix UI and Tailwind) does not provide a built-in "toast"
      // component out of the box like Chakra UI does,
      //  but the recommended and common practice is to integrate sonner — a headless,
      //  Tailwind-friendly toast library that fits perfectly into the ShadCN ecosystem.)
      //
      //how to use:
      //npm install sonner
      //import { Toaster } from 'sonner';
      //
      // export default function App() {
      //   return (
      //     <>
      //       {/* your app */}
      //       <Toaster />
      //     </>
      //   );
      // }
      //
      // import { toast } from 'sonner'
      //
      // toast.success('Data saved successfully!')
      // toast.error('Something went wrong')
      // toast('Custom toast with default style')
      //
      //<Toaster
      //position="top-right"
      //toastOptions={{
      //  style: {
      //background: '#333',
      //color: '#fff',
      //  },
      //  duration: 5000,
      //  className: 'my-toast',
      //  closeButton: true,
      //}}
      ///>

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
    console.log('🚀 ~ user:', user)
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
