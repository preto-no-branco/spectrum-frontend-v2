import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function AccordionSidebar({
  title,
  time,
  children,
  width
}: {
  title: string
  time?: string
  children: React.ReactNode
  width?: number
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex-row-reverse justify-end items-center gap-2 font-normal no-underline hover:no-underline">
          <div
            className={`flex justify-between items-center gap-2 font-normal ${width && width < 250 ? 'text-[10px]' : 'text-xs'} text-[#7B8588] w-full`}
          >
            <span className="text-[#B3BDC0] text-sm hover:underline">{title}</span>
            {time && <span>{time}</span>}
          </div>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
