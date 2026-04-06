// src/services/api.ts
import axios from 'axios';

// 1. Criamos a instância (NÃO pode estar comentada)
const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// 2. Exportamos a função de reativar
export const reativarMedico = async (id: number) => {
    try {
        // Agora o 'api' existe e vai usar a baseURL configurada acima
        const resposta = await api.put(`/medicos/${id}/reativar`);
        
        // Retorna o JSON (DadosDetalhamentoMedico) que veio do Spring
        return resposta.data; 
    } catch (error) {
        console.error("Erro ao reativar médico:", error);
        throw error;
    }
};

// 3. Exportamos a instância por padrão para usar em outros lugares
export default api;