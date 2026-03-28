// src/services/api.ts
import axios from 'axios';

// Criamos uma instância do Axios com a URL base do seu Spring Boot
const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export default api;