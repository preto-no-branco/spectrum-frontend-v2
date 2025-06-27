import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@renderer/components/ui/alert-dialog'
import { useAlertDialog } from '@renderer/hooks/useAlertDialog'
import { useCallback } from 'react'

export function Alert() {
  const { isAlertOpen, alertConfig, onCloseAlert } = useAlertDialog()
  const {
    title,
    message,
    onCancel,
    onConfirm,
    cancelText,
    confirmText,
    contentProps,
    headerProps,
    titleProps,
    messageProps,
    footerProps,
    onCancelProps,
    onConfirmProps,
    showCancelButton = true
  } = alertConfig || {}

  const handleCancel = useCallback(() => {
    onCancel?.()
    onCloseAlert()
  }, [onCloseAlert, onCancel])

  const handleConfirm = useCallback(() => {
    onConfirm?.()
    onCloseAlert()
  }, [onCloseAlert, onConfirm])

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={handleCancel}>
      <AlertDialogContent {...contentProps}>
        <AlertDialogHeader {...headerProps}>
          <AlertDialogTitle {...titleProps}>{title}</AlertDialogTitle>
          <AlertDialogDescription {...messageProps}>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter {...footerProps}>
          {showCancelButton && (
            <AlertDialogCancel onClick={handleCancel} {...onCancelProps}>
              {cancelText || 'Cancelar'}
            </AlertDialogCancel>
          )}
          <AlertDialogAction {...onConfirmProps} onClick={handleConfirm}>
            {confirmText || 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
