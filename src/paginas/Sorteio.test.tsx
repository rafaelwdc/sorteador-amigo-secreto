import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio";
import Sorteio from "./Sorteio";

jest.mock('../state/hooks/useListaDeParticipantes', () => {
    return{
        useListaDeParticipantes: jest.fn()
    }
});
jest.mock('../state/hooks/useResultadoDoSorteio', () => {
    return{
        useResultadoDoSorteio: jest.fn()
    }
});

describe('Na página de sorteio', () => {
    const participantes = [ 'Rafael', 'Patricky', 'Camila' ];
    const resultado = new Map([
        ['Patricky', 'Rafael'],
        ['Rafael', 'Camila'],
        ['Camila', 'Patricky']
    ])
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
    })
    test('Todos os participantes podem exibir o seu amigo', () => {
        render(<RecoilRoot><Sorteio /></RecoilRoot>)
        const opcoes = screen.queryAllByRole('option');
        expect(opcoes).toHaveLength(participantes.length + 1)
    })
    test('O amigo secreto é exibid quando solicitado', () => {
        render(<RecoilRoot><Sorteio /></RecoilRoot>);
        const select = screen.getByPlaceholderText('Selecione o seu nome');
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })
        const botao = screen.getByRole('button');
        fireEvent.click(botao);
        const amigoSecreto = screen.getByRole('alert');
        expect(amigoSecreto).toBeInTheDocument();
    })
})