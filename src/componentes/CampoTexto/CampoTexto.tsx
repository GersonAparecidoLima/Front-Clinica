// src/componentes/CampoTexto.tsx
import './CampoTexto.css'

interface CampoTextoProps {
    label: string;
    placeholder: string;
}

export const CampoTexto = (props: CampoTextoProps) => {
    return (
        <div className="campo-texto">
            <label>{props.label}</label>
            <input placeholder={props.placeholder} required />
        </div>
    )
}