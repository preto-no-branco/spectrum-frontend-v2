import { ReactNode } from 'react'

export function SwitchAccessLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 bg-input/30">
      <div className="flex flex-col w-full justify-center gap-3">{children}</div>
    </div>
  )
}
