import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'

type MenuItem = {
  onClick: VoidFunction
  label: string
}

export interface MenuProps {
  trigger: React.ReactNode
  items: MenuItem[]
}

export function Menu({ trigger, items }: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1 cursor-pointer z-10 rounded">
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map(({ onClick, label }) => (
          <DropdownMenuItem key={`menu-item-${label}`} onClick={onClick}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
