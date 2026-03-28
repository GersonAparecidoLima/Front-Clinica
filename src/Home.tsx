import { Banner } from './componentes/Banner/Banner'
import { Formulario } from './componentes/Formulario/Formulario';
import { useState, useEffect } from 'react'
import { Card } from './componentes/Card/Card';
import { DashboardCard } from './componentes/DashboardCard/DashboardCard';
import medicoService, { type Medico } from './services/medicoService';

function Home() {
    

    // 1. Carregar os dados (GET) ao abrir a página
useEffect(() => {
    medicoService.listar()
        .then((dados: any) => { // Usamos 'any' aqui para o TS aceitar o .content
            console.log("Dados vindos do Java:", dados);
            
            // Verifica se os médicos estão dentro de 'content' (padrão Page do Spring)
            // ou se vieram em uma lista direta
            const listaDeMedicos = dados.content ? dados.content : dados;
            
            setMedicos(Array.isArray(listaDeMedicos) ? listaDeMedicos : []);
        })
        .catch(err => console.error("Erro ao buscar médicos:", err));
}, []);

const [medicos, setMedicos] = useState<Medico[]>([]);

    // 2. Salvar o médico (POST)
    // Salvar o médico enviando para o Java
        const salvarMedico = async (dados: Medico) => {
            try {
                const novoMedico = await medicoService.cadastrar(dados);
                setMedicos(prev => [...prev, novoMedico]);
                console.log("Médico salvo no Oracle com sucesso!");
            } catch (erro) {
                console.error("Erro ao salvar médico:", erro);
                alert("Erro ao conectar com o servidor Java!");
            }
        };
        
    const cancelar = () => {
        console.log("Operação cancelada/Limpa.");
    };

    return (
        <div className="container">
            <header className="header">
                <div className="logo">
                    <h1>Clínica MedVida</h1>
                </div>

                <div className="header-banner">
                    <Banner />
                </div>

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
                    aoSalvar={salvarMedico} 
                    aoCancelar={cancelar} 
                />

                <div className="dashboard-cards" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
                    <DashboardCard 
                        label="Próximas Consultas" 
                        valor={0} 
                        corDestaque="#FFCA28" 
                    />
                    <DashboardCard 
                        label="Médicos Ativos" 
                        valor={medicos.length} 
                        corDestaque="#0277BD" 
                    />
                </div>

                {/* --- A SEÇÃO DOS CARDS VOLTOU AQUI --- */}
                <section className="lista-profissionais" style={{ padding: '40px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    {medicos.map((medico) => (
                        <Card 
                            key={medico.id || medico.crm} 
                            nome={medico.nome}           // Verifique se 'medico.nome' existe
                            crm={medico.crm}             // Verifique se 'medico.crm' existe
                            especialidade={medico.especialidade} 
                        />
                    ))}
                </section>
                {/* ------------------------------------- */}

            </main>
        </div>
    );
}

export default Home;