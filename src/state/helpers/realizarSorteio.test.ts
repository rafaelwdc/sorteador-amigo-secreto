import { realizarSorteio } from "./realizarSorteio";

describe('Dado um sorteio de amigo secreto', () => { 
    test('Cada participante não sorteie o proprio nome', () => {
        const participantes = [
            'Rafael',
            'Patricky',
            'Camila',
            'Debrer',
            'Juinha',
            'HiroD',
            'Steela'
        ];

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
 })