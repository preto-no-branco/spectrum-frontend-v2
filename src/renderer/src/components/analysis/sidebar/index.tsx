import { useState, useRef, useEffect } from 'react'
import SidebarHeader from './header'
import SidebarBody from './body'

export default function AnalysisSidebar() {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(400)
  const [showContent, setShowContent] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'movements'>('details')
  const sidebarRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isResizing.current) return
      if (sidebarRef.current) {
        const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left
        if (newWidth >= 200 && newWidth <= 600) {
          setWidth(newWidth)
        }
      }
    }

    function onMouseUp() {
      isResizing.current = false
      setResizing(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (open) {
      timeout = setTimeout(() => {
        setShowContent(true)
      }, 300)
    } else {
      setShowContent(false)
    }

    return () => clearTimeout(timeout)
  }, [open])

  return (
    <div
      ref={sidebarRef}
      className={`relative overflow-hidden h-full border-r border-[#2D3234] bg-background text-white flex flex-col ${
        resizing ? 'select-none' : 'transition-[width] duration-300 ease-in-out'
      }`}
      style={{ width: open ? `${width}px` : '50px' }}
    >
      <SidebarHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setOpen={setOpen}
        open={open}
        width={width}
        showContent={showContent}
      />

      {open && (
        <SidebarBody activeTab={activeTab} isResizing={isResizing} setResizing={setResizing} />
      )}
    </div>
  )
}
