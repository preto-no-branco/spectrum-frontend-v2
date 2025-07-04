import { useEffect, useRef, useState } from 'react'
import { ROIStore } from '@renderer/pages/analysis/stores/ROIStore'
import { useStore } from '@tanstack/react-store'
import ImageProcessing from '@renderer/Image-processing'
import { useOpenCV } from '@renderer/Image-processing/contexts/OpenCVContext'
import { ColorMapStep } from '@renderer/Image-processing/pipeline/steps/colorMap'
import { effectsStore } from '@renderer/pages/analysis/stores/effectsStore'
import { EffectStep } from '@renderer/Image-processing/pipeline/steps/effects'
import { LinearMapStep } from '@renderer/Image-processing/pipeline/steps/linearMap'
export const useROICanvas = ({ image }: { image: string }) => {
  const { cv } = useOpenCV()
  const ROIprocessedCanvasRef = useRef<HTMLCanvasElement>(null)
  const processorRef = useRef<ImageProcessing | null>(null)
  const [croppedDataUrl, setCroppedDataUrl] = useState<string | null>(null)

  const RoiRect = useStore(ROIStore, (state) => state)

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

  const deleteROI = () => {
    ROIStore.setState({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    })
    if (processorRef.current) {
      processorRef.current = null
    }
    setCroppedDataUrl(null)
  }

  useEffect(() => {
    if (!cv || !ROIprocessedCanvasRef.current) return
    const imgEl = new window.Image()
    imgEl.crossOrigin = 'anonymous'
    imgEl.src = image
    imgEl.onload = () => {
      const ow = imgEl.naturalWidth
      const oh = imgEl.naturalHeight
      const xPx = RoiRect.x * ow
      const yPx = RoiRect.y * oh
      const wPx = RoiRect.width * ow
      const hPx = RoiRect.height * oh

      const off = document.createElement('canvas')
      off.width = wPx
      off.height = hPx
      const ctx = off.getContext('2d')
      if (!ctx) return
      ctx.drawImage(imgEl, xPx, yPx, wPx, hPx, 0, 0, wPx, hPx)

      const dataUrl = off.toDataURL()
      setCroppedDataUrl(dataUrl)
      processorRef.current = new ImageProcessing(cv, ROIprocessedCanvasRef.current!, dataUrl)
    }
  }, [cv, image, RoiRect])

  useEffect(() => {
    const proc = processorRef.current
    if (!proc) return
    proc.effectStep(effectStack, new EffectStep(cv!))
    proc.linearMapStep(linearMap, new LinearMapStep(cv!))
    proc.colorMapStep(colorMap, new ColorMapStep(cv!))
    proc.processImage()
    proc.processImage()
  }, [cv, RoiRect, croppedDataUrl, colorMap, linearMap, effectStack, contrast, exposure])

  return {
    ROIprocessedCanvasRef,
    croppedDataUrl,
    deleteROI,
    RoiRect,
    contrast,
    exposure
  }
}
