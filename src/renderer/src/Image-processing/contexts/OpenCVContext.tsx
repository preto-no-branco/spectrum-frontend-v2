// src/OpenCVContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import type { CV } from '@techstark/opencv-js'
import OpenCV from '../openCv'

interface OpenCVContextValue {
  cv: CV | null
  ready: boolean
  error: Error | null
}

const OpenCVContext = createContext<OpenCVContextValue>({
  cv: null,
  ready: false,
  error: null
})

export const OpenCVProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cvObj, setCvObj] = useState<CV | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    console.log('[OpenCVContext] Montando Provider, iniciando OpenCV.getCV()...')
    OpenCV.getCV()
      .then((cv) => {
        if (cancelled) {
          console.log('[OpenCVContext] Montagem cancelada, ignorando resultado getCV')
          return
        }
        console.log('[OpenCVContext] getCV retornou CV, setando cvObj e ready=true')
        setCvObj(cv)
        setReady(true)
      })
      .catch((err) => {
        if (cancelled) return
        console.error('[OpenCVContext] Erro ao inicializar OpenCV:', err)
        setError(err instanceof Error ? err : new Error(String(err)))
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Opcional logs de mudança
  useEffect(() => {
    if (ready) console.log('[OpenCVContext] ready mudou para true')
  }, [ready])
  useEffect(() => {
    if (error) console.error('[OpenCVContext] error mudou:', error)
  }, [error])

  return (
    <OpenCVContext.Provider value={{ cv: cvObj, ready, error }}>{children}</OpenCVContext.Provider>
  )
}

export const useOpenCV = (): OpenCVContextValue => {
  const ctx = useContext(OpenCVContext)
  return ctx
}
