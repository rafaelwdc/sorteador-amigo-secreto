import { atom } from 'recoil'

export const listaParticipantesState = atom<string[]>({
    key: 'listaParticipanteState',
    default: []
})

export const erroState = atom<string>({
    key: 'erroState',
    default: ''
})