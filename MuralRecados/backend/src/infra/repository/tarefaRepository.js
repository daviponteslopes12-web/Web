import {db} from "../../config/db.js";
import {criarErro} from "../../utils/criarErro.js";
export class TarefaRepository {
  async criarTarefa(titulo, descricao, status) {
    try {
      const [resultado] = await db.query(
        `
                INSERT INTO tarefas
                (titulo, descricao, status)
                VALUES (?, ?, ?)
                `,
        [titulo, descricao, status],
      );

      return resultado.insertId;
    } catch (erro) {
      throw criarErro("Ocorreu um erro, tente novamente mais tarde", 500, erro);
    }
  }

  async buscarTodasTarefas() {
    try {
      const [resultado] = await db.query(
        `
            SELECT * FROM tarefas
            `,
      );

      return resultado;
    } catch (erro) {
      throw criarErro("Ocorreu um erro, tente novamente mais tarede", 500, erro);
    }
  }

  async buscarTarefaPorTitulo(titulo) {
    try {
        const [resultado] = await db.query(`
            SELECT * FROM tarefas
            WHERE titulo = ?
            `, [titulo]);

        return resultado[0] || null;
    } catch (erro) {
        throw criarErro("Ocorreu um erro, tente novamente mais tarde", 500, erro);
    }
  }

  async buscarTarefaPorId(id) {
    try {
        const [resultado] = await db.query(`
            SELECT * FROM tarefas
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    } catch (erro) {
        throw criarErro("Ocorreu um erro, tente novamente mais tarde", 500, erro);
    }
  }

  async deletarTarefa(id) {
    try {
      const [resultado] = await db.query(
        `
                DELETE FROM tarefas
                WHERE id = ?
                `,
        [id],
      );

      return resultado.affectedRows;
    } catch (erro) {
      throw criarErro("Ocorreu um erro, tente novamente mais tarde", 500, erro);
    }
  }

  async atualizarInformacoes(id, titulo, descricao) {
    try {
        const campos = [];
        const valores = [];
        
        if (titulo !== undefined) {
            campos.push('titulo = ?');
            valores.push(titulo);
        }

        if (descricao !== undefined) {
            campos.push('descricao = ?');
            valores.push(descricao);
        }

        if (campos.length === 0) {
            return null;
        }

        valores.push(id);

        const [resultado] = await db.query(
            `
            UPDATE tarefas
            SET ${campos.join(', ')}
            WHERE id = ?
            `, valores
        );

        return resultado.affectedRows;
    } catch (erro) {
        throw criarErro("Ocorreu um erro interno, tente novamente mais tarde", 500, erro)
    }
  }

  async atualizarStatus(id, status) {
    try {
      const [resultado] = await db.query(
        `
            UPDATE tarefas
            SET status = ?
            WHERE id = ?
            `,
        [status, id],
      );

      return resultado.affectedRows;
    } catch (erro) {
      throw criarErro("Ocorreu um erro, tente novamente mais tarde", 500, erro);
    }
  }
}
