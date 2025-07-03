import { useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { BsArrowRightSquare } from 'react-icons/bs'

import { Button } from '@renderer/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { Columns } from '@renderer/components/Table/interfaces'
import { useInspectionAPI } from '@renderer/services/inspectionService/useInspectionAPI'
import {
  InspectionAPIGetHistoryParams,
  InspectionHistory
} from '@renderer/services/inspectionService/interfaces'

interface InspectionColumn extends InspectionHistory {
  finished_by_name: string
  action: string
}

const typeStyleMap: Record<string, string> = {
  Suspeito: 'text-[#EB4B5B] bg-[#5C0C14]',
  Inflamável: 'text-[#FF9D3B] bg-[#663504]',
  Múltiplo: 'text-[#9D8AFE] bg-[#281C54]',
  Vazio: 'text-[#55A1F2] bg-[#113760]'
}

const statusStyleMap: Record<string, { text: string; style: string }> = {
  FINISHED: { text: 'Finalizado', style: 'text-[#44CB93] bg-[#084C30]' },
  DISCARDED: { text: 'Descartado', style: 'text-[#4E5557] bg-[#869093]' },
  IGNORED: { text: 'Ignorado', style: 'text-[#FABC40] bg-[#644406]' }
}

function renderStatus(status: string) {
  const item = statusStyleMap[status]
  if (!item) return null
  return <span className={`text-xs !font-bold py-1 px-2 rounded ${item.style}`}>{item.text}</span>
}

function renderType(types: string[]) {
  return types.map((type, i) => (
    <span key={i} className={`text-xs ${typeStyleMap[type]} !font-bold py-1 px-2 rounded-md`}>
      {type}
    </span>
  ))
}

function renderLabelWithExtras(items: string[], fallback: string) {
  if (!items.length) return fallback
  const [first, ...rest] = items
  const extras = rest.length > 0 ? `, + ${rest.length}` : ''

  return (
    <span className="flex items-center">
      {first}
      {extras && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{extras}</div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex gap-1 text-xs text-muted-foreground w-fit">
              {rest.map((item, i) => (
                <div key={i} className="flex">
                  {item}
                  {i < rest.length - 1 && ','}
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
    key: 'spectrumName',
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
    key: 'finishedByName',
    header: 'Operador',
    render: (value) => <span>{value}</span>
  },
  {
    key: 'createdAt',
    header: 'Data de Criação',
    render: (value) => new Date(value).toLocaleString()
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

export function useHistory(filterData: InspectionAPIGetHistoryParams) {
  const PAGE_SIZE = 2
  const [date, setDate] = useState<Date | null>(null)
  const [view, setView] = useState<'list' | 'grid'>('list')
  const flexRef = useRef<HTMLDivElement>(null)

  const statusFilter = ['Finalizado', 'Descartado', 'Ignorado']
  const typesFilter = ['Suspeito', 'Inflamável', 'Múltiplo', 'Vazio']

  const { getHistory } = useInspectionAPI()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['history', filterData],
    queryFn: ({ pageParam = 0 }) =>
      getHistory({
        ...Object.fromEntries(
          Object.entries(filterData).filter(
            ([, v]) => v !== null && v !== '' && v !== undefined && v !== false
          )
        ),
        from: '2025-05-21T17:32:28Z',
        until: '2025-08-01T17:32:28Z',
        take: PAGE_SIZE,
        skip: pageParam * PAGE_SIZE
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const length = lastPage?.length ?? 0
      return length < PAGE_SIZE ? undefined : allPages.length
    }
  })

  const inspections =
    data?.pages.flatMap(
      (page) =>
        page?.map((item) => ({
          ...item,
          finished_by_name: item.finishedByName || 'Desconhecido',
          action: ''
        })) || []
    ) || []

  return {
    date,
    setDate,
    view,
    setView,
    inspections,
    columns,
    statusFilter,
    typesFilter,
    flexRef,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }
}
