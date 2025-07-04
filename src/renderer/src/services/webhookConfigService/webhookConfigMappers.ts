import { ErrorMessageGet, ErrorMessagePost } from '../interfaces'
import { WebhookConfig, WebhookConfigAPI, WebhookConfigPost } from './interfaces'

export class webhookConfigMappers {
  // TODO: Apply the translate function from the i18n library
  public static translateError: Record<ErrorMessageGet | ErrorMessagePost, string> = {
    not_found: 'Configuração não encontrada',
    invalid_credentials: 'Credenciais inválidas',
    server_error: 'Erro no servidor',
    network_error: 'Erro de rede',
    unauthorized: 'Não autorizado',
    forbidden: 'Acesso negado',
    bad_request: 'Requisição inválida',
    conflict: 'Conflito de dados',
    not_implemented: 'Funcionalidade não implementada'
  }

  public static mapDataGetAll = (data: WebhookConfigAPI[]): WebhookConfig[] =>
    data.map((systemSettings) => webhookConfigMappers.mapDataGet(systemSettings))

  public static mapDataGet = (data: WebhookConfigAPI): WebhookConfig => ({
    id: data.id,
    webhookUrl: data.webhook_url,
    webhookToken: data.webhook_token,
    webhookVersion: data.webhook_version,
    inspectionWindow: data.inspection_window,
    alarmWindow: data.alarm_window,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  })

  public static mapDataPost = (data: WebhookConfig): WebhookConfigPost => ({
    webhook_url: data.webhookUrl,
    webhook_token: data.webhookToken,
    webhook_version: data.webhookVersion,
    inspection_window: data.inspectionWindow,
    alarm_window: data.alarmWindow
  })

  // public static mapDataPut = (data: Permission): PermissionAPIPut => ({
  //   action: data.action,
  //   subject: data.subject
  // })
}
