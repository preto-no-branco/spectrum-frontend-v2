import { isValidElement, cloneElement } from 'react'
import clsx from 'clsx'
import { backgroundScreen } from './interfaces'

export const BackgroundScreen = ({ description, icon, title, className }: backgroundScreen) => {
  const styledIcon = isValidElement<{ className?: string }>(icon)
    ? cloneElement(icon, {
        className: 'w-12 h-12 text-content-secondary'
      })
    : icon

  return (
    <div
      className={clsx('w-full h-full flex items-center justify-center flex-col gap-8', className)}
    >
      <div className="bg-background-tertiary p-5 rounded-full">{styledIcon}</div>
      <div className="flex flex-col text-center gap-2">
        <p className="text-content-secondary text-3xl font-semibold">{title}</p>
        <p className="text-lg text-content-tertiary">{description}</p>
      </div>
    </div>
  )
}
