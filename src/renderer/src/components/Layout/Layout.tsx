import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import { useLayout } from './useLayout'
import { useAuth } from '@renderer/hooks/useAuth'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAnalysisPage, sidebarItems, isLayoutDisabled } = useLayout()
  const { logout } = useAuth()

  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar
        isDisabled={isLayoutDisabled}
        isHidden={isAnalysisPage}
        items={sidebarItems}
        onHelpClick={() => console.log('Help not implemented yet')}
        onLogoutClick={logout}
      />
      <div className="flex flex-col flex-1 w-full">
        <Topbar isDisabled={isLayoutDisabled} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default Layout
