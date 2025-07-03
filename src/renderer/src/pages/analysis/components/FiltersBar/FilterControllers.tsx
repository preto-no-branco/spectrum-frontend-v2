import { RotateCcw, Undo } from 'lucide-react'
import { filter, filterControllersProps } from './interfaces'
import { ActionFilters } from './ActionFilters'

export const FiltersControllers = ({ controllers }: { controllers: filterControllersProps }) => {
  const filters: filter[] = [
    {
      icon: <Undo className="w-4 h-4 xl:w-5 xl:h-5" />,
      function: controllers.handleBackwards,
      name: 'Desfazer ultimo filtro',
      value: 'undo'
    },
    {
      icon: <RotateCcw className="w-4 h-4 xl:w-5 xl:h-5" />,
      function: controllers.handleReset,
      name: 'Resetar filtros',
      value: 'reset'
    }
  ]
  return (
    <div className="flex items-center gap-5 text-content-secondary">
      <ActionFilters filters={filters} />
    </div>
  )
}
