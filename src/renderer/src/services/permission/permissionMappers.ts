import { ErrorMessageGet, ErrorMessagePost } from '../interfaces'
import { Permission, PermissionAPI, PermissionAPIPost, PermissionAPIPut } from './interfaces'

export class permissionMappers {
  // TODO: Apply the translate function from the i18n library
  public static translateError: Record<ErrorMessageGet | ErrorMessagePost, string> = {
    not_found: 'Permissão não encontrada',
    invalid_credentials: 'Credenciais inválidas',
    server_error: 'Erro no servidor',
    network_error: 'Erro de rede',
    unauthorized: 'Não autorizado',
    forbidden: 'Acesso negado',
    bad_request: 'Requisição inválida',
    conflict: 'Conflito de dados',
    not_implemented: 'Funcionalidade não implementada'
  }

  public static mapDataGetAll = (data: PermissionAPI[]): Permission[] =>
    data.map((permission) => permissionMappers.mapDataGet(permission))

  public static mapDataGet = (data: PermissionAPI): Permission => ({
    id: data.id,
    action: data.action,
    subject: data.subject
  })

  public static mapDataPost = (data: Permission): PermissionAPIPost => ({
    action: data.action,
    subject: data.subject
  })

  public static mapDataPut = (data: Permission): PermissionAPIPut => ({
    action: data.action,
    subject: data.subject
  })
}
