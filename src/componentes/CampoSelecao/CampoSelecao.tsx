import './CampoSelecao.css'

interface CampoSelecaoProps {
    label: string;
    valor: string;
    aoAlterar: (valor: string) => void;
    obrigatorio?: boolean;
    itens: string[]; // Aqui passamos as especialidades ["CARDIOLOGIA", "ORTOPEDIA", ...]
}

export const CampoSelecao = ({ label, valor, aoAlterar, obrigatorio, itens }: CampoSelecaoProps) => {
    return (
        <div className="campo-selecao">
            <label>{label}</label>
            <select 
                required={obrigatorio} 
                value={valor} 
                onChange={evento => aoAlterar(evento.target.value)}
            >
                <option value="">Selecione uma opção</option>
                {itens.map(item => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
};