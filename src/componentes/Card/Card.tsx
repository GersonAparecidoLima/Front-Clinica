import './Card.css'

interface CardProps {
    nome: string;
    crm: string;
    especialidade: string;
}

export const Card = ({ nome, crm, especialidade }: CardProps) => {
    return (
        <div className="card-medico">
            <div className="cabecalho-card">
                {/* Usei um placeholder de imagem médica, você pode trocar depois */}
                <img src="https://cdn-icons-png.flaticon.com/512/607/607414.png" alt={`Foto de ${nome}`} />
            </div>
            <div className="rodape-card">
                <h4>{nome}</h4>
                <h5>{especialidade}</h5>
                <p>CRM: {crm}</p>
            </div>
        </div>
    )
}