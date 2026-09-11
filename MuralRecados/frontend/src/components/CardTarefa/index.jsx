import {
    Container,
    Titulo,
    Descricao,
    Status
} from "./style.js";

const CardTarefa = ({ tarefa }) => {

    return (
        <Container>
            <Titulo>{tarefa.titulo}</Titulo>

            <Descricao>
                {tarefa.descricao
                    ? tarefa.descricao
                    : "Tarefa sem descrição"}
            </Descricao>

            <Status>{tarefa.status}</Status>
        </Container>
    )

}

export default CardTarefa;