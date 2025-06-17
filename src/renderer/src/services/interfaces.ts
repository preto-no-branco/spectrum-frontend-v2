export type callback<T, K> = (data: T) => K

export type ResponseAsync<T, U> = Promise<SuccessResponseAsync<T> | ErrorResponseAsync<U>>

export type ErrorResponseAsync<U> = {
  success: false
  error: U
}

export type SuccessResponseAsync<T> = {
  success: true
  data: T
}

export type ErrorMessageGet =
  | 'not_found'
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

export type ErrorMessageDelete =
  | 'server_error'
  | 'unauthorized'
  | 'bad_request'
  | 'not_implemented'
  | 'not_found'
