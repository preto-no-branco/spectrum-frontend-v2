import { Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import { ThemeProvider } from './components/themeProvider'
import { routes } from './pages/routes'
import Frame from './components/Frame/Frame'

function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Frame>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Frame>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
