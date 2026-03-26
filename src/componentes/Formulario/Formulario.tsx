import { useState } from 'react'
import { CampoTexto } from '../CampoTexto/CampoTexto'
import { Botao } from '../Botao/Botao'
import './Formulario.css'

// 1. A Interface (O contrato com a Home)
interface Profissional {
    nome: string;
    crm: string;
    especialidade: string;
}

interface FormularioProps {
    //aoSalvar: (profissional: any) => void; // Mudei para aceitar os dados
    aoSalvar: (profissional: Profissional) => void;
    aoCancelar: () => void;
}

export const Formulario = (props: FormularioProps) => {
    
    // 2. Estados (Memória do formulário)
    const [nome, setNome] = useState('')
    const [crm, setCrm] = useState('')
    const [especialidade, setEspecialidade] = useState('')

    // 3. Função que lida com o envio
    const aoEnviar = (evento: React.FormEvent) => {
        evento.preventDefault();
        
        // Enviamos o objeto com os dados para a Home
        props.aoSalvar({
            nome,
            crm,
            especialidade
        });

        // Limpa os campos após salvar
        setNome('');
        setCrm('');
        setEspecialidade('');
    }

    // 4. Apenas UM return com todo o JSX
    return (
        <section className="formulario formulario-container">
            <form onSubmit={aoEnviar}>
                <h2>Preencha os dados do Profissional</h2>
                
                <CampoTexto 
                    label="Nome" 
                    placeholder="Digite seu nome" 
                    valor={nome}
                    aoAlterar={valor => setNome(valor)} 
                    obrigatorio={true}
                />

                <CampoTexto 
                    label="CRM" 
                    placeholder="Digite seu CRM" 
                    valor={crm}
                    aoAlterar={valor => setCrm(valor)}
                />

                <CampoTexto 
                    label="Especialidade" 
                    placeholder="Digite sua especialidade" 
                    valor={especialidade}
                    aoAlterar={valor => setEspecialidade(valor)}
                />

                <div className="acoes">
                     <Botao texto="Criar Profissional"  isSubmit={true} />
                     <Botao texto="Cancelar" tipo="perigo" acao={props.aoCancelar}  isSubmit={false} />
                </div>
            </form>
        </section>
    )
}