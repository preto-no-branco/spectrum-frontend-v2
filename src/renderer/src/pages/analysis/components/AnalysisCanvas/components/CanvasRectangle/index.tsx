import React, { useMemo } from 'react'
import { canvasToScreenCoordinates } from '../../utils/RectSelection'

interface CanvasRectangleProps {
  x: number
  y: number
  width: number
  height: number
  zoom: number
  processedCanvasRef: React.RefObject<HTMLCanvasElement | null>
  transformComponentRef: React.RefObject<HTMLDivElement | null>
  children: React.ReactNode
}

const CanvasRectangle: React.FC<CanvasRectangleProps> = ({
  x,
  y,
  width,
  height,
  zoom,
  processedCanvasRef,
  transformComponentRef,
  children
}) => {
  const screenPosition = useMemo(() => {
    const canvas = processedCanvasRef.current
    if (!canvas) {
      return { x_start: 0, y_start: 0, x_end: 0, y_end: 0 }
    }
    const xPx = x * canvas.width
    const yPx = y * canvas.height
    const wPx = width * canvas.width
    const hPx = height * canvas.height

    const start = canvasToScreenCoordinates(
      xPx,
      yPx,
      processedCanvasRef,
      zoom,
      transformComponentRef
    )
    const end = canvasToScreenCoordinates(
      xPx + wPx,
      yPx + hPx,
      processedCanvasRef,
      zoom,
      transformComponentRef
    )

    return {
      x_start: start.x,
      y_start: start.y,
      x_end: end.x,
      y_end: end.y
    }
  }, [x, y, width, height, processedCanvasRef, transformComponentRef])

  const screenWidth = screenPosition.x_end - screenPosition.x_start
  const screenHeight = screenPosition.y_end - screenPosition.y_start

  if (screenWidth <= 0 || screenHeight <= 0) return null

  return (
    <div
      style={{
        position: 'absolute',
        left: screenPosition.x_start,
        top: screenPosition.y_start,
        width: screenWidth,
        height: screenHeight,
        border: '2px solid #00f',
        pointerEvents: 'auto',
        zIndex: 999,
        cursor: 'pointer'
      }}
    >
      {children}
    </div>
  )
}

export default CanvasRectangle
