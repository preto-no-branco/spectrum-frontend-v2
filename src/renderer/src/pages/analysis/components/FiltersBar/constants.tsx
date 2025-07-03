import { SelectOption } from '@renderer/core/@types/components/select'
import { FoldVertical, ScanSearch, SquareDashedTopSolid, SquareMousePointer } from 'lucide-react'
import { filter } from './interfaces'
import {
  ColorMapType,
  EffectType,
  NonLinearMapType
} from '@renderer/Image-processing/types/effects.types'
import {
  IconEaseInOutControlPoints,
  IconEraser,
  IconNewSection,
  IconRipple
} from '@tabler/icons-react'
import GradientIcon from '@renderer/components/icons/GradientIcon'
export const colorFilters: SelectOption<ColorMapType>[] = [
  {
    label: 'Escala de cinza',
    value: 'gray',
    icon: <GradientIcon colorGradient="linear-gradient(270deg, #D9D9D9 0%, #737373 100%)" />
  },
  {
    label: 'Velocidade verde',
    value: 'velocity-green',
    icon: <GradientIcon colorGradient="linear-gradient(270deg, #003D19 0%, #00FF47 100%)" />
  },
  {
    label: 'Velocidade azul',
    value: 'velocity-blue',
    icon: <GradientIcon colorGradient="linear-gradient(270deg, #000F5C 0%, #00D4FF 100%)" />
  },
  {
    label: 'Fase de onda',
    value: 'phase',
    icon: (
      <GradientIcon colorGradient="linear-gradient(270deg, #2A004F 0%, #00F0FF 50%, #4F0042 100%)" />
    )
  },
  {
    label: 'Ocigênio Sub',
    value: 'oxygen',
    icon: (
      <GradientIcon colorGradient="linear-gradient(270deg, #000814 0%, #1A759F 50%, #90E0EF 100%)" />
    )
  },
  {
    label: 'Erupção magma',
    value: 'magma',
    icon: (
      <GradientIcon colorGradient="linear-gradient(270deg, #000000 0%, #6A040F 50%, #F48C06 100%)" />
    )
  },
  {
    label: 'Descarga elétrica',
    value: 'electric',
    icon: (
      <GradientIcon colorGradient="linear-gradient(270deg, #F9C74F 0%, #F3722C 50%, #F94144 100%)" />
    )
  },
  {
    label: 'Bruto cobre',
    value: 'copper',
    icon: (
      <GradientIcon colorGradient="linear-gradient(270deg, #370617 0%, #9D0208 50%, #FFBA08 100%)" />
    )
  },
  {
    label: 'Núcleo quente',
    value: 'hot',
    icon: (
      <GradientIcon colorGradient="linear-gradient(270deg, #800000 0%, #FF0000 50%, #FFFF00 100%)" />
    )
  },
  {
    label: 'Arco-íris Térmico',
    value: 'rainbow',
    icon: (
      <GradientIcon colorGradient="linear-gradient(270deg, #FF0000 0%, #FFD700 25%, #00FF00 50%, #0066FF 75%, #EE82EE 100%)" />
    )
  },
  {
    label: 'Oceano profundo',
    value: 'freesurface-blue',
    icon: (
      <GradientIcon colorGradient="linear-gradient(270deg, #000C66 0%, #7EC8E3 50%, #FFFFFF 100%)" />
    )
  }
] as const

export const LINEAR_MAPS: SelectOption<NonLinearMapType>[] = [
  {
    label: 'Mapa linear',
    value: 'linearMap'
  },
  {
    label: 'Mapa não-linear',
    value: 'sigmoidMap1'
  },
  {
    label: 'Mapa não-linear 2',
    value: 'sigmoidMap2'
  },
  {
    label: 'Mapa não-linear 3',
    value: 'gammaMap1'
  },
  {
    label: 'Mapa não-linear 4',
    value: 'gammaMap2'
  }
]

// "emboss" | "denseObject" | "edgeDetection" | "sharpen" | "smooth" | "noiseReduction" | "invert" | "edgeEnhancement" | "logarithmEnhancement" | "none"
export const COMPLEX_FILTERS: filter<EffectType>[] = [
  {
    icon: <SquareDashedTopSolid className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'Nitidez de borda',
    value: 'sharpen'
  },
  {
    icon: <SquareMousePointer className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'Detecção de borda',
    value: 'edgeDetection'
  },
  {
    icon: <FoldVertical className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'Realce da borda',
    value: 'edgeEnhancement'
  },
  {
    icon: <ScanSearch className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'Detalhe da região densa',
    value: 'logarithmEnhancement'
  },
  {
    icon: <IconNewSection className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'Objeto denso',
    value: 'denseObject'
  },
  {
    icon: <IconEraser className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'Limpeza de ruído',
    value: 'noiseReduction'
  },
  {
    icon: <IconEaseInOutControlPoints className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'Suavizar',
    value: 'smooth'
  },
  {
    icon: <IconRipple className="w-4 h-4 xl:w-5 xl:h-5" />,
    function: () => {},
    name: 'Relevo',
    value: 'emboss'
  }
]
