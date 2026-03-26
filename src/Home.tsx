// src/Home.tsx
import { Banner } from './componentes/Banner/Banner'
import { Formulario } from './componentes/Formulario/Formulario';
function Home() {
    // 1. Defina as funções de lógica uma única vez
    const salvarMedico = () => {
        console.log("Enviando para o Oracle via Spring Boot...");
    };

    const cancelar = () => {
        console.log("Operação cancelada/Limpa.");
    };

    return (
        <div className="container">
            {/* 1. Cabeçalho com Logo, Banner e Nav */}
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

            {/* 2. Conteúdo Principal */}
            <main className="main-content">
                <h2>Gerenciamento de Médicos</h2>
                
                {/* O componente Formulario já tem os botões dentro dele!
                   Nós apenas passamos as funções como "encomenda" (props)
                */}
                <Formulario 
                    aoSalvar={salvarMedico} 
                    aoCancelar={cancelar} 
                />

                <div className="dashboard-cards">
                    <div className="card">Próximas Consultas: 0</div>
                    <div className="card">Médicos Ativos: 0</div>
                </div>
            </main>
        </div>
    );
}

export default Home;