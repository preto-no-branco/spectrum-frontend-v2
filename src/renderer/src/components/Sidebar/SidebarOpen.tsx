import React from 'react'
import { MdHelpOutline } from 'react-icons/md'
import { LuLogOut } from 'react-icons/lu'
import { SidebarButton } from './SidebarButton'
import { SidebarOpenProps } from './interfaces'

const SidebarOpen: React.FC<SidebarOpenProps> = ({ items, onHelpClick, onLogoutClick }) => (
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
)

export default SidebarOpen
