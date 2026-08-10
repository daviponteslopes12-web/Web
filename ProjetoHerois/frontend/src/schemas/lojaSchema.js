import { z } from 'zod';

export const comprarItemSchema = z.object({
    item_id: z.number()
});

export const comprarHeroiLojaSchema = z.object({
    loja_id: z.number()
});