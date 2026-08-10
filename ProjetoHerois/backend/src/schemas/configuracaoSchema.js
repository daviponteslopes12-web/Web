import { z } from 'zod';

export const atualizarNomeEmailSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
    email: z.email('Email inválido')
});

export const atualizarSenhaSchema = z.object({
    senhaAtual: z.string().min(1, 'Senha atual é obrigatória'),
    novaSenha: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
    confirmarSenha: z.string()
}).refine((dados) => dados.novaSenha === dados.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha']
});

export const deletarContaSchema = z.object({
    senha: z.string().min(1, 'Senha é obrigatória para deletar a conta')
});