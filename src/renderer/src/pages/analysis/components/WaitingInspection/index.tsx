import { BiRadar } from 'react-icons/bi'

export const WaitingOperation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-8">
      <div className="bg-background-tertiary  p-5 rounded-full">
        <BiRadar className="w-12 h-12 text-content-secondary" />
      </div>
      <div className="flex flex-col text-center gap-2">
        <p className="text-content-secondary text-3xl font-semibold">Aguardando dados</p>
        <p className="text-lg text-content-tertiary">
          Inicie um novo escaneamento para visualizar resultados.
        </p>
      </div>
    </div>
  )
}
