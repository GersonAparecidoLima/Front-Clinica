import Medicos from './Medicos.tsx';
import { Pacientes } from './Pacientes.tsx';
// 1. Importe o novo componente de Agendamento
import { AgendamentoConsulta } from './AgendamentoConsulta.tsx'; 

import { useState } from 'react'
import { Banner } from './componentes/Banner/Banner';

type Tela = 'medicos' | 'pacientes' | 'consultas';

function App() {
    const [telaAtiva, setTelaAtiva] = useState<Tela>('medicos');

    return (
        <div className="app-container">
            <header className="header">
                <h1>Clínica MedVida</h1>
                <Banner />
                <nav className="nav">
                    <ul>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTelaAtiva('consultas');
                                }}
                                style={{ fontWeight: telaAtiva === 'consultas' ? 'bold' : 'normal' }}
                            >
                                Agendamentos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTelaAtiva('medicos');
                                }}
                                style={{ fontWeight: telaAtiva === 'medicos' ? 'bold' : 'normal' }}
                            >
                                Médicos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTelaAtiva('pacientes');
                                }}
                                style={{ fontWeight: telaAtiva === 'pacientes' ? 'bold' : 'normal' }}
                            >
                                Pacientes
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="main-content">
                {/* Switch de Telas */}
                {telaAtiva === 'medicos' && <Medicos />}
                {telaAtiva === 'pacientes' && <Pacientes />}
                
                {/* 2. Substitua o "Em breve" pelo componente real */}
                {telaAtiva === 'consultas' && <AgendamentoConsulta />}
            </main>
        </div>
    );
}

export default App;