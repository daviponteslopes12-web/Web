import { historicoRepository } from "../repositories/historicoRepository.js";

export const historicoService = {

    async criar(dados) {

        const id = await historicoRepository.criar(dados);
        return { id };
    },

    async listar() {

        return await historicoRepository.listar();
    },
};