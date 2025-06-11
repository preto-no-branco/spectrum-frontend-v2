import { api } from '@renderer/utils/api'
import { RoleAPI, RoleAPIPost, RoleAPIPut } from './interfaces'
import {
  ErrorMessageDelete,
  ErrorMessageGet,
  ErrorMessagePatch,
  ErrorMessagePost
} from '../interfaces'
import { callback, ResponseAsync } from '../interfaces'

export default class RoleService {
  static async get<MappedResponse>(
    callback: callback<RoleAPI[], MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<RoleAPI[]>('/role')
      return {
        success: true,
        data: callback(response.data)
      }
    } catch {
      return {
        success: false,
        error: 'not_found'
      }
    }
  }

  static async getById<MappedResponse>(
    id: string,
    callback: callback<RoleAPI, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<RoleAPI>(`/role/${id}`)
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
        error: 'not_found'
      }
    }
  }

  static async post(role: RoleAPIPost): ResponseAsync<'role-created', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>('/role', role)
      return {
        success: true,
        data: 'role-created'
      }
    } catch (error) {
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  static async put<MappedResponse>(
    id: string,
    data: RoleAPIPut,
    callback: callback<RoleAPIPut, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessagePatch> {
    try {
      const response = await api.put<RoleAPIPut>(`/role/${id}`, data)
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

  static async del(id: string): ResponseAsync<'role-deleted', ErrorMessageDelete> {
    try {
      await api.delete<{ message: string }>(`/role/${id}`)
      return {
        success: true,
        data: 'role-deleted'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return {
          success: false,
          error: 'not_found'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }
}
