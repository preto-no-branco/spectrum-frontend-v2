import { useState, useRef, useEffect } from 'react'
import openIcon from '@/assets/analysis/openSidebar.png'
import closeIcon from '@/assets/analysis/closeSidebar.png'
import inspectionSidebar from '@/assets/analysis/inspectionSidebar.png'
import CustomAccordion from '@/components/analysis/CustomAccordion'

export default function AnalysisSidebar() {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(250)
  const [resizing, setResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isResizing.current) return
      if (sidebarRef.current) {
        const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left
        if (newWidth >= 150 && newWidth <= 600) {
          setWidth(newWidth)
        }
      }
    }

    function onMouseUp() {
      isResizing.current = false
      setResizing(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div
      ref={sidebarRef}
      className={`relative h-screen border-r border-[#2D3234] bg-[#0F1112] text-white flex flex-col ${
        resizing ? 'select-none' : 'transition-[width] duration-300 ease-in-out'
      }`}
      style={{ width: open ? `${width}px` : '50px' }}
    >
      <div
        className={`h-[50px] px-2 border-b border-[#2D3234] flex items-center ${
          open ? 'justify-between' : 'justify-center'
        }`}
      >
        {open ? (
          <>
            <img src={inspectionSidebar} alt="Inspection Sidebar" className="w-5 h-5" />
            <span className="text-[15px] font-normal">Detalhes da inspeção</span>
            <button
              onClick={() => setOpen(false)}
              className="w-5 h-5 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: `url(${closeIcon})` }}
              aria-label="Fechar sidebar"
            />
          </>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="w-5 h-5 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${openIcon})` }}
            aria-label="Abrir sidebar"
          />
        )}
      </div>

      {open && (
        <div className="flex-grow p-5 overflow-y-auto space-y-4">
          <CustomAccordion title="Reconhecimento">
            <div className="flex flex-col gap-1 bg-[#171B1C] rounded-sm overflow-hidden p-5">
              <div className="font-medium bg-[#663504] text-[#FF9D3B] text-center rounded-sm w-fit px-1">
                Múltiplo
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Spectrum A</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-green-500">👍</span>
                <span className="text-sm text-muted-foreground">Aguardando dados...</span>
              </div>
            </div>
          </CustomAccordion>

          <CustomAccordion title="Detalhes OCR">
            <p className="text-sm text-muted-foreground">
              Histórico de alterações ou observações feitas anteriormente.
            </p>
          </CustomAccordion>

          <CustomAccordion title="Detecção">
            <p className="text-sm text-muted-foreground">
              Comentários da equipe técnica, avaliadores, etc.
            </p>
          </CustomAccordion>
        </div>
      )}

      {open && (
        <div
          onMouseDown={() => {
            isResizing.current = true
            setResizing(true)
          }}
          className="absolute top-0 right-0 h-full w-[5px] cursor-ew-resize z-20"
        />
      )}
    </div>
  )
}
