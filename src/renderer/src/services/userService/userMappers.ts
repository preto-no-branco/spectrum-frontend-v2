import {
  ErrorMessageGet,
  ErrorMessagePost,
  User,
  UserAPI,
  UserAPIPost,
  UserAPIPut
} from './interfaces'

export class userMappers {
  // TODO: Apply the translate function from the i18n library
  public static translateError: Record<ErrorMessageGet | ErrorMessagePost, string> = {
    user_not_found: 'Usuário não encontrado',
    invalid_credentials: 'Credenciais inválidas',
    server_error: 'Erro no servidor',
    network_error: 'Erro de rede',
    unauthorized: 'Não autorizado',
    forbidden: 'Acesso negado',
    bad_request: 'Requisição inválida',
    conflict: 'Conflito de dados',
    not_implemented: 'Funcionalidade não implementada'
  }
  public static mapDataGet = (data: UserAPI): User => ({
    id: data.id,
    lastLogin: data.last_login,
    name: data.name,
    personalIdentification: data.personal_identification,
    role: data.role,
    spectrums: data.spectrums,
    username: data.username
  })

  public static mapDataPost = (data: User): UserAPIPost => ({
    name: data.name,
    password: data.password || '',
    personal_identification: data.personalIdentification,
    role: data.role,
    spectrums: data.spectrums,
    username: data.username
  })

  public static mapDataUpdatePassword = (data: {
    new: string
    old: string
  }): { new: string; old: string } => ({
    new: data.new,
    old: data.old
  })

  public static mapDataPut = (id: string): UserAPIPut => ({
    id
  })
}
