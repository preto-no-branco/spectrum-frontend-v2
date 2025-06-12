import React from 'react'
import { motion } from 'framer-motion'
import { LuLogOut } from 'react-icons/lu'
import { MdHelpOutline } from 'react-icons/md'
import { SidebarButton } from './SidebarButton'
import { SidebarOpenProps } from './interfaces'

const SidebarOpen: React.FC<SidebarOpenProps> = ({
  sidebarWidth,
  items,
  onHelpClick,
  onLogoutClick,
  onMouseEnter,
  onMouseLeave
}) => (
  <motion.div
    className="flex-shrink-0 h-full bg-background border-r border-secondary flex flex-col items-center py-2 overflow-hidden"
    initial={false}
    animate={{ width: sidebarWidth }}
    transition={{ type: 'tween', duration: 0.2 }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
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
)

export default SidebarOpen
