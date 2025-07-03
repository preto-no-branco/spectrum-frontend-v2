import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import SidebarBody from '@renderer/components/analysis/sidebar/body'
import SidebarHeader from '@renderer/components/analysis/sidebar/header'
import { SidebarHeaderTabs } from '@renderer/components/analysis/sidebar/header/interfaces'
import { Badge } from '@renderer/components/ui/badge'
import { Button } from '@renderer/components/ui/button'
import { Checkbox } from '@renderer/components/ui/checkbox'
import cvReadyPromise from '@techstark/opencv-js'
import { JSX, useEffect, useState } from 'react'
import { BiRadar } from 'react-icons/bi'
import { CgArrowLongRightC } from 'react-icons/cg'
import { FaSquare } from 'react-icons/fa'
import { LuTrash2 } from 'react-icons/lu'
import { MdOpenInNew } from 'react-icons/md'
import { BackgroundScreen } from './components/BackgroundScreen'
import { FiltersBar } from './components/FiltersBar'

export default function Analysis(): JSX.Element {
  const inspectionDetailsControls = useState(false)
  const [isInspectionDetailsOpen] = inspectionDetailsControls

  const [activeTab, setActiveTab] = useState<SidebarHeaderTabs>('details')

  async function main() {
    const cv = await cvReadyPromise
    console.log('OpenCV.js is ready!')
    console.log(cv.getBuildInformation())
  }

  useEffect(() => {
    main().catch((error) => {
      console.error('Error initializing OpenCV:', error)
    })
  }, [])

  return (
    <div className="flex flex-col h-screen max-h-full items-center bg-background">
      <div className="bg-background border-b border-border-secondary w-full px-6 py-2 flex justify-between items-center">
        <Button variant={'neutral'} size={'sm'}>
          <FaSquare className="!w-3 !h-3" /> Parar Operação
        </Button>
        <div className="flex items-center gap-10">
          <div className="px-3 py-2 flex gap-4">
            <Badge variant={'outline'}>Simples</Badge>
            <Checkbox label="Suspeito" />
            <Checkbox label="Inflamável" />
            <Checkbox label="Vazio" />
          </div>
          <div className="flex items-center gap-4">
            <Button
              tooltipText="Descartar"
              className="hover:text-destructive"
              tooltipPosition="bottom"
              variant={'neutral'}
            >
              <LuTrash2 className="!w-4 !h-4" />
            </Button>
            <Button tooltipText="Ignorar" tooltipPosition="bottom" variant={'neutral'}>
              <CgArrowLongRightC className="!w-4 !h-4" />
            </Button>
            <Button size={'sm'}>Finalizar inspeção</Button>
          </div>
        </div>
      </div>
      <FiltersBar inspectionDetailsControls={inspectionDetailsControls} />
      <ResizablePanelGroup direction="horizontal" className="flex w-full h-full">
        <ResizablePanel
          defaultSize={20}
          className="min-w-[200px] "
          hidden={isInspectionDetailsOpen}
        >
          <SidebarHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarBody activeTab={activeTab} className="pb-8" />
        </ResizablePanel>
        <ResizableHandle withHandle hidden={isInspectionDetailsOpen} />
        <ResizablePanel minSize={50}>
          <BackgroundScreen
            description="Inicie um novo escaneamento para visualizar resultados."
            icon={<BiRadar />}
            title="Aguardando dados"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="flex justify-between min-h-8 items-center px-7 w-full py-2 bg-background border-t border-background-secondary">
        <div className="flex items-center gap-2">
          <div className="rounded-full h-2 w-2 bg-primary" />
          <p className="text-xs font-semibold">Terminal online - 02:45:00</p>
        </div>
        <div className="flex">
          <div className="flex items-center gap-0.5 text-xs">
            <MdOpenInNew />
            <p>Status: 0 pendente (s) | 1 suspeito(s) | 1 não suspeito(s)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
