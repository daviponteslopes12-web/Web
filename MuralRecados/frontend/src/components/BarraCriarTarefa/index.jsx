import {
    Container,
    Input,
    Button,
    Select
} from "./style.js";
import { criarTarefa } from "../../services/tarefaService.js";

const BarraCriarTarefa = ({ novaTarefa, setNovaTarefa }) => {

    const atualizarCampo = (campo, valor) => {
        setNovaTarefa({
            ...novaTarefa,
            [campo]: valor
        });
    };

    const adicionarTarefa = async () => {
        try {
            const resposta = await criarTarefa(novaTarefa);

            console.log(resposta);
        } catch (erro) {
            console.error(erro)
        }
    }

    return (
        <Container>
            
            <Input
                type="text"
                placeholder="Digite uma tarefa..."
                value={novaTarefa.titulo}
                onChange={(evento) => 
                    atualizarCampo("titulo", evento.target.value)
                }
            />

            <Input
                type="text"
                placeholder="Descrição"
                value={novaTarefa.descricao}
                onChange={(evento) => 
                    atualizarCampo("descricao", evento.target.value)
                }
            />

            <Select
            value={novaTarefa.status}
            onChange={(evento) => 
                atualizarCampo("status", evento.target.value)
            }
            >
                <option value="em espera">Em espera</option>
                <option value="em andamento">Em andamento</option>
                <option value="concluida">Concluída</option>

            </Select>


            <Button onClick={adicionarTarefa}>
                Adicionar
            </Button>
        </Container>
    );
};

export default BarraCriarTarefa;