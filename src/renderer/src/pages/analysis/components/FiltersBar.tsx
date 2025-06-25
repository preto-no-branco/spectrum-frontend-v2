import { InfoIcon, Redo, RotateCcw, Sidebar, Undo } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '@renderer/lib/utils'
import { useState } from 'react'
import { RiContrastFill } from 'react-icons/ri'
import { BiBrightnessHalf } from 'react-icons/bi'
import {
  SelectCn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const COMPLEX_FILTERS: filter[] = [
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-5 h-5" />,
    function: () => {},
    name: 'teste'
  }
]

export const FiltersBar = () => {
  return (
    <div className="bg-background border-b border-border-secondary w-full px-6 py-2 flex justify-between items-center">
      <div className="flex justify-between items-center w-full gap-14">
        <Sidebar className="hover:cursor-pointer stroke-1 text-text-content-secondary" />
        <div className="flex gap-4 items-center">
          <ImageAdjustments />
          <ColorFilter />
          <LinearMap />
        </div>
        <ComplexFilters filters={COMPLEX_FILTERS} />
        <FiltersControllers
          controllers={{
            handleBackwards: () => {},
            handleForwards: () => {},
            handleUndo: () => {}
          }}
        />
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

const colorFilters = [
  {
    label: 'Escala de cinza',
    icon: <InfoIcon />
  },
  {
    label: 'Velocidade verde',
    icon: <InfoIcon />
  },
  {
    label: 'Velocidade azul',
    icon: <InfoIcon />
  },
  {
    label: 'Fase de onda',
    icon: <InfoIcon />
  },
  {
    label: 'Ocigênio Sub',
    icon: <InfoIcon />
  },
  {
    label: 'Erupção magma',
    icon: <InfoIcon />
  },
  {
    label: 'Descarga elétrica',
    icon: <InfoIcon />
  },
  {
    label: 'Bruto cobre',
    icon: <InfoIcon />
  },
  {
    label: 'Núcleo quente',
    icon: <InfoIcon />
  },
  {
    label: 'Arco-íris Térmico',
    icon: <InfoIcon />
  },
  {
    label: 'Oceano profundo',
    icon: <InfoIcon />
  },
  {
    label: 'Temperatura',
    icon: <InfoIcon />
  },
  {
    label: 'Frio',
    icon: <InfoIcon />
  },
  {
    label: 'Primavera',
    icon: <InfoIcon />
  },
  {
    label: 'Jet',
    icon: <InfoIcon />
  },
  {
    label: 'Clorofila',
    icon: <InfoIcon />
  },
  {
    label: 'Densidade',
    icon: <InfoIcon />
  }
] as const

const ColorFilter = () => {
  return (
    <SelectCn>
      <SelectTrigger size="sm" className="w-[180px] text-content-secondary">
        <SelectValue placeholder="Selecione Filtro" />
      </SelectTrigger>
      <SelectContent>
        {colorFilters.map((filter) => (
          <SelectItem
            className="flex items-center gap-2 text-content-secondary"
            key={filter.label}
            value={filter.label}
          >
            {filter.icon}
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectCn>
  )
}

const LINEAR_MAPS = [
  {
    label: 'Mapa linear'
  },
  {
    label: 'Mapa não-linear'
  },
  {
    label: 'Mapa não-linear 2'
  },
  {
    label: 'Mapa não-linear 3'
  },
  {
    label: 'Mapa não-linear 4'
  }
] as const

const LinearMap = () => {
  return (
    <SelectCn>
      <SelectTrigger size="sm" className="w-[180px] text-content-secondary">
        <SelectValue placeholder="Selecione Mapa" />
      </SelectTrigger>
      <SelectContent>
        {LINEAR_MAPS.map((filter) => (
          <SelectItem className="text-content-secondary" key={filter.label} value={filter.label}>
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectCn>
  )
}

type filter = {
  icon: React.ReactNode
  name: string
  function: () => void
}

const ComplexFilters = ({ filters }: { filters: filter[] }) => {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => {
        return (
          <Tooltip delayDuration={500} key={filter.name}>
            <TooltipTrigger
              className="brightness-150 w-fit text-content-secondary cursor-pointer p-2 rounded hover:bg-background-tertiary transition-colors"
              onClick={filter.function}
            >
              {filter.icon}
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-content-secondary">{filter.name}</p>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}

type filterControllersProps = {
  handleUndo: () => void
  handleBackwards: () => void
  handleForwards: () => void
}

const FiltersControllers = ({ controllers }: { controllers: filterControllersProps }) => {
  const filters: filter[] = [
    {
      icon: <Undo className="w-5" />,
      function: controllers.handleBackwards,
      name: 'Desfazer ultimo filtro'
    },
    {
      icon: <Redo className="w-5" />,
      function: controllers.handleForwards,
      name: 'Avançar'
    },
    {
      icon: <RotateCcw className="w-5" />,
      function: controllers.handleUndo,
      name: 'Resetar filtros'
    }
  ]
  return (
    <div className="flex items-center gap-5 text-content-secondary">
      <ComplexFilters filters={filters} />
    </div>
  )
}
