import InspectionService from '.'
import {
  Inspection,
  InspectionAPIGetHistoryParams,
  InspectionAPIGetReportParams,
  UseInspectionService
} from './interfaces'
import { inspectionMappers } from './inspectionMappers'
import DownloadFileHandler from '@renderer/utils/downloadFileHandler'
import { Area, KeyValue } from './childsTypes/interfaces'

export const useInspectionAPI = (): UseInspectionService => {
  const getHistory = async (
    params: InspectionAPIGetHistoryParams
  ): Promise<Inspection[] | void> => {
    const inspections = await InspectionService.getHistory(params, (data) => {
      return data.map((inspection) => inspectionMappers.mapDataGetHistory(inspection))
    })
    if (!inspections.success) {
      alert(inspectionMappers.translateError[inspections.error])
      return
    }
    return inspections.data
  }

  const getReport = async (
    params: InspectionAPIGetReportParams
  ): Promise<'inspection-report-generated' | void> => {
    const response = await InspectionService.getReport(params)
    if (!response.success) {
      alert(inspectionMappers.translateError[response.error])
      return
    }
    DownloadFileHandler.downloadFile({
      report: response.data,
      type: params.type
    })
    return response.data
  }

  const getById = async (id: string): Promise<Inspection | void> => {
    const response = await InspectionService.getById(id, (response) => {
      return inspectionMappers.mapDataGetById(response)
    })
    if (!response.success) {
      alert(inspectionMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const postNewProperties = async (
    id: string,
    data: KeyValue[]
  ): Promise<'inspection-properties-added' | void> => {
    const response = await InspectionService.postNewProperties(id, data)
    if (!response.success) {
      alert(inspectionMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const postFinish = async (id: string): Promise<'inspection-finished' | void> => {
    const response = await InspectionService.postFinish(id)
    if (!response.success) {
      alert(inspectionMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const postAreas = async (
    id: string,
    data: Area[]
  ): Promise<'inspection-areas-created' | void> => {
    const response = await InspectionService.postAreas(id, data)
    if (!response.success) {
      alert(inspectionMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const putAreas = async (
    id: string,
    area_id: string,
    data: string
  ): Promise<'inspection-area-updated' | void> => {
    const response = await InspectionService.putAreas(id, area_id, data)
    if (!response.success) {
      alert(inspectionMappers.translateError[response.error])
      return
    }
    return response.data
  }

  return {
    getHistory,
    getReport,
    getById,
    postNewProperties,
    postFinish,
    postAreas,
    putAreas
  }
}
