import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group'
import HistoricCard from '@renderer/components/HistoricCard'
import { Button } from '@renderer/components/ui/button'
import { Calendar } from '@renderer/components/ui/calendar'
import { Input } from '@renderer/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { GrList } from 'react-icons/gr'
import { FiSearch, FiDownload, FiChevronDown } from 'react-icons/fi'
import { BsFilter } from 'react-icons/bs'

const History = () => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="w-full h-full flex flex-col pt-2">
      <div className="flex justify-between px-3 gap-4">
        <div className="flex gap-4 w-full">
          <div className="relative w-full !max-w-60">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="email" placeholder="Digite o CaseID" className="pl-10" />
          </div>
          <div className="relative w-full !max-w-60">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="email" placeholder="Digite a placa" className="pl-10" />
          </div>
          <div className="relative w-full !max-w-60">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="email" placeholder="Digite o nº do contêiner" className="pl-10" />
          </div>
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
                  <FiChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-60">
                <DropdownMenuCheckboxItem checked>Confirmado</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Descartado</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Ignorado</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Suspeito</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inflamável</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Múltiplo</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Vazio</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full !max-w-60">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
                >
                  <span className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    Selecione um período
                  </span>
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>
          <Button className="w-full max-w-23 !font-semibold ml-4">
            <FiSearch className="h-4 w-4" />
            Buscar
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <ToggleGroup type="single" className="flex items-center" defaultValue="grid">
            <ToggleGroupItem
              value="list"
              aria-label="Toggle list"
              className="px-4 py-1 border border-border-secondary rounded-tl-lg rounded-tr-none rounded-br-none rounded-bl-md data-[state=on]:border-primary"
            >
              <GrList className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="grid"
              aria-label="Toggle grid"
              className="px-4 py-1 border border-border-secondary rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none data-[state=on]:border-primary"
            >
              <HiOutlineViewGrid className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button variant="outline" className="ml-2">
            Exportar
            <FiDownload className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <HistoricCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default History
