import {
  SelectCn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { colorFilters } from './constants'

export const ColorFilter = () => {
  return (
    <SelectCn>
      <SelectTrigger size="sm" className="w-[100px] xl:w-[180px] text-content-secondary">
        <SelectValue placeholder="Selecione Filtro" />
      </SelectTrigger>
      <SelectContent>
        {colorFilters.map((filter) => (
          <SelectItem
            className="flex items-center gap-2 text-content-secondary"
            key={filter.label}
            value={filter.label}
          >
            {filter.icon}
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectCn>
  )
}
