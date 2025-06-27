import { Columns } from '@renderer/components/Table/interfaces'
import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
import { Badge } from '@renderer/components/ui/badge'
import { Button } from '@renderer/components/ui/button'
import { Tooltip } from '@renderer/components/ui/tooltip'
import { CircleSlashIcon, EditIcon } from 'lucide-react'
import { ColumnUser } from './interface'

interface Props {
  onEdit: (id: string) => void
  onBlock: (id: string, isActive: boolean) => void
}

export const useUserTable = ({ onEdit, onBlock }: Props) => {
  const usersData: ColumnUser[] = [
    {
      id: '6690',
      fullName: 'Lúcia Barreto',
      username: 'lucia.barreto',
      status: 'active',
      position: 'Operador',
      accessLevel: 'admin',
      email: 'mail@gmail.com',
      lastAccess: '2023-01-01',
      actions: '',
      isActive: true
    },
    {
      id: '6790',
      fullName: 'Renato Almeida',
      username: 'renato.almeida',
      status: 'active',
      position: 'Operador',
      accessLevel: 'suport',
      email: 'mail@mail.com',
      lastAccess: '2023-01-01',
      actions: '',
      isActive: false
    }
  ]
  const usersColumns: Columns<ColumnUser> = [
    {
      key: 'fullName',
      header: 'Nome completo',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => {
        const value = row.original.fullName
        const [firstName, lastName] = value.split(' ')
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
        return (
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border-border-secondary border">
              <AvatarFallback className="text-content-primary bg-background-tertiary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span>{value}</span>
          </div>
        )
      }
    },
    {
      key: 'username',
      header: 'Nome de usuário'
    },
    {
      key: 'position',
      header: 'Cargo'
    },
    {
      key: 'accessLevel',
      header: 'Perfil de acesso'
    },
    {
      key: 'id',
      header: 'Identificador'
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant="outline" className="bg-background-tertiary">
          {value}
        </Badge>
      )
    },
    {
      key: 'lastAccess',
      header: 'Ultimo acesso'
    },
    {
      key: 'email',
      header: 'Email'
    },
    {
      key: 'actions',
      header: 'Ações',
      cell({ row }) {
        const userIsActive = row.original.isActive

        return (
          <div className="flex items-center">
            <Tooltip
              label={userIsActive ? 'Bloquear' : 'Desbloquear'}
              labelProps={{
                side: 'bottom',
                sideOffset: 3
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label={userIsActive ? 'Bloquear' : 'Desbloquear'}
                onClick={() => onBlock(row.original.id, userIsActive)}
              >
                <CircleSlashIcon className={userIsActive ? '' : 'text-destructive'} />
              </Button>
            </Tooltip>
            <Tooltip
              label="Editar"
              labelProps={{
                side: 'bottom',
                sideOffset: 3
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label="Editar"
                onClick={() => onEdit(row.original.id)}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          </div>
        )
      }
    }
  ]
  return {
    usersColumns,
    usersData
  }
}
