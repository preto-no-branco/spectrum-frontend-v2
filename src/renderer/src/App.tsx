import { Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import { ThemeProvider } from './components/themeProvider'
import { routes } from './pages/routes'
import Layout from './components/Layout/Layout'
import { Toaster } from './components/ui/sonner'


function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </HashRouter>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
