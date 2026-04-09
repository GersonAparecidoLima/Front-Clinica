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

    useEffect(() => {
        carregarPacientes();
    }, []);

    // 2. Função para Salvar (Chamada pelo Formulário)
    const salvarPaciente = async (paciente: Paciente) => {
        try {
            await pacienteService.cadastrar(paciente); // Supondo que você tenha o método cadastrar no service
            setExibirFormulario(false);
            carregarPacientes(); // Atualiza a lista após salvar
            alert("Paciente salvo com sucesso!");
        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            alert("Erro ao salvar paciente.");
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
                    aoSalvar={salvarPaciente} 
                    aoCancelar={() => setExibirFormulario(false)} 
                />
            ) : (
                <>
                    <div className="dashboard-wrapper">
                        <DashboardCard 
                            label="Pacientes Ativos" 
                            valor={pacientes.length} 
                            corDestaque="#2e7d32" 
                        />
                    </div>

                    <section className="lista-wrapper">
                        {pacientes?.map((paciente) => (
                            <CardPaciente 
                                key={paciente.id || paciente.cpf} 
                                nome={paciente.nome}
                                cpf={paciente.cpf}
                                email={paciente.email}
                                aoExcluirClick={() => excluirPaciente(paciente.id!)}
                            />
                        ))}
                    </section>
                </>
            )}
        </main>
    </div>
);
}