import Analysis from './analysis/Analysis'
import Home from './home/Home'

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/analysis',
    element: <Analysis />
  }
] as const

export type RoutePaths = (typeof routes)[number]['path']
