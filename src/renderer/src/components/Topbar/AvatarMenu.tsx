import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const AvatarMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 p-1">
          <Avatar className="w-8 h-8 border-border-secondary border">
            <AvatarFallback className="text-content-primary bg-background-tertiary">
              AB
            </AvatarFallback>
          </Avatar>
          <FiChevronDown
            className={cn(
              'transition-transform duration-200 text-muted-foreground',
              open ? 'rotate-180' : 'rotate-0'
            )}
            size={16}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40 mt-2" align="end">
        <div className="flex flex-col gap-2">
          <button className="text-left text-sm hover:underline">Perfil</button>
          <button className="text-left text-sm hover:underline">Configurações</button>
          <button className="text-left text-sm text-red-500 hover:underline">Sair</button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AvatarMenu
