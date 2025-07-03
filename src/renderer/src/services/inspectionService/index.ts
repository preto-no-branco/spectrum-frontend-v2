import { api } from '@renderer/utils/api'
import {
  InspectionAPI,
  InspectionAPIGetById,
  InspectionAPIGetHistory,
  InspectionAPIGetHistoryParams,
  InspectionAPIGetReportParams,
  InspectionAPIPut
} from './interfaces'
import { ErrorMessageGet, ErrorMessagePatch, ErrorMessagePost } from '../interfaces'
import { callback, ResponseAsync } from '../interfaces'
import { Area, KeyValue } from './childsTypes/interfaces'

export default class InspectionService {
  static async getHistory<MappedResponse>(
    params: InspectionAPIGetHistoryParams,
    callback: callback<InspectionAPIGetHistory[], MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<InspectionAPIGetHistory[]>(`/inspection`, {
        params
      })
      return {
        success: true,
        data: callback(response.data)
      }
    } catch {
      return {
        success: false,
        error: 'not_found'
      }
    }
  }

  static async getReport(
    params: InspectionAPIGetReportParams
  ): ResponseAsync<'inspection-report-generated', ErrorMessageGet> {
    try {
      await api.post<{ message: string }>(
        `/inspection/report?from=${params.from}&until=${params.until}&type=${params.type}&include_discarded=${params.include_discarded}`
      )
      return {
        success: true,
        data: 'inspection-report-generated'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'not_found'
      }
    }
  }

  static async getById<MappedResponse>(
    id: string,
    callback: callback<InspectionAPIGetById, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<InspectionAPI>(`/inspection/${id}`)
      return {
        success: true,
        data: callback(response.data)
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'not_found'
      }
    }
  }

  static async postNewProperties(
    id: string,
    data: KeyValue[]
  ): ResponseAsync<'inspection-properties-added', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>(`/inspection/${id}/properties`, data)
      return {
        success: true,
        data: 'inspection-properties-added'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('409')) {
        return {
          success: false,
          error: 'conflict'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  static async postFinish(id: string): ResponseAsync<'inspection-finished', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>(`/inspection/${id}/finish`)
      return {
        success: true,
        data: 'inspection-finished'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  static async postAreas(
    id: string,
    data: Area[]
  ): ResponseAsync<'inspection-areas-created', ErrorMessagePatch> {
    try {
      await api.patch<{ message: string }>(`/inspection/${id}/areas`, data)
      return {
        success: true,
        data: 'inspection-areas-created'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  static async putAreas(
    id: string,
    area_id: string,
    data: string
  ): ResponseAsync<'inspection-area-updated', ErrorMessagePatch> {
    try {
      await api.put<InspectionAPIPut>(`/inspection/${id}/area/${area_id}`, data)
      return {
        success: true,
        data: 'inspection-area-updated'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }
}
