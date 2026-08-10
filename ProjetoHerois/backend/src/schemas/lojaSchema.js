import { z } from 'zod';

export const comprarItemSchema = z.object({
    item_id: z.number({ errorMap: () => ({ message: 'ID do item é obrigatório' }) })
});

export const comprarHeroiLojaSchema = z.object({
    loja_id: z.number({ errorMap: () => ({ message: 'ID do herói da loja é obrigatório' }) })
});