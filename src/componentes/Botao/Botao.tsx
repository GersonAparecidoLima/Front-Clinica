// src/componentes/Botao.tsx
import './Botao.css'

interface BotaoProps {
    texto: string;
    acao?: () => void; // A função JS que será executada no clique
    tipo?: 'primario' | 'perigo' | 'sucesso'; // Opcional: define a cor/estilo
    isSubmit?: boolean; // Adicione isso se ainda não tiver
}

export const Botao = ({ texto, acao, tipo = 'primario', isSubmit = false }: BotaoProps) => {
    return (
        <button 
            type={isSubmit ? "submit" : "button"} // O SEGREDO ESTÁ AQUI!
            className={`botao-clinica ${tipo}`} 
            onClick={acao}
        >
            {texto}
        </button>
    )
}