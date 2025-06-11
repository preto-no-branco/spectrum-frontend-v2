import { Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import RouteLogger from './components/RouteLogger'
import { ThemeProvider } from './components/themeProvider'
import Topbar from './components/Topbar'
import { routes } from './pages/routes'

function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <RouteLogger />
        <Topbar />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
