import { Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import Analysis from './pages/analysis/Analysis'
import RouteLogger from './components/RouteLogger'
import { ThemeProvider } from './components/themeProvider'
import Topbar from './components/Topbar'

function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <RouteLogger />
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          {/* Redireciona qualquer rota inválida para Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
