import { Tooltip } from '@renderer/components/ui/tooltip'
import { cn } from '@renderer/lib/utils'
import { filter } from '../interfaces'
import { useComplexFilters } from './useComplexFilters'
import { EffectType } from '@renderer/Image-processing/types/effects.types'

export const ComplexFilters = ({
  filters,
  className
}: {
  filters: filter<EffectType>[]
  className?: string
}) => {
  const { addToEffectStack } = useComplexFilters()

  return (
    <div className={cn('flex gap-2', className)}>
      {filters.map((filter) => {
        return (
          <Tooltip
            delayDuration={500}
            key={filter.name}
            label={filter.name}
            labelProps={{
              side: 'bottom',
              className: 'text-content-secondary'
            }}
            triggerProps={{
              className:
                'brightness-150 w-fit text-content-secondary cursor-pointer rounded transition-colors',
              onClick: () => addToEffectStack(filter.value)
            }}
          >
            {filter.icon}
          </Tooltip>
        )
      })}
    </div>
  )
}
