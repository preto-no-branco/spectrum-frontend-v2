import { api } from '@renderer/utils/api'
import {
  callback,
  //   ErrorMessageDelete,
  ErrorMessageGet,
  ErrorMessagePost,
  ResponseAsync
} from '../interfaces'
import { WebhookConfigAPI, WebhookConfigPost } from './interfaces'

export default class WebhookConfigService {
  static async get<MappedResponse>(
    callback: callback<WebhookConfigAPI[], MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<WebhookConfigAPI>('/configurations')
      return {
        success: true,
        data: callback([response.data])
      }
    } catch {
      return {
        success: false,
        error: 'not_found'
      }
    }
  }

  static async post(
    config: WebhookConfigPost
  ): ResponseAsync<'webhook-config-created', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>('/configurations', config)
      return {
        success: true,
        data: 'webhook-config-created'
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
