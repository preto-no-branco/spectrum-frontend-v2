export type SidebarHeaderTabs = 'details' | 'movements'

export interface SidebarHeaderProps {
  activeTab: SidebarHeaderTabs
  setActiveTab: React.Dispatch<React.SetStateAction<SidebarHeaderTabs>>
}
