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

export type ErrorMessagePost = 'server_error' | 'conflict' | 'bad_request' | 'not_implemented'
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

export interface UserAPIPost {
  name: string
  password: string
  personal_identification: string
  role: string
  spectrums: string[]
  username: string
}

export interface UseUserService {
  get: () => Promise<User[] | void>
  post: (user: User) => Promise<'user-created' | void>
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
