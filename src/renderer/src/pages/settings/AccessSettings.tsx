import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Search } from 'lucide-react'

export default function AccessSettings() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex w-full">
        <div className="flex w-fit">
          <Input type="search" placeholder="Pesquisar" leftIcon={<Search size={16} />} />
        </div>
        <Button>Cadastrar acesso</Button>
      </div>
    </div>
  )
}
