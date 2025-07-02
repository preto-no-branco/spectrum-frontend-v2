import { APP_ROUTES, AppRouteValues } from '@renderer/core/constants/appRoutes'
import Analysis from './analysis/Analysis'
import History from './history/History'
import Home from './home/Home'
import AccessSettings from './settings/AccessSettings'
import CategoriesSettings from './settings/CategoriesSettings'
import InspectionsSettings from './settings/InspectionsSettings'
import Settings from './settings/Settings'
import SystemSettings from './settings/SystemSettings'
import UserSettings from './settings/UserSettings'
import { AnalysisDetails } from './analysis/AnalysisDetails'

type Routes = {
  id: string
  path: AppRouteValues
  element: React.ReactNode
  children?: Routes[]
}

export const routes: Routes[] = [
  {
    id: 'home',
    path: APP_ROUTES.HOME,
    element: <Home />
  },
  {
    id: 'analysis',
    path: APP_ROUTES.ANALYSIS.INITIAL,
    element: <Analysis />
  },
  {
    id: 'analysis-details',
    path: APP_ROUTES.ANALYSIS.DETAILS,
    element: <AnalysisDetails />
  },
  {
    id: 'settings',
    path: APP_ROUTES.SETTINGS.INITIAL,
    element: <Settings />,
    children: [
      {
        id: 'user-settings',
        path: APP_ROUTES.SETTINGS.USER,
        element: <UserSettings />
      },
      {
        id: 'access-settings',
        path: APP_ROUTES.SETTINGS.ACCESS,
        element: <AccessSettings />
      },
      {
        id: 'system-settings',
        path: APP_ROUTES.SETTINGS.SYSTEM,
        element: <SystemSettings />
      },
      {
        id: 'categories-settings',
        path: APP_ROUTES.SETTINGS.CATEGORIES,
        element: <CategoriesSettings />
      },
      {
        id: 'inspection-settings',
        path: APP_ROUTES.SETTINGS.INSPECTION_WAYS,
        element: <InspectionsSettings />
      }
    ]
  },
  {
    id: 'history',
    path: APP_ROUTES.HISTORY,
    element: <History />
  }
]

export type RoutePaths = (typeof routes)[number]['path']
