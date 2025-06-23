import { Sidebar } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '@renderer/lib/utils'
import { useState } from 'react'

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

  const handleOpenChange = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <div className="flex gap-1 items-center">
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
        <div className="flex gap-10">
          <p>Contraste</p>{' '}
          <Slider
            value={contrastSliderValue}
            onValueChange={setContrastSliderValue}
            max={100}
            min={1}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
