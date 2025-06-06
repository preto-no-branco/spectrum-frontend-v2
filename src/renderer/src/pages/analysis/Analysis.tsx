// src/renderer/pages/Analysis.tsx

import React, { useRef, useCallback, useState } from 'react'
import { useWindowManager } from '@renderer/hooks/useWindowManager'
import { Link } from 'react-router-dom'

function Analysis(): React.JSX.Element {
  const { createWindow } = useWindowManager()

  const t0Ref = useRef<number | null>(null)
  const t1Ref = useRef<number | null>(null)

  // Guarda a URL img://out.png?t=<timestamp>
  const [imgSrc, setImgSrc] = useState<string>('')

  // Efetua chamada RPC para cimp com o efeito desejado
  const runEffect = useCallback(async (effect: string): Promise<void> => {
    const t0 = performance.now()
    t0Ref.current = t0
    console.log(`[Perf] Botão clicado em t0 = ${t0.toFixed(2)} ms (effect = ${effect})`)

    try {
      // Passamos 'effect' como argumento no invoke
      const resultado = await window.api.runCimp(effect)
      const t1 = performance.now()
      t1Ref.current = t1

      console.log(
        `[Perf] runCimp retornou em t1 = ${t1.toFixed(2)} ms (RPC duration = ${(t1 - t0).toFixed(
          2
        )} ms)`
      )

      if (resultado.success) {
        console.log('[IPC] Sucesso ao processar imagem. URI base =', resultado.data)
        // Acrescenta timestamp para forçar reload e evitar cache
        const baseUri = resultado.data as string // ex: "img://out.png"
        const newSrc = `${baseUri}?t=${Date.now()}`
        setImgSrc(newSrc)
      } else {
        console.error('[IPC] Erro ao processar imagem:', resultado.error)
      }
    } catch (err) {
      console.error('Erro inesperado ao chamar runCimp():', err)
    }
  }, [])

  const handleImgLoad = useCallback(() => {
    const t0 = t0Ref.current
    const t1 = t1Ref.current
    const t3 = performance.now()

    if (t0 !== null && t1 !== null) {
      const rpcDuration = t1 - t0
      const renderDuration = t3 - t1
      const totalDuration = t3 - t0

      console.log(`[Perf] <img> carregou em t3 = ${t3.toFixed(2)} ms`)
      console.log(`  - RPC Duration = ${rpcDuration.toFixed(2)} ms`)
      console.log(
        `  - Tempo desde retorno do IPC até render <img> = ${renderDuration.toFixed(2)} ms`
      )
      console.log(`  - Tempo total (t0 → t3) = ${totalDuration.toFixed(2)} ms`)
    }
  }, [])

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Analysis Page</h1>

      {/* Botões separados para cada efeito */}
      <div>
        <button
          onClick={() => runEffect('invert')}
          style={{
            marginRight: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '1px solid #888',
            backgroundColor: '#e0f7fa',
            cursor: 'pointer'
          }}
        >
          Inverter Imagem
        </button>
        <button
          onClick={() => runEffect('clahe')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '1px solid #888',
            backgroundColor: '#fce4ec',
            cursor: 'pointer'
          }}
        >
          Aplicar CLAHE
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h2>Imagem</h2>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="Imagem processada"
            onLoad={handleImgLoad}
            style={{
              maxWidth: '100%',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          />
        ) : (
          <p>Nenhuma imagem processada ainda.</p>
        )}
      </div>

      <nav style={{ margin: '1.5rem 0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>
          Back to Home
        </Link>
      </nav>

      <section style={{ marginTop: '2rem' }}>
        <button
          onClick={() => createWindow('/')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #888',
            backgroundColor: '#eee',
            cursor: 'pointer'
          }}
        >
          Criar Home
        </button>
        <button
          onClick={() => createWindow('/analysis')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '1px solid #888',
            backgroundColor: '#eee',
            cursor: 'pointer'
          }}
        >
          Criar Analysis
        </button>
      </section>
    </div>
  )
}

export default Analysis
