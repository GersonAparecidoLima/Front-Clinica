import './Card.css'

interface CardProps {
    nome: string;
    crm: string;
    especialidade: string;
    aoEditarClick: () => void;
    // 1. ADICIONAMOS A PROP DE EXCLUSÃO:
    aoExcluirClick: () => void; 
}

export const Card = ({ nome, crm, especialidade, aoEditarClick, aoExcluirClick }: CardProps) => {
    return (
        <div className="card-medico">
            <div className="cabecalho-card">
                <img src="https://cdn-icons-png.flaticon.com/512/607/607414.png" alt={`Foto de ${nome}`} />
            </div>
            
            <div className="rodape-card">
                <h4>{nome}</h4>
                <h5>{especialidade}</h5>
                <p>CRM: {crm}</p>
            </div>

            <div className="acoes-card" style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '10px' }}>
                {/* BOTÃO EDITAR */}
                <button 
                    onClick={aoEditarClick}
                    className="botao-editar"
                    style={{ cursor: 'pointer', backgroundColor: '#0277BD', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px' }}
                >
                    Editar
                </button>

                {/* 2. NOVO BOTÃO: EXCLUIR */}
                <button 
                    onClick={aoExcluirClick}
                    className="botao-excluir"
                    style={{ cursor: 'pointer', backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px' }}
                >
                    Excluir
                </button>
            </div>
        </div>
    )
}