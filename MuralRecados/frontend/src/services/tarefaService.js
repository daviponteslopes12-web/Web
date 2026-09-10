import api from "./api.js";

export const criarTarefa = async (tarefa) => {
    const resposta = await api.post("/tarefas", tarefa);

    return resposta.data;
}