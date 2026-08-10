import { z } from 'zod';

export const executarMissaoSchema = z.object({
    guilda_id: z.number()
});