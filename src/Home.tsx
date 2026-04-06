import { Banner } from './componentes/Banner/Banner'
import { Formulario } from './componentes/Formulario/Formulario';
import { useState, useEffect } from 'react'
import { Card } from './componentes/Card/Card';
import { DashboardCard } from './componentes/DashboardCard/DashboardCard';
import medicoService, { type Medico } from './services/medicoService';

function Home() {
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [medicoParaEdicao, setMedicoParaEdicao] = useState<Medico | undefined>(undefined);

    // 1. Carregar os dados ao iniciar
    useEffect(() => {
        medicoService.listar()
            .then((dados: any) => {
                const listaDeMedicos = dados.content ? dados.content : dados;
                setMedicos(Array.isArray(listaDeMedicos) ? listaDeMedicos : []);
            })
            .catch(err => console.error("Erro ao buscar médicos:", err));
    }, []);

    // 2. Função para Salvar ou Atualizar
    const salvarMedico = async (dados: Medico) => {
        try {
            if (dados.id) {
                await medicoService.atualizar(dados);
                setMedicos(prev => prev.map(m => m.id === dados.id ? dados : m));
            } else {
                const novoMedico = await medicoService.cadastrar(dados);
                setMedicos(prev => [...prev, novoMedico]);
            }
            setMedicoParaEdicao(undefined);
        } catch (erro) {
            console.error("Erro ao salvar médico:", erro);
            alert("Erro ao salvar médico.");
        }
    };

    // 3. Função para Excluir (Nova!)
    const excluirMedico = async (id: number) => {
        if (window.confirm("Deseja realmente inativar este médico?")) {
            try {
                await medicoService.excluir(id);
                // Remove da lista visualmente
                setMedicos(prev => prev.filter(m => m.id !== id));
            } catch (erro) {
                console.error("Erro ao excluir:", erro);
                alert("Erro ao excluir médico.");
            }
        }
    };

    const prepararEdicao = async (medico: Medico) => {
        if (medico.id) {
            try {
                const dadosCompletos = await medicoService.buscarPorId(medico.id);
                setMedicoParaEdicao(dadosCompletos);
                window.scrollTo(0, 0); 
            } catch (erro) {
                console.error("Erro ao carregar detalhes:", erro);
            }
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Clínica MedVida</h1>
                <Banner />
                <nav className="nav">
                    <ul>
                        <li><a href="#agendamentos">Agendamentos</a></li>
                        <li><a href="#medicos">Médicos</a></li>
                        <li><a href="#pacientes">Pacientes</a></li>
                    </ul>
                </nav>
            </header>

            <main className="main-content">
                <h2>Gerenciamento de Médicos</h2>

                <Formulario 
                    medicoParaEdicao={medicoParaEdicao} 
                    aoSalvar={salvarMedico} 
                    aoCancelar={() => setMedicoParaEdicao(undefined)} 
                />

                <div className="dashboard-cards" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
                    <DashboardCard label="Médicos Ativos" valor={medicos.length} corDestaque="#0277BD" />
                </div>

                <section className="lista-profissionais" style={{ padding: '40px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    {medicos.map((medico) => (
                        <Card 
                            key={medico.id || medico.crm} 
                            nome={medico.nome}
                            crm={medico.crm}
                            especialidade={medico.especialidade} 
                            aoEditarClick={() => prepararEdicao(medico)}
                            // Passando a nova função de exclusão para o Card
                            aoExcluirClick={() => excluirMedico(medico.id!)} 
                        />
                    ))}
                </section>
            </main>
        </div>
    );
}

export default Home;