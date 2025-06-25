import { Sidebar } from 'lucide-react'
import { ColorFilter } from './ColorFilter'
import { LinearMap } from './LinearMap'
import { ComplexFilters } from './ComplexFilters'
import { FiltersControllers } from './FilterControllers'
import { ImageAdjustments } from './ImageAdjustments'
import { COMPLEX_FILTERS } from './constants'

export const FiltersBar = () => {
  return (
    <div className="bg-background border-b border-border-secondary w-full px-6 py-2 flex justify-between items-center">
      <div className="flex justify-between items-center w-full gap-4">
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
