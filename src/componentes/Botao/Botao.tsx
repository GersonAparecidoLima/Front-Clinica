// src/componentes/Botao.tsx
import './Botao.css'

interface BotaoProps {
    texto: string;
    acao: () => void; // A função JS que será executada no clique
    tipo?: 'primario' | 'perigo' | 'sucesso'; // Opcional: define a cor/estilo
}

export const Botao = ({ texto, acao, tipo = 'primario' }: BotaoProps) => {
    return (
        <button 
            className={`botao-clinica ${tipo}`} 
            onClick={acao}
        >
            {texto}
        </button>
    )
}