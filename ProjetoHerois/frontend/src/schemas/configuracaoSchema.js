import { z } from 'zod';

export const nomeEmailSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.email('Email inválido')
});

export const senhaSchema = z.object({
    senhaAtual: z.string().min(1, 'Senha atual é obrigatória'),
    novaSenha: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
    confirmarSenha: z.string()
}).refine((d) => d.novaSenha === d.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha']
});