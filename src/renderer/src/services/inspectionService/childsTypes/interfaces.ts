import { ActionEnum } from './enums'

export interface Area {
  id: string
  order: string
  active: boolean
  created_at: Date
  category_id: string
  category: string
  description: string | null
  x_start: number
  x_end: number
  y_start: number
  y_end: number
}

export interface Plate {
  id: string
  recognition: string
  uri: string
  current: string
}

export interface Container {
  id: string
  recognition: string
  uri: string
  current: string
  x_start?: number
  x_end?: number
  y_start?: number
  y_end?: number
  is_empty: boolean
  is_flammable: boolean
  is_suspect: boolean
}

export interface Movement {
  action: ActionEnum
  user?: {
    id: string
    name: string
  }
}

export interface KeyValue {
  key: string
  value: string
}
