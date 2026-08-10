import { z } from 'zod';

export const criarGuildaSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    elemento: z.enum(['normal', 'fogo', 'agua', 'natureza', 'luz', 'trevas', 'lendario', 'atemporal'], {
        errorMap: () => ({ message: 'Elemento inválido' })
    })
});

export const adicionarHeroiSchema = z.object({
    heroi_id: z.number({ errMap: () => ({ message: 'ID do herói é obrigatório' }) })
});

