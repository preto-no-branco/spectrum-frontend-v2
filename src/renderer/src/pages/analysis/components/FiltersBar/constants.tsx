import {
  Eraser,
  FoldVertical,
  InfoIcon,
  ScanSearch,
  SquareDashedTopSolid,
  SquareMousePointer
} from 'lucide-react'
import { BiBrightnessHalf } from 'react-icons/bi'
import { filter } from './interfaces'

export const colorFilters = [
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

export const LINEAR_MAPS = [
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
