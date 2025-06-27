import { Columns } from '@renderer/components/Table/interfaces'
import { Button } from '@renderer/components/ui/button'
import { useState } from 'react'
import { BsArrowRightSquare } from 'react-icons/bs'
import { mockInspections } from '@renderer/mocks/InspectionMockData'
import { Inspection } from '@renderer/services/inspectionService/interfaces'
import { Plate } from '@renderer/services/inspectionService/childsTypes/interfaces'
import { Container } from '@renderer/services/inspectionService/childsTypes/interfaces'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'

interface InspectionColumn extends Inspection {
  finished_by_name: string
  action: { action: string; user: { name: string } }
}

export function useHistory() {
  const [date, setDate] = useState<Date | null>(null)
  const [view, setView] = useState<'list' | 'grid'>('list')

  const statusFilter = ['Finalizado', 'Descartado', 'Ignorado']
  const typesFilter = ['Suspeito', 'Inflamável', 'Múltiplo', 'Vazio']

  const typeStyleMap: Record<string, string> = {
    Suspeito: 'text-[#EB4B5B] bg-[#5C0C14]',
    Inflamável: 'text-[#FF9D3B] bg-[#663504]',
    Múltiplo: 'text-[#9D8AFE] bg-[#281C54]',
    Vazio: 'text-[#55A1F2] bg-[#113760]'
  }

  function renderStatus(value: string) {
    const map: Record<string, { text: string; style: string }> = {
      FINISHED: { text: 'Finalizado', style: 'text-[#44CB93] bg-[#084C30]' },
      DISCARDED: { text: 'Descartado', style: 'text-[#4E5557] bg-[#869093]' },
      IGNORED: { text: 'Ignorado', style: 'text-[#FABC40] bg-[#644406]' }
    }
    const item = map[value]
    if (!item) return ''
    return <span className={`text-xs !font-bold py-1 px-2 rounded ${item.style}`}>{item.text}</span>
  }

  function renderType(types: string[]) {
    return types.map((type, i) => (
      <span key={i} className={`text-xs ${typeStyleMap[type]} !font-bold py-1 px-2 rounded-md`}>
        {type}
      </span>
    ))
  }

  const renderLabelWithExtras = (items: Plate[] | Container[], fallback: string) => {
    if (!items.length) return fallback
    const base = items[0]?.recognition ?? fallback
    const extras = items.length > 1 ? `, + ${items.length - 1}` : ''
    return (
      <span className="flex items-center">
        {base}
        {extras && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{extras}</div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex gap-1 text-xs text-muted-foreground w-fit">
                {items.map((item, index) => (
                  <div key={index} className="flex">
                    {item.recognition}
                    {index < items.length - 1 && ','}
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </span>
    )
  }

  const columns: Columns<InspectionColumn> = [
    {
      key: 'caseId',
      header: 'ID',
      render: (value) => <span className="font-semibold">{value}</span>
    },
    {
      key: 'plates',
      header: 'Placas',
      render: (value) => renderLabelWithExtras(value, 'Sem placa')
    },
    {
      key: 'containers',
      header: 'Contêineres',
      render: (value) => renderLabelWithExtras(value, 'Sem contêiner')
    },
    {
      key: 'spectrumCode',
      header: 'Spectrum',
      render: (value) => <span className="font-semibold">{value}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: renderStatus
    },
    {
      id: 'type',
      header: 'Tipo',
      render: (_, row) => {
        const types: string[] = []
        if (row.isSuspect) types.push('Suspeito')
        if (row.isFlammable) types.push('Inflamável')
        if (row.isMultiple) types.push('Múltiplo')
        if (row.isEmpty) types.push('Vazio')
        return <div className="flex gap-2 whitespace-nowrap">{renderType(types)}</div>
      }
    },
    {
      key: 'finished_by_name',
      header: 'Operador',
      render: (value) => <span>{value}</span>
    },
    {
      key: 'createdAt',
      header: 'Data de Criação',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'action',
      header: 'Ação',
      render: () => (
        <Button variant="link" className="hover:text-content-secondary text-content-tertiary">
          <BsArrowRightSquare className="h-4 w-4" />
        </Button>
      )
    }
  ]

  const formatedMockInspections = mockInspections as InspectionColumn[]

  return {
    date,
    setDate,
    view,
    setView,
    formatedMockInspections,
    columns,
    statusFilter,
    typesFilter
  }
}
