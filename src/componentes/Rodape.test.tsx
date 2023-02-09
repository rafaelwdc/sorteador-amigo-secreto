import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import Rodape from "./Rodape";

jest.mock('../state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
});

const mockNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavegacao
    }
});

describe('Onde não exitem participantes suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
    })
    test('A Brincadeira não pode ser iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>);
        const botao = screen.getByRole('button');
        expect(botao).toBeDisabled();
    })
})

describe('Quando existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Rafael', 'Patricky', 'Camila']);
    })
    test('A brincadeira pode ser iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>);
        const botao = screen.getByRole('button');
        expect(botao).not.toBeDisabled();
    })
    test('A brincadeira foi iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>);
        const botao = screen.getByRole('button');
        fireEvent.click(botao)
        expect(mockNavegacao).toHaveBeenCalledTimes(1)
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    })
})