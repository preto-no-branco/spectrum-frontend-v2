import { ReactNode } from 'react'

interface InfoSectionProps {
  title: React.ReactNode
  children: ReactNode
  componentProps?: string
}

export default function InfoSection({ title, children, componentProps }: InfoSectionProps) {
  return (
    <div className="flex flex-col gap-2 bg-[#171B1C] border-[1px] border-[#2D323480] rounded-sm p-4">
      <span className="text-sm text-content-secondary border-b-[1px] border-b-[#2D3234] pb-2">
        {title}
      </span>
      <span></span>
      <div className={`flex gap-4 flex-wrap pt-1 ${componentProps}`}>{children}</div>
    </div>
  )
}
