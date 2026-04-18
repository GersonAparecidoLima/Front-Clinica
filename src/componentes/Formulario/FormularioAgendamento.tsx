import { useState, useEffect } from 'react';
import { Botao } from '../Botao/Botao';
import pacienteService, { type Paciente } from '../../services/pacienteService';
import medicoService, { type Medico } from '../../services/medicoService';
import './FormularioAgendamento.css'
interface FormularioAgendamentoProps {
    aoSalvar: (dados: any) => void;
    aoCancelar: () => void;
}

export function FormularioAgendamento({ aoSalvar, aoCancelar }: FormularioAgendamentoProps) {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [medicos, setMedicos] = useState<any[]>([]); // Troque 'any' pela sua interface Medico
    
    const [formData, setFormData] = useState({
        pacienteId: '',
        medicoId: '',
        dataHora: '',
        observacoes: ''
    });

useEffect(() => {
    // Carrega Pacientes
    pacienteService.listar().then(dados => {
        const lista = dados.content ? dados.content : dados;
        setPacientes(lista);
    });

    // Carrega Médicos (usando seu service real agora!)
    medicoService.listar().then(dados => {
        const lista = dados.content ? dados.content : dados;
        setMedicos(lista);
    });
}, []);

    const manipularMudanca = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const enviarFormulario = (e: React.FormEvent) => {
        e.preventDefault();
        aoSalvar(formData);
    };

    return (
        <form className="formulario-clinica card p-4 shadow-sm" onSubmit={enviarFormulario}>
            <h3 className="mb-4">Novo Agendamento</h3>

            <div className="campo-grupo mb-3">
                <label htmlFor="pacienteId">Paciente</label>
                <select 
                    id="pacienteId"
                    name="pacienteId"
                    className="form-select"
                    value={formData.pacienteId}
                    onChange={manipularMudanca}
                    required
                >
                    <option value="">Selecione o paciente...</option>
                    {pacientes.map(p => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                </select>
            </div>

            <div className="campo-grupo mb-3">
                <label htmlFor="medicoId">Médico / Especialista</label>
                <select 
                    id="medicoId"
                    name="medicoId"
                    className="form-select"
                    value={formData.medicoId}
                    onChange={manipularMudanca}
                    required
                >
                    <option value="">Selecione o médico...</option>
                    {medicos.map(m => (
                        <option key={m.id} value={m.id}>{m.nome}</option>
                    ))}
                </select>
            </div>

            <div className="campo-grupo mb-3">
                <label htmlFor="dataHora">Data e Horário</label>
                <input 
                    type="datetime-local"
                    id="dataHora"
                    name="dataHora"
                    className="form-control"
                    value={formData.dataHora}
                    onChange={manipularMudanca}
                    required
                />
            </div>

            <div className="campo-grupo mb-4">
                <label htmlFor="observacoes">Observações</label>
                <textarea 
                    id="observacoes"
                    name="observacoes"
                    className="form-control"
                    rows={3}
                    value={formData.observacoes}
                    onChange={manipularMudanca}
                    placeholder="Sintomas ou notas relevantes..."
                />
            </div>

            <div className="acoes-formulario d-flex gap-2">
                <Botao texto="Confirmar Agendamento" tipo="sucesso" />
                <button type="button" className="btn btn-outline-secondary" onClick={aoCancelar}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}