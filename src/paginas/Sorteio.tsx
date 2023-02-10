import React, { useState } from "react";
import Card from "../componentes/Card";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio";
import './Sorteio.css'

const Sorteio = () => {
    const participantes = useListaDeParticipantes();
    const [partipanteDaVez, setPaticipanteDaVez] = useState('');
    const [amigoSecreto, setAmigoSecreto] = useState('');
    const resultado = useResultadoDoSorteio();
    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (resultado.has(partipanteDaVez)) {
            setAmigoSecreto(resultado.get(partipanteDaVez)!);
        }
    }
    return (
        <Card>
            <section className="sorteio">
                <form onSubmit={sortear}>
                    <select
                        required
                        name="participanteDaVez"
                        id="participanteDaVez"
                        placeholder="Selecione o seu nome"
                        value={partipanteDaVez}
                        onChange={evento => setPaticipanteDaVez(evento.target.value)}
                    >
                        <option>Selecione o seu nome</option>
                        {participantes.map(participante => <option key={participante}>{participante}</option>)}
                    </select>
                    <p>Clique em sortear para ver quem é o seu amigo secreto!</p>
                    <button className="botao-sortear">Sortear</button>
                </form>
                {amigoSecreto && <p className="resultado" role="alert">{amigoSecreto}</p>}
                <footer className="sorteio">
                    <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
                </footer>
            </section>
        </Card>
    )
}

export default Sorteio;