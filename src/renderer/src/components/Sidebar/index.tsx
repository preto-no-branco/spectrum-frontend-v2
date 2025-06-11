import React from 'react'
import { motion } from 'framer-motion'
import { LuLogOut } from 'react-icons/lu'
import { SidebarButton } from './SidebarButton'
import { SidebarProps } from './interfaces'
import { useSidebar } from './useSidebar'
import { MdHelpOutline } from 'react-icons/md'

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
        <div
          className="fixed left-0 top-0 bottom-0"
          style={{
            width: edgeHoverWidth,
            backgroundColor: 'transparent',
            zIndex: 1000
          }}
          onMouseEnter={handleEdgeHover}
        />
      )}
      <motion.div
        className="flex-shrink-0 h-full bg-background border-r border-secondary flex flex-col items-center py-2 overflow-hidden"
        initial={false}
        animate={{ width: open ? sidebarWidth : 0 }}
        transition={{ type: 'tween', duration: 0.2 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col justify-between h-full w-full items-center px-3 py-2 pt-10">
          <div className="flex flex-col items-center gap-2">
            {items.map((item, idx) => (
              <SidebarButton key={idx} icon={item.icon} label={item.label} onClick={item.onClick} />
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 mb-2">
            <SidebarButton
              onClick={onHelpClick}
              icon={<MdHelpOutline className="text-content-tertiary" size={20} />}
              label="Ajuda"
            />
            <SidebarButton
              onClick={onLogoutClick}
              icon={<LuLogOut className="text-content-tertiary" size={20} />}
              label="Sair"
            />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar
