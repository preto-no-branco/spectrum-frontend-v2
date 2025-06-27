import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export interface ModalProps {
  isOpen: boolean
  onClose: VoidFunction
  children?: React.ReactNode

  title: string
  description?: string

  cancelText?: string
  confirmText?: string
  showCancelButton?: boolean
  showFooter?: boolean

  footerProps?: React.ComponentProps<typeof DialogFooter>
  contentProps?: React.ComponentProps<typeof DialogContent>
  headerProps?: React.ComponentProps<typeof DialogHeader>
  titleProps?: React.ComponentProps<typeof DialogTitle>
  cancelButtonProps?: Omit<React.ComponentProps<typeof Button>, 'children'>
  confirmButtonProps?: Omit<React.ComponentProps<typeof Button>, 'children'>
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  cancelText,
  confirmText,
  showCancelButton = true,
  showFooter = true,
  headerProps,
  contentProps,
  footerProps,
  titleProps,
  cancelButtonProps,
  confirmButtonProps
}: ModalProps) {
  const { className: contentClassName, ...restContentProps } = contentProps || {}
  const { className: headerClassName, ...restHeaderProps } = headerProps || {}
  const { className: titleClassName, ...restTitleProps } = titleProps || {}

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent
        aria-label={title}
        aria-describedby={description ? 'dialog-description' : undefined}
        className={`overflow-hidden ${contentClassName}`}
        {...restContentProps}
      >
        <DialogHeader
          className={`border-b border-secondary pb-2 ${headerClassName}`}
          {...restHeaderProps}
        >
          <DialogTitle className={`text-xl font-bold ${titleClassName}`} {...restTitleProps}>
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {showFooter && (
          <DialogFooter {...footerProps}>
            {showCancelButton && (
              <DialogClose asChild>
                <Button variant="outline" {...cancelButtonProps}>
                  {cancelText ?? 'Cancel'}
                </Button>
              </DialogClose>
            )}
            <Button type="submit" {...confirmButtonProps}>
              {confirmText ?? 'Confirm'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
