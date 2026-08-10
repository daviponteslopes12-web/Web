import { heroiRepository } from '../repositories/heroiRepository.js';
import { usuarioRepository } from '../repositories/usuarioRepository.js';
import { criarErro } from '../utils/criarErro.js';
import { calcularNivelHeroi, calcularNivelRecrutador } from '../utils/niveis.js';
import { sortearElemento, sortearClasse } from '../utils/constantes.js';

// Elementos e classes possíveis
const ELEMENTOS = ['fogo', 'agua', 'natureza', 'luz', 'trevas', 'lendario', 'atemporal'];
const CLASSES = ['mago', 'elfo', 'anao', 'orc', 'guerreiro'];

// Probabilidades de raridade por caixa
const CAIXAS = {
    madeira:   { comum: 60, raro: 25, epico: 12, lendario: 3 },
    bronze:    { comum: 45, raro: 30, epico: 17, lendario: 8 },
    prata:     { raro: 40, epico: 30, lendario: 20, mitico: 10 },
    ouro:      { epico: 40, lendario: 35, mitico: 20, secreto: 5 },
    diamante:  { lendario: 50, mitico: 35, secreto: 15 },
    obsidiana: { lendario: 35, mitico: 45, secreto: 20 },
    dev:       { comum: 16.6, raro: 16.6, epico: 16.6, lendario: 16.6, mitico: 16.8, secreto: 16.8 }
};

// Faixa de poder base por raridade
const PODER_BASE = {
    comum:    { min: 50,  max: 200 },
    raro:     { min: 201, max: 310 },
    epico:    { min: 311, max: 420 },
    lendario: { min: 421, max: 510 },
    mitico:   { min: 511, max: 570 },
    secreto:  { min: 571, max: 600 }
};

// Custo de criação por raridade
const CUSTOS_CRIACAO = {
    comum: 100,
    raro: 250,
    epico: 500,
    lendario: 1200,
    mitico: 2700
};

// Constantes de XP
const XP_POR_REPETIDO = 20;
const XP_POR_GIRO = 10;

// ===== Funções auxiliares =====

function sortearRaridade(caixa) {
    const probabilidades = CAIXAS[caixa];
    const rand = Math.random() * 100;
    let acumulado = 0;

    for (const [raridade, chance] of Object.entries(probabilidades)) {
        acumulado += chance;
        if (rand <= acumulado) return raridade;
    }

    return Object.keys(probabilidades)[0];
}

function girarElemento() {
    return ELEMENTOS[Math.floor(Math.random() * ELEMENTOS.length)];
}

function girarClasse() {
    return CLASSES[Math.floor(Math.random() * CLASSES.length)];
}

function gerarPoderBase(raridade) {
    const faixa = PODER_BASE[raridade];
    return Math.floor(Math.random() * (faixa.max - faixa.min + 1)) + faixa.min;
}


// ===== Service =====

