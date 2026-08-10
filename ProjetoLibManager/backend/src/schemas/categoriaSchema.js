import { z } from 'zod';

export const schemaCadastrar = z.object({
    nome: z.string().min(3, 'Categoria deve conter ao menos 3 caracteres' ),
});

export const schemaAtualizar = z.object({
    nome: z.string().min(3, 'Categoria deve conter ao menos 3 caracteres' )
});