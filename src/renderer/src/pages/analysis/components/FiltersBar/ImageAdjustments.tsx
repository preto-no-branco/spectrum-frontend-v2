import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Slider } from '@renderer/components/ui/slider'
import { cn } from '@renderer/lib/utils'
import { useState } from 'react'
import { BiBrightnessHalf } from 'react-icons/bi'
import { FiChevronDown } from 'react-icons/fi'
import { RiContrastFill } from 'react-icons/ri'

export const ImageAdjustments = () => {
  const [open, setOpen] = useState(false)
  const [contrastSliderValue, setContrastSliderValue] = useState<number[]>([50])
  const [expositionSliderValue, setExpositionSliderValue] = useState<number[]>([50])

  const handleOpenChange = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <div className="flex text-content-secondary hover:cursor-pointer gap-1 text-sm items-center">
          Ajustes de Imagem{' '}
          <FiChevronDown
            className={cn(
              'transition-transform duration-200 text-muted-foreground',
              open ? 'rotate-180' : 'rotate-0'
            )}
            size={16}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={20} className="flex flex-col gap-3">
        <div className="grid grid-cols-5">
          <div className="flex items-center gap-1 col-span-2">
            <RiContrastFill
              className="text-content-tertiary"
              style={{
                filter: `contrast(${Math.max(0.5, contrastSliderValue[0] / 50)})`,
                transition: 'filter 0.3s ease-in-out'
              }}
            />
            <p className="text-content-secondary text-sm">Contraste</p>
          </div>
          <div className="flex items-center gap-2 col-span-3">
            <Slider
              value={contrastSliderValue}
              className="hover:cursor-grab"
              onValueChange={setContrastSliderValue}
              max={100}
              min={1}
            />
            <p className="text-xs text-content-primary">{contrastSliderValue}</p>
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="flex items-center gap-1 col-span-2">
            <BiBrightnessHalf
              style={{
                filter: `brightness(${Math.max(0.5, expositionSliderValue[0] / 50)})`, // Ensure a minimum brightness of 0.5
                transition: 'filter 0.3s ease-in-out' // Smooth transition for brightness changes
              }}
              className="text-content-tertiary"
            />
            <p className="text-content-secondary text-sm">Exposição</p>
          </div>
          <div className="flex items-center gap-2 col-span-3">
            <Slider
              value={expositionSliderValue}
              className="hover:cursor-grab"
              onValueChange={setExpositionSliderValue}
              max={100}
              min={1}
            />
            <p className="text-xs text-content-primary">{expositionSliderValue}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
