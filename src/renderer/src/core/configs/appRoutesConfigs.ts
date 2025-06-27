import { APP_ROUTES } from '@renderer/core/constants/appRoutes'

export const APP_ROUTES_CONFIGS = {
  [APP_ROUTES.HOME]: {
    TRANSITION_NAME: 'Home'
  },
  [APP_ROUTES.ANALYSIS]: {
    TRANSITION_NAME: 'Análise'
  },
  [APP_ROUTES.HISTORY]: {
    TRANSITION_NAME: 'Histórico'
  },
  [APP_ROUTES.SETTINGS.USER]: {
    TRANSITION_NAME: ['Configurações', 'Usuários']
  },
  [APP_ROUTES.SETTINGS.ACCESS]: {
    TRANSITION_NAME: ['Configurações', 'Gestão de acessos']
  },
  [APP_ROUTES.SETTINGS.SYSTEM]: {
    TRANSITION_NAME: ['Configurações', 'Ajustes do sistema']
  },
  [APP_ROUTES.SETTINGS.CATEGORIES]: {
    TRANSITION_NAME: ['Configurações', 'Categorias de análise']
  },
  [APP_ROUTES.SETTINGS.INSPECTION_WAYS]: {
    TRANSITION_NAME: ['Configurações', 'Vias de inspeção']
  }
}
