import { Inspection } from '@/services/inspectionService/interfaces'
import { ActionEnum, InspectionStatusEnum } from '@/services/inspectionService/childsTypes/enums'
import { v4 as uuidv4 } from 'uuid'

export const mockInspections: Inspection[] = Array.from({ length: 15 }, (_, i) => {
  const id = uuidv4()
  const caseId = `CASE-${String(i + 1).padStart(4, '0')}`

  return {
    id,
    caseId,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    status: ['CONFIRMED', 'DISCARDED', 'SUSPECT', 'IGNORED'][i % 4] as InspectionStatusEnum,
    isEmpty: i % 2 === 0,
    isFlammable: i % 3 === 0,
    isMultiple: i % 4 === 0,
    isSuspect: i % 5 === 0,
    wasEdited: i % 2 === 1,
    radiation: i % 6 === 0,
    spectrumCode: `SPC-${1000 + i}`,
    bottomImage: `https://picsum.photos/seed/bottom${i}/200/100`,
    raioxImage: `https://picsum.photos/seed/raiox${i}/200/100`,
    discardedDescription: i % 4 === 1 ? 'Imagem sem qualidade suficiente' : undefined,

    keyValues: [
      { key: 'Destino', value: ['Brasil', 'EUA', 'China'][i % 3] },
      { key: 'Peso', value: `${Math.floor(Math.random() * 1000)}kg` }
    ],
    properties: [
      { key: 'Temperatura', value: `${20 + i}ºC` },
      { key: 'Umidade', value: `${50 + i}%` }
    ],

    movements: [
      {
        action: i % 2 === 0 ? ActionEnum.ACTION : ActionEnum.PERIPHERAL,
        user: {
          id: uuidv4(),
          name: i % 2 === 0 ? 'João Silva' : 'Maria Souza'
        }
      }
    ],

    plates: [
      {
        id: uuidv4(),
        recognition: `ABC${i}23`,
        uri: `https://picsum.photos/seed/plate${i}/100/50`,
        current: i % 2 === 0 ? 'ABC1234' : 'XYZ5678'
      }
    ],

    containers: [
      {
        id: uuidv4(),
        recognition: `CONT-${i}XYZ`,
        uri: `https://picsum.photos/seed/container${i}/150/100`,
        current: `CONT-${i + 100}`,
        x_start: 10,
        x_end: 50,
        y_start: 20,
        y_end: 60,
        is_empty: i % 2 === 0,
        is_flammable: i % 3 === 0,
        is_suspect: i % 5 === 0
      }
    ]
  }
})
