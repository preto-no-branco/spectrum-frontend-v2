import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import { useLayout } from './useLayout'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAnalysisPage, isLoginPage, sidebarItems } = useLayout()

  return (
    <div className="flex flex-row h-screen w-full">
      {!isLoginPage && (
        <Sidebar
          isHidden={isAnalysisPage}
          items={sidebarItems}
          onHelpClick={() => console.log('Help not implemented yet')}
          onLogoutClick={() => console.log('Logout not implemented yet')}
        />
      )}
      <div className="flex flex-col flex-1 w-full">
        <Topbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default Layout
