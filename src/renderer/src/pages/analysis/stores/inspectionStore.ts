import { Store } from '@tanstack/react-store'

type InspectionState = {
  caseId: string
  image: string | null
}

export const effectsStore = new Store<InspectionState>({
  caseId: '',
  image: null
})
