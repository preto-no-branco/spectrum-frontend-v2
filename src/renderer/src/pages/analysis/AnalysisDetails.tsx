import SidebarBody from '@renderer/components/analysis/sidebar/body'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@renderer/components/ui/resizable'
import { DetailsHeader } from './components/DetailsHeader.tsx'
import inspectionSidebar from '@/assets/analysis/inspectionSidebar.png'
import movements from '@/assets/analysis/movements.png'
import { Camera } from 'lucide-react'
import { DetailsPhotosCarrousel } from './components/DetailsPhotosCarrousel/index.js'

export const AnalysisDetails = () => {
  return (
    <div className="flex flex-col h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex border-t border-border-secondary w-full h-full"
      >
        <ResizablePanel className="border-r/20 border-border-secondary h-full min-w-[200px]">
          <div className="flex flex-col bg-background h-full w-full">
            <DetailsHeader icon={inspectionSidebar} title="Detalhes da inspeção" />
            <SidebarBody activeTab={'details'} className="pb-8" />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className="h-full ">
          <div className="bg-background h-full w-full">
            <DetailsHeader
              icon={<Camera className="w-5 h-5 text-content-secondary" />}
              title="Caputuras"
            />
            <DetailsPhotosCarrousel />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="border-l/20 border-border-secondary h-full">
          <div className="bg-background h-full w-full">
            <DetailsHeader icon={movements} title="Movimentações" />
            <SidebarBody activeTab={'movements'} className="pb-8" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
