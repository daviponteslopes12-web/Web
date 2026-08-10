import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import authService from '../services/authService';
import useAuth from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Botao from '../components/ui/Botao';
import { cadastrarSchema } from '../schemas/authSchema';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erros, setErros] = useState({});
    const { login } = useAuth();

    const mutation = useMutation({
        mutationFn: () => authService.cadastrar({ nome, email, senha, confirmarSenha }),
        onSuccess: (data) => {
            login(data.token, data.usuario);
        },
        onError: (error) => {
            setErros({ geral: error.response?.data?.mensagem || 'Erro ao cadastrar' });
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        setErros({});

        const resultado = cadastrarSchema.safeParse({ nome, email, senha, confirmarSenha });

        if (!resultado.success) {
            const novosErros = {};
            resultado.error.issues.forEach((issue) => {
                novosErros[issue.path[0]] = issue.message;
            });
            setErros(novosErros);
            return;
        }

        mutation.mutate();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg p-4">
            <div className="w-full max-w-md">
                <h1 className="font-display font-bold text-4xl text-accent text-center mb-2">
                    PROJETO HERÓIS
                </h1>
                <p className="text-text-muted text-center mb-8">
                    Crie sua conta
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-surface rounded-2xl p-8 flex flex-col gap-4 border border-text-muted/10"
                >
                    <Input
                        label="Nome"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        error={erros.nome}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={erros.email}
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        error={erros.senha}
                    />

                    <Input
                        label="Confirmar Senha"
                        type="password"
                        placeholder="Repita a senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        error={erros.confirmarSenha}
                    />

                    {erros.geral && (
                        <p className="text-danger text-sm text-center">{erros.geral}</p>
                    )}

                    <Botao tipo="submit" desabilitado={mutation.isPending} className="w-full">
                        {mutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
                    </Botao>

                    <Link
                        to="/login"
                        className="text-text-muted text-sm text-center hover:text-accent transition-colors"
                    >
                        Já tem conta? Faça login
                    </Link>
                </form>
            </div>
        </div>
    );
}