import AccordionSidebar from '@renderer/components/analysis/sidebar/body/AccordionSidebar'
import InfoSection from '@renderer/components/analysis/sidebar/body/InfoSection'
import EditableTagList from '@renderer/components/analysis/sidebar/body/EditableTagList'
import inspectionSidebar from '@/assets/analysis/inspectionSidebar.png'
import spectrumA from '@/assets/analysis/spectrumA.png'
import infoCircle from '@/assets/analysis/info-circle.png'
import checkCircle from '@/assets/analysis/check-circle-filled.png'
import { useState } from 'react'
import { cn } from '@renderer/lib/utils'

interface SidebarBodyProps {
  activeTab: 'details' | 'movements'
  className?: string
}

export default function SidebarBody({ activeTab, className }: SidebarBodyProps) {
  const [plates, setPlates] = useState<string[]>(['ABC1234', 'XYZ5678'])
  const [containers, setContainers] = useState<string[]>(['12345678912', '98765432100'])

  return (
    <>
      <div className={cn('flex h-full flex-col', className)}>
        <div
          className="p-5 space-y-4 overflow-y-auto h-full"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {activeTab === 'details' && (
            <>
              <AccordionSidebar title="Reconhecimento" time="12/05 16:15:01">
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

              <AccordionSidebar title="Detalhes OCR" time="12/05 16:15:01">
                <InfoSection title="Placa">
                  <EditableTagList values={plates} setValues={setPlates} placeholder="Nova placa" />
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
                    <div className="flex gap-x-4 items-center flex-wrap">
                      <span className="text-sm text-content-secondary">Radiação</span>
                      <span className="text-xs text-content-secondary">12/05 16:15:01</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={checkCircle} className="w-[16px] h-[16px]" />
                      <span className="text-sm text-white">Não detectada.</span>
                    </div>
                    <div className="flex gap-x-4 items-center flex-wrap">
                      <span className="text-sm text-content-secondary">Imagem inferior</span>
                      <span className="text-xs text-content-secondary">12/05 16:15:01</span>
                    </div>
                    <span className="text-sm text-[#B3BDC0]">Informação recebida.</span>
                  </div>
                  <InfoSection
                    title={
                      <div className="flex gap-x-4 items-center flex-wrap">
                        <span>Raio-X</span>
                        <span className="text-xs">12/05 16:15:01</span>
                      </div>
                    }
                    componentProps="flex-col"
                  >
                    <div className="mt-1 flex flex-col gap-2">
                      <span className="text-sm text-content-secondary">Máscara</span>
                      <p className="text-sm text-[#B3BDC0]">Informação recebida.</p>
                    </div>

                    <div className="mt-3 flex flex-col gap-2">
                      <span className="text-sm text-content-secondary">Miniatura</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-[16px] h-[16px] flex items-center justify-center">
                          <img src={infoCircle} className="w-[16px] h-[16px]" />
                        </div>
                        <p className="text-sm text-[#B3BDC0]">Aguardando dados...</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col gap-2">
                      <span className="text-sm text-content-secondary">Alta definição</span>
                      <p className="text-sm text-[#B3BDC0]">Informação recebida.</p>
                    </div>
                  </InfoSection>
                </div>
              </AccordionSidebar>
            </>
          )}

          {activeTab === 'movements' && <div className="flex flex-1">movements</div>}
        </div>
      </div>
    </>
  )
}
