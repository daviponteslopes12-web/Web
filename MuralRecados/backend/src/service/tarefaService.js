import {TarefaRepository} from "../infra/repository/tarefaRepository.js";
import {criarErro} from "../utils/criarErro.js";

const tarefaRepository = new TarefaRepository();

export class TarefaService {
  async criarTarefa(titulo, descricao, status = "em espera") {
    const tarefa = await tarefaRepository.buscarTarefaPorTitulo(titulo);

    if (tarefa) {
      throw criarErro("Já existe uma tarefa com esse título", 409);
    }

    const id = await tarefaRepository.criarTarefa(titulo, descricao, status);

    return id;
  }

  async buscarTodasTarefas() {
    const tarefas = await tarefaRepository.buscarTodasTarefas();

    return tarefas;
  }

  async deletarTarefa(id) {
    const tarefa = await tarefaRepository.buscarTarefaPorId(id);

    if (!tarefa) {
      throw criarErro("Tarefa não encontrada", 404);
    }

    const resultado = await tarefaRepository.deletarTarefa(id);

    return resultado;
  }

  async atualizarInformacoes(id, titulo, descricao) {
    const tituloVazio = titulo === undefined || titulo.trim() === "";

    const descricaoVazia = descricao === undefined || descricao.trim() === "";

    if (tituloVazio && descricaoVazia) {
      throw criarErro("Informe pelo menos uma informação para atualizar", 400);
    }

    const resultado = await tarefaRepository.atualizarInformacoes(
      id,
      titulo,
      descricao,
    );

    return resultado;
  }

  async atualizarStatus(id, status) {
    const statusAceitos = ["em espera", "em andamento", "concluida"];

    if (!statusAceitos.includes(status)) {
      throw criarErro("Status inválido", 400);
    }

    const tarefa = await tarefaRepository.buscarTarefaPorId(id);

    if (!tarefa) {
      throw criarErro("Tarefa não encontrada", 404);
    }

    const resultado = await tarefaRepository.atualizarStatus(id, status);

    return resultado;
  }
}
