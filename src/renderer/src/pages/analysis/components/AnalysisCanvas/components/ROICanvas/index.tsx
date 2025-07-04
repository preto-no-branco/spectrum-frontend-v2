import React from 'react'
import CanvasRectangle from '../CanvasRectangle'
import { useROICanvas } from './useROICanvas'

interface ROICanvasProps {
  zoomState: number
  processedCanvasRef: React.RefObject<HTMLCanvasElement | null>
  transformComponentRef: React.RefObject<HTMLDivElement | null>
  image: string
}

const ROICanvas: React.FC<ROICanvasProps> = ({
  zoomState,
  processedCanvasRef,
  transformComponentRef,
  image
}) => {
  const { ROIprocessedCanvasRef, deleteROI, RoiRect, contrast, exposure } = useROICanvas({ image })

  if (RoiRect.width === 0 || RoiRect.height === 0) return null

  return (
    <CanvasRectangle
      x={RoiRect.x}
      y={RoiRect.y}
      width={RoiRect.width}
      height={RoiRect.height}
      zoom={zoomState}
      processedCanvasRef={processedCanvasRef}
      transformComponentRef={transformComponentRef}
    >
      <canvas
        style={{
          filter: `contrast(${contrast * 100}%) brightness(${exposure * 100}%)`
        }}
        onClick={deleteROI}
        ref={ROIprocessedCanvasRef}
        className="w-full h-full bg-white"
      />
    </CanvasRectangle>
  )
}

export default ROICanvas
