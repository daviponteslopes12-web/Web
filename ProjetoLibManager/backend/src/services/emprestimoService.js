import {emprestimoRepository} from "../repositories/emprestimoRepository.js";
import {livroRepository} from "../repositories/livroRepository.js";
import {usuarioRepository} from "../repositories/usuarioRepository.js";
import {criarErro} from "../utils/criarErro.js";
import {historicoService} from "../services/historicoService.js";

export const emprestimoService = {
  async cadastrar(livroId, usuarioId) {
    // Busca livro — 1 query
    const livro = await livroRepository.buscarLivro(livroId);

    if (!livro) {
      throw criarErro(404, "Livro não encontrado.");
    }
    console.log('livro: ', livro);
    // Busca usuário — 1 query
    const usuario = await usuarioRepository.buscarUsuario(usuarioId);

    if (!usuario) {
      throw criarErro(404, "Usuário não encontrado.");
    }
    console.log('usuario: ', usuario);
    if (livro.quantidade_disponivel === 0) {
      throw criarErro(400, "Livro indisponível para empréstimo.");
    }

    // Datas
    const dataEmprestimo = new Date();
    const dataDevolucaoPrevista = new Date();
    dataDevolucaoPrevista.setDate(dataDevolucaoPrevista.getDate() + 30);

    const dataEmprestimoFormatada = dataEmprestimo.toISOString().split("T")[0];
    const dataDevolucaoFormatada = dataDevolucaoPrevista
      .toISOString()
      .split("T")[0];

    const id = await emprestimoRepository.cadastrar(
      livroId,
      usuarioId,
      dataEmprestimoFormatada,
      dataDevolucaoFormatada,
    );

    await historicoService.criar({
      livro: livro.titulo,
      autor: livro.autor,
      usuario: usuario.nome,
      dataEmprestimo: dataEmprestimoFormatada,
      dataDevolucaoPrevista: dataDevolucaoFormatada,
    });

    return {
      id,
      livroId,
      usuarioId,
      dataEmprestimo: dataEmprestimoFormatada,
      dataDevolucaoPrevista: dataDevolucaoFormatada,
    };
  },

  async listar(status) {
    const emprestimos = await emprestimoRepository.listar(status);
    const hoje = new Date().toISOString().split("T")[0];

    for (const emprestimo of emprestimos) {
      if (
        emprestimo.status === "ativo" &&
        emprestimo.data_devolucao_prevista < hoje
      ) {
        await emprestimoRepository.atualizarStatusAtrasado(emprestimo.id);
        emprestimo.status = "atrasado";
      }
    }

    return emprestimos;
  },

  async devolver(emprestimoId) {
    const emprestimo = await emprestimoRepository.buscarPorId(emprestimoId);

    if (!emprestimo) {
      throw criarErro(404, "Empréstimo não encontrado.");
    }

    if (emprestimo.status === "devolvido") {
      throw criarErro(400, "Este empréstimo já foi devolvido.");
    }

    const dataDevolucaoReal = new Date().toISOString().split("T")[0];

    await emprestimoRepository.devolver(
      emprestimoId,
      emprestimo.livro_id,
      dataDevolucaoReal,
    );

    return {mensagem: "Livro devolvido com sucesso."};
  },
};
