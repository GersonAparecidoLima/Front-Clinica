import { useState, useEffect } from 'react';
import { DashboardCard } from './componentes/DashboardCard/DashboardCard';
import './Pacientes.css'; // <--- ADICIONE ESTA LINHA AQUI
import { CardPaciente } from './componentes/CardPaciente/CardPaciente';
import { FormularioPaciente } from './componentes/Formulario/FormularioPaciente'; // Importe o novo formulário
import { Botao } from './componentes/Botao/Botao'; // Importe seu componente de Botão
import pacienteService, { type Paciente } from './services/pacienteService';


export function Pacientes() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [exibirFormulario, setExibirFormulario] = useState(false); // Estado para controlar a visibilidade
    const [pacienteParaEditar, setPacienteParaEditar] = useState<any>(null);

    // 1. Carregar Pacientes
    const carregarPacientes = () => {
        pacienteService.listar()
            .then((dados: any) => {
                //const lista = dados.content ? dados.content : dados;
                //setPacientes(Array.isArray(lista) ? lista : []);

                const lista = dados.content ? dados.content : dados;
                setPacientes(Array.isArray(lista) ? lista : []);


            })
            .catch(err => console.error("Erro ao buscar pacientes:", err));
    };

    // Função que será chamada ao clicar no botão Editar do Card
        const abrirEdicao = (paciente: any) => {
            setPacienteParaEditar(paciente);
        };

    useEffect(() => {
        carregarPacientes();
    }, []);

    // 2. Função para Salvar (Chamada pelo Formulário)
const salvarPaciente = async (paciente: Paciente) => {
    try {
        if (paciente.id) {
            // Se tem ID, chama o atualizar que criamos no api.ts / service
            await pacienteService.atualizar(paciente); 
            alert("Paciente atualizado com sucesso!");
        } else {
            // Se não tem ID, é um cadastro novo
            await pacienteService.cadastrar(paciente);
            alert("Paciente cadastrado com sucesso!");
        }
        
        setExibirFormulario(false);
        setPacienteParaEditar(null); // Limpa o estado
        carregarPacientes(); // Atualiza a lista vinda do Java
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Erro ao processar a requisição.");
    }
};

    const excluirPaciente = async (id: number) => {
        if (window.confirm("Deseja realmente inativar este paciente?")) {
            try {
                await pacienteService.excluir(id);
                setPacientes(prev => prev.filter(p => p.id !== id));
            } catch (erro) {
                console.error("Erro ao excluir:", erro);
            }
        }
    };

    return (
    <div className="container">
        <main className="main-content">
            
            <div className="titulo-container">
                <h2>Gerenciamento de Pacientes</h2>
                <div className="botao-posicionado">
                    <Botao 
                        texto={exibirFormulario ? "Voltar para Lista" : "Novo Paciente"} 
                        acao={() => setExibirFormulario(!exibirFormulario)} 
                    />
                </div>
            </div>

            {exibirFormulario ? (
    <FormularioPaciente 
        pacienteSelecionado={pacienteParaEditar} // <--- Passamos o paciente que guardamos no estado
        aoSalvar={salvarPaciente} 
        aoCancelar={() => {
            setExibirFormulario(false);
            setPacienteParaEditar(null); // Limpa para não misturar com o próximo
        }} 
    />
) : (
    <>
        {/* ... dashboard ... */}
        <section className="lista-wrapper">
            {pacientes?.map((paciente) => (
                <CardPaciente 
                    key={paciente.id || paciente.cpf} 
                    nome={paciente.nome}
                    cpf={paciente.cpf}
                    email={paciente.email}
                    aoExcluirClick={() => excluirPaciente(paciente.id!)}
                    // AQUI ESTÁ A MÁGICA:
                    aoEditarClick={() => {
                        setPacienteParaEditar(paciente); // 1. Guarda o paciente clicado
                        setExibirFormulario(true);       // 2. Abre o formulário
                    }}
                />
            ))}
        </section>
    </>
)}
        </main>
    </div>
);
}