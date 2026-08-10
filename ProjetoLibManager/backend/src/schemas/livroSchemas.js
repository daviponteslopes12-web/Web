import { z } from 'zod';

export const schemaCadastrar = z.object({
    titulo: z.string().min(1, 'Título é obrigatório'),
    autor: z.string().min(2, 'Autor deve conter ao menos 2 caracteres'),
    anoPublicacao: z.coerce.number().int('Ano deve ser um número inteiro').optional(),
    quantidadeTotal: z.coerce.number().int('Deve ser um número inteiro').min(1, 'Deve cadastrar ao menos 1 volume'),
    categoriaId: z.coerce.number().int('Categoria inválida')
});
