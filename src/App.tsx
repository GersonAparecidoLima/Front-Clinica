
import Medicos from './Medicos.tsx';
import { Pacientes } from './Pacientes.tsx';


import { useState } from 'react'
//import Medicos from './Medicos'; // Sua antiga Home renomeada
//import { Pacientes } from './Pacientes';
// import { Consultas } from './Consultas'; // Quando você criar o arquivo de consultas
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
                                onClick={() => setTelaAtiva('consultas')}
                                style={{ fontWeight: telaAtiva === 'consultas' ? 'bold' : 'normal' }}
                            >
                                Agendamentos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setTelaAtiva('medicos')}
                                style={{ fontWeight: telaAtiva === 'medicos' ? 'bold' : 'normal' }}
                            >
                                Médicos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault(); // Impede o # na URL
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
                {telaAtiva === 'consultas' && (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <h2>Módulo de Agendamentos</h2>
                        <p>Em breve: Marque consultas entre médicos e pacientes.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;