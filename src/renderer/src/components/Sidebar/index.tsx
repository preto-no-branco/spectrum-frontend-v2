import React from 'react'
import { SidebarProps } from './interfaces'
import { useSidebar } from './useSidebar'
import SidebarOpen from './SidebarOpen'
import SidebarClosed from './SidebarClosed'

const Sidebar: React.FC<SidebarProps> = ({ isHidden, items, onHelpClick, onLogoutClick }) => {
  const {
    open,
    sidebarWidth,
    edgeHoverWidth,
    handleMouseEnter,
    handleMouseLeave,
    handleEdgeHover
  } = useSidebar({ isHidden })

  return (
    <>
      {isHidden && !open && (
        <SidebarClosed edgeHoverWidth={edgeHoverWidth} onHover={handleEdgeHover} />
      )}
      {open && (
        <SidebarOpen
          sidebarWidth={sidebarWidth}
          items={items}
          onHelpClick={onHelpClick}
          onLogoutClick={onLogoutClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </>
  )
}

export default Sidebar
