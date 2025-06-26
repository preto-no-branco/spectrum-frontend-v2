import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { filter } from './interfaces'
import { cn } from '@renderer/lib/utils'

export const ComplexFilters = ({
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
