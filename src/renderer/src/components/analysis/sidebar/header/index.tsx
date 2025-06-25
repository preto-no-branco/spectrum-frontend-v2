import SidebarOpen from '@renderer/components/analysis/sidebar/header/SidebarOpen'
import openIcon from '@/assets/analysis/openSidebar.png'
import closeIcon from '@/assets/analysis/closeSidebar.png'

interface SidebarHeaderProps {
  activeTab: 'detalhes' | 'movimentacoes'
  setActiveTab: (tab: 'detalhes' | 'movimentacoes') => void
  setOpen: (open: boolean) => void
  open: boolean
  width: number
  showContent: boolean
}

export default function SidebarHeader({
  activeTab,
  setActiveTab,
  setOpen,
  open,
  width,
  showContent
}: SidebarHeaderProps) {
  return (
    <div
      className={`h-[50px] px-2 border-b border-[#2D3234] flex items-center ${
        !open ? 'justify-center' : !showContent ? 'justify-end' : 'justify-between'
      }`}
    >
      {open ? (
        <div
          className={`flex justify-between w-full h-full ${width > 450 ? 'text-[15px]' : width > 380 ? 'text-[12px]' : 'text-[10px]'} ${
            !showContent ? 'justify-end' : 'justify-between'
          }`}
        >
          {showContent ? (
            <SidebarOpen
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setOpen={setOpen}
              width={width}
              closeIcon={closeIcon}
            />
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="w-5 h-5 bg-no-repeat bg-center bg-contain self-center"
              style={{ backgroundImage: `url(${closeIcon})` }}
              aria-label="Fechar sidebar"
            />
          )}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-5 h-5 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${openIcon})` }}
          aria-label="Abrir sidebar"
        />
      )}
    </div>
  )
}
