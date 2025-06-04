import { useEffect, useState, useRef } from 'react'

/**
 * Hook genérico para criar um “estado compartilhado” entre múltiplas janelas do Electron,
 * usando seu IPC de SharedState que só armazena strings (igual ao localStorage).
 *
 * @template T  — tipo do valor que você quer guardar (objeto, número, boolean etc.)
 * @param key         — chave única no shared state (string)
 * @param initialValue — valor inicial de tipo T, usado caso ainda não haja nada no armazenamento
 *
 * @returns [value: T, setValue: (v: T) => void]
 *
 * ### Como funciona por dentro:
 * 1. Na montagem do componente, o hook:
 *    a) chama `sharedStateGetItem(key)` para ver se já existe algo no store.
 *       • Se retornar `null`, converte `initialValue` em string JSON e salva via `sharedStateSetItem`.
 *       • Se retornar uma string, faz `JSON.parse(raw)` para transformar em T e atualiza o estado local.
 * 2. Registra um listener em `shared-state-updated` para receber notificações vindas do Main sempre que qualquer janela
 *    (inclusive esta) chamar `sharedStateSetItem(key, ...)`.
 *    Quando o hook recebe um update, ele faz `JSON.parse` e atualiza o estado React.
 * 3. O `setSharedValue(newValue: T)`
 *    • converte `newValue` em JSON (string) via `JSON.stringify(newValue)`
 *    • dispara `sharedStateSetItem(key, rawString)`, o que grava no Main e notifica todas as janelas.
 *    • atualiza imediatamente o estado local para `newValue`.
 *
 */

interface SharedStateMap {
  text: string
}
export function useSharedState<K extends keyof SharedStateMap>(
  key: K,
  initialValue: SharedStateMap[K]
): [SharedStateMap[K], (newValue: SharedStateMap[K]) => void] {
  const [state, setState] = useState<SharedStateMap[K]>(initialValue)

  const didInitialize = useRef(false)

  useEffect(() => {
    if (!didInitialize.current) {
      didInitialize.current = true

      window.api
        .sharedStateGetItem(key)
        .then((rawValue: string | null) => {
          if (rawValue !== null) {
            try {
              const parsed = JSON.parse(rawValue) as SharedStateMap[K]
              setState(parsed)
            } catch {
              console.warn(
                `[useSharedState] Não foi possível parsear JSON para a chave "${key}":`,
                rawValue
              )
            }
          } else {
            try {
              const asString = JSON.stringify(initialValue)
              window.api.sharedStateSetItem(key, asString)
            } catch {
              console.warn(
                `[useSharedState] Não foi possível converter initialValue para JSON na chave "${key}":`,
                initialValue
              )
            }
          }
        })
        .catch((err: unknown) => {
          console.error(
            `[useSharedState] Erro ao chamar sharedStateGetItem para a chave "${key}":`,
            err
          )
        })

      const handleSharedUpdate = (updatedKey: string, rawValue: string): void => {
        if (updatedKey === key) {
          try {
            const parsed = JSON.parse(rawValue) as SharedStateMap[K]
            setState(parsed)
          } catch {
            console.warn(
              `[useSharedState] Não foi possível parsear JSON no update para chave "${key}":`,
              rawValue
            )
          }
        }
      }

      window.api.sharedStateUpdated(handleSharedUpdate)
    }
  }, [key, initialValue])

  const setSharedValue = (newValue: SharedStateMap[K]): void => {
    setState(newValue)

    try {
      const raw = JSON.stringify(newValue)
      window.api.sharedStateSetItem(key, raw)
    } catch {
      console.warn(
        `[useSharedState] Não foi possível converter newValue para JSON na chave "${key}":`,
        newValue
      )
    }
  }

  return [state, setSharedValue]
}
