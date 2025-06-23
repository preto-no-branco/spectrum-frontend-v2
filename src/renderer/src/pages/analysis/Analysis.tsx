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
<<<<<<< HEAD
||||||| parent of 216fd96 (Adding Analysis start components and OpenCV Singleton)
  const { createWindow } = useWindowManager()

=======
  async function main() {
    const cv = await cvReadyPromise
    console.log('OpenCV.js is ready!')
    console.log(cv.getBuildInformation())
  }

  useEffect(() => {
    main().catch((error) => {
      console.error('Error initializing OpenCV:', error)
    })
  }, [])

>>>>>>> 216fd96 (Adding Analysis start components and OpenCV Singleton)
  return (
<<<<<<< HEAD
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
||||||| parent of 216fd96 (Adding Analysis start components and OpenCV Singleton)
    <div className="flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Janela de Gerenciamento</CardTitle>
          <CardDescription>Crie novas janelas usando shadcn UI e Tailwind CSS.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col gap-3">
          <Button onClick={() => createWindow('/')} className="w-full">
            Criar Home (Nova Janela)
          </Button>

          <Button variant="outline" onClick={() => createWindow('/analysis')} className="w-full">
            Criar Analysis (Nova Janela)
          </Button>

          {/* Botão para voltar para a home na mesma janela */}
          <Link to="/" className="w-full">
            <Button variant="secondary" className="w-full">
              Voltar para Home
            </Button>
          </Link>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Exemplo de página usando shadcn/ui</p>
        </CardFooter>
      </Card>
=======
    <div className="flex items-center justify-center bg-background">
      <div className="bg-background border-b border-border-secondary w-full px-6 py-5 flex justify-between items-center">
        <Button variant={'neutral'}>
          <FaSquare className="!w-3 !h-3" /> Parar Operação
        </Button>
        <div className="flex items-center gap-10">
          <div className="border border-border-secondary rounded-md p-3 flex gap-4">
            <Badge variant={'blue'}>Simples</Badge>
            <Checkbox label="Suspeito" />
            <Checkbox label="Inflamável" />
            <Checkbox label="Vazio" />
          </div>
          <div className="flex items-center gap-4">
            <Button tooltipText="Limpar efeitos" tooltipPosition="bottom" variant={'neutral'}>
              <LuTrash2 className="!w-4 !h-4" />
            </Button>
            <Button tooltipText="Desfazer efeito" tooltipPosition="bottom" variant={'neutral'}>
              <CgArrowLongRightC className="!w-4 !h-4" />
            </Button>
            <Button>Finalizar inspeção</Button>
          </div>
        </div>
      </div>
>>>>>>> 216fd96 (Adding Analysis start components and OpenCV Singleton)
    </div>
  )
}
