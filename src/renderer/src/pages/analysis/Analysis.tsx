import { JSX, useEffect } from 'react'
import cvReadyPromise from '@techstark/opencv-js'
import { Button } from '@renderer/components/ui/button'
import { FaSquare } from 'react-icons/fa'
import { CgArrowLongRightC } from 'react-icons/cg'
import { LuTrash2 } from 'react-icons/lu'
import { Badge } from '@renderer/components/ui/badge'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { FiltersBar } from './components/FiltersBar'
import { PausedOperation } from './components/PausedOperation'

export default function Analysis(): JSX.Element {
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
    <div className="flex flex-col h-screen max-h-full items-center justify-center bg-background">
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
      <FiltersBar />
      <PausedOperation />
    </div>
  )
}
