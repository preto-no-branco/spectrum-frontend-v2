import { useAlertDialog } from '@renderer/hooks/useAlertDialog'
import { useInspectionAPI } from '@renderer/services/inspectionService/useInspectionAPI'
import { useCallback, useEffect, useState } from 'react'

export const useWayInspectionsSettings = () => {
  const { getHistory } = useInspectionAPI()
  const { showAlert } = useAlertDialog()
  // const [wayInspections, setWayInspections] = useState<Inspection[]>([])
  const [isCreateWayIdentifierModalOpen, setIsCreateWayIdentifierModalOpen] = useState(false)

  const onCloseCreateWayIdentifierModal = useCallback(() => {
    setIsCreateWayIdentifierModalOpen(false)
  }, [])

  const onSelectFilterChange = useCallback((value: string) => {
    console.log(value)
  }, [])

  const fetchWayInspections = useCallback(async () => {
    try {
      // const data = await getHistory({})
      // if (data) setWayInspections(data)
    } catch {
      console.log('error')
    }
  }, [getHistory])

  const handleCreateWayIdentifier = useCallback(() => {
    setIsCreateWayIdentifierModalOpen(true)
  }, [])

  const handleEditWayIdentifier = useCallback((wayIdentifier: string) => {
    console.log('🚀 ~ wayIdentifier:', wayIdentifier)
    setIsCreateWayIdentifierModalOpen(true)
  }, [])

  const handleDeleteWayIdentifier = useCallback(
    (wayIdentifier: string) => {
      console.log('🚀 ~ wayIdentifier:', wayIdentifier)

      const title = 'Você deseja excluir este identificador?'
      const message =
        'Este identificador não poderá mais ser usado. A exclusão é permanente e não poderá ser desfeita.'

      showAlert({
        title,
        message,
        confirmText: 'Excluir',
        onConfirm: () => console.log('Confirmado'),
        onConfirmProps: {
          className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
        }
      })
    },
    [showAlert]
  )

  useEffect(() => {
    fetchWayInspections()
  }, [])

  return {
    isCreateWayIdentifierModalOpen,
    handleCreateWayIdentifier,
    handleEditWayIdentifier,
    handleDeleteWayIdentifier,
    onSelectFilterChange,
    onCloseCreateWayIdentifierModal
  }
}
