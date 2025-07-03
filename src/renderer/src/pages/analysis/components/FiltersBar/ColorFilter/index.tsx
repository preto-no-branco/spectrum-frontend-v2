import React from 'react'
import { Select } from '@renderer/components/ui/select'
import { colorFilters } from '../constants'
import { useColorFilter } from './useColorFilter'

export const ColorFilter: React.FC = () => {
  const { colorMap, handleChange } = useColorFilter()
  return (
    <Select
      value={colorMap}
      onValueChange={handleChange}
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
