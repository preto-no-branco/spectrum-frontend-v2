import SidebarOpen from '@renderer/components/analysis/sidebar/header/SidebarOpen'
import openIcon from '@/assets/analysis/openSidebar.png'
import closeIcon from '@/assets/analysis/closeSidebar.png'

interface SidebarHeaderProps {
  activeTab: 'details' | 'movements'
  setActiveTab: (tab: 'details' | 'movements') => void
}

export default function SidebarHeader({ activeTab, setActiveTab }: SidebarHeaderProps) {
  return (
    <div className={`min-h-[50px] px-2 border-b border-[#2D3234] flex items-center`}>
      <div className={`flex w-full h-full`}>
        <SidebarOpen activeTab={activeTab} setActiveTab={setActiveTab} closeIcon={closeIcon} />
      </div>
    </div>
  )
}
