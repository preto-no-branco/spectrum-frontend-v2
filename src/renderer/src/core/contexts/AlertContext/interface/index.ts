import {
  type AlertDialogAction,
  type AlertDialogCancel,
  type AlertDialogContent,
  type AlertDialogDescription,
  type AlertDialogFooter,
  type AlertDialogHeader,
  type AlertDialogTitle
} from '@renderer/components/ui/alert-dialog'
import { ComponentProps } from 'react'

type AlertContentProps = ComponentProps<typeof AlertDialogContent>
type AlertHeaderProps = ComponentProps<typeof AlertDialogHeader>
type AlertTitleProps = ComponentProps<typeof AlertDialogTitle>
type AlertMessageProps = ComponentProps<typeof AlertDialogDescription>
type AlertFooterProps = ComponentProps<typeof AlertDialogFooter>
type AlertCancelProps = ComponentProps<typeof AlertDialogCancel>
type AlertActionProps = ComponentProps<typeof AlertDialogAction>

export interface AlertConfig {
  title: string
  showCancelButton?: boolean
  cancelText?: string
  confirmText?: string

  message: string
  messageProps?: AlertMessageProps

  contentComponent?: React.ReactNode

  onCancel?: () => void
  onConfirm?: () => void

  contentProps?: AlertContentProps
  headerProps?: AlertHeaderProps
  titleProps?: AlertTitleProps
  footerProps?: AlertFooterProps
  onCancelProps?: AlertCancelProps
  onConfirmProps?: AlertActionProps
}

export interface IAlertContext {
  alertConfig: AlertConfig | null
  isAlertOpen: boolean
  showAlert: (config: AlertConfig) => void
  onCloseAlert: () => void
}
