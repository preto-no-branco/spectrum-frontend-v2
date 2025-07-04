import { ErrorMessageGet, ErrorMessagePost } from '../interfaces'
import { SpectrumSettings, SpectrumSettingsAPI, SpectrumSettingsPost } from './interfaces'

export class spectrumSettingsMappers {
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

  public static mapDataGetAll = (data: SpectrumSettingsAPI[]): SpectrumSettings[] =>
    data.map((systemSettings) => spectrumSettingsMappers.mapDataGet(systemSettings))

  public static mapDataGet = (data: SpectrumSettingsAPI): SpectrumSettings => ({
    id: data.id,
    name: data.name,
    code: data.code
  })

  public static mapDataPost = (data: SpectrumSettings[]): SpectrumSettingsPost[] =>
    data.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name
    }))

  // public static mapDataPut = (data: Permission): PermissionAPIPut => ({
  //   action: data.action,
  //   subject: data.subject
  // })
}
