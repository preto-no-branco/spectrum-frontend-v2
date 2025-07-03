import { DetailsHeaderProps } from './interfaces'

export const DetailsHeader = ({ icon, isClosed = false, title }: DetailsHeaderProps) => {
  return (
    <div className="flex border-b bg-card py-2 pl-6 px-2 justify-between w-full">
      {!isClosed && (
        <div className="flex gap-2">
          {typeof icon === 'string' ? (
            <img src={icon} alt="Detalhes da inspeção" className="w-5 h-5" />
          ) : (
            icon
          )}
          <p className="text-content-secondary text-sm">{title}</p>
        </div>
      )}
    </div>
  )
}
