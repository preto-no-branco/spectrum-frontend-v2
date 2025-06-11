import { api } from '@renderer/utils/api'
import { PermissionAPI, PermissionAPIPost, PermissionAPIPut } from './interfaces'
import {
  ErrorMessageDelete,
  ErrorMessageGet,
  ErrorMessagePatch,
  ErrorMessagePost
} from '../interfaces'
import { callback, ResponseAsync } from '../interfaces'

export default class PermissionService {
  static async get<MappedResponse>(
    callback: callback<PermissionAPI[], MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<PermissionAPI[]>('/permission')
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
    callback: callback<PermissionAPI, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<PermissionAPI>(`/permission/${id}`)
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

  static async post(
    permission: PermissionAPIPost
  ): ResponseAsync<'permission-created', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>('/permission', permission)
      return {
        success: true,
        data: 'permission-created'
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
    data: PermissionAPIPut,
    callback: callback<PermissionAPIPut, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessagePatch> {
    try {
      const response = await api.put<PermissionAPIPut>(`/permission/${id}`, data)
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

  static async del(id: string): ResponseAsync<'permission-deleted', ErrorMessageDelete> {
    try {
      await api.delete<{ message: string }>(`/permission/${id}`)
      return {
        success: true,
        data: 'permission-deleted'
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
