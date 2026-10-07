import { useEffect, useState } from "react";
import { 
    listarTarefas, 
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
} from "./services/api";

import ListaTarefas from "./components/ListaTarefas";
import FormularioTarefa from "./components/FormularioTarefa";

import type { Tarefa } from "./types/tarefa";
import type { FormEvent } from "react";

function App() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [titulo, setTitulo] = useState("");


    useEffect(() => {
        async function carregarTarefas() {
            try {
                const tarefas = await listarTarefas();

                setTarefas(tarefas);
            } catch (error) {
                console.error("Erro ao buscar tarefas", error);
            }
        }

        carregarTarefas()
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (titulo.trim() === "") {
            return;
        }

        try {
            const novaTarefa = await criarTarefa(titulo);

            setTarefas((tarefasAtuais) => [
                ...tarefasAtuais, novaTarefa
            ])

            setTitulo("")
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
        }
    }

    async function handleDelete(id: number) {
        try {
            await deletarTarefa(id);

            setTarefas((tarefasAtuais) => 
                tarefasAtuais.filter((tarefa) => tarefa.id !== id)
            );
        } catch (error) {
            console.error("Erro ao deletar tarefa", error);
        }
    }

    async function handleToggle(tarefa: Tarefa) {
        try {
            await atualizarTarefa(
                tarefa.id,
                tarefa.titulo,
                !tarefa.concluida
            );

            setTarefas((tarefasAtuais) => 
                tarefasAtuais.map((tarefaAtual) =>
                    tarefaAtual.id === tarefa.id
                    ? {
                        ...tarefaAtual, concluida: !tarefaAtual.concluida
                    } : tarefaAtual
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar tarefa", error);
        }
    }


    return (
        <main>
            <h1>Lista de Tarefas</h1>

            <FormularioTarefa
                titulo={titulo}
                setTitulo={setTitulo}
                onSubmit={handleSubmit}
            />

            <ListaTarefas 
                tarefas={tarefas}
                onDelete={handleDelete}
                onToggle={handleToggle}
             />
        </main>
    )
}

export default App;