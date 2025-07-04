import { SpectrumSettings } from '@renderer/services/spectrumSettingsService/interfaces'

export interface WayInspectionFormModalProps {
  isOpen: boolean
  defaultValues?: SpectrumSettings
  onClose: () => void
  onSubmit: (data: SpectrumSettings, id?: string) => void
}
