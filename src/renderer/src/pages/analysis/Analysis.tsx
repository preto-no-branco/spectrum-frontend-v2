import { useWindowManager } from '@renderer/hooks/useWindowManager'
import { Button } from '@/components/ui/button'

import { JSX } from 'react'
import { DataTable } from '@renderer/components/Table'

import { Columns } from '@renderer/components/Table/interfaces'
import { ArrowUpDown } from 'lucide-react'

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
    header: () => (
      <Button variant="ghost" className="has-[>svg]:px-0" onClick={() => alert('Sort by amount')}>
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    render: (value) => <span>{value ?? 'N/A'}</span>
  },
  {
    key: 'id',
    header: 'ID',
    width: 200,
    render: (value) => (
      <Button className="p-0" variant="link">
        {value}
      </Button>
    )
  }
]

export default function Analysis(): JSX.Element {
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
