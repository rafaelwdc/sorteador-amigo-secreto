import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    // -- Encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    // -- Encontrar o Botão
    const botao = screen.getByRole('button')
    // -- Garantir que o input esteja no Documento
    expect(input).toBeInTheDocument()
    // -- Garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled()
})

test('Adicionar um participante caso exista um nome preenchido.', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    // -- Encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    // -- Encontrar o Botão
    const botao = screen.getByRole('button')
    // -- Inserir um valor no input
    fireEvent.change(input, {
        target: {
            value: 'Rafael'
        }
    })
    // -- Clicar no botão de submeter
    fireEvent.click(botao)
    // -- Garantir que o input esteja com o Foco ativo
    expect(input).toHaveFocus()
    // -- Garantir que o input não tenha um valor
    expect(input).toHaveValue("")
})

test('Nomes duplicados não podem ser adicionados na lista', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
        target: {
            value: 'Rafael'
        }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
        target: {
            value: 'Rafael'
        }
    })
    fireEvent.click(botao)

    const mensagemDeErro = screen.getByRole('alert')

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
})