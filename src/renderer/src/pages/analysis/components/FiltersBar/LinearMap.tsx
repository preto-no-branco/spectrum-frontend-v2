import {
  SelectCn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { LINEAR_MAPS } from './constants'

export const LinearMap = () => {
  return (
    <SelectCn>
      <SelectTrigger size="sm" className="w-[120px] xl:w-[180px] text-content-secondary">
        <SelectValue placeholder="Selecione Mapa" />
      </SelectTrigger>
      <SelectContent>
        {LINEAR_MAPS.map((filter) => (
          <SelectItem className="text-content-secondary" key={filter.label} value={filter.label}>
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectCn>
  )
}
