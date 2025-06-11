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
  x_ray_image: string
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
  getById: (id: string) => Promise<Inspection | void>
  getHistory: (id: string) => Promise<Inspection | void>
  getReport: (id: string) => Promise<Inspection | void>
  postNewProperties: (inspection: Inspection) => Promise<'inspection-properties-added' | void>
  postFinish: (id: string) => Promise<'inspection-finished' | void>
  postAreas: (id: string, areas: string[]) => Promise<'inspection-areas-created' | void>
  putAreas: (id: string, inspection: Inspection) => Promise<'inspection-areas-updated' | void>
}

export interface Inspection {
  caseId: string
  containers: Container[]
  createdAt: string
  id: string
  isEmpty: boolean
  isFlammable: boolean
  isMultiple: boolean
  isSuspect: boolean
  plates: Plate[]
  spectrumCode: string
  status: InspectionStatusEnum
  wasEdited: boolean
}

export interface InspectionAPIGetReportParams {
  from: string
  until: string
  type: 'csv' | 'pdf'
  include_discarded: boolean
}
