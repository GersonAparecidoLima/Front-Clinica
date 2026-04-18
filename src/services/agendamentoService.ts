// src/services/agendamentoService.ts
import api from './api';

export interface Agendamento {
    id?: number;
    pacienteId: number;
    medicoId: number;
    dataHora: string;
    observacoes: string;
}

const agendamentoService = {
    cadastrar: (dados: Agendamento) => api.post('/agendamentos', dados),
    listar: () => api.get('/agendamentos')
};

export default agendamentoService;