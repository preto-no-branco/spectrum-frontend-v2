import { Button } from '@renderer/components/ui/button'
import { APP_ROUTES } from '@renderer/core/constants/appRoutes'
import { useNavigate } from 'react-router-dom'

const items = [
  {
    title: 'Usuários',
    href: APP_ROUTES.SETTINGS.USER
  },
  {
    title: 'Gestão de acessos',
    href: APP_ROUTES.SETTINGS.ACCESS
  },
  {
    title: 'Ajustes do sistema',
    href: APP_ROUTES.SETTINGS.SYSTEM
  },
  {
    title: 'Categorias de análise',
    href: APP_ROUTES.SETTINGS.CATEGORIES
  },
  {
    title: 'Vias de inspeção',
    href: APP_ROUTES.SETTINGS.INSPECTION_WAYS
  }
]

export function SettingsSidebar() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-[inherit] w-fit gap-2 py-6 border-r border-secondary">
      {items.map((item) => (
        <Button
          key={item.title}
          variant="ghost"
          className="w-48 px-6 justify-start"
          onClick={() => {
            navigate(item.href)
          }}
        >
          {item.title}
        </Button>
      ))}
    </div>
  )
}
