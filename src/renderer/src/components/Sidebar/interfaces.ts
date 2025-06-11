export interface SidebarButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}

export interface SidebarItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export interface SidebarProps {
  isHidden: boolean
  items: SidebarItem[]
  onHelpClick?: () => void
  onLogoutClick?: () => void
}
