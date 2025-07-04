import { Point } from '../useRectSelection'

export const canvasToScreenCoordinates = (
  canvasX: number,
  canvasY: number,
  processedCanvasRef,
  zoomState: number,
  transformComponentRef: React.RefObject<HTMLDivElement | null>
): Point => {
  const canvas = processedCanvasRef.current
  if (!canvas) return { x: 0, y: 0 }

  const canvasRect = canvas.getBoundingClientRect()
  const transformComponent = transformComponentRef.current
  if (!transformComponent) return { x: 0, y: 0 }

  const transformRect = transformComponent.getBoundingClientRect()

  const screenX =
    ((canvasX / canvas.width) * canvasRect.width + (canvasRect.left - transformRect.left)) /
    zoomState
  const screenY =
    ((canvasY / canvas.height) * canvasRect.height + (canvasRect.top - transformRect.top)) /
    zoomState

  return { x: screenX, y: screenY }
}
