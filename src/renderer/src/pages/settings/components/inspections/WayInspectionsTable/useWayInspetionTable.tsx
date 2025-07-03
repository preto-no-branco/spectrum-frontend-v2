import { Menu } from '@renderer/components/custom/Menu'
import { Columns } from '@renderer/components/Table/interfaces'
import { Badge } from '@renderer/components/ui/badge'
import { Switch } from '@renderer/components/ui/switch'
import { EllipsisVerticalIcon } from 'lucide-react'
import { ColumnWayInspection } from './interface'

interface Props {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const useWayInspetionTable = ({ onEdit, onDelete }: Props) => {
  const wayInspectionsData: ColumnWayInspection[] = [
    {
      id: '1',
      name: 'Spectrum 1',
      code: '0001',
      isActive: true,
      createdAt: '2023-01-01'
    },
    {
      id: '2',
      name: 'Spectrum 2',
      code: '0002',
      isActive: true,
      createdAt: '2023-01-01'
    },
    {
      id: '3',
      name: 'Spectrum 3',
      code: '0003',
      isActive: true,
      createdAt: '2023-01-01'
    },
    {
      id: '4',
      name: 'Spectrum 4',
      code: '0004',
      isActive: true,
      createdAt: '2023-01-01'
    },
    {
      id: '5',
      name: 'Spectrum 5',
      code: '0005',
      isActive: false,
      createdAt: '2023-01-01'
    },
    {
      id: '6',
      name: 'Spectrum 6',
      code: '0006',
      isActive: false,
      createdAt: '2023-01-01'
    }
  ]

  const wayInspectionsColumns: Columns<ColumnWayInspection> = [
    {
      key: 'name',
      header: 'Identificador',
      enableSorting: true,
      enableHiding: true
    },
    {
      key: 'code',
      header: 'Código',
      enableSorting: true,
      enableHiding: true
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (value) => {
        return (
          <Badge variant="outline" className="bg-background-tertiary">
            {value === true ? 'Ativa' : 'Inativa'}
          </Badge>
        )
      }
    },
    {
      key: 'createdAt',
      header: 'Data de Criação',
      cell({ row }) {
        return new Date(row.original.createdAt).toLocaleDateString('pt-BR')
      }
    },
    {
      key: 'actions',
      header: 'Ações',
      cell({ row }) {
        return (
          <div className="flex items-center gap-3">
            <Switch />
            <Menu
              trigger={<EllipsisVerticalIcon className="text-content-tertiary" size={20} />}
              items={[
                {
                  onClick: () => onEdit(row.original.id),
                  label: 'Editar'
                },
                {
                  onClick: () => onDelete(row.original.id),
                  label: 'Excluir'
                }
              ]}
            />
          </div>
        )
      }
    }
  ]
  return {
    wayInspectionsColumns,
    wayInspectionsData
  }
}
