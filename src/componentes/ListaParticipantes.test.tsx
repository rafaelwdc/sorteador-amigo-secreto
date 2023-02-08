import { render, screen } from "@testing-library/react"
import React from "react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"
import ListaParticipantes from "./ListaParticipante"

jest.mock('../state/hooks/useListaDeParticipantes', () => {
    return{
        useListaDeParticipantes: jest.fn()
    }
})

describe('Uma lista vazia de participantes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    test('Deve ser renderizada sem elementos', () =>{
        render(
            <RecoilRoot>
                <ListaParticipantes/>
            </RecoilRoot>
        )
        const itens = screen.queryAllByRole('listitem');
        expect(itens).toHaveLength(0)
    })
})

describe('Uma lista preenchida de participantes', () => {
    const participantes = ['Rafael', 'Patricky']
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    })
    test('Deve ser renderizada sem elementos', () =>{
        render(
            <RecoilRoot>
                <ListaParticipantes/>
            </RecoilRoot>
        )
        const itens = screen.queryAllByRole('listitem');
        expect(itens).toHaveLength(participantes.length)
    })
})