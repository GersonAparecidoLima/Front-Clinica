import api, { atualizarPaciente } from './api'; // Certifique-se de importar o que criamos no api.ts

export interface Paciente {
    id?: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    endereco?: {
        logradouro: string;
        bairro: string;
        cep: string;
        cidade: string;
        uf: string;
        numero: string;
    };
}

const pacienteService = {
    listar: async () => {
        const resposta = await api.get('/pacientes');
        return resposta.data;
    },

    cadastrar: async (paciente: Paciente) => {
        const resposta = await api.post('/pacientes', paciente);
        return resposta.data;
    },

    excluir: async (id: number) => {
        await api.delete(`/pacientes/${id}`);
    },

    // ADICIONE ESTA FUNÇÃO AQUI:
    atualizar: async (paciente: Paciente) => {
        // Aqui chamamos aquela função que criamos no api.ts
        return await atualizarPaciente(paciente);
    }
};

export default pacienteService;