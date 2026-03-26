// src/componentes/Formulario.tsx

import { CampoTexto } from '../CampoTexto/CampoTexto'; // Vamos criar este em seguida
import { Botao } from '../Botao/Botao';
import './Formulario.css'

interface FormularioProps {
    aoSalvar: () => void;
    aoCancelar: () => void;
}

export const Formulario = (props: FormularioProps) => {

    const submeter = (evento: React.FormEvent) => {
        evento.preventDefault(); // Evita que a página recarregue
        props.aoSalvar();
    }

    return (
        <section className="formulario-container">
            <form onSubmit={submeter}>
                <h2>Cadastro de Profissional</h2>
                
                <CampoTexto label="Nome" placeholder="Digite o nome do médico" />
                <CampoTexto label="CRM" placeholder="Digite o CRM" />
                <CampoTexto label="Especialidade" placeholder="Ex: Cardiologia" />

                <div className="acoes">
                    <Botao texto="Gravar Médico" tipo="sucesso" acao={() => {}} /> 
                    {/* Nota: O botão dentro do form com type submit dispara o onSubmit do form */}
                    <Botao texto="Limpar" tipo="perigo" acao={props.aoCancelar} />
                </div>
            </form>
        </section>
    )
}