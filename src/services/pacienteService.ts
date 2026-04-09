import api from './api';
import type { Endereco } from './medicoService';
export interface Paciente {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: Endereco;
    ativo?: boolean;
}

const pacienteService = {

    listar: async () => {
    const resposta = await api.get<any>('/pacientes'); 
    // Garante que se não houver 'content' (paginação), ele tenta pegar o data direto
    return resposta.data.content || resposta.data; 
    },

    cadastrar: async (paciente: Paciente) => {
        const resposta = await api.post<Paciente>('/pacientes', paciente);
        return resposta.data;
    },

    excluir: async (id: number) => {
        await api.delete(`/pacientes/${id}`);
    }
};

export default pacienteService;