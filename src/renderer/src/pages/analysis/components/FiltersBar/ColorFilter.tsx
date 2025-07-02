import { Select } from '@renderer/components/ui/select'
import { colorFilters } from './constants'

export const ColorFilter = () => {
  return (
    <Select
      // size="sm"
      className="text-content-secondary"
      placeholder="Selecione Filtro"
      showExternalLabel={false}
      options={colorFilters}
      triggerProps={{
        size: 'sm'
      }}
      containerProps={{
        className: 'pb-0 w-[100px] xl:w-[180px] text-content-secondary'
      }}
      itemProps={{
        className: 'flex items-center gap-2 text-content-secondary'
      }}
    />
  )
}
