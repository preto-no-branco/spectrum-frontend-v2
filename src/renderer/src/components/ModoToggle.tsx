import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useTheme } from './themeProvider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(theme === 'dark')

  useEffect(() => {
    setTheme(isDark ? 'dark' : 'light')
  }, [isDark, setTheme])

  return (
    <div className="flex items-center gap-2">
      <Switch id="theme-mode" checked={isDark} onCheckedChange={setIsDark} />
      <Label htmlFor="theme-mode">{isDark ? 'Dark' : 'Light'}</Label>
    </div>
  )
}
