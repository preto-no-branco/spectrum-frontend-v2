import { JSX, useEffect } from 'react'
import cvReadyPromise from '@techstark/opencv-js'
import { Button } from '@renderer/components/ui/button'
import { FaSquare } from 'react-icons/fa'
import { CgArrowLongRightC } from 'react-icons/cg'
import { LuTrash2 } from 'react-icons/lu'
import { Badge } from '@renderer/components/ui/badge'
import { Checkbox } from '@renderer/components/ui/checkbox'

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
    <div className="flex items-center justify-center bg-background">
      <div className="bg-background border-b border-border-secondary w-full px-6 py-5 flex justify-between items-center">
        <Button variant={'neutral'}>
          <FaSquare className="!w-3 !h-3" /> Parar Operação
        </Button>
        <div className="flex items-center gap-10">
          <div className="border border-border-secondary rounded-md p-3 flex gap-4">
            <Badge variant={'blue'}>Simples</Badge>
            <Checkbox label="Suspeito" />
            <Checkbox label="Inflamável" />
            <Checkbox label="Vazio" />
          </div>
          <div className="flex items-center gap-4">
            <Button tooltipText="Limpar efeitos" tooltipPosition="bottom" variant={'neutral'}>
              <LuTrash2 className="!w-4 !h-4" />
            </Button>
            <Button tooltipText="Desfazer efeito" tooltipPosition="bottom" variant={'neutral'}>
              <CgArrowLongRightC className="!w-4 !h-4" />
            </Button>
            <Button>Finalizar inspeção</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
