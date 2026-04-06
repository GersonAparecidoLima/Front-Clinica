import { useEffect, useState } from 'react';
// IMPORTANTE: Importe a interface Medico aqui
import medicoService from '../../services/medicoService';
import type { Medico } from '../../services/medicoService';


export function ListaMedicos() {
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);

    const carregarMedicos = async () => {
        try {
            setCarregando(true);
            const dados = await medicoService.listar();
            
            // Se o seu service já retorna o .content, use direto:
            setMedicos(dados); 
        } catch (error) {
            console.error("Erro ao buscar médicos:", error);
            alert("Erro ao carregar a lista de médicos.");
        } finally {
            // CORREÇÃO: Apenas um setCarregando
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarMedicos();
    }, []);

    if (carregando) return <p>Carregando médicos...</p>;

    return (
        <div className="container mt-4"> {/* mt-4 dá um espaçamento no topo */}
            <h2>Listagem de Médicos</h2>
            <table className="table table-hover"> {/* table-hover fica mais bonito ao passar o mouse */}
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CRM</th>
                        <th>Especialidade</th>
                        <th>E-mail</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.map((medico) => (
                        <tr key={medico.id}>
                            <td>{medico.nome}</td>
                            <td>{medico.crm}</td>
                            <td>{medico.especialidade}</td>
                            <td>{medico.email}</td>
                            <td>
                                {medico.ativo ? 
                                    <span className="badge bg-success">Ativo</span> : 
                                    <span className="badge bg-danger">Inativo</span>
                                }
                            </td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2">Editar</button>
                                
                                {/* DICA: Se estiver inativo, mostra botão de Reativar. Se ativo, mostra Excluir */}
                                {!medico.ativo && (
                                    <button className="btn btn-warning btn-sm">Reativar</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}