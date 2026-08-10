import { lojaRepository } from '../repositories/lojaRepository.js';
import { heroiRepository } from '../repositories/heroiRepository.js';
import { usuarioRepository } from '../repositories/usuarioRepository.js';
import { sortearElemento } from '../utils/constantes.js';
import { criarErro } from '../utils/criarErro.js';

// Custo de herói na loja (mais barato que criação)
const PRECO_HEROI_LOJA = {
    epico: 400,
    lendario: 1000
};

// Quantidade de heróis na loja rotativa
const TOTAL_LOJA_ROTATIVA = 3;

// Quantidade de slots de heróis na loja (fixo + rotativa = 3 rotativos)
const SLOTS_ROTATIVOS = 3;

// Raridades disponíveis na loja rotativa
const RARIDADES_LOJA = ['epico', 'lendario'];

// Faixa de poder base por raridade (para a loja)
const PODER_BASE_LOJA = {
    epico:    { min: 311, max: 420 },
    lendario: { min: 421, max: 510 }
};

// ===== Funções auxiliares =====

function gerarPoderBase(raridade) {
    const faixa = PODER_BASE_LOJA[raridade];
    return Math.floor(Math.random() * (faixa.max - faixa.min + 1)) + faixa.min;
}

async function gerarLojaRotativa() {
    // Limpar heróis expirados
    await lojaRepository.limparExpirados();

    // Verificar quantos heróis ainda estão ativos
    const totalAtivos = await lojaRepository.contarLojaRotativa();

    if (totalAtivos >= SLOTS_ROTATIVOS) return;

    const disponivelAte = new Date(Date.now() + 15 * 60 * 1000);

    for (let i = totalAtivos; i < SLOTS_ROTATIVOS; i++) {
        const raridade = RARIDADES_LOJA[Math.floor(Math.random() * RARIDADES_LOJA.length)];
        const heroiApi = await heroiRepository.buscarHeroiAleatorio();

        if (!heroiApi) continue;

        const poderBase = gerarPoderBase(raridade);
        const preco = PRECO_HEROI_LOJA[raridade];
        const elemento = sortearElemento();

        await lojaRepository.criarHeroiLoja({
            heroiApiId: heroiApi.heroi_api_id,
            nomeHeroi: heroiApi.nome,
            imagemHeroi: heroiApi.imagem,
            elemento,
            raridade,
            poderBase,
            preco,
            disponivelAte
        });
    }
}

// ===== Service =====

