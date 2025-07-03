import { motion } from 'framer-motion'
import React from 'react'
import { SidebarProps } from './interfaces'
import SidebarClosed from './SidebarClosed'
import SidebarOpen from './SidebarOpen'
import { useSidebar } from './useSidebar'

const Sidebar: React.FC<SidebarProps> = ({
  isDisabled = false,
  isHidden,
  items,
  onHelpClick,
  onLogoutClick
}) => {
  const {
    open,
    sidebarWidth,
    edgeHoverWidth,
    handleMouseEnter,
    handleMouseLeave,
    handleEdgeHover
  } = useSidebar({ isHidden })

  if (isDisabled) {
    return <></>
  }

  return (
    <>
      {isHidden && !open && (
        <SidebarClosed edgeHoverWidth={edgeHoverWidth} onEdgeHover={handleEdgeHover} />
      )}

      <motion.div
        className="flex-shrink-0 h-full bg-background border-r border-border-secondary flex flex-col items-center py-2 overflow-hidden"
        initial={false}
        animate={{ width: open ? sidebarWidth : 0 }}
        transition={{ type: 'tween', duration: 0.2 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {open && (
          <SidebarOpen items={items} onHelpClick={onHelpClick} onLogoutClick={onLogoutClick} />
        )}
      </motion.div>
    </>
  )
}

export default Sidebar
