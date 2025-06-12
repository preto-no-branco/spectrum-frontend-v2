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
  onHelpClick: () => void
  onLogoutClick: () => void
}

export interface SidebarClosedProps {
  edgeHoverWidth: string
  onEdgeHover: () => void
}

export interface SidebarOpenProps {
  items: SidebarProps['items']
  onHelpClick: () => void
  onLogoutClick: () => void
}
