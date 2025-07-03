import { Columns } from '@renderer/components/Table/interfaces'
import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
import { Badge } from '@renderer/components/ui/badge'
import { Button } from '@renderer/components/ui/button'
import { Tooltip } from '@renderer/components/ui/tooltip'
import { CircleSlashIcon, EditIcon } from 'lucide-react'
import { ColumnUser, UserTableProps } from './interface'

export const useUserTable = ({ onEdit, onToggleActive }: Omit<UserTableProps, 'usersData'>) => {
  const usersColumns: Columns<ColumnUser> = [
    {
      key: 'name',
      header: 'Nome completo',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => {
        const value = row.original.name
        const [firstName, lastName] = value.split(' ')
        const initials = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`
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
    // {
    //   key: 'position',
    //   header: 'Cargo'
    // },
    {
      key: 'role',
      header: 'Perfil de acesso'
    },
    {
      key: 'personalIdentification',
      header: 'Identificador'
    },
    {
      key: 'active',
      header: 'Status',
      render: (value) => (
        <Badge variant="outline" className="bg-background-tertiary">
          {value ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    {
      key: 'lastLogin',
      header: 'Ultimo acesso',
      cell({ row }) {
        const lastLogin = row.original.lastLogin
        if (!lastLogin) {
          return 'N/A'
        }

        return new Date(lastLogin).toLocaleDateString('pt-BR')
      }
    },

    {
      key: 'actions',
      header: 'Ações',
      cell({ row }) {
        const userIsActive = row.original.active

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
                onClick={() => onToggleActive(row.original.id || '', userIsActive || false)}
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
                onClick={() => onEdit(row.original)}
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
    usersColumns
  }
}
