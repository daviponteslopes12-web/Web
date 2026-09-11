import api from "./api.js";

export const criarTarefa = async (tarefa) => {
    const resposta = await api.post("/tarefas", tarefa);

    return resposta.data;
}

export const buscarTarefas = async () => {
    const resposta = await api.get("/tarefas");

    return resposta.data;
}