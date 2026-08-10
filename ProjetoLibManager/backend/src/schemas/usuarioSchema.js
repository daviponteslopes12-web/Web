import { z } from 'zod';

export const schemaCadastrar = z.object({
    nome: z.string().min(2, 'Nome deve conter ao menos 2 caracteres'),
    email: z.string().email('Deve ser um email válido'),
    telefone: z.string().min(11, 'Telefone deve conter ao menos 11 dígitos')
});