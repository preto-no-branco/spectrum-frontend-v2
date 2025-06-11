import { useSharedState } from '@renderer/hooks/useSharedState'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { ModeToggle } from '@renderer/components/ModoToggle'

function Home(): React.JSX.Element {
  const [text, setText] = useSharedState('text', 'Hello World')

  return (
    <div className="flex items-center justify-center w-full bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Página Inicial</CardTitle>
          <CardDescription>Use o estado compartilhado e navegue entre janelas.</CardDescription>
          <ModeToggle />
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col gap-3">
          <div>
            <p className="text-sm text-gray-500 mb-2">Texto Compartilhado:</p>
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite algo..."
            />
          </div>
          <Button asChild className="w-full">
            <Link to="/analysis">Ir para Analysis</Link>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Exemplo de página com shadcn/ui</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Home
