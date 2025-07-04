import React, { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import imageForTest from '../../../../assets/xray3.png'
import { useOpenCV } from '@renderer/Image-processing/contexts/OpenCVContext'
import ImageProcessing from '@renderer/Image-processing'
import { LinearMapStep } from '@renderer/Image-processing/pipeline/steps/linearMap'
import { EffectStep } from '@renderer/Image-processing/pipeline/steps/effects'
import { useStore } from '@tanstack/react-store'
import { effectsStore } from '../../stores/effectsStore'
import { ColorMapStep } from '@renderer/Image-processing/pipeline/steps/colorMap'
import Tags from './components/Tags'
import { useRectSelection } from './useRectSelection'
import ROICanvas from './components/ROICanvas'
import CanvasMiniMap from './components/MiniMap'
import { ROIStore } from '../../stores/ROIStore'
import { HistogramStep } from '@renderer/Image-processing/pipeline/steps/histogram'

const AnalysisCanvas: React.FC = () => {
  const { cv } = useOpenCV()
  const { colorMap, linearMap, effectStack, contrast, exposure, histogramROI } = useStore(
    effectsStore,
    (state) => ({
      colorMap: state.colorMap,
      linearMap: state.linearMap,
      effectStack: state.effectStack,
      contrast: state.contrast,
      exposure: state.exposure,
      histogramROI: state.histogramROI
    })
  )
  const RoiRect = useStore(ROIStore, (state) => state)
  const hasROISelected = RoiRect.width > 0 && RoiRect.height > 0

  const processedCanvasRef = useRef<HTMLCanvasElement>(null)
  const processorRef = useRef<ImageProcessing | null>(null)
  const transformComponentRef = useRef<HTMLDivElement>(null)

  const [zoomState, setZoomState] = useState(1)

  const { renderSelection, isSelecting, onMouseDown, onMouseMove, onMouseUp } = useRectSelection(
    zoomState,
    processedCanvasRef,
    transformComponentRef
  )

  useEffect(() => {
    if (!cv || !processedCanvasRef.current) return
    processorRef.current = new ImageProcessing(cv, processedCanvasRef.current, imageForTest)
  }, [cv])

  useEffect(() => {
    if (!processorRef.current) return
    if (hasROISelected) return
    processorRef.current.histogramStep(histogramROI, new HistogramStep(cv!))
    processorRef.current.linearMapStep(linearMap, new LinearMapStep(cv!))
    processorRef.current.effectStep(effectStack, new EffectStep(cv!))
    processorRef.current.colorMapStep(colorMap, new ColorMapStep(cv!))
    processorRef.current.processImage()
  }, [colorMap, linearMap, effectStack, cv, hasROISelected, histogramROI])

  const preventRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <div className="text-center h-full w-full">
      <div className="flex gap-6 justify-center h-full">
        <div className="relative flex-1 h-full bg-white">
          <TransformWrapper
            disablePadding
            minScale={0.8}
            maxScale={8}
            initialScale={1}
            doubleClick={{ disabled: true }}
            onZoom={(e) => {
              setZoomState(e.state.scale)
            }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <div className="relative h-full w-full">
                <CanvasMiniMap image={imageForTest} />
                <TransformComponent wrapperClass='w-full!'>
                  <div
                    ref={transformComponentRef}
                    // fill all available space
                    className=" bg-white h-[85vh] w-auto flex items-center justify-center relative"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onContextMenu={preventRightClick}
                    style={{ cursor: isSelecting ? 'crosshair' : 'grab' }}
                  >
                    <canvas
                      style={{
                        filter: `contrast(${contrast * 100}%) brightness(${exposure * 100}%)`
                      }}
                      ref={processedCanvasRef}
                      className="w-full h-auto bg-white"
                    />
                    <ROICanvas
                      processedCanvasRef={processedCanvasRef}
                      transformComponentRef={transformComponentRef}
                      zoomState={zoomState}
                      image={imageForTest}
                    />
                    {renderSelection()}
                  </div>
                </TransformComponent>
                <Tags
                  mode={'MOVE'}
                  zoomIn={zoomIn}
                  zoomOut={zoomOut}
                  resetTransform={resetTransform}
                  zoomState={(zoomState * 100).toFixed(0)}
                />
              </div>
            )}
          </TransformWrapper>
        </div>
      </div>
    </div>
  )
}

export default AnalysisCanvas
