import { Columns } from '@renderer/components/Table/interfaces'
import { Badge } from '@renderer/components/ui/badge'
import { Button } from '@renderer/components/ui/button'
import { Switch } from '@renderer/components/ui/switch'
import { Tooltip } from '@renderer/components/ui/tooltip'
import { EditIcon } from 'lucide-react'
import { useMemo } from 'react'
import { CategoriesTableProps, ColumnCategories } from './interface'

export const useCategoriesTable = ({
  onEdit,
  toggleActive
}: Omit<CategoriesTableProps, 'categoriesData'>) => {
  const categoriesColumns: Columns<ColumnCategories> = useMemo(() => {
    return [
      {
        key: 'name',
        header: 'Categorias de análise',
        enableSorting: true,
        enableHiding: true
      },
      {
        key: 'active',
        header: 'Status',
        render: (value) => {
          return (
            <Badge variant="outline" className="bg-background-tertiary min-w-16">
              {value ? 'Ativa' : 'Inativa'}
            </Badge>
          )
        }
      },
      {
        key: 'created_at',
        header: 'Data de Criação',
        cell({ row }) {
          const createdAt = row.original.created_at
          return createdAt ? new Date(createdAt).toLocaleDateString('pt-BR') : ''
        }
      },
      {
        key: 'actions',
        header: 'Ações',
        cell({ row }) {
          return (
            <div className="flex items-center gap-3">
              <Switch
                defaultChecked={row.original.active}
                onCheckedChange={(checked) => {
                  toggleActive(row.original, checked)
                }}
              />
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
  }, [onEdit, toggleActive])

  return {
    categoriesColumns
  }
}
