import Analysis from './analysis/Analysis'
import History from './history/History'
import Home from './home/Home'
import Settings from './settings/Settings'
import LoginPage from './login/Login'

export const routes = [
  {
    id: 'home',
    path: '/home',
    element: <Home />
  },
  {
    id: 'analysis',
    path: '/analysis',
    element: <Analysis />
  },
  {
    id: 'settings',
    path: '/settings',
    element: <Settings />
  },
  {
    id: 'history',
    path: '/history',
    element: <History />
  },
  {
    id: 'login',
    path: '/login',
    element: <LoginPage />
  }
] as const

export type RoutePaths = (typeof routes)[number]['path']
