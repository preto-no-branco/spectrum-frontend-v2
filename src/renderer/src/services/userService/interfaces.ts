export type ErrorMessageGet =
  | 'user_not_found'
  | 'invalid_credentials'
  | 'server_error'
  | 'network_error'
  | 'unauthorized'
  | 'forbidden'
  | 'bad_request'
  | 'conflict'
  | 'not_implemented'

export type ErrorMessagePost =
  | 'server_error'
  | 'conflict'
  | 'bad_request'
  | 'not_implemented'
  | 'unauthorized'

export type ErrorMessagePatch = 'server_error' | 'unauthorized' | 'bad_request' | 'not_implemented'

export interface UserAPI {
  id: string
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
  postById: (id: string) => Promise<'user-block-status-updated' | void>
  put: (id: string, user: User) => Promise<UserAPIPut | void>
  updatePassword: (data: { new: string; old: string }) => Promise<'user-password-updated' | void>
}

export interface User {
  id: string
  lastLogin: string
  name: string
  personalIdentification: string
  role: string
  spectrums: string[]
  username: string
  password?: string
}
