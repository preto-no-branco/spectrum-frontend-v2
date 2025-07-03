import { Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import { ThemeProvider } from './components/themeProvider'
import { routes } from './pages/routes'
import Layout from './components/Layout/Layout'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'

function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster />
          </QueryClientProvider>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
