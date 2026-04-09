import './CardPaciente.css';

interface CardPacienteProps {
    nome: string;
    cpf: string;
    email: string;
    aoExcluirClick: () => void;
}

export const CardPaciente = ({ nome, cpf, email, aoExcluirClick }: CardPacienteProps) => {
    return (
        <div className="card-paciente"> {/* Mudamos de card-medico para card-paciente */}
            <div className="cabecalho-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3028/3028561.png" alt="Paciente" />
            </div>
            <div className="rodape-card">
                <h4>{nome}</h4>
                <p><strong>CPF:</strong> {cpf}</p>
                <p>{email}</p>
            </div>
            <div className="acoes-paciente">
                <button className="botao-inativar" onClick={aoExcluirClick}>
                    Inativar
                </button>
            </div>
        </div>
    );
}