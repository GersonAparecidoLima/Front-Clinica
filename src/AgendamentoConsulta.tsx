import { useState, useEffect } from 'react';
import { Botao } from './componentes/Botao/Botao';
import { FormularioAgendamento } from './componentes/Formulario/FormularioAgendamento';

export function AgendamentoConsulta() {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [agendamentos, setAgendamentos] = useState<any[]>([]);

    // No useEffect, você carregaria a lista de agendamentos já realizados
    useEffect(() => {
        // agendamentoService.listar().then(setAgendamentos);
    }, []);

    const salvarAgendamento = async (dados: any) => {
        try {
            // await agendamentoService.cadastrar(dados);
            alert("Consulta agendada com sucesso!");
            setExibirFormulario(false);
            // carregarAgendamentos(); 
        } catch (erro) {
            console.error(erro);
            alert("Erro ao agendar.");
        }
    };

    return (
        <div className="container">
            <main className="main-content">
                <div className="titulo-container">
                    <h2>Agendamento de Consultas</h2>
                    <div className="botao-posicionado">
                        <Botao 
                            texto={exibirFormulario ? "Ver Agenda" : "Novo Agendamento"} 
                            acao={() => setExibirFormulario(!exibirFormulario)} 
                        />
                    </div>
                </div>

                {exibirFormulario ? (
                    <FormularioAgendamento 
                        aoSalvar={salvarAgendamento}
                        aoCancelar={() => setExibirFormulario(false)}
                    />
                ) : (
                    <section className="lista-wrapper">
                        {/* Aqui você pode mapear os agendamentos já existentes */}
                        {agendamentos.length === 0 && <p>Nenhuma consulta agendada para hoje.</p>}
                    </section>
                )}
            </main>
        </div>
    );
}