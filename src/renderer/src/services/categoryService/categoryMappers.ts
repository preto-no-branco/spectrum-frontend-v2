import { ErrorMessageGet, ErrorMessagePost } from '../interfaces'
import {
  Category,
  CategoryAPI,
  CategoryAPIDelete,
  CategoryAPIPost,
  CategoryAPIPut
} from './interfaces'

export class categoryMappers {
  // TODO: Apply the translate function from the i18n library
  public static translateError: Record<ErrorMessageGet | ErrorMessagePost, string> = {
    not_found: 'Categoria não encontrada',
    invalid_credentials: 'Credenciais inválidas',
    server_error: 'Erro no servidor',
    network_error: 'Erro de rede',
    unauthorized: 'Não autorizado',
    forbidden: 'Acesso negado',
    bad_request: 'Requisição inválida',
    conflict: 'Conflito de dados',
    not_implemented: 'Funcionalidade não implementada'
  }

  public static mapDataGetAll = (data: CategoryAPI[]): Category[] =>
    data.map((category) => categoryMappers.mapDataGet(category))

  public static mapDataGet = (data: CategoryAPI): Category => ({
    id: data.id,
    name: data.name,
    active: data.active,
    created_at: data.created_at,
    updated_at: data.updated_at
  })

  public static mapDataPost = (data: Category): CategoryAPIPost => ({
    name: data.name
  })

  public static mapDataPut = (data: Category): CategoryAPIPut => ({
    name: data.name,
    active: data.active
  })

  public static mapDataDelete = (id: string): CategoryAPIDelete => ({
    id
  })
}
