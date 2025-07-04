import { useAlertDialog } from '@renderer/hooks/useAlertDialog'
import { SpectrumSettings } from '@renderer/services/spectrumSettingsService/interfaces'
import { useSpectrumSettingsAPI } from '@renderer/services/spectrumSettingsService/useSpectrumSettingsAPI'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

export const useWayInspectionsSettings = () => {
  const { get, post } = useSpectrumSettingsAPI()
  const { showAlert } = useAlertDialog()
  const [searchTerm, setSearchTerm] = useState('')
  const [spectrums, setSpectrums] = useState<SpectrumSettings[]>([])
  const [spectrumToEdit, setSpectrumToEdit] = useState<SpectrumSettings | null>(null)
  const [isCreateWayIdentifierModalOpen, setIsCreateWayIdentifierModalOpen] = useState(false)

  const filteredWayInspections = useMemo(
    () =>
      spectrums.filter((wayInspection) =>
        wayInspection.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, spectrums]
  )

  const onSearchTermChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const onSelectFilterChange = useCallback((value: string) => {
    console.log(value)
  }, [])

  const onCloseCreateWayIdentifierModal = useCallback(() => {
    setIsCreateWayIdentifierModalOpen(false)
  }, [])

  const onOpenCreateWayIdentifierModal = useCallback(() => {
    setIsCreateWayIdentifierModalOpen(true)
  }, [])

  const fetchWayInspections = useCallback(async () => {
    try {
      const data = await get()
      if (data) setSpectrums(data)
    } catch {
      console.log('error')
    }
  }, [get])

  const createSpectrum = useCallback(
    async (data: SpectrumSettings) => {
      // applyCategoryChanges({ data })
      const result = await post([...spectrums, data])

      if (result === 'spectrum-settings-created') {
        onCloseCreateWayIdentifierModal()

        fetchWayInspections()
        return
      }

      // TODO: implement toast
      // applyCategoryChanges({ remove: true, data })
    },
    [post, onCloseCreateWayIdentifierModal, fetchWayInspections, spectrums]
  )

  const updateSpectrum = useCallback(
    async (data: SpectrumSettings) => {
      const spectrumIndex = spectrums.findIndex((spectrum) => spectrum.id === data.id)

      const newSpectrums = [...spectrums]
      newSpectrums[spectrumIndex] = data

      const result = await post(newSpectrums)

      if (result) {
        // applyCategoryChanges({
        //   data: {
        //     ...data,
        //     id
        //   }
        // })
        onCloseCreateWayIdentifierModal()
      }

      fetchWayInspections()
    },
    [post, spectrums, fetchWayInspections, onCloseCreateWayIdentifierModal]
  )

  const deleteSpectrum = useCallback(
    async (spectrum: SpectrumSettings) => {
      await post(spectrums.filter((item) => item.id !== spectrum.id))
      fetchWayInspections()
    },
    [post, spectrums, fetchWayInspections]
  )

  const handleSubmitWayIdentifier = useCallback(
    async (data: SpectrumSettings, id?: string) => {
      if (id) {
        updateSpectrum(data)
        return
      }

      await createSpectrum(data)
    },
    [createSpectrum, updateSpectrum]
  )

  const handleEditWayIdentifier = useCallback(
    (data: SpectrumSettings) => {
      setSpectrumToEdit(data)
      onOpenCreateWayIdentifierModal()
    },
    [onOpenCreateWayIdentifierModal]
  )

  const handleDeleteWayIdentifier = useCallback(
    (spectrum: SpectrumSettings) => {
      const title = 'Você deseja excluir este identificador?'
      const message =
        'Este identificador não poderá mais ser usado. A exclusão é permanente e não poderá ser desfeita.'

      showAlert({
        title,
        message,
        confirmText: 'Excluir',
        onConfirm: () => deleteSpectrum(spectrum),
        onConfirmProps: {
          className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
        }
      })
    },
    [showAlert, deleteSpectrum]
  )

  useEffect(() => {
    fetchWayInspections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    spectrumToEdit,
    filteredWayInspections,
    isCreateWayIdentifierModalOpen,
    handleSubmitWayIdentifier,
    handleEditWayIdentifier,
    handleDeleteWayIdentifier,
    deleteSpectrum,
    onOpenCreateWayIdentifierModal,
    onSearchTermChange,
    onSelectFilterChange,
    onCloseCreateWayIdentifierModal
  }
}
