// src/services/medicoService.ts
import api from './api';
// No arquivo medicoService.ts, se houver erro parecido:



// Primeiro definimos o que é um Endereço
export interface Endereco {
    logradouro: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    complemento?: string;
    numero?: string;
}


export interface Medico {
    id?: number;
    nome: string;
    email: string;
    crm: string;
    especialidade: string; // O TypeScript já conhece a especialidade aqui!
    telefone?: string;     // Adicionei telefone pois seu DTO Java tem
    endereco: Endereco; 
    ativo?: boolean; // Adicione isso para controlar a exibição na tela!
}

export const reativarMedicoService = async (id: number) => {
    // Usamos a instância 'api' que você já configurou
    const resposta = await api.put(`/medicos/${id}/reativar`);
    return resposta.data; // Retorna o DadosDetalhamentoMedico que o Java enviou
};

const medicoService = {
    // GET: Listar todos
    // No listar, o retorno do Spring Page é um objeto, não um array direto
    listar: async () => {
        const resposta = await api.get<any>('/medicos'); 
        return resposta.data.content; // O 'content' é onde estão os médicos de fato
    },


    // NOVO MÉTODO: Essencial para carregar o médico na tela de edição
    buscarPorId: async (id: number) => {
        const resposta = await api.get<Medico>(`/medicos/${id}`);
        return resposta.data;
    },

    // POST: Cadastrar novo
    cadastrar: async (medico: Medico) => {
        const resposta = await api.post<Medico>('/medicos', medico);
        return resposta.data;
    },

    // NOVO MÉTODO: Para salvar as alterações
    atualizar: async (medico: Medico) => {
        const resposta = await api.put<Medico>('/medicos', medico);
        return resposta.data;
    },

    // --- ADICIONE ESTA FUNÇÃO AQUI EMBAIXO ---
    excluir: async (id: number) => {
        // Isso vai chamar o @DeleteMapping("/{id}") lá no seu Java
        await api.delete(`/medicos/${id}`);
    }


};

export default medicoService;