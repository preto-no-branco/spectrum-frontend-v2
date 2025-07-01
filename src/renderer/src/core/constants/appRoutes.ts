import { ExtractValues } from '@renderer/types/general.types'

export const APP_ROUTES = {
  HOME: '/',
  ANALYSIS: {
    INITIAL: '/analysis',
    DETAILS: '/analysis/details'
  },
  HISTORY: '/history',
  SETTINGS: {
    INITIAL: '/settings',
    USER: '/settings/user',
    ACCESS: '/settings/access',
    SYSTEM: '/settings/system',
    CATEGORIES: '/settings/categories',
    INSPECTION_WAYS: '/settings/inspection-ways'
  }
} as const

export type AppRouteValues = ExtractValues<typeof APP_ROUTES>
