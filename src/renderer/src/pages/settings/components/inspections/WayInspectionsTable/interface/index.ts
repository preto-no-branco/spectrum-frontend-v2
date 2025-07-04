import { SpectrumSettings } from '@renderer/services/spectrumSettingsService/interfaces'

export type ColumnWayInspection = SpectrumSettings & {
  actions?: string
}

export interface WayInspetionTableProps {
  spectrums: SpectrumSettings[]
  onEdit: (data: SpectrumSettings) => void
  onDelete: (data: SpectrumSettings) => void
}
