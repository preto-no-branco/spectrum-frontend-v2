import { Columns } from '@renderer/components/Table/interfaces'
import { Button } from '@renderer/components/ui/button'
import { Tooltip } from '@renderer/components/ui/tooltip'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { ColumnWayInspection, WayInspetionTableProps } from './interface'

export const useWayInspetionTable = ({
  onEdit,
  onDelete
}: Omit<WayInspetionTableProps, 'spectrums'>) => {
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
    // {
    //   key: 'isActive',
    //   header: 'Status',
    //   render: (value) => {
    //     return (
    //       <Badge variant="outline" className="bg-background-tertiary">
    //         {value === true ? 'Ativa' : 'Inativa'}
    //       </Badge>
    //     )
    //   }
    // },
    // {
    //   key: 'createdAt',
    //   header: 'Data de Criação',
    //   cell({ row }) {
    //     return new Date(row.original.createdAt).toLocaleDateString('pt-BR')
    //   }
    // },
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
                onClick={() => onDelete(row.original)}
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
    wayInspectionsColumns
  }
}
