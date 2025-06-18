import { toast } from 'sonner'
import { ReactNode } from 'react'
import toastError from '@renderer/assets/icons/error-toast.svg'
import toastSuccess from '@renderer/assets/icons/success-toast.svg'

interface ToastOptions {
  description?: string
  duration?: number
  icon?: ReactNode
}

export const showToast = (type: 'success' | 'error', title: string, options?: ToastOptions) => {
  const defaultIcons = {
    success: <img src={toastSuccess} alt="Success" />,
    error: <img src={toastError} alt="Error" />
  }

  toast[type](title, {
    description: options?.description,
    duration: options?.duration ?? 5000,
    icon: options?.icon ?? defaultIcons[type],
    classNames: {
      icon: `${options && options.description ? '!mb-[1.15rem]' : ''} !h-4 !w-4 flex-shrink-0`
    }
  })
}
