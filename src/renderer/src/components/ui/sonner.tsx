import { Toaster as Sonner, ToasterProps } from 'sonner'
import { useTheme } from 'next-themes'
import { cva } from 'class-variance-authority'
import { cn } from '@renderer/lib/utils'

const toastContainer = cva('group/toast border rounded-md  ', {
  variants: {
    variant: {
      success: '!bg-background !border-border-secondary',
      error: '!bg-background !border-border-secondary'
    }
  }
})

const toastTitle = cva('!text-content-primary !text-[0.850rem] !leading-[20px] !font-plex-sans', {
  defaultVariants: {},
  variants: {}
})

const toastDescription = cva(
  '!text-content-secondary !font-normal !text-[0.850rem] !leading-[20px] !font-plex-sans'
)

const toastContent = cva('flex flex-row items-start gap-3 w-full')

const toastActionButton = cva(
  '!bg-background !text-content-secondary !flex !items-start !h-full  !text-[1rem] font-normal'
)
export const Toaster = (props: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          success: cn(toastContainer({ variant: 'success' })),
          error: cn(toastContainer({ variant: 'error' })),
          title: cn(toastTitle()),
          description: cn(toastDescription()),
          content: cn(toastContent()),
          actionButton: cn(toastActionButton())
        }
      }}
      {...props}
    />
  )
}


