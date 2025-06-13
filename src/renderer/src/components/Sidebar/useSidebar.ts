import { useState, useEffect } from 'react'

interface UseSidebarProps {
  isHidden: boolean
}

export function useSidebar({ isHidden }: UseSidebarProps) {
  const [open, setOpen] = useState(!isHidden)

  useEffect(() => {
    setOpen(!isHidden)
  }, [isHidden])

  const sidebarWidth = '3.25rem'
  const edgeHoverWidth = '1.5rem'

  const handleMouseEnter = () => {
    if (isHidden) setOpen(true)
  }

  const handleMouseLeave = () => {
    if (isHidden) setOpen(false)
  }

  const handleEdgeHover = () => setOpen(true)

  return {
    open,
    sidebarWidth,
    edgeHoverWidth,
    setOpen,
    handleMouseEnter,
    handleMouseLeave,
    handleEdgeHover
  }
}
