import AccordionSidebar from '@renderer/components/analysis/sidebar/body/AccordionSidebar'
import InfoSection from '@renderer/components/analysis/sidebar/body/InfoSection'
import EditableTagList from '@renderer/components/analysis/sidebar/body/EditableTagList'
import inspectionSidebar from '@/assets/analysis/inspectionSidebar.png'
import spectrumA from '@/assets/analysis/spectrumA.png'
import infoCircle from '@/assets/analysis/info-circle.png'
import checkCircle from '@/assets/analysis/check-circle-filled.png'
import { useState } from 'react'

interface SidebarBodyProps {
  activeTab: 'detalhes' | 'movimentacoes'
  showContent: boolean
  width: number
  isResizing: React.RefObject<boolean>
  setResizing: (resizing: boolean) => void
}

export default function SidebarBody({
  activeTab,
  showContent,
  width,
  isResizing,
  setResizing
}: SidebarBodyProps) {
  const [plates, setPlates] = useState<string[]>(['ABC1234', 'XYZ5678'])
  const [containers, setContainers] = useState<string[]>(['12345678912', '98765432100'])
  return (
    <>
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
                <AccordionSidebar title="Reconhecimento" time="12/05/24 16:15:01" width={width}>
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
                </AccordionSidebar>

                <AccordionSidebar title="Detalhes OCR">
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
                </AccordionSidebar>

                <AccordionSidebar title="Detecção">
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
                </AccordionSidebar>
              </>
            )}

            {activeTab === 'movimentacoes' && <div className="flex flex-1" />}
          </div>
        )}
      </div>
      <div
        onMouseDown={() => {
          isResizing.current = true
          setResizing(true)
        }}
        className="absolute top-0 right-0 h-full w-[5px] cursor-ew-resize z-20"
      />
    </>
  )
}
