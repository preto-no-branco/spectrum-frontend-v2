import React, { useEffect, useRef, useState } from 'react'
import { useOpenCV } from './contexts/OpenCVContext'
import ImageProcessing, { ColorMapType } from '.'
import imageForTest from '../assets/xray3.png'
import { EffectStep } from './pipeline/steps/effects'
import { LinearMapStep } from './pipeline/steps/linearMap'
import { ColorMapStep } from './pipeline/steps/colorMap'

const ImageProcessingTest: React.FC = () => {
  const { cv } = useOpenCV()
  const [selectedColorMap, setSelectedColorMap] = useState<ColorMapType>('')
  const processedCanvasRef = useRef<HTMLCanvasElement>(null)

  const processorRef = useRef<ImageProcessing | null>(null)

  useEffect(() => {
    if (!cv || !processedCanvasRef.current) return
    const procCanvas = processedCanvasRef.current
    processorRef.current = new ImageProcessing(cv, procCanvas, imageForTest)
  }, [cv])

  useEffect(() => {
    const processImage = () => {
      if (!processorRef.current || !processedCanvasRef.current) return
      processorRef.current.linearMapStep('gammaMap2', new LinearMapStep(cv!))
      processorRef.current.effectStep(['edgeDetection'], new EffectStep(cv!))
      processorRef.current.colorMapStep('electric', new ColorMapStep(cv!))

      processorRef.current.processImage()
    }

    if (processorRef.current) {
      processImage()
    }
  }, [selectedColorMap, cv])

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Teste de Mapa de Cores</h1>

      <div style={{ marginBottom: 16 }}>
        <select
          value={selectedColorMap}
          onChange={(e) => setSelectedColorMap(e.target.value as ColorMapType)}
          style={{ marginLeft: 10 }}
        >
          <option value="">Nenhum</option>
          <option value="velocity-green">Velocidade Verde</option>
          <option value="velocity-blue">Velocidade Azul</option>
          <option value="phase">Fase</option>
          <option value="oxygen">Oxigênio</option>
          <option value="magma">Magma</option>
          <option value="electric">Elétrico</option>
          <option value="copper">Cobre</option>
          <option value="hot">Quente</option>
          <option value="rainbow">Arco-íris</option>
          <option value="freesurface-blue">Superfície Livre Azul</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
        <div>
          <h3>Processada</h3>
          <canvas className="w-full border border-white" ref={processedCanvasRef} />
        </div>
      </div>
    </div>
  )
}

export default ImageProcessingTest
