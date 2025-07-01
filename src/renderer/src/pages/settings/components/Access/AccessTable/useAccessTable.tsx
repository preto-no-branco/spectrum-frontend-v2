import { Columns } from '@renderer/components/Table/interfaces'
import { Button } from '@renderer/components/ui/button'
import { Tooltip } from '@renderer/components/ui/tooltip'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { ColumnAccess } from './interface'

interface Props {
  onEdit: (id: string) => void
  onDelete: (id: string, connectedUsers: { id: string; name: string }[]) => void
}

export const useAccessTable = ({ onEdit, onDelete }: Props) => {
  const accessData: ColumnAccess[] = [
    {
      id: '1',
      profile: 'Qualidade - Inspeção',
      allowedActions: {
        inspections: ['analyzer', 'history', 'undo'],
        analyzers: ['analyzer', 'history', 'undo']
      },
      connectedUsers: [],
      createdAt: '2023-01-01'
    },
    {
      id: '2',
      profile: 'Suporte',
      allowedActions: {
        inspections: ['analyzer', 'history', 'undo'],
        analyzers: ['analyzer', 'history', 'undo'],
        users: ['view', 'create', 'block']
      },
      connectedUsers: [
        {
          id: '1',
          name: 'João'
        },
        {
          id: '2',
          name: 'Maria'
        },
        {
          id: '3',
          name: 'Pedro'
        }
      ],
      createdAt: '2023-01-01'
    },
    {
      id: '3',
      profile: 'Administrador',
      allowedActions: {
        inspections: ['analyzer', 'history', 'undo'],
        analyzers: ['analyzer', 'history', 'undo'],
        users: ['view', 'create', 'block', 'unblock'],
        analyzer_categories: ['view', 'create', 'update', 'delete'],
        configurations: ['report', 'edit']
      },
      connectedUsers: [
        {
          id: '1',
          name: 'João'
        },
        {
          id: '2',
          name: 'Maria'
        },
        {
          id: '3',
          name: 'Pedro'
        },
        {
          id: '4',
          name: 'Ana'
        }
      ],
      createdAt: '2023-01-01'
    },
    {
      id: '4',
      profile: 'Operador',
      allowedActions: {
        inspections: ['analyzer', 'history', 'undo'],
        analyzers: ['analyzer', 'history', 'undo']
      },
      connectedUsers: [],
      createdAt: '2023-01-01'
    },
    {
      id: '5',
      profile: 'Analista Receita Federal',
      allowedActions: {
        inspections: ['analyzer', 'history', 'undo'],
        analyzers: ['analyzer', 'history', 'undo']
      },
      connectedUsers: [
        {
          id: '1',
          name: 'João'
        },
        {
          id: '2',
          name: 'Maria'
        },
        {
          id: '3',
          name: 'Pedro'
        },
        {
          id: '4',
          name: 'Ana'
        },
        {
          id: '5',
          name: 'Carlos'
        }
      ],
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
      header: 'Ações permitidas',
      cell({ row }) {
        const allowedActions = row.original.allowedActions
        const allowedActionsLength = Object.values(allowedActions).flat().length

        return allowedActionsLength
      }
    },
    {
      key: 'connectedUsers',
      header: 'Usuários vinculados',
      cell({ row }) {
        return row.original.connectedUsers.length
      }
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
                onClick={() => onDelete(row.original.id, row.original.connectedUsers)}
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
