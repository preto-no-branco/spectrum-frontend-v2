import closeIcon from '@/assets/analysis/closeSidebar.png'
import openIcon from '@/assets/analysis/openSidebar.png'
import { ComplexFilters } from './ComplexFilters'
import { FiltersControllers } from './FilterControllers'
import { ImageAdjustments } from './ImageAdjustments'
import { LinearMap } from './LinearMap'
import { COMPLEX_FILTERS } from './constants'
import { FiltersBarProps } from './interfaces'
import { ColorFilter } from './ColorFilter'
import { useFiltersBar } from './useFiltersBar'

export const FiltersBar = ({ inspectionDetailsControls }: FiltersBarProps) => {
  const { resetEffects, handleToggleInspectionDetails, isOpen, undo } =
    useFiltersBar(inspectionDetailsControls)
  return (
    <div className="bg-background border-b border-border-secondary w-full px-6 py-2 flex justify-between items-center">
      <div className="flex justify-between items-center w-full gap-4">
        {isOpen ? (
          <button
            className="w-5 hover:cursor-pointer h-5 bg-no-repeat bg-center bg-contain rotate-180"
            onClick={handleToggleInspectionDetails}
            style={{ backgroundImage: `url(${openIcon})` }}
            aria-label="Abrir sidebar"
          />
        ) : (
          <button
            className="w-5 hover:cursor-pointer h-5 bg-no-repeat bg-center bg-contain rotate-180"
            onClick={handleToggleInspectionDetails}
            style={{ backgroundImage: `url(${closeIcon})` }}
            aria-label="Abrir sidebar"
          />
        )}
        <div className="flex gap-4 items-center">
          <ImageAdjustments />
          <ColorFilter />
          <LinearMap />
        </div>
        <ComplexFilters filters={COMPLEX_FILTERS} />
        <FiltersControllers
          controllers={{
            handleBackwards: undo,
            handleForwards: () => {},
            handleReset: resetEffects
          }}
        />
      </div>
    </div>
  )
}
