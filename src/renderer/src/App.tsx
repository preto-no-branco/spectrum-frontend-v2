import { Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import Analysis from './pages/analysis/Analysis'
import RouteLogger from './components/RouteLogger'

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <RouteLogger />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        {/* Redireciona qualquer rota inválida para Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  )
}

export default App
