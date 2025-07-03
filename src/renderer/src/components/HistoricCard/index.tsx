import { InspectionHistory } from '@renderer/services/inspectionService/interfaces'
import { RiBaseStationLine } from 'react-icons/ri'
import { BiRadar } from 'react-icons/bi'
import { BsArrowRightSquare } from 'react-icons/bs'
import { AiOutlineContainer } from 'react-icons/ai'
import { Tooltip, TooltipTrigger, TooltipContent } from '@renderer/components/ui/tooltip'
import { Button } from '../ui/button'

const typeStyleMap: Record<string, string> = {
  Suspeito: 'text-[#EB4B5B] bg-[#5C0C14]',
  Inflamável: 'text-[#FF9D3B] bg-[#663504]',
  Múltiplo: 'text-[#9D8AFE] bg-[#281C54]',
  Vazio: 'text-[#55A1F2] bg-[#113760]'
}

const renderListItem = (items: string[], fallback: string) => {
  if (!items.length) return fallback
  const label = items[0]
  const extras = items.length > 1 ? `, + ${items.length - 1}` : ''
  return (
    <div className="flex items-center">
      {label}
      {extras && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{extras}</div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex gap-1 text-xs text-[#B3BDC0] w-fit">
              {items.slice(1).map((item, index) => (
                <div key={index} className="flex">
                  {item}
                  {index < items.length - 2 && ','}
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

const renderType = (inspection: InspectionHistory) => {
  const types: string[] = []
  if (inspection.isSuspect) types.push('Suspeito')
  if (inspection.isFlammable) types.push('Inflamável')
  if (inspection.isMultiple) types.push('Múltiplo')
  if (inspection.isEmpty) types.push('Vazio')

  if (!types.length) return null

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`${typeStyleMap[types[0]]} !font-bold py-1 px-2 rounded-md`}>
        {types[0]}
      </span>
      {types.length > 1 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={`!font-bold ${typeStyleMap['Inflamável']} p-1 rounded-lg`}>
              +{types.length - 1}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex gap-1 text-xs w-fit">
              {types.map((item, index) =>
                types.indexOf(item) === 0 ? null : (
                  <div key={index} className="flex">
                    <span className={`!font-bold ${typeStyleMap[item]} py-1 px-2 rounded-lg`}>
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

const IconText = ({
  icon: Icon,
  children,
  className = ''
}: {
  icon: React.ElementType
  children: React.ReactNode
  className?: string
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Icon className="text-2xl text-content-tertiary" />
    {children}
  </div>
)

const HistoricCard = ({ inspectionData }: { inspectionData: InspectionHistory }) => {
  return (
    <div className="bg-background-secondary flex h-52 w-full flex-col justify-between gap-5 p-4 text-xs text-[#B3BDC0] hover:bg-[#202425]">
      <div className="flex items-center justify-between w-full">
        <IconText icon={RiBaseStationLine}>{inspectionData.spectrumName}</IconText>
        <Button variant="link" className="hover:text-content-secondary text-content-tertiary !p-0">
          <BsArrowRightSquare className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between w-full text-sm">
        <IconText icon={BiRadar} className="!font-semibold">
          {inspectionData.caseId}
        </IconText>
        {renderType(inspectionData)}
      </div>
      <div className="flex items-center justify-between w-full max-w-full text-sm">
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.4975 3.25C16.6388 3.25 16.7742 3.31585 16.8741 3.43306C16.974 3.55027 17.0301 3.70924 17.0301 3.875V15.125C17.0301 15.2908 16.974 15.4497 16.8741 15.5669C16.7742 15.6842 16.6388 15.75 16.4975 15.75H3.50253C3.36128 15.75 3.22582 15.6842 3.12594 15.5669C3.02606 15.4497 2.96995 15.2908 2.96995 15.125V3.875C2.96995 3.70924 3.02606 3.55027 3.12594 3.43306C3.22582 3.31585 3.36128 3.25 3.50253 3.25H16.4975ZM3.50253 2C3.07878 2 2.67239 2.19754 2.37275 2.54917C2.07312 2.90081 1.90479 3.37772 1.90479 3.875V15.125C1.90479 15.6223 2.07312 16.0992 2.37275 16.4508C2.67239 16.8025 3.07878 17 3.50253 17H16.4975C16.9213 17 17.3277 16.8025 17.6273 16.4508C17.9269 16.0992 18.0953 15.6223 18.0953 15.125V3.875C18.0953 3.37772 17.9269 2.90081 17.6273 2.54917C17.3277 2.19754 16.9213 2 16.4975 2H3.50253Z"
              fill="#4E5557"
            />
            <path
              d="M4.6032 8.31429C4.6032 8.17789 4.66006 8.04708 4.76127 7.95063C4.86248 7.85418 4.99975 7.8 5.14288 7.8H14.8572C15.0003 7.8 15.1376 7.85418 15.2388 7.95063C15.34 8.04708 15.3968 8.17789 15.3968 8.31429C15.3968 8.45068 15.34 8.58149 15.2388 8.67794C15.1376 8.77439 15.0003 8.82857 14.8572 8.82857H5.14288C4.99975 8.82857 4.86248 8.77439 4.76127 8.67794C4.66006 8.58149 4.6032 8.45068 4.6032 8.31429ZM4.6032 10.8857C4.6032 10.7493 4.66006 10.6185 4.76127 10.5221C4.86248 10.4256 4.99975 10.3714 5.14288 10.3714H14.8572C15.0003 10.3714 15.1376 10.4256 15.2388 10.5221C15.34 10.6185 15.3968 10.7493 15.3968 10.8857C15.3968 11.0221 15.34 11.1529 15.2388 11.2494C15.1376 11.3458 15.0003 11.4 14.8572 11.4H5.14288C4.99975 11.4 4.86248 11.3458 4.76127 11.2494C4.66006 11.1529 4.6032 11.0221 4.6032 10.8857Z"
              fill="#4E5557"
            />
          </svg>
          {renderListItem(inspectionData.plates, 'Sem placa')}
        </div>
        <IconText icon={AiOutlineContainer}>
          {renderListItem(inspectionData.containers, 'Sem contêiner')}
        </IconText>
      </div>
      <div className="flex items-center justify-between w-full border-t-1 border-border-secondary pt-3 text-content-tertiary">
        <div>{inspectionData.finishedByName}</div>
        <div>
          {inspectionData.createdAt
            ? new Date(inspectionData.createdAt).toLocaleString()
            : 'Data desconhecida'}
        </div>
      </div>
    </div>
  )
}

export default HistoricCard
