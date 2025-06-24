import { Button } from '@renderer/components/ui/button'
import { useSettingsSidebar } from './useSettingsSidebar'

export function SettingsSidebar() {
  const { sidebarOptItems, forwardTo, getButtonVariant } = useSettingsSidebar()
  return (
    <div className="flex flex-col h-[inherit] w-fit gap-2 py-6 border-r border-secondary">
      {sidebarOptItems.map(({ title, href }) => {
        return (
          <Button
            key={`sidebar-opt-item-${title}-${href}`}
            variant={getButtonVariant(href)}
            className="w-48 px-6 justify-start"
            onClick={() => {
              forwardTo(href)
            }}
          >
            {title}
          </Button>
        )
      })}
    </div>
  )
}
