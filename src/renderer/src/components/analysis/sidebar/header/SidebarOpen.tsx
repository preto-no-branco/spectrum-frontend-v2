import inspectionSidebar from '@/assets/analysis/inspectionSidebar.png'
import movements from '@/assets/analysis/movements.png'
import { useContainerWidth } from '@renderer/hooks/useContainerWidth'
import { cn } from '@renderer/lib/utils'

interface SidebarOpenProps {
  activeTab: 'details' | 'movements'
  setActiveTab: (tab: 'details' | 'movements') => void
  closeIcon: string
}

export default function SidebarOpen({ activeTab, setActiveTab }: SidebarOpenProps) {
  const { ref, isBelow } = useContainerWidth<HTMLDivElement>()

  const hideIcons = isBelow(300)
  const textSize = hideIcons ? 'text-xs' : 'text-sm'
  return (
    <div ref={ref} className="grid grid-cols-2 w-full">
      <button
        onClick={() => setActiveTab('details')}
        className={`flex items-center justify-center py-1 ${
          activeTab === 'details'
            ? 'border-b-[#00B388] border-b-2'
            : 'text-[#B3BDC0] hover:text-white'
        }`}
      >
        {!hideIcons && (
          <img src={inspectionSidebar} alt="Detalhes da inspeção" className="w-5 h-5" />
        )}
        <span className={cn('font-normal', textSize)}>Detalhes da inspeção</span>
      </button>
      <button
        onClick={() => setActiveTab('movements')}
        className={`flex items-center gap-2  justify-center py-1 ${
          activeTab === 'movements'
            ? 'border-b-[#00B388] border-b-2'
            : 'text-[#B3BDC0] hover:text-white'
        }`}
      >
        {!hideIcons && <img src={movements} alt="Movimentações" className="w-5 h-5" />}
        <span className={cn('font-normal', textSize)}>Movimentações</span>
      </button>
    </div>
  )
}
