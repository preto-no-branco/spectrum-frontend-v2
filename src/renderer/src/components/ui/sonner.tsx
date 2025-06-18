import { Toaster as Sonner, ToasterProps } from 'sonner'
import { useTheme } from 'next-themes'
import { cva } from 'class-variance-authority'
import { cn } from '@renderer/lib/utils'

const toastContainer = cva('group/toast border rounded-md relative', {
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

const toastClose = cva('!text-white !hover:text-white/70 !top-3 !right-3')

const toastContent = cva('flex flex-row items-start gap-3 w-full')

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
          closeButton: cn(toastClose()),
          content: cn(toastContent())
        }
      }}
      {...props}
    />
  )
}
