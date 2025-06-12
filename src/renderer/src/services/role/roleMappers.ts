import { ErrorMessageGet, ErrorMessagePost } from '../interfaces'
import { Role, RoleAPI, RoleAPIPost, RoleAPIPut } from './interfaces'

export class roleMappers {
  // TODO: Apply the translate function from the i18n library
  public static translateError: Record<ErrorMessageGet | ErrorMessagePost, string> = {
    not_found: 'Role não encontrada',
    invalid_credentials: 'Credenciais inválidas',
    server_error: 'Erro no servidor',
    network_error: 'Erro de rede',
    unauthorized: 'Não autorizado',
    forbidden: 'Acesso negado',
    bad_request: 'Requisição inválida',
    conflict: 'Conflito de dados',
    not_implemented: 'Funcionalidade não implementada'
  }

  public static mapDataGetAll = (data: RoleAPI[]): Role[] =>
    data.map((role) => roleMappers.mapDataGet(role))

  public static mapDataGet = (data: RoleAPI): Role => ({
    id: data.id,
    name: data.name,
    permissions: data.permissions
  })

  public static mapDataPost = (data: Role): RoleAPIPost => ({
    name: data.name,
    permissions: data.permissions
  })

  public static mapDataPut = (data: Role): RoleAPIPut => ({
    name: data.name,
    permissions: data.permissions
  })
}
