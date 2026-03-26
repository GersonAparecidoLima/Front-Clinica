// src/componentes/DashboardCard/index.tsx
import './DashboardCard.css'

interface DashboardCardProps {
    label: string;
    valor: number;
    corDestaque?: string;
}

export const DashboardCard = ({ label, valor, corDestaque = '#004a87' }: DashboardCardProps) => {
    return (
        <div className="dashboard-item">
            <div className="barra-lateral" style={{ backgroundColor: corDestaque }}></div>
            <div className="conteudo-card">
                <span className="label-card">{label}</span>
                <strong className="valor-card">{valor}</strong>
            </div>
        </div>
    )
}