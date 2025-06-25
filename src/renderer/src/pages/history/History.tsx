import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

import { useState } from 'react'
import { FiSearch, FiDownload, FiChevronDown } from 'react-icons/fi'
import { BsArrowRightSquare, BsFilter } from 'react-icons/bs'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { GrList } from 'react-icons/gr'
import { CalendarIcon } from 'lucide-react'

import HistoricCard from '@renderer/components/HistoricCard'

import { mockInspections } from '@renderer/mocks/InspectionMockData'
import { DataTable } from '@renderer/components/Table'
import { Columns } from '@renderer/components/Table/interfaces'

interface InspectionColumn {
  caseId: string
  plates: { recognition: string }[]
  containers: { recognition: string }[]
  spectrumCode: string
  status: string
  type: string[]
  finished_by_name: string
  isEmpty: boolean
  createdAt: string
  action: { action: string; user: { name: string } }
}

const SearchInput = ({ placeholder }: { placeholder: string }) => (
  <div className="relative w-full max-w-60">
    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
    <Input type="text" placeholder={placeholder} className="pl-10" />
  </div>
)

const History = () => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const filterGroup1 = ['Confirmado', 'Descartado', 'Ignorado']
  const filterGroup2 = ['Suspeito', 'Inflamável', 'Múltiplo', 'Vazio']

  const columns: Columns<InspectionColumn> = [
    {
      key: 'caseId',
      header: 'ID',
      render: (value) => <span className="font-semibold">{value}</span>
    },
    {
      key: 'plates',
      header: 'Placas',
      render: (value) => (
        <span className="flex items-center gap-2">
          {value.length > 0 ? value[0].recognition : 'Sem placa'}
          {value.length > 1 && <span className="text-muted-foreground">+{value.length - 1}</span>}
        </span>
      )
    },
    {
      key: 'containers',
      header: 'Contêineres',
      render: (value) => (
        <span className="flex items-center gap-2">
          {value.length > 0 ? value[0].recognition : 'Sem contêiner'}
          {value.length > 1 && <span className="text-muted-foreground">+{value.length - 1}</span>}
        </span>
      )
    },
    {
      key: 'spectrumCode',
      header: 'Spectrum',
      render: (value) => <span className="font-semibold">{value}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => <span className="capitalize">{value}</span>
    },
    {
      key: 'type',
      header: 'Tipo',
      render: (value) => (
        <span className={`font-semibold ${value ? 'text-red-500' : 'text-green-500'}`}>
          {value ? 'Sim' : 'Não'}
        </span>
      )
    },
    {
      key: 'finished_by_name',
      header: 'Operador',
      render: () => <span>Leonardo</span>
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

  return (
    <Tabs defaultValue="grid" className="w-full h-full flex flex-col pt-2">
      <div className="flex justify-between px-3 gap-4">
        <div className="flex gap-4 w-full">
          <SearchInput placeholder="Digite o CaseID" />
          <SearchInput placeholder="Digite a placa" />
          <SearchInput placeholder="Digite o nº do contêiner" />
          <div className="w-full max-w-60">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full px-3 py-2 flex items-center justify-between gap-2 text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <BsFilter className="h-4 w-4" />
                    <span>Filtros</span>
                  </div>
                  <FiChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-60">
                {filterGroup1.map((label) => (
                  <DropdownMenuCheckboxItem key={label} checked={label === 'Confirmado'}>
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                {filterGroup2.map((label) => (
                  <DropdownMenuCheckboxItem key={label} checked={label === 'Suspeito'}>
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full max-w-60">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
                >
                  <span className="w-full truncate">
                    {date ? date.toLocaleDateString() : 'Selecione um período'}
                  </span>
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          <Button className="w-full max-w-23 font-semibold ml-4">
            <FiSearch className="h-4 w-4" />
            Buscar
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <TabsList className="flex items-center p-0 border-none">
            <TabsTrigger
              value="list"
              className="px-4 py-0 bg-background border border-border-secondary rounded-tl-lg rounded-tr-none rounded-br-none rounded-bl-md dark:data-[state=active]:bg-background dark:data-[state=active]:border-primary cursor-pointer"
            >
              <GrList className="!h-5 !w-5" />
            </TabsTrigger>
            <TabsTrigger
              value="grid"
              className="px-4 py-0 bg-background border border-border-secondary rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none dark:data-[state=active]:bg-background dark:data-[state=active]:border-primary cursor-pointer"
            >
              <HiOutlineViewGrid className="!h-5 !w-5" />
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" className="ml-2">
            Exportar
            <FiDownload className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <TabsContent
        value="grid"
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4"
      >
        {mockInspections.map((inspection, index) => (
          <HistoricCard inspectionData={inspection} key={index} />
        ))}
      </TabsContent>
      <TabsContent value="list" className="flex flex-col gap-4 p-4 text-[#7B8588]">
        <DataTable columns={columns} data={mockInspections} />
      </TabsContent>
    </Tabs>
  )
}

export default History
