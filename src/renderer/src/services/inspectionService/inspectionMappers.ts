import { ErrorMessageGet, ErrorMessagePost } from '../interfaces'
import {
  Inspection,
  InspectionAPIGetById,
  InspectionAPIGetHistory,
  InspectionAPIPut,
  InspectionHistory
} from './interfaces'

export class inspectionMappers {
  // TODO: Apply the translate function from the i18n library
  public static translateError: Record<ErrorMessageGet | ErrorMessagePost, string> = {
    not_found: 'Inspeção não encontrada',
    invalid_credentials: 'Credenciais inválidas',
    server_error: 'Erro no servidor',
    network_error: 'Erro de rede',
    unauthorized: 'Não autorizado',
    forbidden: 'Acesso negado',
    bad_request: 'Requisição inválida',
    conflict: 'Conflito de dados',
    not_implemented: 'Funcionalidade não implementada'
  }
  public static mapDataGetHistory = (data: InspectionAPIGetHistory): InspectionHistory => ({
    id: data.id,
    caseId: data.case_id,
    containers: data.containers,
    createdAt: data.created_at,
    isEmpty: data.is_empty,
    isFlammable: data.is_flammable,
    isMultiple: data.is_multiple,
    isSuspect: data.is_suspect,
    plates: data.plates,
    spectrumName: data.spectrum_name,
    status: data.status,
    wasEdited: data.was_edited,
    finishedByName: data.finished_by_name
  })

  public static mapDataGetById = (data: InspectionAPIGetById): Inspection => ({
    bottomImage: data.bottom_image,
    caseId: data.case_id,
    containers: data.containers,
    createdAt: data.created_at,
    discardedDescription: data.discarded_description,
    id: data.id,
    keyValues: data.key_values,
    movements: data.movements,
    plates: data.plates,
    properties: data.properties,
    radiation: data.radiation,
    raioxImage: data.raiox_image,
    spectrumName: data.spectrum_name,
    status: data.status,
    updatedAt: data.updated_at
  })

  public static mapDataPutAreas = (data: InspectionAPIPut): InspectionAPIPut => ({
    id: data.id,
    area_id: data.area_id
  })
}