export const heroiService = {

    // Listar heróis do recrutador
    async listarDoUsuario(usuarioId) {
        return await heroiRepository.buscarHeroisDoUsuario(usuarioId);
    },

    // Sortear heróis (gratuito)
    async sortear(usuarioId) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        // Quantidade de heróis por giro (base 1 + boost)
        const boostNivel = await heroiRepository.buscarNivelBoost(usuarioId, 'boost_herois');
        const quantidade = 1 + boostNivel;

        // Buscar heróis aleatórios da cache
        const heroisApi = await heroiRepository.buscarHeroisAleatorio(quantidade);

        if (heroisApi.length === 0) {
            throw criarErro(500, 'Nenhum herói disponível no cache.');
        }

        const resultados = [];

        for (const heroiApi of heroisApi) {
            const raridade = sortearRaridade(usuario.caixa_atual);
            const elemento = girarElemento();
            const classe = girarClasse();
            const poderBase = gerarPoderBase(raridade);

            const heroiExistente = await heroiRepository.buscarHeroiDoUsuario(
                usuarioId, heroiApi.heroi_api_id
            );

            if (heroiExistente) {
                // Repetido: ganha XP
                const novoXp = heroiExistente.xp + XP_POR_REPETIDO;
                const { nivel, xp } = calcularNivelHeroi(novoXp, heroiExistente.nivel);

                await heroiRepository.atualizarXpHeroi(heroiExistente.id, xp, nivel);

                resultados.push({
                    tipo: 'repetido',
                    heroi: {
                        id: heroiExistente.id,
                        nome_heroi: heroiExistente.nome_heroi,
                        imagem_heroi: heroiExistente.imagem_heroi,
                        xpGanho: XP_POR_REPETIDO,
                        nivel,
                        xp
                    }
                });
            } else {
                // Novo herói
                const heroiId = await heroiRepository.salvarHeroi({
                    usuarioId,
                    heroiApiId: heroiApi.heroi_api_id,
                    nomeHeroi: heroiApi.nome,
                    imagemHeroi: heroiApi.imagem,
                    elemento,
                    classe,
                    raridade,
                    poderBase
                });

                resultados.push({
                    tipo: 'novo',
                    heroi: {
                        id: heroiId,
                        heroi_api_id: heroiApi.heroi_api_id,
                        nome_heroi: heroiApi.nome,
                        imagem_heroi: heroiApi.imagem,
                        elemento,
                        classe,
                        raridade,
                        poder_base: poderBase,
                        nivel: 1,
                        xp: 0
                    }
                });
            }
        }

        // XP do recrutador
        const novoXp = usuario.xp + XP_POR_GIRO;
        const { nivel: novoNivel, xp: xpFinal } = calcularNivelRecrutador(novoXp, usuario.nivel);

        await usuarioRepository.atualizarXpENivel(usuarioId, xpFinal, novoNivel);

        return {
            resultados,
            usuario: {
                moedas: usuario.moedas,
                xp: xpFinal,
                nivel: novoNivel
            }
        };
    },

    // Criar herói (pago)
    async criar(usuarioId, { elemento, classe, raridade }) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        const custo = CUSTOS_CRIACAO[raridade];

        if (usuario.moedas < custo) {
            throw criarErro(400, `Moedas insuficientes. Necessário: ${custo}, disponível: ${usuario.moedas}.`);
        }

        const heroiApi = await heroiRepository.buscarHeroiAleatorio();

        if (!heroiApi) {
            throw criarErro(500, 'Nenhum herói disponível no cache.');
        }

        const poderBase = gerarPoderBase(raridade);

        // Descontar moedas
        await usuarioRepository.atualizarMoedas(usuarioId, usuario.moedas - custo);

        const heroiExistente = await heroiRepository.buscarHeroiDoUsuario(
            usuarioId, heroiApi.heroi_api_id
        );

        if (heroiExistente) {
            // Repetido: ganha XP
            const novoXp = heroiExistente.xp + XP_POR_REPETIDO;
            const { nivel, xp } = calcularNivelHeroi(novoXp, heroiExistente.nivel);

            await heroiRepository.atualizarXpHeroi(heroiExistente.id, xp, nivel);

            return {
                tipo: 'repetido',
                heroi: {
                    id: heroiExistente.id,
                    nome_heroi: heroiExistente.nome_heroi,
                    imagem_heroi: heroiExistente.imagem_heroi,
                    xpGanho: XP_POR_REPETIDO,
                    nivel,
                    xp
                },
                usuario: {
                    moedas: usuario.moedas - custo,
                    xp: usuario.xp,
                    nivel: usuario.nivel
                }
            };
        }

        // Novo herói
        const heroiId = await heroiRepository.salvarHeroi({
            usuarioId,
            heroiApiId: heroiApi.heroi_api_id,
            nomeHeroi: heroiApi.nome,
            imagemHeroi: heroiApi.imagem,
            elemento,
            classe,
            raridade,
            poderBase
        });

        return {
            tipo: 'novo',
            heroi: {
                id: heroiId,
                heroi_api_id: heroiApi.heroi_api_id,
                nome_heroi: heroiApi.nome,
                imagem_heroi: heroiApi.imagem,
                elemento,
                classe,
                raridade,
                poder_base: poderBase,
                nivel: 1,
                xp: 0
            },
            usuario: {
                moedas: usuario.moedas - custo,
                xp: usuario.xp,
                nivel: usuario.nivel
            }
        };
    },

    // Listar todos os heróis da cache com paginação
    async listarTodos(pagina, limite) {
        return await heroiRepository.buscarTodosHerois(pagina, limite);
    }
};