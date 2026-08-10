import { z } from 'zod';

export const cadastrarSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmarSenha: z.string()
}).refine((dados) => dados.senha === dados.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha']
});

export const loginSchema = z.object({
    email: z.email('Email inválido'),
    senha: z.string().min(1, 'Senha é obrigatória')
});