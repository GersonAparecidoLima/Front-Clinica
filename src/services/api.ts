// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// --- MÉDICOS ---
export const reativarMedico = async (id: number) => {
    try {
        const resposta = await api.put(`/medicos/${id}/reativar`);
        return resposta.data; 
    } catch (error) {
        console.error("Erro ao reativar médico:", error);
        throw error;
    }
};

// --- PACIENTES ---

/**
 * Função para atualizar dados do paciente
 * @param dados Objeto contendo o ID (obrigatório) e os campos a atualizar
 */
export const atualizarPaciente = async (dados: any) => {
    try {
        // No seu Controller, o @PutMapping está na rota base ("pacientes")
        const resposta = await api.put('/pacientes', dados);
        return resposta.data;
    } catch (error) {
        console.error("Erro ao atualizar paciente:", error);
        throw error;
    }
};

export default api;