import { useEffect, useState } from 'react'
import { CampoTexto } from '../CampoTexto/CampoTexto'
import { Botao } from '../Botao/Botao'
import './Formulario.css'
// Importamos o tipo Medico do service para manter tudo sincronizado
import { type Medico } from '../../services/medicoService'
import {CampoSelecao} from '../CampoSelecao/CampoSelecao'

interface FormularioProps {
    medicoParaEdicao?: Medico; // Opcional
    aoSalvar: (profissional: Medico) => void;
    aoCancelar: () => void;
}

const especialidades = [
    'CARDIOLOGIA', // Tem que estar igual ao Banco/Enum
    'ORTOPEDIA',
    'GINECOLOGIA',
    'DERMATOLOGIA'
]

export const Formulario = ({ medicoParaEdicao, aoSalvar, aoCancelar }: FormularioProps) => {
    
    // Iniciamos o estado com os dados do médico caso ele exista (Edição)
    // ou vazio (Cadastro)
    // No topo do componente:
    // No Formulario.tsx, altere a linha da especialidade para isto:
    const [especialidade, setEspecialidade] = useState(medicoParaEdicao?.especialidade?.trim().toUpperCase() || '');
    //const [especialidade, setEspecialidade] = useState(medicoParaEdicao?.especialidade?.trim().toUpperCase() || '');
    const [nome, setNome] = useState(medicoParaEdicao?.nome || '');
    const [email, setEmail] = useState(medicoParaEdicao?.email || '');
    const [crm, setCrm] = useState(medicoParaEdicao?.crm || '');
    //const [especialidade, setEspecialidade] = useState(medicoParaEdicao?.especialidade || '');

// 2º: ADICIONAMOS O EFFECT AQUI (O "Sincronizador")
    // Ele serve para limpar os campos ou preenchê-los quando o médico mudar
/*
useEffect(() => {
    console.log("DADO BRUTO QUE CHEGOU DO JAVA:", medicoParaEdicao?.especialidade);
    setNome(medicoParaEdicao?.nome || '');
    setEmail(medicoParaEdicao?.email || '');
    setCrm(medicoParaEdicao?.crm || '');
    
    // O .trim() remove espaços antes e depois. 
    // O .toUpperCase() garante que bata com o seu array de especialidades.
    const especialidadeLimpa = medicoParaEdicao?.especialidade?.trim().toUpperCase() || '';
    setEspecialidade(especialidadeLimpa);
    
}, [medicoParaEdicao]);
*/

useEffect(() => {

console.log("MÉDICO COMPLETO QUE CHEGOU:", medicoParaEdicao);

    // Só tentamos preencher se o médico PARA EDIÇÃO existir
    if (medicoParaEdicao) {
        console.log("DADO REAL QUE CHEGOU:", medicoParaEdicao.especialidade);
        
        setNome(medicoParaEdicao.nome || '');
        setEmail(medicoParaEdicao.email || '');
        setCrm(medicoParaEdicao.crm || '');
        
        const especialidadeLimpa = medicoParaEdicao.especialidade?.trim().toUpperCase() || '';
        setEspecialidade(especialidadeLimpa);
    } else {
        // Se não tem médico (é um cadastro novo), limpamos os campos
        setNome('');
        setEmail('');
        setCrm('');
        setEspecialidade('');
    }
}, [medicoParaEdicao]);

    const aoEnviar = (evento: React.FormEvent) => {
        evento.preventDefault();
        
        aoSalvar({
            // Se for edição, precisamos manter o ID para o Spring Boot saber qual registro dar o UPDATE
            id: medicoParaEdicao?.id, 
            nome,
            email,
            crm,
            especialidade,
            endereco: medicoParaEdicao?.endereco || {
                logradouro: "Avenida Principal",
                bairro: "Paranoá",
                cep: "71570000",
                cidade: "Brasília",
                uf: "DF",
                numero: "10"
            }
        });
    }

    return (
        <section className="formulario formulario-container">
            <form onSubmit={aoEnviar}>
                <h2>{medicoParaEdicao ? 'Editando Médico' : 'Cadastrar Médico'}</h2>
                
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
       <CampoSelecao 
                    obrigatorio={true}
                    label="Especialidade" 
                    itens={especialidades}
                    valor={especialidade}
                    aoAlterar={valor => setEspecialidade(valor)}
                />
                <div className="acoes">
                     <Botao texto={medicoParaEdicao ? "Salvar Alterações" : "Cadastro"} isSubmit={true} />
                     <Botao texto="Cancelar" tipo="perigo" acao={aoCancelar} isSubmit={false} />
                </div>
            </form>
        </section>
    );
}