# Documentação de Desenvolvimento do Electron

Esta documentação descreve a arquitetura e as práticas recomendadas para o desenvolvimento do backend e frontend de uma aplicação Electron, com ênfase em rotas IPC, gerenciamento de múltiplas janelas e compartilhamento de estado entre instâncias. Ao final, há um exemplo de uso dos hooks React que facilitam a integração com esses recursos.

---

## Sumário

1. [Backend Electron](#backend-electron)
   1.1. [Rotas IPC](#rotas-ipc)
    1.1.1. [IpcFactory e BaseIpcService](#ipcfactory-e-baseipcservice)
    1.1.2. [Registro de Listeners e Handlers](#registro-de-listeners-e-handlers)
    1.1.3. [Debug e Logging](#debug-e-logging)
   1.2. [Gerenciamento de Janelas](#gerenciamento-de-janelas)
    1.2.1. [WindowManager](#windowmanager)
    1.2.2. [Integração com o Frontend](#integração-com-o-frontend)

2. [SharedState](#sharedstate)
   2.1. [Conceito e Motivação](#conceito-e-motivação)
   2.2. [Funcionamento Geral](#funcionamento-geral)
   2.3. [Hook `useSharedState`](#hook-usesharedstate)

3. [Hook `useWindowManager`](#hook-usewindowmanager)

4. [Exemplo de Uso dos Hooks](#exemplo-de-uso-dos-hooks)

---

## Backend Electron

### Rotas IPC

Para permitir a comunicação entre o processo principal (Main) e as janelas Renderer, utilizamos rotas IPC (Inter-Process Communication). O padrão adotado neste projeto segue a implementação de uma **fábrica de IPCs** (IpcFactory) combinada a uma interface base que padroniza a criação de cada rota.

#### IpcFactory e BaseIpcService

- **`BaseIpcService`**:

  - Define métodos obrigatórios para qualquer serviço IPC, garantindo que todas as rotas sigam o mesmo contrato.
  - Contém plataformas para registro de _listeners_ (eventos sem resposta) e _handlers_ (requisições que retornam dados).

- **`IpcFactory`**:

  - Responsável por criar instâncias de classes que implementam `BaseIpcService`.
  - No arquivo `index.ts` do backend, a função `createIPCHandlers()` itera sobre todas as classes registradas, chamando `IpcFactory.create()` para instanciá-las e registrar suas rotas junto ao Electron.
  - Permite adicionar novas rotas apenas criando uma classe que implemente `BaseIpcService` e registrando-a no processo de _build_ de IPCs.

#### Registro de Listeners e Handlers

- Cada classe que implementa `BaseIpcService` deve:

  1. Declarar suas **rotas de _listeners_**, que recebem eventos do frontend sem necessidade de retorno (ex.: notificações).
  2. Declarar suas **rotas de _handlers_**, que executam alguma lógica e retornam uma resposta ao frontend (ex.: consultas a banco de dados).

- A função `registerIpcListeners()` mapeia as rotas de _listeners_ usando `ipcMain.on(...)`.

- A função `registerIpcHandlers()` mapeia as rotas de _handlers_ usando `ipcMain.handle(...)`.

- Ao criar uma nova rota, basta:

  1. Adicionar um método na classe de serviço que escute ou atenda a um canal específico.
  2. Chamar, no construtor ou em método de inicialização, `registerIpcListeners()` e/ou `registerIpcHandlers()`.
  3. Garantir que a classe seja instanciada dentro de `createIPCHandlers()` (ou flow semelhante) via `IpcFactory.create()`.

#### Debug e Logging

- Todas as classes que implementam `BaseIpcService` devem oferecer um **modo DEBUG**, que:

  - Registra logs detalhados ao receber chamadas IPC e ao finalizar o processamento.
  - Facilita o diagnóstico de problemas, mostrando os parâmetros recebidos, rotas acionadas e respostas enviadas.
  - Pode ser habilitado por meio de uma flag de ambiente ou configuração global no `Main` do Electron.

- Exemplo de boas práticas de logging no modo DEBUG:

  - Prefixar cada mensagem com o nome da classe e do método.
  - Incluir timestamps ou contadores básicos para rastrear a ordem de eventos.
  - Tratar erros com `_catch_` para evitar falhas silenciosas.

---

### Gerenciamento de Janelas

Em aplicações que precisam manipular múltiplas janelas (abrir, duplicar, fechar), é fundamental centralizar essa lógica para manter consistência e evitar código disperso.

#### WindowManager

- A classe **`WindowManager`** é responsável por:

  - Criar novas janelas a partir de rotas definidas no frontend.
  - Rastrear instâncias abertas para permitir, por exemplo, reabertura ou bring-to-front.
  - Controlar configurações padrão de cada janela (tamanho, ações do menu, propriedades de segurança).

- Em vez de usar diretamente `new BrowserWindow(...)`, todo fluxo deve ser executado por meio de `WindowManager`, que encapsula a criação, duplicação ou fechamento de janelas.

#### Integração com o Frontend

- No frontend React, disponibilizamos um hook chamado `useWindowManager` que:

  - Expõe a função `createWindow(route: string)`.
  - Executa internamente `window.api.createWindow(route)`, roteando a criação de janelas ao processo principal.

- Esse padrão garante que o frontend não precise conhecer detalhes da API IPC para abrir janelas, bastando invocar `createWindow('/rota-exemplo')`.

---

## SharedState

### Conceito e Motivação

- O **SharedState** permite compartilhar dados entre diferentes janelas do Electron.

- O funcionamento interno é similar ao `localStorage` do navegador, porém:

  - Armazena apenas **strings** (portanto, objetos complexos devem ser serializados em JSON).
  - Opera via IPC, notificando o processo principal sobre alterações, que repassa o evento para todas as janelas registradas.

- Isso simplifica cenários como:

  - Sincronizar configurações do usuário em tempo real.
  - Manter um “estado global” para temas, preferências ou dados temporários.
  - Evitar a necessidade de propagar manualmente eventos de uma janela para outra.

### Funcionamento Geral

1. **Leitura Inicial**

   - Ao montar um componente que usa SharedState, o hook chama `sharedStateGetItem(key)` no Main.
   - Se não existir valor para a chave, o hook grava `initialValue` convertido para string JSON em `sharedStateSetItem(key, rawString)`.
   - Caso exista um valor, a string é desserializada e atualiza o estado local do componente.

2. **Escuta de Atualizações**

   - O processo Main, ao receber uma nova gravação de SharedState, emite um evento `shared-state-updated` para todas as janelas.
   - Cada hook que se inscreveu para a mesma `key` recebe a notificação com `(key, rawValue)`.
   - O hook converte `rawValue` para o tipo original e atualiza o estado React.

3. **Gravações de Estado**

   - Quando o hook chama `setSharedValue(newValue)`, converte `newValue` para JSON e envia ao Main via `sharedStateSetItem(key, rawString)`.
   - O estado local do componente é atualizado imediatamente, antes mesmo da confirmação do IPC, garantindo sensação de reatividade.

---

### Hook `useSharedState`

Embora a implementação completa não seja mostrada aqui, o hook segue estes princípios:

- **Assinatura**

  ```ts
  useSharedState<T>(key: string, initialValue: T): [T, (newValue: T) => void]
  ```

- **Comportamentos Principais**

  - Inicia com o valor recuperado de `sharedStateGetItem(key)` ou com `initialValue`.
  - Registra listener de `shared-state-updated` apenas uma vez, ignorando valores de outras chaves.
  - Lida com erros de parsing JSON e serialização, exibindo warnings no console.
  - Atualiza o estado local antes de disparar o IPC de gravação.

---

## Hook `useWindowManager`

O hook `useWindowManager` é extremamente simples:

- **Assinatura**

  ```ts
  useWindowManager(): { createWindow: (route: string) => void }
  ```

- **Responsabilidade**

  - Encapsula a chamada a `window.api.createWindow(route)`.
  - Permite que componentes React solicitem a criação de janelas sem acessar diretamente objetos do Electron ou IPC.

- **Fluxo Interno**

  - Ao chamar `useWindowManager()`, retorna um objeto `{ createWindow }`.
  - Quando `createWindow` é invocado com uma rota (por exemplo, `/settings`), o hook faz `window.api.createWindow('/settings')`.
  - No processo Main, existe um listener que responde a essa chamada e, através do `WindowManager`, abre a nova janela com o conteúdo adequado.

---

## Exemplo de Uso dos Hooks

A seguir, um exemplo minimalista de como utilizar ambos os hooks em um componente React. Nenhuma implementação interna do hook é mostrada — apenas o cenário de uso:

```tsx
import React from 'react'
import { useSharedState, useWindowManager } from 'path/to/hooks'

export function MeuDashboard() {
  // Compartilha o tema da aplicação entre janelas
  const [tema, setTema] = useSharedState('appTheme', 'claro')

  // Permite abrir uma nova janela para configurações
  const { createWindow } = useWindowManager()

  const alternarTema = () => {
    const novo = tema === 'claro' ? 'escuro' : 'claro'
    setTema(novo)
  }

  const abrirConfig = () => {
    createWindow('/configuracoes')
  }

  return (
    <div>
      <h1>Dashboard Principal</h1>
      <p>Tema atual: {tema}</p>
      <button onClick={alternarTema}>
        Alternar para tema {tema === 'claro' ? 'escuro' : 'claro'}
      </button>
      <button onClick={abrirConfig}>Abrir Configurações em nova janela</button>
    </div>
  )
}
```
