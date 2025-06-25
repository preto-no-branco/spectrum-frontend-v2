import inspectionSidebar from '@/assets/analysis/inspectionSidebar.png'
import movements from '@/assets/analysis/movements.png'

interface SidebarOpenProps {
  activeTab: 'detalhes' | 'movimentacoes'
  setActiveTab: (tab: 'detalhes' | 'movimentacoes') => void
  setOpen: (open: boolean) => void
  width: number
  closeIcon: string
}

export default function SidebarOpen({
  activeTab,
  setActiveTab,
  setOpen,
  width,
  closeIcon
}: SidebarOpenProps) {
  return (
    <>
      <button
        onClick={() => setActiveTab('detalhes')}
        className={`flex items-center gap-2 w-[45%] justify-center px-2 py-1 ${
          activeTab === 'detalhes'
            ? 'border-b-[#00B388] border-b-2'
            : 'text-[#B3BDC0] hover:text-white'
        }`}
      >
        <img src={inspectionSidebar} alt="Detalhes da inspeção" className="w-5 h-5" />
        {width > 320 && <span className="font-normal">Detalhes da inspeção</span>}
      </button>
      <button
        onClick={() => setActiveTab('movimentacoes')}
        className={`flex items-center gap-2 w-[40%] justify-center px-2 py-1 ${
          activeTab === 'movimentacoes'
            ? 'border-b-[#00B388] border-b-2'
            : 'text-[#B3BDC0] hover:text-white'
        }`}
      >
        <img src={movements} alt="Movimentações" className="w-5 h-5" />
        {width > 320 && <span className="font-normal">Movimentações</span>}
      </button>
      <button
        onClick={() => setOpen(false)}
        className="w-5 h-5 bg-no-repeat bg-center bg-contain self-center"
        style={{ backgroundImage: `url(${closeIcon})` }}
        aria-label="Fechar sidebar"
      />
    </>
  )
}
