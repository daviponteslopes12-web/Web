import { z } from 'zod';

export const executarMissaoSchema = z.object({
    guilda_id: z.number({ errorMap: () => ({ message: 'ID da guilda é obrigatório' }) })
});