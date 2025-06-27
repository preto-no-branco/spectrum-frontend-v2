import { SelectOption } from '@renderer/core/@types/components/select'
import {
  FoldVertical,
  InfoIcon,
  ScanSearch,
  SquareDashedTopSolid,
  SquareMousePointer
} from 'lucide-react'
import { BiBrightnessHalf } from 'react-icons/bi'
import { filter } from './interfaces'

export const colorFilters: SelectOption[] = [
  {
    label: 'Escala de cinza',
    value: 'grayscale',
    icon: <InfoIcon />
  },
  {
    label: 'Velocidade verde',
    value: 'velocityGreen',
    icon: <InfoIcon />
  },
  {
    label: 'Velocidade azul',
    value: 'velocityBlue',
    icon: <InfoIcon />
  },
  {
    label: 'Fase de onda',
    value: 'wavePhase',
    icon: <InfoIcon />
  },
  {
    label: 'Ocigênio Sub',
    value: 'oxygenSub',
    icon: <InfoIcon />
  },
  {
    label: 'Erupção magma',
    value: 'magmaticEruption',
    icon: <InfoIcon />
  },
  {
    label: 'Descarga elétrica',
    value: 'electricDischarge',
    icon: <InfoIcon />
  },
  {
    label: 'Bruto cobre',
    value: 'rawCopper',
    icon: <InfoIcon />
  },
  {
    label: 'Núcleo quente',
    value: 'hotCore',
    icon: <InfoIcon />
  },
  {
    label: 'Arco-íris Térmico',
    value: 'thermalArc',
    icon: <InfoIcon />
  },
  {
    label: 'Oceano profundo',
    value: 'deepOcean',
    icon: <InfoIcon />
  },
  {
    label: 'Temperatura',
    value: 'temperature',
    icon: <InfoIcon />
  },
  {
    label: 'Frio',
    value: 'cold',
    icon: <InfoIcon />
  },
  {
    label: 'Primavera',
    value: 'spring',
    icon: <InfoIcon />
  },
  {
    label: 'Jet',
    value: 'jet',
    icon: <InfoIcon />
  },
  {
    label: 'Clorofila',
    value: 'chlorophyll',
    icon: <InfoIcon />
  },
  {
    label: 'Densidade',
    value: 'density',
    icon: <InfoIcon />
  }
] as const

export const LINEAR_MAPS: SelectOption[] = [
  {
    label: 'Mapa linear',
    value: 'linear'
  },
  {
    label: 'Mapa não-linear',
    value: 'non-linear'
  },
  {
    label: 'Mapa não-linear 2',
    value: 'non-linear-2'
  },
  {
    label: 'Mapa não-linear 3',
    value: 'non-linear-3'
  },
  {
    label: 'Mapa não-linear 4',
    value: 'non-linear-4'
  }
]

export const COMPLEX_FILTERS: filter[] = [
  {
    icon: <SquareDashedTopSolid className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <SquareMousePointer className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <FoldVertical className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <ScanSearch className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    // Daqui pra baixo falta ajustar
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  },
  {
    icon: <BiBrightnessHalf className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'teste'
  }
]
