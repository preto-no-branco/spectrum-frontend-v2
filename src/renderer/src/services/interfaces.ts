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
