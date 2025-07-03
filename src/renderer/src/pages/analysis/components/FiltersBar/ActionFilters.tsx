import { Tooltip } from '@renderer/components/ui/tooltip'
import { cn } from '@renderer/lib/utils'
import { filter } from './interfaces'

export const ActionFilters = ({
  filters,
  className
}: {
  filters: filter[]
  className?: string
}) => {
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
              onClick: () => filter.function()
            }}
          >
            {filter.icon}
          </Tooltip>
        )
      })}
    </div>
  )
}
