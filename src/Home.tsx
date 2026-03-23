// src/Home.tsx
import { Banner } from './componentes/Banner'
import { Botao } from './componentes/Botao'

function Home() {
    const salvarMedico = () => console.log("Enviando para o Oracle via Spring Boot...");
    const cancelar = () => console.log("Operação cancelada.");

    return (
        <div className="container">
            {/* 1. Topo: Banner ocupa a largura toda */}
            {/* <Banner /> */}

            {/* 2. Cabeçalho: Apenas Logo e Menu */}
         <header className="header">
                {/* 1. Lado Esquerdo: Identidade */}
                <div className="logo">
                    <h1>Clínica MedVida</h1>
                </div>

                {/* 2. Centro: O Banner que você sugeriu */}
                <div className="header-banner">
                    <Banner />
                </div>

                {/* 3. Lado Direito: Navegação */}
                <nav className="nav">
                    <ul>
                        <li><a href="#agendamentos">Agendamentos</a></li>
                        <li><a href="#medicos">Médicos</a></li>
                        <li><a href="#pacientes">Pacientes</a></li>
                    </ul>
                </nav>
            </header>

            {/* 3. Conteúdo: Aqui é onde acontece */}
            <main className="main-content">
                <h2>Gerenciamento de Médicos</h2>
                
                {/* Aqui futuramente entrará o seu Formulário */}
                <div className="formulario-simulado">
                    <p>Preencha os dados do profissional abaixo:</p>
                    
                    {/* Botões agora ficam na área de trabalho, não no menu */}
                    <div className="acoes-formulario">
                        <Botao texto="Gravar Médico" tipo="sucesso" acao={salvarMedico} />
                        <Botao texto="Desistir" tipo="perigo" acao={cancelar} />
                    </div>
                </div>

                <div className="dashboard-cards">
                    <div className="card">Próximas Consultas: 0</div>
                    <div className="card">Médicos Ativos: 0</div>
                </div>
            </main>
        </div>
    )
}

export default Home