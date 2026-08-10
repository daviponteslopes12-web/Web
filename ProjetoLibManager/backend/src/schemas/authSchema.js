import { z } from 'zod';

export const schemaLogin = z.object({
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});