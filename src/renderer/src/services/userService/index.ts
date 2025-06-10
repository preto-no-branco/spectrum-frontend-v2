import { api } from '@renderer/utils/api'
import {
  ErrorMessageGet,
  ErrorMessagePatch,
  ErrorMessagePost,
  UserAPI,
  UserAPIPost,
  UserAPIPut,
  UserAPIUpdatePassword
} from './interfaces'
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

  static async getUser<MappedResponse>(
    id: string,
    callback: callback<UserAPI, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<UserAPI>(`/users/${id}`)
      return {
        success: true,
        data: callback(response.data)
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
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

  static async postUserStatus(
    id: string
  ): ResponseAsync<'user-block-status-updated', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>(`/users/status/${id}`)
      return {
        success: true,
        data: 'user-block-status-updated'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  static async patchUserPasswordUpdate(
    data: UserAPIUpdatePassword
  ): ResponseAsync<'user-password-updated', ErrorMessagePatch> {
    try {
      await api.patch<{ message: string }>('/users/password', data)
      return {
        success: true,
        data: 'user-password-updated'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  static async putUser<MappedResponse>(
    id: string,
    data: UserAPIPost,
    callback: callback<UserAPIPut, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessagePatch> {
    try {
      const response = await api.put<UserAPIPut>(`/users/${id}`, data)
      return {
        success: true,
        data: callback(response.data)
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }
}
