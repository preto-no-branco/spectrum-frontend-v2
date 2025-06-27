import { Redo, RotateCcw, Undo } from 'lucide-react'
import { filter, filterControllersProps } from './interfaces'
import { ComplexFilters } from './ComplexFilters'

export const FiltersControllers = ({ controllers }: { controllers: filterControllersProps }) => {
  const filters: filter[] = [
    {
      icon: <Undo className="w-4 h-4 xl:w-5 xl:h-5" />,
      function: controllers.handleBackwards,
      name: 'Desfazer ultimo filtro'
    },
    {
      icon: <Redo className="w-4 h-4 xl:w-5 xl:h-5" />,
      function: controllers.handleForwards,
      name: 'Avançar'
    },
    {
      icon: <RotateCcw className="w-4 h-4 xl:w-5 xl:h-5" />,
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
