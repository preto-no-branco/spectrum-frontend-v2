import { Store } from '@tanstack/react-store'

type ROIStoreState = {
  x: number
  y: number
  height: number
  width: number
}

export const initialROIStoreState: ROIStoreState = {
  x: 0,
  y: 0,
  height: 0,
  width: 0
}

export const ROIStore = new Store<ROIStoreState>(initialROIStoreState)
