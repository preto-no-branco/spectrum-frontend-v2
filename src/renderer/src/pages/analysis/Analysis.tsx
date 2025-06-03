import React, { useState, useEffect, useCallback } from 'react'
import { useWindowManager } from '@renderer/hooks/useWindowManager'
import { Link } from 'react-router-dom'

function Analysis(): React.JSX.Element {
  const { createWindow } = useWindowManager()

  // State for token input
  const [token, setToken] = useState<string>('')
  // Is the socket connected?
  const [isConnected, setIsConnected] = useState<boolean>(false)
  // Control play/pause: when paused, we ignore incoming inspection data
  const [isPaused, setIsPaused] = useState<boolean>(true)
  // Latest inspection payload (as JSON string)
  const [inspectionData, setInspectionData] = useState<string>('— aguardando dados —')

  // Keep a stable reference to the socket
  const socket = window.api.socket

  // Handler for when the socket connects
  const handleConnected = useCallback(() => {
    setIsConnected(true)
  }, [])

  // Handler for incoming inspection events
  const handleInspection = useCallback(
    (data: unknown) => {
      if (!isPaused) {
        try {
          setInspectionData(JSON.stringify(data, null, 2))
        } catch {
          setInspectionData(String(data))
        }
      }
    },
    [isPaused]
  )

  useEffect(() => {
    // Register event listeners once on mount
    socket.onConnected(handleConnected)
    socket.onInspection(handleInspection)

    // Clean up on unmount
    return () => {
      // If the socket API offers a way to remove listeners, do so here.
      // For example:
      // socket.offConnected(handleConnected)
      // socket.offInspection(handleInspection)
      // If not, this is still safe; React will unmount and ignore callbacks.
    }
  }, [socket, handleConnected, handleInspection])

  // Attempt to connect and log in using the provided token
  const connectAndLogin = async (): Promise<void> => {
    if (!token) {
      alert('Por favor, insira um token válido antes de conectar.')
      return
    }

    try {
      // Tenta conectar (ajuste a URL se necessário)
      await socket.connect('https://example.com')
      // Faz login usando o token fornecido
      socket.login(token)
      setIsPaused(false) // Ao conectar, já começamos em “play”
    } catch (err) {
      console.error('Erro ao conectar/login no socket:', err)
      alert('Falha ao conectar ou fazer login. Verifique o token e tente novamente.')
    }
  }

  // Toggle play/pause: quando em pause, ignoramos novos dados
  const togglePlayPause = (): void => {
    setIsPaused((prev) => !prev)
  }

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Analysis Page</h1>

      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>
          Back to Home
        </Link>
      </nav>

      <section
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          maxWidth: '400px'
        }}
      >
        <h2>Socket Test</h2>

        {/* Token Input */}
        <div style={{ marginBottom: '0.5rem' }}>
          <label htmlFor="token" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Token:
          </label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Digite seu token aqui"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #888',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Connect & Login Button */}
        <button
          onClick={connectAndLogin}
          disabled={isConnected}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: isConnected ? '#ccc' : '#4caf50',
            color: '#fff',
            cursor: isConnected ? 'not-allowed' : 'pointer'
          }}
        >
          {isConnected ? 'Conectado' : 'Conectar & Login'}
        </button>

        {/* Play/Pause Toggle */}
        <button
          onClick={togglePlayPause}
          disabled={!isConnected}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: isPaused ? '#2196f3' : '#f44336',
            color: '#fff',
            cursor: !isConnected ? 'not-allowed' : 'pointer'
          }}
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>

        {/* Connection Status */}
        <div style={{ marginTop: '0.5rem' }}>
          <strong>Status:</strong>{' '}
          {isConnected ? (
            <span style={{ color: 'green' }}>Conectado</span>
          ) : (
            <span style={{ color: 'red' }}>Desconectado</span>
          )}
        </div>
      </section>

      <section
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          maxWidth: '600px',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#f9f9f9'
        }}
      >
        <h2>Última Inspeção Recebida</h2>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '0.5rem',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          {inspectionData}
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <button
          onClick={() => {
            createWindow('/')
          }}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #888',
            backgroundColor: '#eee',
            cursor: 'pointer'
          }}
        >
          criar home
        </button>
        <button
          onClick={() => {
            createWindow('/analysis')
          }}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '1px solid #888',
            backgroundColor: '#eee',
            cursor: 'pointer'
          }}
        >
          criar analysis
        </button>
      </section>
    </div>
  )
}

export default Analysis
