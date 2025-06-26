import { BsHourglass } from 'react-icons/bs'

export const WaitingInspection = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-8">
      <div className="bg-background-tertiary  p-5 rounded-full">
        <BsHourglass className="w-12 h-12 text-content-secondary" />
      </div>
      <div className="flex flex-col text-center gap-2">
        <p className="text-content-secondary text-3xl font-semibold">Operação não iniciada</p>
        <p className="text-lg text-content-tertiary">
          Clique no botão “iniciar operação” para começar.
        </p>
      </div>
    </div>
  )
}
