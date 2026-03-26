// src/componentes/CampoTexto/index.tsx
import './CampoTexto.css'

interface CampoTextoProps {
    label: string;
    placeholder: string;
    valor: string;            // <-- NOVO: O dado que vem do State do Pai
    aoAlterar: (valor: string) => void; // <-- NOVO: A função para avisar o Pai
    obrigatorio?: boolean;    // Opcional: para validar o campo
}

export const CampoTexto = (props: CampoTextoProps) => {

    // Função que captura o evento de digitação do teclado
    const aoDigitado = (evento: React.ChangeEvent<HTMLInputElement>) => {
        // Chamamos a função que o Pai nos enviou via Props!
        props.aoAlterar(evento.target.value);
    }

    return (
        <div className="campo-texto">
            <label>{props.label}</label>
            <input 
                value={props.valor}    // Agora o input "obedece" ao que vem do Pai
                onChange={aoDigitado}  // Avisa o Pai a cada tecla pressionada
                placeholder={props.placeholder} 
                required={props.obrigatorio} 
            />
        </div>
    )
}