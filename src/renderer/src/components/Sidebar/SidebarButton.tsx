import React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import { SidebarButtonProps } from './interfaces'

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  onClick,
  className
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        className={`p-2 rounded hover:bg-background-tertiary transition-colors ${className ?? ''}`}
        aria-label={label}
      >
        {icon}
      </button>
    </TooltipTrigger>
    <TooltipContent side="right" sideOffset={10}>
      <span>{label}</span>
    </TooltipContent>
  </Tooltip>
)
