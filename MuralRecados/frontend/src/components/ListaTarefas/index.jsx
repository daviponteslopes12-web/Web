import CardTarefa from "../CardTarefa";
import { Container } from "./style.js";

const ListaTarefas = ({ tarefas }) => {
    return (
        <Container>
            {tarefas.map((tarefa) => (
                <CardTarefa 
                key={tarefa.id}
                tarefa={tarefa} 
                />
            ))}
        </Container>
    )
}

export default ListaTarefas;