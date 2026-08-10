import { z } from 'zod';

export const criarHeroiSchema = z.object({
    elemento: z.enum(['fogo', 'agua', 'natureza', 'luz', 'trevas', 'lendario', 'atemporal']),
    classe: z.enum(['mago', 'elfo', 'anao', 'orc', 'guerreiro']),
    raridade: z.enum(['comum', 'raro', 'epico', 'lendario', 'mitico'])
});