export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
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
} as const satisfies Record<string, Routes['routes'] | Record<string, Routes['routes']>>

export type AppRouteValues = Routes['routes']
