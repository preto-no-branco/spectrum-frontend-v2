import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { AccessTable } from '@renderer/pages/settings/components/Access/AccessTable'
import { Search } from 'lucide-react'

export default function AccessSettings() {
  return (
    <div className="flex flex-col flex-1 w-full gap-3">
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <Input type="search" placeholder="Pesquisar" leftIcon={<Search size={16} />} />
        </div>
        <Button>Cadastrar acesso</Button>
      </div>

      <div className="flex flex-1">
        <AccessTable />
      </div>
    </div>
  )
}
