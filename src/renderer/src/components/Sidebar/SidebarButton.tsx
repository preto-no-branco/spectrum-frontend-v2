import React from 'react'
import { Tooltip } from '../ui/tooltip'
import { SidebarButtonProps } from './interfaces'

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  onClick,
  className
}) => (
  <Tooltip
    label={label}
    labelProps={{
      side: 'right',
      sideOffset: 10
    }}
  >
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-background-tertiary transition-colors ${className}`}
      aria-label={label}
    >
      {icon}
    </button>
  </Tooltip>
)
