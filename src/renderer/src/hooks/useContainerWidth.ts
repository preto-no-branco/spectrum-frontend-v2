import { useEffect, useRef, useState } from 'react'

export function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  const isBelow = (threshold: number) => {
    return width !== null && width < threshold
  }

  return { ref, width, isBelow }
}
