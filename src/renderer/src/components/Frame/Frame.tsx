import React from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import { useFrame } from './useFrame'

const Frame = ({ children }: { children: React.ReactNode }) => {
  const { isAnalysisPage, sidebarItems } = useFrame()

  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar isHidden={isAnalysisPage} items={sidebarItems} />
      <div className="flex flex-col flex-1 w-full">
        <Topbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default Frame
