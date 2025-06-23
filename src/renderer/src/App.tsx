import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { ThemeProvider } from './components/themeProvider'
import { routes } from './pages/routes'

function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Layout>
          <Routes>
            {routes.map((route) => {
              if (route.children) {
                return (
                  <Route key={route.id} path={route.path} element={route.element}>
                    {route.children.map((childRoute) => (
                      <Route
                        key={childRoute.id}
                        path={childRoute.path}
                        element={childRoute.element}
                      />
                    ))}
                  </Route>
                )
              }

              return <Route key={route.id} path={route.path} element={route.element} />
            })}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
