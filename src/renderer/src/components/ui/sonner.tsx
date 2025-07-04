import { toast as sonnerToast } from 'sonner'
import { X } from 'lucide-react'
import { cva } from 'class-variance-authority'
import { cn } from '@renderer/lib/utils'

interface CustomToastProps {
  id: string | number
  variant?: 'success' | 'error'
  title: string
  description?: string
  icon?: React.ReactNode
}

const toastVariants = cva(
  'group/toast border rounded-md px-4 py-3 w-full min-w-[387px] min-h-20 flex items-start gap-3 animate-in slide-in-from-top items-center',
  {
    variants: {
      variant: {
        success: 'bg-background border-border-secondary',
        error: 'bg-background border-border-secondary'
      }
    },
    defaultVariants: {
      variant: 'success'
    }
  }
)

export const CustomToast = ({
  id,
  variant = 'success',
  title,
  description,
  icon
}: CustomToastProps) => {
  return (
    <div className={cn(toastVariants({ variant }), 'items-start ')}>
      {icon}

      <div className="flex-1 flex gap-0.5 flex-col justify-start">
        <p className="text-content-primary text-sm font-bold">{title}</p>
        {description && <p className="text-content-secondary break-words text-sm">{description}</p>}
      </div>

      <button
        onClick={() => sonnerToast.dismiss(id)}
        className="text-content-secondary hover:text-content-primary  mt-[0.125rem]"
        aria-label="Fechar"
      >
        <X className="w-[0.85rem] h-[0.85rem]" />
      </button>
    </div>
  )
}
