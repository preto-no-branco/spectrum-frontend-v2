import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Alert } from './components/custom/Alert'
import Layout from './components/Layout/Layout'
import { Providers } from './components/Providers'
import { routes } from './pages/routes'

function App(): React.JSX.Element {
  return (
    <Providers>
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
          <Alert />
        </Layout>
      </HashRouter>
    </Providers>
  )
}

export default App
