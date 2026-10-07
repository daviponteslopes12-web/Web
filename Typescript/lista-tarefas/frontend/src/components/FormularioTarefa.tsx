import type { FormEvent } from "react";

interface FormularioTarefaProps {
    titulo: string;
    setTitulo: (titulo: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function FormularioTarefa({
    titulo,
    setTitulo,
    onSubmit
} : FormularioTarefaProps) {
    return (
        <form onSubmit={onSubmit}>
            <input 
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            placeholder="Digite uma tarefa"
            />

            <button type="submit">
                Adicionar
            </button>
        </form>
    );
}

export default FormularioTarefa;