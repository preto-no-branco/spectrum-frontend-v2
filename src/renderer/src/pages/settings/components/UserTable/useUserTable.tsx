import { Columns } from '@renderer/components/Table/interfaces'
import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
import { Badge } from '@renderer/components/ui/badge'
import { ColumnUser } from './interface'

export const useUserTable = () => {
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
      actions: ''
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
      actions: ''
    }
  ]
  const usersColumns: Columns<ColumnUser> = [
    {
      key: 'fullName',
      header: 'Nome completo',
      enableSorting: true,
      enableHiding: true,
      render: (value) => {
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
      header: 'Nome de usuário',
      render: (value) => <span>{value}</span>
    },
    {
      key: 'position',
      header: 'Cargo',
      render: (value) => <span>{value}</span>
    },
    {
      key: 'accessLevel',
      header: 'Perfil de acesso',
      render: (value) => <span>{value}</span>
    },
    {
      key: 'id',
      header: 'Identificador',
      render: (value) => <span>{value}</span>
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
      header: 'Ultimo acesso',
      render: (value) => <span>{value}</span>
    },
    {
      key: 'email',
      header: 'Email',
      render: (value) => <span>{value}</span>
    },
    {
      key: 'actions',
      header: 'Ações',
      render: (value) => <span>{value}</span>
    }
  ]
  return {
    usersColumns,
    usersData
  }
}
