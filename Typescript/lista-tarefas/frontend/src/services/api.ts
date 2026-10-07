import type { Tarefa } from "../types/tarefa";

const API_URL = "http://localhost:3000/tarefas";

export async function listarTarefas(): Promise<Tarefa[]> {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar tarefas");
    }

    return resposta.json();
}

export async function criarTarefa(titulo: string): Promise<Tarefa> {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo
        })
    });

    if (!resposta.ok) {
        throw new Error("Erro ao criar tarefa");
    }

    return resposta.json();
}

export async function deletarTarefa(id: number): Promise<boolean> {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error("Erro ao deletar tarefa");
    }

    return resposta.json();
}

export async function atualizarTarefa(
    id: number, 
    titulo: string, 
    concluida: boolean
): Promise<boolean> {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo,
            concluida
        })
    });

    if (!resposta) {
        throw new Error("Erro ao atualizar tarefa");
    }

    return resposta.json();
}