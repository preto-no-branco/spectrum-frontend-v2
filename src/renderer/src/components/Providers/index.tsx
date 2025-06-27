import { ThemeProvider } from '@renderer/components/themeProvider'
import { AlertProvider } from '@renderer/core/contexts/AlertContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AlertProvider>{children}</AlertProvider>
    </ThemeProvider>
  )
}
