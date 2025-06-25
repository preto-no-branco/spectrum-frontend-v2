import { useState, useRef, useEffect } from 'react'
import openIcon from '@/assets/analysis/openSidebar.png'
import closeIcon from '@/assets/analysis/closeSidebar.png'
import inspectionSidebar from '@/assets/analysis/inspectionSidebar.png'
import CustomAccordion from '@renderer/components/analysis/sidebar/CustomAccordion'
import spectrumA from '@/assets/analysis/spectrumA.png'
import infoCircle from '@/assets/analysis/info-circle.png'
import checkCircle from '@/assets/analysis/check-circle-filled.png'
import InfoSection from './InfoSection'
import EditableTagList from '../EditableTagList'
import movements from '@/assets/analysis/movements.png'

export default function AnalysisSidebar() {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(400)
  const [showContent, setShowContent] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [plates, setPlates] = useState<string[]>(['ABC1234', 'XYZ5678'])
  const [containers, setContainers] = useState<string[]>(['12345678912', '98765432100'])
  const [activeTab, setActiveTab] = useState<'detalhes' | 'movimentacoes'>('detalhes')
  const sidebarRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isResizing.current) return
      if (sidebarRef.current) {
        const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left
        if (newWidth >= 200 && newWidth <= 600) {
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

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (open) {
      timeout = setTimeout(() => {
        setShowContent(true)
      }, 300)
    } else {
      setShowContent(false)
    }

    return () => clearTimeout(timeout)
  }, [open])

  return (
    <div
      ref={sidebarRef}
      className={`relative overflow-hidden h-full border-r border-[#2D3234] bg-background text-white flex flex-col ${
        resizing ? 'select-none' : 'transition-[width] duration-300 ease-in-out'
      }`}
      style={{ width: open ? `${width}px` : '50px' }}
    >
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
            {showContent && (
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
              </>
            )}

            {showContent ? (
              <button
                onClick={() => setOpen(false)}
                className="w-5 h-5 bg-no-repeat bg-center bg-contain self-center"
                style={{ backgroundImage: `url(${closeIcon})` }}
                aria-label="Fechar sidebar"
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

      {open && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {showContent && (
            <div
              className="p-5 space-y-4 overflow-y-auto h-full"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {activeTab === 'detalhes' && (
                <>
                  <CustomAccordion title="Reconhecimento" time="12/05/24 16:15:01" width={width}>
                    <div className="flex flex-col gap-4 bg-[#171B1C] rounded-sm overflow-hidden p-5">
                      <div className="bg-[#663504] text-[#FF9D3B] text-center rounded-sm w-fit px-2 font-bold">
                        Múltiplo
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <img src={spectrumA} className="w-[16px] h-[16px]" />
                        <span className="pl-1 text-sm font-normal text-[#B3BDC0]">Spectrum A</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <img src={inspectionSidebar} className="w-[16px] h-[16px]" />
                        <span className="pl-1 text-sm font-normal text-[#B3BDC0]">
                          Aguardando dados...
                        </span>
                      </div>
                    </div>
                  </CustomAccordion>

                  <CustomAccordion title="Detalhes OCR">
                    <InfoSection title="Placa">
                      <EditableTagList
                        values={plates}
                        setValues={setPlates}
                        placeholder="Nova placa"
                      />
                    </InfoSection>
                    <div className="h-4"></div>
                    <InfoSection title="Contêiner">
                      <EditableTagList
                        values={containers}
                        setValues={setContainers}
                        placeholder="Novo contêiner"
                      />
                    </InfoSection>
                  </CustomAccordion>

                  <CustomAccordion title="Detecção">
                    <div className="flex flex-col gap-4 bg-[#0F1112] rounded-sm overflow-hidden">
                      <div className="flex flex-col gap-2 bg-[#171B1C] border border-[#2D3234] rounded-md p-4">
                        <span className="text-sm text-[#7B8588]">Radiação</span>
                        <div className="flex items-center gap-2">
                          <img src={checkCircle} className="w-[16px] h-[16px]" />
                          <span className="text-sm text-white">Não detectada.</span>
                        </div>
                        <span className="text-sm text-[#7B8588] mt-3">Imagem inferior</span>
                        <span className="text-sm text-[#B3BDC0]">Informação recebida.</span>
                      </div>
                      <InfoSection title="Raio-X" componentProps="flex-col">
                        <div className="mt-1 flex flex-col gap-2">
                          <span className="text-sm text-[#7B8588]">Máscara</span>
                          <p className="text-sm text-[#B3BDC0]">Informação recebida.</p>
                        </div>

                        <div className="mt-3 flex flex-col gap-2">
                          <span className="text-sm text-[#7B8588]">Miniatura</span>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-[16px] h-[16px] flex items-center justify-center">
                              <img src={infoCircle} className="w-[16px] h-[16px]" />
                            </div>
                            <p className="text-sm text-[#B3BDC0]">Aguardando dados...</p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-col gap-2">
                          <span className="text-sm text-[#7B8588]">Alta definição</span>
                          <p className="text-sm text-[#B3BDC0]">Informação recebida.</p>
                        </div>
                      </InfoSection>
                    </div>
                  </CustomAccordion>
                </>
              )}

              {activeTab === 'movimentacoes' && <div className="flex flex-1" />}
            </div>
          )}
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
