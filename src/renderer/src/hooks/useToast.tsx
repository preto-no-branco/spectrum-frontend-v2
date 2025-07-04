import { toast as sonnerToast } from 'sonner'
import { CustomToast } from '@renderer/components/ui/sonner'
import { Ban, Info } from 'lucide-react'
import successToast from "@renderer/assets/icons/toastSuccess.svg"
import errorToast from "@renderer/assets/icons/toastError.svg"
interface ToastOptions {
  description?: string
  duration?: number
  icon?: React.ReactNode
}

export const showToast = (type: 'success' | 'error', title: string, options?: ToastOptions) => {
  const icons = {
    success: (
      <div>
        <img src={successToast} className="w-5 h-5" />
      </div>
    ),
    error: (
      <div>
         <img src={errorToast}  className="w-5 h-5 text-destructive/60" />
      </div>
    )
  }

  return sonnerToast.custom(
    (id) => (
      <CustomToast
        id={id}
        variant={type}
        title={title}
        description={options?.description}
        icon={options?.icon ?? icons[type]}
      />
    ),
    {
      duration: options?.duration ?? 3000 // fallback padrão
    }
  )
}
