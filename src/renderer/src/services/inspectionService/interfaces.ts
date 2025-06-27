import { InspectionStatusEnum } from './childsTypes/enums'
import { Area, Container, KeyValue, Movement, Plate } from './childsTypes/interfaces'

export interface InspectionAPI {
  case_id: string
  containers: Container[]
  created_at: string
  id: string
  area_id: string
  is_empty: boolean
  is_flammable: boolean
  is_multiple: boolean
  is_suspect: boolean
  plates: Plate[]
  spectrum_code: string
  status: InspectionStatusEnum
  was_edited: boolean
  bottom_image: string
  discarded_description: string
  key_values: KeyValue[]
  movements: Movement[]
  properties: KeyValue[]
  radiation: boolean
  raiox_image: string
  updated_at: string
  areas: Area[]
  mask_image: string
  tiff_image: string
}

export interface InspectionAPIGetHistory
  extends Omit<
    InspectionAPI,
    | 'bottom_image'
    | 'discarded_description'
    | 'key_values'
    | 'movements'
    | 'properties'
    | 'radiation'
    | 'raiox_image'
    | 'updated_at'
  > {}

export interface InspectionAPIGetById
  extends Omit<
    InspectionAPI,
    'is_empty' | 'is_flammable' | 'is_multiple' | 'is_suspect' | 'was_edited'
  > {}

export interface InspectionAPIPostProperties extends Pick<InspectionAPI, 'properties'> {}

export interface InspectionAPIPostStatus extends Pick<InspectionAPI, 'id' | 'status'> {}

export interface InspectionAPIPostAreas extends Pick<InspectionAPI, 'containers'> {}

export interface InspectionAPIPut extends Pick<InspectionAPI, 'id' | 'area_id'> {}

export interface UseInspectionService {
  getHistory: (params: InspectionAPIGetHistoryParams) => Promise<Inspection[] | void>
  getReport: (params: InspectionAPIGetReportParams) => Promise<'inspection-report-generated' | void>
  getById: (id: string) => Promise<Inspection | void>
  postNewProperties: (id: string, data: KeyValue[]) => Promise<'inspection-properties-added' | void>
  postFinish: (id: string) => Promise<'inspection-finished' | void>
  postAreas: (id: string, areas: Area[]) => Promise<'inspection-areas-created' | void>
  putAreas: (id: string, area_id: string, data: string) => Promise<'inspection-area-updated' | void>
}

export interface Inspection {
  caseId: string
  bottomImage?: string
  discardedDescription?: string
  keyValues?: KeyValue[]
  movements?: Movement[]
  properties?: KeyValue[]
  radiation?: boolean
  raioxImage?: string
  updatedAt?: string
  containers: Container[]
  createdAt?: string
  id: string
  isEmpty: boolean
  isFlammable: boolean
  isMultiple: boolean
  isSuspect: boolean
  plates: Plate[]
  spectrumCode?: string
  status?: InspectionStatusEnum
  wasEdited?: boolean
  finished_by_name?: string
}

export interface InspectionAPIGetHistoryParams {
  take?: number
  skip?: number
  spectrum?: string
  from?: string
  until?: string
  plate?: string
  container?: string
  case_id?: string
  altered_plate?: boolean
  altered_container?: boolean
  is_multiple?: boolean
  is_empty?: boolean
  is_flammable?: boolean
  is_suspect?: boolean
  is_finished?: boolean
  is_discarded?: boolean
  is_ignored?: boolean
}

export interface InspectionAPIGetReportParams {
  from: string
  until: string
  include_discarded: boolean
  type: 'xlsx' | 'pdf'
}
