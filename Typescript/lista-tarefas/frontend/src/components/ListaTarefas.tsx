import type { Tarefa } from "../types/tarefa";

interface ListarTarefasProps {
    tarefas: Tarefa[];
    onDelete: (id: number) => void;
    onToggle: (tarefa: Tarefa) => void;
}

function ListaTarefas({ 
    tarefas, 
    onDelete,
    onToggle
}: ListarTarefasProps) {
    return (
        <>
            {tarefas.map((tarefa) => (
                <div
                key={tarefa.id}>
                    <input 
                        type="checkbox"
                        checked={tarefa.concluida}
                        onChange={() => onToggle(tarefa)}
                    />

                    <span>{tarefa.titulo}</span>

                    <button onClick={() => onDelete(tarefa.id)}>
                        Excluir
                    </button>
                </div>
            ))}
        </>
    );
}

export default ListaTarefas;