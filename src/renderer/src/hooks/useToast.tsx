import { toast } from 'sonner'
import { ReactNode } from 'react'
import toastError from '@renderer/assets/icons/error-toast.svg'
import toastSuccess from '@renderer/assets/icons/success-toast.svg'

interface ToastOptions {
  description?: string
  duration?: number
  icon?: ReactNode
}

// Modelos de uso:
/* 
 showToast('success', 'Tudo certo!', {
      description: 'Operação finalizada com sucesso.'
    })

  showToast('error', 'Erro ao salvar', {
      description: 'Verifique os campos e tente novamente.'
    })
  showToast('success', 'Tudo certo!', {})

  showToast('error', 'Erro ao salvar', {}) */

export const showToast = (type: 'success' | 'error', title: string, options?: ToastOptions) => {
  const defaultIcons = {
    success: <img src={toastSuccess} alt="Success" />,
    error: <img src={toastError} alt="Error" />
  }

  toast[type](title, {
    description: options?.description,
    duration: options?.duration ?? 3000,
    icon: options?.icon ?? defaultIcons[type],
    closeButton: false,
    action: {
      children: <span className="sr-only text-white">Fechar</span>,
      label: "x",
      
      onClick: () => toast.dismiss()
    },
    classNames: {
      icon: '!h-4 !w-4 !flex-shrink-0 !self-start !mt-1'
    }
  })
}


