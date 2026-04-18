import './CardPaciente.css';

interface CardPacienteProps {
    nome: string;
    cpf: string;
    email: string;
    aoExcluirClick: () => void;
    aoEditarClick: () => void; // <--- Adicione isto
}

export const CardPaciente = ({ nome, cpf, email, aoExcluirClick, aoEditarClick }: CardPacienteProps) => { // <--- ADICIONEI aoEditarClick AQUI
    return (
        <div className="card-paciente">
            <div className="cabecalho-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3028/3028561.png" alt="Paciente" />
            </div>
            <div className="rodape-card">
                <h4>{nome}</h4>
                <p><strong>CPF:</strong> {cpf}</p>
                <p>{email}</p>
            </div>
            <div className="acoes-paciente">
                {/* Agora o botão vai funcionar porque 'aoEditarClick' está vindo lá de cima */}
                <button 
                    className="botao-editar"
                    style={{ cursor: 'pointer', backgroundColor: '#0277BD', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px' }}
              
                onClick={aoEditarClick}>Editar</button> 
               
               
                <button 
                
                    className="botao-excluir"
                    style={{ cursor: 'pointer', backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px' }}

                onClick={aoExcluirClick}>
                    Inativar
                </button>
            </div>
        </div>
    );
}