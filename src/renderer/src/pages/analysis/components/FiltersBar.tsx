import { Sidebar } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '@renderer/lib/utils'
import { useState } from 'react'
import { RiContrastFill } from 'react-icons/ri'
import { BiBrightnessHalf } from 'react-icons/bi'

export const FiltersBar = () => {
  return (
    <div className="bg-background border-b border-border-secondary w-full px-6 py-5 flex justify-between items-center">
      <div className="flex gap-14">
        <Sidebar className="hover:cursor-pointer stroke-1 text-text-content-secondary" />
        <ImageAdjustments />
      </div>
    </div>
  )
}

const ImageAdjustments = () => {
  const [open, setOpen] = useState(false)
  const [contrastSliderValue, setContrastSliderValue] = useState<number[]>([50])
  const [expositionSliderValue, setExpositionSliderValue] = useState<number[]>([50])

  const handleOpenChange = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <div className="flex hover:cursor-pointer gap-1 items-center">
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
      <PopoverContent>
        <div className="grid grid-cols-5">
          <div className="flex items-center gap-1 col-span-2">
            <RiContrastFill
              className="text-content-tertiary"
              style={{
                filter: `contrast(${Math.max(0.5, contrastSliderValue[0] / 50)})`,
                transition: 'filter 0.3s ease-in-out'
              }}
            />
            <p className="text-content-secondary">Contraste</p>
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
            <p className="text-content-secondary">Exposição</p>
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
