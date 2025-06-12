import React from 'react'
import { SidebarClosedProps } from './interfaces'

const SidebarClosed: React.FC<SidebarClosedProps> = ({ edgeHoverWidth, onHover }) => (
  <div
    className="fixed left-0 top-0 bottom-0"
    style={{
      width: edgeHoverWidth,
      backgroundColor: 'transparent',
      zIndex: 1000
    }}
    onMouseEnter={onHover}
  />
)

export default SidebarClosed
