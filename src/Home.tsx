// src/Home.tsx
import { Banner } from './componentes/Banner/Banner'
import { Formulario } from './componentes/Formulario/Formulario';
import { useState } from 'react'
import { Card } from './componentes/Card/Card';
import { DashboardCard } from './componentes/DashboardCard/DashboardCard';

interface Medico {
  nome: string;
  crm: string;
  especialidade: string;
}

function Home() {
    
    const [medicos, setMedicos] = useState<Medico[]>([]);

    const salvarMedico = (dados: Medico) => {
        console.log("Recebi os dados no Pai (Home):", dados.nome, dados.especialidade, dados.crm );
        setMedicos(prev => [...prev, dados]);
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
                            key={medico.crm} 
                            nome={medico.nome} 
                            crm={medico.crm} 
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