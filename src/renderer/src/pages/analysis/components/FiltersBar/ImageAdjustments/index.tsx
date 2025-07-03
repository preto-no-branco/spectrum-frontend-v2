import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Slider } from '@renderer/components/ui/slider'
import { cn } from '@renderer/lib/utils'
import { useState } from 'react'
import { BiBrightnessHalf } from 'react-icons/bi'
import { FiChevronDown } from 'react-icons/fi'
import { RiContrastFill } from 'react-icons/ri'
import { useImageAdjustments } from './useImageAdjustments'

export const ImageAdjustments = () => {
  const { contrast, exposure, updateContrast, updateExposure } = useImageAdjustments()
  const [open, setOpen] = useState(false)

  const handleOpenChange = () => setOpen((prev) => !prev)

  // Helpers para mapear valores 0-100 <-> 0.0-2.0
  const sliderToReal = (value: number) => value / 50
  const realToSlider = (value: number) => value * 50

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <div className="flex text-content-secondary hover:cursor-pointer gap-1 text-xs xl:text-sm items-center">
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
        {/* Contraste */}
        <div className="grid grid-cols-5">
          <div className="flex items-center gap-1 col-span-2">
            <RiContrastFill
              className="text-content-tertiary"
              style={{
                filter: `contrast(${contrast})`,
                transition: 'filter 0.3s ease-in-out'
              }}
            />
            <p className="text-content-secondary text-sm">Contraste</p>
          </div>
          <div className="flex items-center gap-2 col-span-3">
            <Slider
              value={[realToSlider(contrast)]}
              className="hover:cursor-grab"
              onValueChange={([value]) => {
                updateContrast(sliderToReal(value))
              }}
              max={100}
              min={0}
            />
            <p className="text-xs text-content-primary">{contrast.toFixed(2)}</p>
          </div>
        </div>

        {/* Exposição */}
        <div className="grid grid-cols-5">
          <div className="flex items-center gap-1 col-span-2">
            <BiBrightnessHalf
              style={{
                filter: `brightness(${exposure})`,
                transition: 'filter 0.3s ease-in-out'
              }}
              className="text-content-tertiary"
            />
            <p className="text-content-secondary text-sm">Exposição</p>
          </div>
          <div className="flex items-center gap-2 col-span-3">
            <Slider
              value={[realToSlider(exposure)]}
              className="hover:cursor-grab"
              onValueChange={([value]) => {
                updateExposure(sliderToReal(value))
              }}
              max={100}
              min={0}
            />
            <p className="text-xs text-content-primary">{exposure.toFixed(2)}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
