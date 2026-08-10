import { z } from 'zod';

export const schemaCadastrar = z.object({
    livroId: z.coerce.number().int('ID do livro inválido'),
    usuarioId: z.coerce.number().int('ID do usuário inválido')
});

// optional = Aquele campo é opcional
// coerce = Transforma valor no tipo definido "3" -> 3 (string para number)
// .refine = Criar regras que o Zod não tem pronto.