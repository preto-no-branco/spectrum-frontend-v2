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
import { Link } from 'react-router-dom'

export default function Analysis(): JSX.Element {
  const { createWindow } = useWindowManager()

  return (
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
    </div>
  )
}
