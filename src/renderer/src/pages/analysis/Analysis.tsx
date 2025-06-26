import { JSX, useEffect, useRef, useState } from 'react'
import cvReadyPromise from '@techstark/opencv-js'
import { Button } from '@renderer/components/ui/button'
import { FaSquare } from 'react-icons/fa'
import { CgArrowLongRightC } from 'react-icons/cg'
import { LuTrash2 } from 'react-icons/lu'
import { Badge } from '@renderer/components/ui/badge'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { FiltersBar } from './components/FiltersBar'
import { BiRadar } from 'react-icons/bi'
import { BackgroundScreen } from './components/BackgroundScreen'
import SidebarBody from '@renderer/components/analysis/sidebar/body'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default function Analysis(): JSX.Element {
  const inspectionDetailsControls = useState(false)

  const [isInspectionDetailsOpen] = inspectionDetailsControls

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

  const isResizing = useRef<boolean>(false)

  const setResizing = (value: boolean) => {
    isResizing.current = value
  }

  return (
    <div className="flex flex-col h-screen max-h-full items-center bg-background">
      <div className="bg-background border-b border-border-secondary w-full px-6 py-2 flex justify-between items-center">
        <Button variant={'neutral'} size={'sm'}>
          <FaSquare className="!w-3 !h-3" /> Parar Operação
        </Button>
        <div className="flex items-center gap-10">
          <div className="px-3 py-2 flex gap-4">
            <Badge variant={'blue'}>Simples</Badge>
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
        <ResizablePanel defaultSize={15} className="min-w-[200px]" hidden={isInspectionDetailsOpen}>
          <SidebarBody activeTab={'details'} isResizing={isResizing} setResizing={setResizing} />
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
    </div>
  )
}
