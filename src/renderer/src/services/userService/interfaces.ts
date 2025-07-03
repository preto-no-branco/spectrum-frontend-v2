export interface UserAPI {
  id: string
  active: boolean
  created_at: string
  last_analysis: string
  last_login: string
  name: string
  personal_identification: string
  role: string
  spectrums: string[]
  username: string
}

export interface UserAPIPost
  extends Omit<UserAPI, 'id' | 'created_at' | 'last_analysis' | 'last_login'> {
  password: string
}

export interface UserAPIPut extends Pick<UserAPI, 'id'> {}

export interface UserAPIUpdatePassword {
  new: string
  old: string
}

export interface UseUserService {
  get: () => Promise<User[] | void>
  getById: (id: string) => Promise<User | void>
  post: (user: User) => Promise<'user-created' | void>
  toggleStatus: (id: string) => Promise<'user-block-status-updated' | void>
  put: (id: string, user: User) => Promise<UserAPIPut | void>
  updatePassword: (data: { new: string; old: string }) => Promise<'user-password-updated' | void>
}

export interface User {
  id?: string
  lastLogin?: string
  name: string
  active?: boolean
  personalIdentification: string
  role: string
  spectrums: string[]
  username: string
  password?: string
}
