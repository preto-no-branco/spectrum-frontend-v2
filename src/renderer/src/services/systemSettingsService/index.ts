import { api } from '@renderer/utils/api'
import {
  callback,
  //   ErrorMessageDelete,
  ErrorMessageGet,
  ErrorMessagePost,
  ResponseAsync
} from '../interfaces'
import { SystemSettingsAPI, SystemSettingsPost } from './interfaces'

export default class SystemSettingsService {
  static async get<MappedResponse>(
    callback: callback<SystemSettingsAPI[], MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<SystemSettingsAPI[]>('/configurations')
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

  static async post(
    permission: SystemSettingsPost
  ): ResponseAsync<'system-settings-created', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>('/permission', permission)
      return {
        success: true,
        data: 'system-settings-created'
      }
    } catch {
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  //   static async put<MappedResponse>(
  //     id: string,
  //     data: PermissionAPIPut,
  //     callback: callback<PermissionAPIPut, MappedResponse>
  //   ): ResponseAsync<MappedResponse, ErrorMessagePatch> {
  //     try {
  //       const response = await api.put<PermissionAPIPut>(`/permission/${id}`, data)
  //       return {
  //         success: true,
  //         data: callback(response.data)
  //       }
  //     } catch (error) {
  //       if (error instanceof Error && error.message.includes('401')) {
  //         return {
  //           success: false,
  //           error: 'unauthorized'
  //         }
  //       } else if (error instanceof Error && error.message.includes('400')) {
  //         return {
  //           success: false,
  //           error: 'bad_request'
  //         }
  //       }
  //       return {
  //         success: false,
  //         error: 'server_error'
  //       }
  //     }
  //   }
}
