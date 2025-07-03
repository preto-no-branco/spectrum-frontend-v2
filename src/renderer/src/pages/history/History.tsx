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

import { useEffect, useState } from 'react'
import { FiSearch, FiDownload, FiChevronDown } from 'react-icons/fi'
import { BsFilter } from 'react-icons/bs'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { GrList } from 'react-icons/gr'
import { CalendarIcon } from 'lucide-react'

import HistoricCard from '@renderer/components/HistoricCard'
import { DataTable } from '@renderer/components/Table'
import { useHistory } from './useHistory'
import { useInView } from 'react-intersection-observer'

const SearchInput = ({ placeholder }: { placeholder: string }) => (
  <div className="relative w-full max-w-60">
    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
    <Input type="text" placeholder={placeholder} className="pl-10" />
  </div>
)

const FilterDropdown = ({
  statusFilter,
  typesFilter
}: {
  statusFilter: string[]
  typesFilter: string[]
}) => (
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
      {statusFilter.map((label) => (
        <DropdownMenuCheckboxItem key={label} checked={label === 'Confirmado'}>
          {label}
        </DropdownMenuCheckboxItem>
      ))}
      <DropdownMenuSeparator />
      {typesFilter.map((label) => (
        <DropdownMenuCheckboxItem key={label} checked={label === 'Suspeito'}>
          {label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

const DatePickerPopover = ({
  date,
  setDate,
  open,
  setOpen
}: {
  date: Date | undefined
  setDate: (d?: Date) => void
  open: boolean
  setOpen: (b: boolean) => void
}) => (
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
)

const ViewToggle = () => (
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
)

const History = () => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()

  const {
    inspections,
    columns,
    statusFilter,
    typesFilter,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useHistory({
    spectrum: '',
    from: '',
    until: '',
    plate: '',
    container: '',
    case_id: '',
    altered_plate: false,
    altered_container: false,
    is_multiple: false,
    is_empty: false,
    is_flammable: false,
    is_suspect: false,
    is_ignored: false
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <Tabs defaultValue="grid" className="w-full h-fit flex flex-col pb-8">
      <div className="flex justify-between px-3 gap-4 sticky pt-2 top-0 z-10 bg-background pb-4 w-full">
        <div className="flex gap-4 w-full">
          <SearchInput placeholder="Digite o CaseID" />
          <SearchInput placeholder="Digite a placa" />
          <SearchInput placeholder="Digite o nº do contêiner" />
          <div className="w-full max-w-60">
            <FilterDropdown statusFilter={statusFilter} typesFilter={typesFilter} />
          </div>
          <div className="w-full max-w-60">
            <DatePickerPopover date={date} setDate={setDate} open={open} setOpen={setOpen} />
          </div>
          <Button className="w-full max-w-23 font-semibold ml-4">
            <FiSearch className="h-4 w-4" />
            Buscar
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <ViewToggle />
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
        {inspections.map((insp, i) => (
          <HistoricCard key={i} inspectionData={insp} />
        ))}
      </TabsContent>
      <TabsContent value="list" className="flex flex-col gap-4 p-4 text-[#7B8588]">
        <DataTable columns={columns} data={inspections} />
      </TabsContent>
      <div className="mt-4 min-h-[1px]" ref={ref} />
    </Tabs>
  )
}

export default History
