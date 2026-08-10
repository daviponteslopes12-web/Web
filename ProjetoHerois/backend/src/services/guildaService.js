import { guildaRepository } from '../repositories/guildaRepository.js';
import { heroiRepository } from '../repositories/heroiRepository.js';
import { usuarioRepository } from '../repositories/usuarioRepository.js';
import { pool } from '../config/db.js';
import { criarErro } from '../utils/criarErro.js';

const CUSTO_ELEMENTO = {
    normal: 0,
    fogo: 50,
    agua: 50,
    natureza: 50,
    luz: 100,
    trevas: 100,
    lendario: 200,
    atemporal: 200
};

const MAX_HEROIS = 6;

export const guildaService = {

    // Listar guildas do recrutador
    async listarDoUsuario(usuarioId) {
        const guildas = await guildaRepository.buscarGuildasDoUsuario(usuarioId);

        // Buscar heróis de cada guilda
        const guildasComHerois = await Promise.all(
            guildas.map(async (guilda) => {
                const herois = await guildaRepository.buscarHeroisDaGuilda(guilda.id);
                return { ...guilda, herois };
            })
        );

        return guildasComHerois;
    },

    // Criar guilda
    async criar(usuarioId, { nome, elemento }) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        const custo = CUSTO_ELEMENTO[elemento];

        if (usuario.moedas < custo) {
            throw criarErro(400, `Moedas insuficientes. Necessário: ${custo}, disponível: ${usuario.moedas}.`);
        }

        // Descontar moedas
        if (custo > 0) {
            await usuarioRepository.atualizarMoedas(usuarioId, usuario.moedas - custo);
        }

        const guildaId = await guildaRepository.criarGuilda({ usuarioId, nome, elemento });

        return {
            id: guildaId,
            nome,
            elemento,
            herois: [],
            usuario: {
                moedas: usuario.moedas - custo
            }
        };
    },

    // Adicionar herói à guilda
    async adicionarHeroi(usuarioId, guildaId, heroiId) {
        const guilda = await guildaRepository.buscarPorId(guildaId);

        if (!guilda || guilda.usuario_id !== usuarioId) {
            throw criarErro(404, 'Guilda não encontrada.');
        }

        const heroi = await heroiRepository.buscarHeroiPorId(heroiId);

        if (!heroi || heroi.usuario_id !== usuarioId) {
            throw criarErro(404, 'Herói não encontrado.');
        }

        if (heroi.guilda_id) {
            throw criarErro(400, 'Herói já está em uma guilda. Remova-o primeiro.');
        }

        const totalHerois = await guildaRepository.contarHerois(guildaId);

        if (totalHerois >= MAX_HEROIS) {
            throw criarErro(400, `Guilda já tem o máximo de ${MAX_HEROIS} heróis.`);
        }

        await pool.query(`
            UPDATE usuario_herois
            SET guilda_id = ?
            WHERE id = ?
        `, [guildaId, heroiId]);

        return { mensagem: 'Herói adicionado à guilda com sucesso.' };
    },

    // Remover herói da guilda
    async removerHeroi(usuarioId, guildaId, heroiId) {
        const guilda = await guildaRepository.buscarPorId(guildaId);

        if (!guilda || guilda.usuario_id !== usuarioId) {
            throw criarErro(404, 'Guilda não encontrada.');
        }

        const heroi = await heroiRepository.buscarHeroiPorId(heroiId);

        if (!heroi || heroi.usuario_id !== usuarioId) {
            throw criarErro(404, 'Herói não encontrado.');
        }

        if (heroi.guilda_id !== guildaId) {
            throw criarErro(400, 'Herói não pertence a essa guilda.');
        }

        await pool.query(`
            UPDATE usuario_herois
            SET guilda_id = NULL
            WHERE id = ?
        `, [heroiId]);

        return { mensagem: 'Herói removido da guilda com sucesso.' };
    },

    // Deletar guilda
    async deletar(usuarioId, guildaId) {
        const guilda = await guildaRepository.buscarPorId(guildaId);

        if (!guilda || guilda.usuario_id !== usuarioId) {
            throw criarErro(404, 'Guilda não encontrada.');
        }

        await guildaRepository.deletarGuilda(guildaId);

        return { mensagem: 'Guilda deletada com sucesso.' };
    }
};