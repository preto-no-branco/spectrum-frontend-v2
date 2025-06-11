import { useWindowManager } from '@renderer/hooks/useWindowManager'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { JSX } from 'react'
import { DataTable } from '@renderer/components/Table'

import { Columns } from '@renderer/components/Table/interfaces'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount?: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: Columns<Payment> = [
  {
    key: 'email',
    header: 'Email',
    render: (value) => <span>{value}</span>
  },
  {
    key: 'status',
    header: 'Status',
    width: 100,
    render: (value) => <span>{value}</span>
  },
  {
    key: 'amount',
    header: 'Amount',
    render: (value) => <span>{value ?? 'N/A'}</span>
  },
  {
    key: 'id',
    header: 'ID',
    width: 200,
    render: (value) => <Button variant="link">{value}</Button>
  }
]

export default function Analysis(): JSX.Element {
  const { createWindow } = useWindowManager()

  return (
    <div className="flex items-center justify-center bg-background p-6">
      <DataTable
        columns={columns}
        data={[
          {
            amount: 20,
            email: 'luccaparadeda@gmail.com',
            id: 'aa',
            status: 'pending'
          }
        ]}
      />
    </div>
  )
}
