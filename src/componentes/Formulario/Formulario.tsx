import { useState } from 'react'
import { CampoTexto } from '../CampoTexto/CampoTexto'
import { Botao } from '../Botao/Botao'
import './Formulario.css'
// Importamos o tipo Medico do service para manter tudo sincronizado
import { type Medico } from '../../services/medicoService'

interface FormularioProps {
    // Agora usamos a interface Medico que tem email e endereço
    aoSalvar: (profissional: Medico) => void;
    aoCancelar: () => void;
}

export const Formulario = (props: FormularioProps) => {
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('') // Novo estado para o E-mail
    const [crm, setCrm] = useState('')
    const [especialidade, setEspecialidade] = useState('')

    const aoEnviar = (evento: React.FormEvent) => {
        evento.preventDefault();
        
        // Montamos o objeto completo para o Spring Boot/Oracle
        props.aoSalvar({
            nome,
            email,
            crm,
            especialidade,
            endereco: {
                logradouro: "Avenida Principal",
                bairro: "Paranoá",
                cep: "71570000",
                cidade: "Brasília",
                uf: "DF",
                numero: "10"
            }
        });

        // Limpa os campos
        setNome('');
        setEmail('');
        setCrm('');
        setEspecialidade('');
    }

    return (
        <section className="formulario formulario-container">
            <form onSubmit={aoEnviar}>
                <h2>Cadastrar Médico</h2>
                
                <CampoTexto 
                    label="Nome" 
                    placeholder="Digite seu nome" 
                    valor={nome}
                    aoAlterar={valor => setNome(valor)} 
                    obrigatorio={true}
                />

                {/* NOVO CAMPO: E-mail */}
                <CampoTexto 
                    label="E-mail" 
                    placeholder="Digite seu e-mail" 
                    valor={email}
                    aoAlterar={valor => setEmail(valor)} 
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
                    placeholder="Ex: CARDIOLOGIA (use maiúsculas para o Enum)" 
                    valor={especialidade}
                    aoAlterar={valor => setEspecialidade(valor)}
                />

                <div className="acoes">
                     <Botao texto="Cadastrar Médico" isSubmit={true} />
                     <Botao texto="Cancelar" tipo="perigo" acao={props.aoCancelar} isSubmit={false} />
                </div>
            </form>
        </section>
    )
}