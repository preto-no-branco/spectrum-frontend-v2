import SidebarOpen from '@renderer/components/analysis/sidebar/header/SidebarOpen'
import { SidebarHeaderProps } from './interfaces'

export default function SidebarHeader({ activeTab, setActiveTab }: SidebarHeaderProps) {
  return (
    <div className={`h-[50px] border-b border-content-tertiary flex items-center`}>
      <div className={`flex w-full h-full`}>
        <SidebarOpen activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}
