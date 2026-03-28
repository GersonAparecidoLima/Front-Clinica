// src/services/medicoService.ts
import api from './api';


// Reutilizamos a interface que você já criou (ou defina aqui se preferir)
// 1. Você precisa definir a interface do Endereço primeiro!

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

// Depois incluímos o endereço dentro do Medico
export interface Medico {
    id?: number;
    nome: string;
    email: string;
    crm: string;
    especialidade: string;
    endereco: Endereco; // ESSA LINHA É O QUE RESOLVE O ERRO!
}

/*export interface Medico {
    id?: number;
    nome: string;
    email: string;
    crm: string;
    especialidade: string;
    endereco: Endereco; // O TypeScript agora entende o que é isso!
}
*/
const medicoService = {
    // GET: Listar todos
    listar: async () => {
        const resposta = await api.get<Medico[]>('/medicos');
        return resposta.data;
    },

    // POST: Cadastrar novo
    cadastrar: async (medico: Medico) => {
        const resposta = await api.post<Medico>('/medicos', medico);
        return resposta.data;
    }
};

export default medicoService;