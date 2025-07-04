import { useState } from 'react'
import { effectsStore } from '../../stores/effectsStore'

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface Point {
  x: number
  y: number
}

export const useRectSelection = (
  zoomState: number,
  processedCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  transformComponentRef: React.RefObject<HTMLDivElement | null>
) => {
  const [isSelecting, setIsSelecting] = useState(false)
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 })
  const [currentPoint, setCurrentPoint] = useState<Point>({ x: 0, y: 0 })
  const [selections, setSelections] = useState<Rect[]>([])

  const getCanvasCoordinates = (e: React.MouseEvent): Point => {
    const canvas = processedCanvasRef.current
    const transformComponent = transformComponentRef.current

    if (!canvas || !transformComponent) {
      return { x: 0, y: 0 }
    }

    const canvasRect = canvas.getBoundingClientRect()

    const mouseX = e.clientX - canvasRect.left
    const mouseY = e.clientY - canvasRect.top

    const originalX = mouseX * (canvas.width / canvasRect.width)
    const originalY = mouseY * (canvas.height / canvasRect.height)

    return { x: originalX, y: originalY }
  }
  const normalizeCoordinates = (point1: Point, point2: Point): Rect => {
    const canvas = processedCanvasRef.current
    if (!canvas) return { x: 0, y: 0, w: 0, h: 0 }

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    const x1 = Math.min(point1.x, point2.x)
    const y1 = Math.min(point1.y, point2.y)
    const x2 = Math.max(point1.x, point2.x)
    const y2 = Math.max(point1.y, point2.y)

    const clampedX1 = Math.max(0, Math.min(x1, canvasWidth))
    const clampedY1 = Math.max(0, Math.min(y1, canvasHeight))
    const clampedX2 = Math.max(0, Math.min(x2, canvasWidth))
    const clampedY2 = Math.max(0, Math.min(y2, canvasHeight))

    return {
      x: parseFloat((clampedX1 / canvasWidth).toFixed(4)),
      y: parseFloat((clampedY1 / canvasHeight).toFixed(4)),
      w: parseFloat(((clampedX2 - clampedX1) / canvasWidth).toFixed(4)),
      h: parseFloat(((clampedY2 - clampedY1) / canvasHeight).toFixed(4))
    }
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 2) return
    e.preventDefault()
    e.stopPropagation()

    const coords = getCanvasCoordinates(e)
    setStartPoint(coords)
    setCurrentPoint(coords)
    setIsSelecting(true)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting) return
    e.preventDefault()
    e.stopPropagation()

    const coords = getCanvasCoordinates(e)
    setCurrentPoint(coords)
  }

  // const setROI = (rect: Rect) => {
  //   ROIStore.setState({
  //     x: rect.x,
  //     y: rect.y,
  //     width: rect.w,
  //     height: rect.h
  //   })
  // }

  const setHistogramROI = (rect: Rect) => {
    const x_start = rect.x
    const x_end = rect.x + rect.w
    const y_start = rect.y
    const y_end = rect.y + rect.h

    effectsStore.setState((prev) => ({
      ...prev,
      histogramROI: {
        x_start,
        x_end,
        y_start,
        y_end
      }
    }))
  }

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 2 || !isSelecting) return
    e.preventDefault()
    e.stopPropagation()

    const coords = getCanvasCoordinates(e)
    setCurrentPoint(coords)

    const minSize = 20
    const width = Math.abs(coords.x - startPoint.x)
    const height = Math.abs(coords.y - startPoint.y)

    if (width > minSize && height > minSize) {
      const normalized = normalizeCoordinates(startPoint, coords)
      setSelections((prev) => [...prev, normalized])
      // setROI(normalized)
      setHistogramROI(normalized)
    }

    setIsSelecting(false)
  }

  const canvasToScreenCoordinates = (canvasX: number, canvasY: number): Point => {
    const canvas = processedCanvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const canvasRect = canvas.getBoundingClientRect()
    const transformComponent = transformComponentRef.current
    if (!transformComponent) return { x: 0, y: 0 }

    const transformRect = transformComponent.getBoundingClientRect()

    const screenX =
      (canvasX / canvas.width) * canvasRect.width + (canvasRect.left - transformRect.left)
    const screenY =
      (canvasY / canvas.height) * canvasRect.height + (canvasRect.top - transformRect.top)

    return { x: screenX, y: screenY }
  }

  const renderSelection = () => {
    if (!isSelecting) return null

    const x1 = Math.min(startPoint.x, currentPoint.x)
    const y1 = Math.min(startPoint.y, currentPoint.y)
    const width = Math.abs(currentPoint.x - startPoint.x)
    const height = Math.abs(currentPoint.y - startPoint.y)

    // Converter para coordenadas da tela
    const screenStart = canvasToScreenCoordinates(x1, y1)
    const screenEnd = canvasToScreenCoordinates(x1 + width, y1 + height)
    const screenWidth = screenEnd.x - screenStart.x
    const screenHeight = screenEnd.y - screenStart.y

    return (
      <div
        style={{
          position: 'absolute',
          left: screenStart.x / zoomState,
          top: screenStart.y / zoomState,
          width: screenWidth / zoomState,
          height: screenHeight / zoomState,
          border: '2px solid #5555',
          backgroundColor: 'rgba(200, 200, 200, 0.2)',
          pointerEvents: 'none',
          zIndex: 1000
        }}
      />
    )
  }

  // Renderizar seleções salvas
  const renderSavedSelections = () => {
    const canvas = processedCanvasRef.current
    if (!canvas) return null

    return selections.map((selection, index) => {
      const x = selection.x * canvas.width
      const y = selection.y * canvas.height
      const width = selection.w * canvas.width
      const height = selection.h * canvas.height

      // Converter para coordenadas da tela
      const screenStart = canvasToScreenCoordinates(x, y)
      const screenEnd = canvasToScreenCoordinates(x + width, y + height)
      const screenWidth = screenEnd.x - screenStart.x
      const screenHeight = screenEnd.y - screenStart.y

      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: screenStart.x / zoomState,
            top: screenStart.y / zoomState,
            width: screenWidth / zoomState,
            height: screenHeight / zoomState,
            border: '2px solid #00ff00',
            pointerEvents: 'auto',
            zIndex: 999,
            cursor: 'pointer'
          }}
          onClick={() => {
            setSelections((prev) => prev.filter((_, i) => i !== index))
          }}
        />
      )
    })
  }

  return {
    renderSelection,
    renderSavedSelections,
    isSelecting,
    setIsSelecting,
    onMouseDown,
    onMouseMove,
    onMouseUp
  }
}
