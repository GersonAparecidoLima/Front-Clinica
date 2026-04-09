import { useEffect, useState } from 'react'
import { CampoTexto } from '../CampoTexto/CampoTexto'
import { Botao } from '../Botao/Botao'
import './Formulario.css'
// Vamos imaginar que você criará o tipo Paciente no seu service
import { type Paciente } from '../../services/pacienteService'

interface FormularioPacienteProps {
    pacienteParaEdicao?: Paciente;
    aoSalvar: (paciente: Paciente) => void;
    aoCancelar: () => void;
}

export const FormularioPaciente = ({ pacienteParaEdicao, aoSalvar, aoCancelar }: FormularioPacienteProps) => {
    
    const [nome, setNome] = useState(pacienteParaEdicao?.nome || '');
    const [email, setEmail] = useState(pacienteParaEdicao?.email || '');
    const [cpf, setCpf] = useState(pacienteParaEdicao?.cpf || '');
    const [telefone, setTelefone] = useState(pacienteParaEdicao?.telefone || '');

    useEffect(() => {
        if (pacienteParaEdicao) {
            setNome(pacienteParaEdicao.nome || '');
            setEmail(pacienteParaEdicao.email || '');
            setCpf(pacienteParaEdicao.cpf || '');
            setTelefone(pacienteParaEdicao.telefone || '');
        } else {
            setNome('');
            setEmail('');
            setCpf('');
            setTelefone('');
        }
    }, [pacienteParaEdicao]);

    const aoEnviar = (evento: React.FormEvent) => {
        evento.preventDefault();
        
        aoSalvar({
            id: pacienteParaEdicao?.id, 
            nome,
            email,
            cpf,
            telefone,
            endereco: pacienteParaEdicao?.endereco || {
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
                <h2>{pacienteParaEdicao ? 'Editando Paciente' : 'Cadastrar Paciente'}</h2>
                
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
                     <Botao texto={pacienteParaEdicao ? "Salvar Alterações" : "Cadastrar Paciente"} isSubmit={true} />
                     <Botao texto="Cancelar" tipo="perigo" acao={aoCancelar} isSubmit={false} />
                </div>
            </form>
        </section>
    );
}