import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import Sorteio from "./Sorteio";

jest.mock('../state/hooks/useListaDeParticipantes', () => {
    return{
        useListaDeParticipantes: jest.fn()
    }
})

describe('Na página de sorteio', () => {
    const participantes = [ 'Rafael', 'Patricky', 'Camila' ];
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    })
    test('Todos os participantes podem exibir o seu amigo', () => {
        render(<RecoilRoot><Sorteio /></RecoilRoot>)
        const opcoes = screen.queryAllByRole('option');
        expect(opcoes).toHaveLength(participantes.length)
    })
})