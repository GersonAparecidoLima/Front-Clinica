import { useEffect, useState } from 'react'
import { CampoTexto } from '../CampoTexto/CampoTexto'
import { Botao } from '../Botao/Botao'
import './Formulario.css'
// Vamos imaginar que você criará o tipo Paciente no seu service
import { type Paciente } from '../../services/pacienteService'

interface FormularioPacienteProps {
    pacienteSelecionado?: Paciente; 
    aoSalvar: (paciente: Paciente) => void;
    aoCancelar: () => void;
}

export const FormularioPaciente = ({ aoSalvar, aoCancelar, pacienteSelecionado }: FormularioPacienteProps) => {
//export const FormularioPaciente = ({ pacienteParaEdicao, aoSalvar, aoCancelar, pacienteSelecionado }: FormularioPacienteProps) => {

    
// 1. Iniciamos os estados com o pacienteSelecionado
    const [nome, setNome] = useState(pacienteSelecionado?.nome || '');
    const [email, setEmail] = useState(pacienteSelecionado?.email || '');
    const [cpf, setCpf] = useState(pacienteSelecionado?.cpf || '');
    const [telefone, setTelefone] = useState(pacienteSelecionado?.telefone || '');

// 2. O useEffect monitora o pacienteSelecionado
    useEffect(() => {
        if (pacienteSelecionado) {
            setNome(pacienteSelecionado.nome || '');
            setEmail(pacienteSelecionado.email || '');
            setCpf(pacienteSelecionado.cpf || '');
            setTelefone(pacienteSelecionado.telefone || '');
        } else {
            setNome('');
            setEmail('');
            setCpf('');
            setTelefone('');
        }
    }, [pacienteSelecionado]); // <--- Monitora o nome correto agora

const aoEnviar = (evento: React.FormEvent) => {
        evento.preventDefault();
        
        aoSalvar({
            id: pacienteSelecionado?.id, // <--- Usa o ID do selecionado
            nome,
            email,
            cpf,
            telefone,
            endereco: pacienteSelecionado?.endereco || {
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
                <h2>{pacienteSelecionado ? 'Editando Paciente' : 'Cadastrar Paciente'}</h2>
                
                <CampoTexto 
                    label="Nome" 
                    placeholder="Digite o nome completo" 
                    valor={nome}
                    aoAlterar={valor => setNome(valor)} 
                    obrigatorio={true}
                />

                <CampoTexto 
                    label="E-mail" 
                    placeholder="Digite o e-mail" 
                    valor={email}
                    aoAlterar={valor => setEmail(valor)} 
                    obrigatorio={true}
                />

                <CampoTexto 
                    label="CPF" 
                    placeholder="Digite o CPF" 
                    valor={cpf}
                    aoAlterar={valor => setCpf(valor)}
                    obrigatorio={true}
                />

                <CampoTexto 
                    label="Telefone" 
                    placeholder="Digite o telefone" 
                    valor={telefone}
                    aoAlterar={valor => setTelefone(valor)}
                />

                <div className="acoes">
                     <Botao texto={pacienteSelecionado ? "Salvar Alterações" : "Cadastrar Paciente"} isSubmit={true} />
                     <Botao texto="Cancelar" tipo="perigo" acao={aoCancelar} isSubmit={false} />
                </div>
            </form>
        </section>
    );
}