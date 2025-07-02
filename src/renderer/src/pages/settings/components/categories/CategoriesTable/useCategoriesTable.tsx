import { Menu } from '@renderer/components/custom/Menu'
import { Columns } from '@renderer/components/Table/interfaces'
import { Badge } from '@renderer/components/ui/badge'
import { Switch } from '@renderer/components/ui/switch'
import { EllipsisVerticalIcon } from 'lucide-react'
import { ColumnCategories } from './interface'

interface Props {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const useCategoriesTable = ({ onEdit, onDelete }: Props) => {
  const categoriesData: ColumnCategories[] = [
    {
      id: '1',
      name: 'Químicos e substâncias perigosas',
      isActive: true,
      createdAt: '2023-01-01'
    },
    {
      id: '2',
      name: 'Tecnologias enganosas',
      isActive: true,
      createdAt: '2023-01-01'
    },
    {
      id: '3',
      name: 'Anomalias em cargas comuns',
      isActive: true,
      createdAt: '2023-01-01'
    },
    {
      id: '4',
      name: 'Ocultação e disfarce',
      isActive: true,
      createdAt: '2023-01-01'
    },
    {
      id: '5',
      name: 'Detecção de materiais',
      isActive: false,
      createdAt: '2023-01-01'
    },
    {
      id: '6',
      name: 'Suspeita de drogas',
      isActive: false,
      createdAt: '2023-01-01'
    }
  ]

  const categoriesColumns: Columns<ColumnCategories> = [
    {
      key: 'name',
      header: 'Categorias de análise',
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
    categoriesColumns,
    categoriesData
  }
}
