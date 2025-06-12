import React from 'react'
import { motion } from 'framer-motion'
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
        <SidebarClosed edgeHoverWidth={edgeHoverWidth} onEdgeHover={handleEdgeHover} />
      )}

      <motion.div
        className="flex-shrink-0 h-full bg-background border-r border-secondary flex flex-col items-center py-2 overflow-hidden"
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
