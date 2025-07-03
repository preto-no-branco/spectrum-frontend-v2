import { Select } from '@renderer/components/ui/select'
import { LINEAR_MAPS } from '../constants'
import { useLinearMap } from './useLinearMap'

export const LinearMap = () => {
  const { linearMap, handleChange } = useLinearMap()
  return (
    <Select
      value={linearMap}
      onValueChange={handleChange}
      className="text-content-secondary"
      placeholder="Selecione Mapa"
      showExternalLabel={false}
      options={LINEAR_MAPS}
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
