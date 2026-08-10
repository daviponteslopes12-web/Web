import { z } from 'zod';

export const criarGuildaSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
    elemento: z.enum(['normal', 'fogo', 'agua', 'natureza', 'luz', 'trevas', 'lendario', 'atemporal'])
});