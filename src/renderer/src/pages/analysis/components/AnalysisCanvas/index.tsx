import React, { useEffect, useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import imageForTest from '../../../../assets/xray3.png'
import { useOpenCV } from '@renderer/Image-processing/contexts/OpenCVContext'
import ImageProcessing from '@renderer/Image-processing'
import { LinearMapStep } from '@renderer/Image-processing/pipeline/steps/linearMap'
import { EffectStep } from '@renderer/Image-processing/pipeline/steps/effects'
import { useStore } from '@tanstack/react-store'
import { effectsStore } from '../../stores/effectsStore'
import { ColorMapStep } from '@renderer/Image-processing/pipeline/steps/colorMap'
import Tags from './Tags'

const AnalysisCanvas: React.FC = () => {
  const { cv } = useOpenCV()
  const { colorMap, linearMap, effectStack, contrast, exposure } = useStore(
    effectsStore,
    (state) => ({
      colorMap: state.colorMap,
      linearMap: state.linearMap,
      effectStack: state.effectStack,
      contrast: state.contrast,
      exposure: state.exposure
    })
  )
  const processedCanvasRef = useRef<HTMLCanvasElement>(null)
  const processorRef = useRef<ImageProcessing | null>(null)

  const [zoomState, setZoomState] = React.useState(1)

  useEffect(() => {
    if (!cv || !processedCanvasRef.current) return
    processorRef.current = new ImageProcessing(cv, processedCanvasRef.current, imageForTest)
  }, [cv])

  useEffect(() => {
    if (!processorRef.current) return
    processorRef.current.effectStep(effectStack, new EffectStep(cv!))
    processorRef.current.linearMapStep(linearMap, new LinearMapStep(cv!))
    processorRef.current.colorMapStep(colorMap, new ColorMapStep(cv!))
    processorRef.current.processImage()
  }, [colorMap, linearMap, effectStack, cv])

  const preventRightClick = (e: React.MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div className="text-center h-full w-full">
      <div className="flex gap-6 justify-center h-full">
        <div className="relative flex-1 h-full bg-white ">
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
              <>
                <TransformComponent
                  wrapperProps={{
                    onPointerDown: preventRightClick
                  }}
                >
                  <div className="p-8 bg-white h-[85vh] w-full flex items-center justify-center">
                    <canvas
                      style={{
                        filter: `contrast(${contrast * 100}%) brightness(${exposure * 100}%)`
                      }}
                      ref={processedCanvasRef}
                      className="w-full h-auto bg-white"
                    />
                  </div>
                </TransformComponent>
                <Tags
                  zoomIn={zoomIn}
                  zoomOut={zoomOut}
                  resetTransform={resetTransform}
                  zoomState={(zoomState * 100).toFixed(0)}
                />
              </>
            )}
          </TransformWrapper>
        </div>
      </div>
    </div>
  )
}

export default AnalysisCanvas