export const lojaService = {

    // Listar loja completa (fixos + rotativa)
    async listarLoja(usuarioId) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        // Itens fixos com status de compra
        const itensFixos = await lojaRepository.buscarItensFixos();

        const itensComStatus = await Promise.all(
            itensFixos.map(async (item) => {
                const itemComprado = await lojaRepository.buscarItemDoUsuario(usuarioId, item.id);

                let podeComprar = true;
                let motivo = null;

                // Verificar nível
                if (usuario.nivel < item.nivel_requisito) {
                    podeComprar = false;
                    motivo = `Nível ${item.nivel_requisito} necessário`;
                }

                // Verificar se já comprou (boosts não podem ser comprados além do máximo)
                if (itemComprado && item.tipo !== 'caixa') {
                    const maxNivel = item.dados_extra?.max_nivel || 5;
                    if (itemComprado.nivel_boost >= maxNivel) {
                        podeComprar = false;
                        motivo = 'Nível máximo atingido';
                    }
                }

                return {
                    ...item,
                    dados_extra: typeof item.dados_extra === 'string'
                        ? JSON.parse(item.dados_extra)
                        : item.dados_extra,
                    comprado: itemComprado || null,
                    podeComprar,
                    motivo
                };
            })
        );

        // Loja rotativa
        await gerarLojaRotativa();
        const heroisRotativos = await lojaRepository.buscarLojaRotativa();

        return {
            itens_fixos: itensComStatus,
            herois_rotativos: heroisRotativos
        };
    },

    // Comprar item fixo da loja
    async comprarItem(usuarioId, itemId) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        const item = await lojaRepository.buscarItemPorId(itemId);

        if (!item || !item.ativo) {
            throw criarErro(404, 'Item não encontrado.');
        }

        if (usuario.nivel < item.nivel_requisito) {
            throw criarErro(400, `Nível ${item.nivel_requisito} necessário.`);
        }

        if (item.preco > 0 && usuario.moedas < item.preco) {
            throw criarErro(400, `Moedas insuficientes. Necessário: ${item.preco}, disponível: ${usuario.moedas}.`);
        }

        // Lógica por tipo de item
        if (item.tipo === 'caixa') {
            return await this._comprarCaixa(usuarioId, usuario, item);
        } else if (item.tipo === 'boost_herois' || item.tipo === 'boost_auto') {
            return await this._comprarBoost(usuarioId, usuario, item);
        }

        throw criarErro(400, 'Tipo de item inválido.');
    },

    // Comprar herói da loja rotativa
    async comprarHeroiLoja(usuarioId, lojaId) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        const heroiLoja = await lojaRepository.buscarHeroiLojaPorId(lojaId);

        if (!heroiLoja || heroiLoja.comprado) {
            throw criarErro(404, 'Herói não disponível na loja.');
        }

        if (new Date(heroiLoja.disponivel_ate) <= new Date()) {
            throw criarErro(400, 'Herói não está mais disponível.');
        }

        if (usuario.moedas < heroiLoja.preco) {
            throw criarErro(400, `Moedas insuficientes. Necessário: ${heroiLoja.preco}, disponível: ${usuario.moedas}.`);
        }

        // Verificar se já tem o herói
        const heroiExistente = await heroiRepository.buscarHeroiDoUsuario(
            usuarioId, heroiLoja.heroi_api_id
        );

        if (heroiExistente) {
            throw criarErro(400, 'Você já possui esse herói.');
        }

        // Descontar moedas
        await usuarioRepository.atualizarMoedas(usuarioId, usuario.moedas - heroiLoja.preco);

        // Marcar como comprado na loja
        await lojaRepository.marcarComoComprado(lojaId);

        // Salvar herói no inventário
        const heroiId = await heroiRepository.salvarHeroi({
            usuarioId,
            heroiApiId: heroiLoja.heroi_api_id,
            nomeHeroi: heroiLoja.nome_heroi,
            imagemHeroi: heroiLoja.imagem_heroi,
            elemento: heroiLoja.elemento,
            classe: null,
            raridade: heroiLoja.raridade,
            poderBase: heroiLoja.poder_base
        });

        return {
            heroi: {
                id: heroiId,
                heroi_api_id: heroiLoja.heroi_api_id,
                nome_heroi: heroiLoja.nome_heroi,
                imagem_heroi: heroiLoja.imagem_heroi,
                elemento: heroiLoja.elemento,
                raridade: heroiLoja.raridade,
                poder_base: heroiLoja.poder_base,
                nivel: 1,
                xp: 0
            },
            usuario: {
                moedas: usuario.moedas - heroiLoja.preco
            }
        };
    },

    // ===== Métodos privados =====

    async _comprarCaixa(usuarioId, usuario, item) {
        const tipoCaixa = item.dados_extra?.tipo_caixa;

        if (!tipoCaixa) {
            throw criarErro(500, 'Dados da caixa inválidos.');
        }

        // Descontar moedas (caixa madeira é grátis)
        if (item.preco > 0) {
            await usuarioRepository.atualizarMoedas(usuarioId, usuario.moedas - item.preco);
        }

        // Atualizar caixa atual do recrutador
        await usuarioRepository.atualizarCaixa(usuarioId, tipoCaixa);

        return {
            mensagem: `Caixa ${tipoCaixa} ativada com sucesso.`,
            caixa_atual: tipoCaixa,
            usuario: {
                moedas: usuario.moedas - item.preco
            }
        };
    },

    async _comprarBoost(usuarioId, usuario, item) {
        const itemComprado = await lojaRepository.buscarItemDoUsuario(usuarioId, item.id);
        const maxNivel = item.dados_extra?.max_nivel || 5;

        // Verificar se já atingiu o máximo
        if (itemComprado && itemComprado.nivel_boost >= maxNivel) {
            throw criarErro(400, 'Nível máximo atingido.');
        }

        // Descontar moedas
        await usuarioRepository.atualizarMoedas(usuarioId, usuario.moedas - item.preco);

        if (itemComprado) {
            // Já tem, sobe o nível
            const novoNivel = itemComprado.nivel_boost + 1;
            await lojaRepository.atualizarNivelBoost(usuarioId, item.id, novoNivel);

            return {
                mensagem: `${item.nome} atualizado para nível ${novoNivel}.`,
                nivel_boost: novoNivel,
                usuario: {
                    moedas: usuario.moedas - item.preco
                }
            };
        } else {
            // Primeira compra, nível 1
            await lojaRepository.criarItemUsuario({
                usuarioId,
                itemId: item.id,
                nivelBoost: 1
            });

            return {
                mensagem: `${item.nome} desbloqueado.`,
                nivel_boost: 1,
                usuario: {
                    moedas: usuario.moedas - item.preco
                }
            };
        }
    }
};