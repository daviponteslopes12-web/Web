import { missaoRepository } from '../repositories/missaoRepository.js';
import { guildaRepository } from '../repositories/guildaRepository.js';
import { usuarioRepository } from '../repositories/usuarioRepository.js';
import { heroiRepository } from '../repositories/heroiRepository.js';
import { calcularNivelRecrutador } from '../utils/niveis.js';
import { calcularNivelHeroi } from '../utils/niveis.js';
import { sortearElemento, temVantagemElemental } from '../utils/constantes.js';
import { criarErro } from '../utils/criarErro.js';

// ===== Constantes de missões =====

const RECOMPENSAS = {
    facil:     { moedas: 30,  xp: 50,  xp_heroi: 25 },
    medio:     { moedas: 60,  xp: 120, xp_heroi: 50 },
    dificil:   { moedas: 120, xp: 250, xp_heroi: 100 },
    especial:  { moedas: 300, xp: 500, xp_heroi: 200 }
};

const PODER_INIMIGO = {
    facil:     { min: 100,  max: 500 },
    medio:     { min: 500,  max: 1200 },
    dificil:   { min: 1200, max: 2400 },
    especial:  { min: 2400, max: 3500 }
};

const INIMIGOS = {
    facil: [
        { nome: 'Goblin da Floresta', descricao: 'Um pequeno goblin está aterrorizando viajantes na floresta.' },
        { nome: 'Rato Gigante', descricao: 'Ratos gigantes invadiram a taverna do vilarejo.' },
        { nome: 'Esqueleto Errante', descricao: 'Esqueletos saíram do cemitério e vagam pela estrada.' },
        { nome: 'Lobo Feroz', descricao: 'Um lobo faminto está atacando o rebanho da vila.' },
        { nome: 'Bandido da Estrada', descricao: 'Bandidos estão roubando mercadores na estrada.' }
    ],
    medio: [
        { nome: 'Dragão de Lava', descricao: 'Um jovem dragão está incendiando a região vulcânica.' },
        { nome: 'Exército das Sombras', descricao: 'Criaturas das sombras marcham em direção ao reino.' },
        { nome: 'Mago Louco', descricao: 'Um mago enlouquecido está causando destruição.' },
        { nome: 'Golem de Pedra', descricao: 'Um golem antigo despertou e está destruindo tudo.' },
        { nome: 'Hidra Venenosa', descricao: 'Uma hidra venenosa está envenenando o rio.' }
    ],
    dificil: [
        { nome: 'Titã da Destruição', descricao: 'Um titã ancestral emergiu das profundezas.' },
        { nome: 'Lorde Demônio', descricao: 'O senhor do submundo ameaça destruir o reino.' },
        { nome: 'Fênix Negra', descricao: 'Uma fênix corrompida está queimando florestas.' },
        { nome: 'Cerberus', descricao: 'O cão de três cabeças guarda o portão do inferno.' },
        { nome: 'Dragão Ancião', descricao: 'O mais antigo dos dragões despertou de seu sono.' }
    ],
    especial: [
        { nome: 'Devorador de Mundos', descricao: 'Uma entidade cósmica ameaça devorar a realidade.' },
        { nome: 'Rei Demônio Absoluto', descricao: 'O mais poderoso dos demônios retornou.' },
        { nome: 'Dragão Primordial', descricao: 'O primeiro dragão, pai de todos, surgiu.' },
        { nome: 'Guardião do Abismo', descricao: 'A entidade que habita o abismo despertou.' }
    ]
};

// ===== Funções auxiliares =====

function gerarPoderInimigo(dificuldade) {
    const faixa = PODER_INIMIGO[dificuldade];
    return Math.floor(Math.random() * (faixa.max - faixa.min + 1)) + faixa.min;
}

function gerarMissaoAleatoria() {
    // 1% chance de missão especial
    const ehEspecial = Math.random() < 0.01;

    let dificuldade;
    if (ehEspecial) {
        dificuldade = 'especial';
    } else {
        const rand = Math.random();
        if (rand < 0.50) dificuldade = 'facil';
        else if (rand < 0.80) dificuldade = 'medio';
        else dificuldade = 'dificil';
    }

    const inimigos = INIMIGOS[dificuldade];
    const inimigo = inimigos[Math.floor(Math.random() * inimigos.length)];
    const elemento = sortearElemento();
    const poderInimigo = gerarPoderInimigo(dificuldade);
    const recompensas = RECOMPENSAS[dificuldade];

    return {
        nome: inimigo.nome,
        descricao: inimigo.descricao,
        elemento,
        dificuldade,
        poderInimigo,
        recompensaMoedas: recompensas.moedas,
        recompensaXp: recompensas.xp,
        recompensaXpHeroi: recompensas.xp_heroi,
        ehEspecial
    };
}

// ===== Service =====

