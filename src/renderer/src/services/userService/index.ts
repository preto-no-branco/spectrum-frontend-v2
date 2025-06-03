import { api } from '@renderer/utils/api'
import { ErrorMessageGet, ErrorMessagePost, UserAPI, UserAPIPost } from './interfaces'
import { callback, ResponseAsync } from '../interfaces'

export default class UserService {
  static async getUsers<MappedResponse>(
    callback: callback<UserAPI[], MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<UserAPI[]>('/users')
      return {
        success: true,
        data: callback(response.data)
      }
    } catch {
      return {
        success: false,
        error: 'user_not_found'
      }
    }
  }

  static async postUser(user: UserAPIPost): ResponseAsync<'user-created', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>('/users', user)
      return {
        success: true,
        data: 'user-created'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('409')) {
        return {
          success: false,
          error: 'conflict'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }
}
