import Analysis from './analysis/Analysis'
import History from './history/History'
import Home from './home/Home'
import Settings from './settings/Settings'

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/analysis',
    element: <Analysis />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/history',
    element: <History />
  }
] as const

export type RoutePaths = (typeof routes)[number]['path']
