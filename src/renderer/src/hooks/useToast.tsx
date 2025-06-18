import { toast as sonnerToast } from 'sonner'
import toastError from '@renderer/assets/icons/error-toast.svg'
import toastSuccess from '@renderer/assets/icons/success-toast.svg'
import { CustomToast } from '@renderer/components/ui/sonner'

interface ToastOptions {
  description?: string
  duration?: number
}

export const showToast = (type: 'success' | 'error', title: string, options?: ToastOptions) => {
  const icons = {
    success: toastSuccess,
    error: toastError
  }

  return sonnerToast.custom(
    (id) => (
      <CustomToast
        id={id}
        variant={type}
        title={title}
        description={options?.description}
        icon={icons[type]}
      />
    ),
    {
      duration: options?.duration ?? 3000 // fallback padrão
    }
  )
}
