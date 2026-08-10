import { z } from 'zod';

export const criarHeroiSchema = z.object({
    elemento: z.enum(['fogo', 'agua', 'natureza', 'luz', 'trevas', 'lendario', 'atemporal'], {
        errorMap: () => ({ message: 'Elemento inválido'})
    }),
    classe: z.enum(['mago', 'elfo', 'anao', 'orc', 'guerreiro'], {
        errorMap: () => ({ message: 'Classe inválida' })
    }),
    raridade: z.enum(['comum', 'raro', 'epico', 'lendario', 'mitico'], {
        errorMap: () => ({ message: 'Raridade inválida' })
    })
});