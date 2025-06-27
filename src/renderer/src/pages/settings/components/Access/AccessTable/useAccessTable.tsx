import { Columns } from '@renderer/components/Table/interfaces'
import { Button } from '@renderer/components/ui/button'
import { Tooltip } from '@renderer/components/ui/tooltip'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { ColumnAccess } from './interface'

interface Props {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const useAccessTable = ({ onEdit, onDelete }: Props) => {
  const accessData: ColumnAccess[] = [
    {
      id: '1',
      profile: 'Qualidade - Inspeção',
      allowedActions: 9,
      connectedUsers: 6,
      createdAt: '2023-01-01'
    },
    {
      id: '2',
      profile: 'Suporte',
      allowedActions: 12,
      connectedUsers: 5,
      createdAt: '2023-01-01'
    },
    {
      id: '3',
      profile: 'Administrador',
      allowedActions: 12,
      connectedUsers: 2,
      createdAt: '2023-01-01'
    },
    {
      id: '4',
      profile: 'Operador',
      allowedActions: 5,
      connectedUsers: 12,
      createdAt: '2023-01-01'
    },
    {
      id: '5',
      profile: 'Analista Receita Federal',
      allowedActions: 2,
      connectedUsers: 10,
      createdAt: '2023-01-01'
    }
  ]
  const accessColumns: Columns<ColumnAccess> = [
    {
      key: 'profile',
      header: 'Perfil',
      enableSorting: true,
      enableHiding: true
    },
    {
      key: 'allowedActions',
      header: 'Ações permitidas'
    },
    {
      key: 'connectedUsers',
      header: 'Usuários vinculados'
    },
    {
      key: 'createdAt',
      header: 'Data de crianção'
    },
    {
      key: 'actions',
      header: 'Ações',
      cell({ row }) {
        return (
          <div className="flex items-center">
            <Tooltip
              label="Excluir"
              labelProps={{
                side: 'bottom',
                sideOffset: 3
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label="Excluir"
                onClick={() => onDelete(row.original.id)}
              >
                <Trash2Icon />
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
    accessColumns,
    accessData
  }
}
