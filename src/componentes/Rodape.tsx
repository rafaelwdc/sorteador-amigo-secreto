// import { useNavigate } from "react-router-dom";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"

const Rodape = () => {
    const participante = useListaDeParticipantes();
    // const navegarPara = useNavigate(); 
    return (
        <footer>
            <button disabled={participante.length < 3}>
                Iniciar Brincadeira
            </button>
        </footer>
    )
}

export default Rodape