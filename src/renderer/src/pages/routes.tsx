import { APP_ROUTES } from '@renderer/core/constants/appRoutes'
import Analysis from './analysis/Analysis'
import History from './history/History'
import Home from './home/Home'
import Settings from './settings'
import AccessSettings from './settings/AccessSettings'
import CategoriesSettings from './settings/CategoriesSettings'
import SystemSettings from './settings/SystemSettings'
import UserSettings from './settings/UserSettings'
import InspectionsSettings from './settings/WayInspectionsSettings'

export const routes = [
  {
    id: 'home',
    path: APP_ROUTES.HOME,
    element: <Home />
  },
  {
    id: 'analysis',
    path: APP_ROUTES.ANALYSIS,
    element: <Analysis />
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
