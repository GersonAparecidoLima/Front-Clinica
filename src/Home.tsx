
import { Banner } from './componentes/Banner'

// src/Home.tsx

function Home() {
  return (
    <div className="container">
      {/* Cabeçalho da Clínica */}
      <header className="header">
        <div className="logo">
          <h1>Clínica MedVida</h1>
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

      {/* Conteúdo Principal */}
      <main className="main-content">
        <h2>Bem-vindo ao Painel de Controle</h2>
        <p>Selecione uma opção no menu acima para começar a gerenciar sua clínica.</p>
        
        {/* Futuramente aqui entrarão os componentes que conversam com seu Spring Boot */}
        <div className="dashboard-cards">
          <div className="card">Próximas Consultas: 0</div>
          <div className="card">Médicos Ativos: 0</div>
        </div>
      </main>
    </div>
  )
}

export default Home


