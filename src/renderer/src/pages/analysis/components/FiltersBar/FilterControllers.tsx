export const FiltersControllers = ({ controllers }: { controllers: filterControllersProps }) => {
  const filters: filter[] = [
    {
      icon: <Undo className="w-5" />,
      function: controllers.handleBackwards,
      name: 'Desfazer ultimo filtro'
    },
    {
      icon: <Redo className="w-5" />,
      function: controllers.handleForwards,
      name: 'Avançar'
    },
    {
      icon: <RotateCcw className="w-5" />,
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
