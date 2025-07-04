import WebhookConfigService from '.'
import { UseWebhookConfigService, WebhookConfig } from './interfaces'
import { webhookConfigMappers } from './webhookConfigMappers'

export const useWebhookConfigAPI = (): UseWebhookConfigService => {
  const get = async (): Promise<WebhookConfig | void> => {
    const configs = await WebhookConfigService.get((data) => {
      return data.map((config) => webhookConfigMappers.mapDataGet(config))
    })

    if (!configs.success) {
      // alert(webhookConfigMappers.translateError[configs.error])
      return
    }

    return configs.data[0]
  }

  const post = async (config: WebhookConfig): Promise<'webhook-config-created' | void> => {
    const response = await WebhookConfigService.post(webhookConfigMappers.mapDataPost(config))

    if (!response.success) {
      alert(webhookConfigMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  // const del = async (id: string): Promise<'permission-deleted' | void> => {
  //   const response = await PermissionService.del(id)
  //   if (!response.success) {
  //     alert(permissionMappers.translateError[response.error])
  //     return
  //   }
  //   return response.data
  // }

  // const put = async (id: string, permission: Permission): Promise<PermissionAPIPut | void> => {
  //   const response = await PermissionService.put(
  //     id,
  //     permissionMappers.mapDataPut(permission),
  //     (response) => {
  //       return permissionMappers.mapDataPut(response)
  //     }
  //   )
  //   if (!response.success) {
  //     alert(permissionMappers.translateError[response.error])
  //     return
  //   } else {
  //     return response.data
  //   }
  // }

  return {
    get,
    post
    // put,
    // del
  }
}