export const missaoService = {

    // Listar missões do recrutador (gera novas se necessário)
    async listarMissoes(usuarioId) {
        // Remove missões concluídas que passaram do cooldown
        await missaoRepository.removerMissoesExpiradas(usuarioId);

        // Buscar missões existentes
        const posicoesOcupadas = new Set();
        const missoesExistentes = await missaoRepository.buscarMissoes(usuarioId);
        missoesExistentes.forEach(m => posicoesOcupadas.add(m.posicao));

        // Gerar novas missões para slots vazios
        for (let posicao = 1; posicao <= 12; posicao++) {
            if (!posicoesOcupadas.has(posicao)) {
                const dados = gerarMissaoAleatoria();
                await missaoRepository.criarMissao({
                    usuarioId,
                    posicao,
                    ...dados
                });
            }
        }

        // Buscar novamente para retornar tudo atualizado
        const missoes = await missaoRepository.buscarMissoes(usuarioId);

        return missoes.sort((a, b) => a.posicao - b.posicao);
    },

    // Executar missão com uma guilda
    async executarMissao(usuarioId, missaoId, guildaId) {
        // Verificar missão
        const missao = await missaoRepository.buscarPorId(missaoId);

        if (!missao || missao.usuario_id !== usuarioId) {
            throw criarErro(404, 'Missão não encontrada.');
        }

        if (missao.status !== 'disponivel') {
            throw criarErro(400, 'Missão não está disponível.');
        }

        // Verificar guilda
        const guilda = await guildaRepository.buscarPorId(guildaId);

        if (!guilda || guilda.usuario_id !== usuarioId) {
            throw criarErro(404, 'Guilda não encontrada.');
        }

        // Verificar se guilda está descansando
        if (guilda.descanso_ate && new Date(guilda.descanso_ate) > new Date()) {
            const minutosRestantes = Math.ceil((new Date(guilda.descanso_ate) - new Date()) / 60000);
            throw criarErro(400, `Guilda está descansando. Disponível em ${minutosRestantes} minutos.`);
        }

        // Buscar heróis da guilda
        const herois = await guildaRepository.buscarHeroisDaGuilda(guildaId);

        if (herois.length === 0) {
            throw criarErro(400, 'Guilda não tem heróis.');
        }

        // Calcular poder total da guilda
        let poderTotal = 0;

        for (const heroi of herois) {
            let poderHeroi = heroi.poder_base * (1 + 0.02 * heroi.nivel);

            // Boost mesmo elemento da guilda
            if (heroi.elemento === guilda.elemento) {
                poderHeroi *= 1.05;
            }

            // Vantagem elemental contra a missão
            if (temVantagemElemental(heroi.elemento, missao.elemento)) {
                poderHeroi *= 1.05;
            }

            poderTotal += poderHeroi;
        }

        // Comparar com poder inimigo
        const venceu = poderTotal >= missao.poder_inimigo;

        if (venceu) {
            // Concluir missão com cooldown de 10 minutos
            const podeRefazerEm = new Date(Date.now() + 10 * 60 * 1000);
            await missaoRepository.concluirMissao(missaoId, podeRefazerEm);

            // Recompensas do recrutador
            const usuario = await usuarioRepository.buscarPorId(usuarioId);
            const novasMoedas = usuario.moedas + missao.recompensa_moedas;
            const novoXp = usuario.xp + missao.recompensa_xp;
            const { nivel, xp } = calcularNivelRecrutador(novoXp, usuario.nivel);

            await usuarioRepository.atualizarMoedas(usuarioId, novasMoedas);
            await usuarioRepository.atualizarXpENivel(usuarioId, xp, nivel);

            // XP dos heróis da guilda
            for (const heroi of herois) {
                const novoXpHeroi = heroi.xp + missao.recompensa_xp_heroi;
                const { nivel: nivelHeroi, xp: xpHeroi } = calcularNivelHeroi(novoXpHeroi, heroi.nivel);
                await heroiRepository.atualizarXpHeroi(heroi.id, xpHeroi, nivelHeroi);
            }

            return {
                venceu: true,
                poder_guilda: Math.round(poderTotal),
                poder_inimigo: missao.poder_inimigo,
                recompensas: {
                    moedas: missao.recompensa_moedas,
                    xp_recrutador: missao.recompensa_xp,
                    xp_heroi: missao.recompensa_xp_heroi
                },
                usuario: {
                    moedas: novasMoedas,
                    xp,
                    nivel
                }
            };
        } else {
            // Guilda descansa por 5 minutos
            const descansoAte = new Date(Date.now() + 5 * 60 * 1000);
            await guildaRepository.setDescanso(guildaId, descansoAte);

            return {
                venceu: false,
                poder_guilda: Math.round(poderTotal),
                poder_inimigo: missao.poder_inimigo,
                descanso_ate: descansoAte
            };
        }
    }
};