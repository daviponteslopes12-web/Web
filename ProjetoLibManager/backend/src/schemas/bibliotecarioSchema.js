import { z } from 'zod';


export const schemaCadastro = z.object({
    nome: z.string().min(2, 'Nome deve conter ao menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha deve conter ao menos 6 caracteres'),
});

export const schemaAtualizarDados = z.object({
    nome: z.string().min(2, 'Nome deve conter ao menos 2 caracteres').optional(),
    email: z.string().email('Email inválido').optional()
}).refine((dados) => dados.nome || dados.email, {
    message: 'Ao menos um campo deve ser alterado',
    path: [ 'nome' ]
});

export const schemaAtualizarSenha = z.object({
    senhaAtual: z.string().min(6, 'Senha deve conter ao menos 6 caracteres'),
    senhaNova: z.string().min(6, 'Senha deve conter ao menos 6 caracteres'),
    senhaConfirmar: z.string().min(6, 'Senha deve conter ao menos 6 caracteres')
}).refine((dados) => dados.senhaNova === dados.senhaConfirmar, {
    message: 'Senhas não conferem',
    path: [ 'senhaConfirmar' ]
});

