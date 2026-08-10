import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import configuracaoService from '../services/configuracaoService';
import useAuth from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Botao from '../components/ui/Botao';
import { nomeEmailSchema, senhaSchema } from '../schemas/configuracaoSchema';
import PageContainer from '../components/ui/PageContainer';

export default function Configuracoes() {
    const { usuario, atualizarUsuario, logout } = useAuth();

    // Perfil
    const [nome, setNome] = useState(usuario?.nome || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [errosPerfil, setErrosPerfil] = useState({});
    const [sucessoPerfil, setSucessoPerfil] = useState('');

    // Senha
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [errosSenha, setErrosSenha] = useState({});
    const [sucessoSenha, setSucessoSenha] = useState('');

    // Deletar
    const [senhaDeletar, setSenhaDeletar] = useState('');
    const [erroDeletar, setErroDeletar] = useState('');

    const nomeEmailMutation = useMutation({
        mutationFn: () => configuracaoService.atualizarNomeEmail({ nome, email }),
        onSuccess: (data) => {
            atualizarUsuario({
                nome: data.nome,
                email: data.email,
                ...(data.caixa_atual && { caixa_atual: data.caixa_atual })
            });
            setErrosPerfil({});
            setSucessoPerfil('Dados atualizados com sucesso!');
            setTimeout(() => setSucessoPerfil(''), 3000);
        },
        onError: (error) => {
            setErrosPerfil({ geral: error.response?.data?.mensagem || 'Erro ao atualizar' });
        }
    });

    const senhaMutation = useMutation({
        mutationFn: () => configuracaoService.atualizarSenha({ senhaAtual, novaSenha, confirmarSenha }),
        onSuccess: () => {
            setSenhaAtual('');
            setNovaSenha('');
            setConfirmarSenha('');
            setErrosSenha({});
            setSucessoSenha('Senha alterada! Faça login novamente.');
            setTimeout(() => logout(), 2000);
        },
        onError: (error) => {
            setErrosSenha({ geral: error.response?.data?.mensagem || 'Erro ao atualizar senha' });
        }
    });

    const deletarMutation = useMutation({
        mutationFn: () => configuracaoService.deletarConta(senhaDeletar),
        onSuccess: () => logout(),
        onError: (error) => {
            setErroDeletar(error.response?.data?.mensagem || 'Erro ao deletar conta');
        }
    });

    function handleAtualizarPerfil(e) {
        e.preventDefault();
        setErrosPerfil({});

        const resultado = nomeEmailSchema.safeParse({ nome, email });

        if (!resultado.success) {
            const novosErros = {};
            resultado.error.issues.forEach((issue) => {
                novosErros[issue.path[0]] = issue.message;
            });
            setErrosPerfil(novosErros);
            return;
        }

        nomeEmailMutation.mutate();
    }

    function handleAtualizarSenha(e) {
        e.preventDefault();
        setErrosSenha({});

        const resultado = senhaSchema.safeParse({ senhaAtual, novaSenha, confirmarSenha });

        if (!resultado.success) {
            const novosErros = {};
            resultado.error.issues.forEach((issue) => {
                novosErros[issue.path[0]] = issue.message;
            });
            setErrosSenha(novosErros);
            return;
        }

        senhaMutation.mutate();
    }

    function handleDeletarConta(e) {
        e.preventDefault();
        if (!senhaDeletar) {
            setErroDeletar('Senha é obrigatória');
            return;
        }
        deletarMutation.mutate();
    }

    return (
        <PageContainer>
            <div className="max-w-2xl">
                <h1 className="font-display font-bold text-3xl text-text-primary mb-8">
                    Configurações
                </h1>

                {/* Perfil */}
                <section className="bg-surface rounded-xl p-6 border border-text-muted/10 mb-6">
                    <h2 className="font-bold text-xl text-text-primary mb-4">
                        Dados do Perfil
                    </h2>

                    <form onSubmit={handleAtualizarPerfil} className="flex flex-col gap-4">
                        <Input
                            label="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            error={errosPerfil.nome}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errosPerfil.email}
                        />
                        {errosPerfil.geral && <p className="text-danger text-sm">{errosPerfil.geral}</p>}
                        {sucessoPerfil && <p className="text-elemento-natureza text-sm">{sucessoPerfil}</p>}

                        <Botao tipo="submit" desabilitado={nomeEmailMutation.isPending}>
                            {nomeEmailMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
                        </Botao>
                    </form>
                </section>

                {/* Senha */}
                <section className="bg-surface rounded-xl p-6 border border-text-muted/10 mb-6">
                    <h2 className="font-bold text-xl text-text-primary mb-4">
                        Alterar Senha
                    </h2>

                    <form onSubmit={handleAtualizarSenha} className="flex flex-col gap-4">
                        <Input
                            label="Senha Atual"
                            type="password"
                            value={senhaAtual}
                            onChange={(e) => setSenhaAtual(e.target.value)}
                            error={errosSenha.senhaAtual}
                        />
                        <Input
                            label="Nova Senha"
                            type="password"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            error={errosSenha.novaSenha}
                        />
                        <Input
                            label="Confirmar Nova Senha"
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            error={errosSenha.confirmarSenha}
                        />
                        {errosSenha.geral && <p className="text-danger text-sm">{errosSenha.geral}</p>}
                        {sucessoSenha && <p className="text-elemento-natureza text-sm">{sucessoSenha}</p>}

                        <Botao tipo="submit" desabilitado={senhaMutation.isPending}>
                            {senhaMutation.isPending ? 'Alterando...' : 'Alterar Senha'}
                        </Botao>
                    </form>
                </section>

                {/* Deletar */}
                <section className="bg-surface rounded-xl p-6 border border-danger/20">
                    <h2 className="font-bold text-xl text-danger mb-4">
                        Deletar Conta
                    </h2>
                    <p className="text-text-muted text-sm mb-4">
                        Essa ação é irreversível. Todos os seus dados serão perdidos.
                    </p>

                    <form onSubmit={handleDeletarConta} className="flex flex-col gap-4">
                        <Input
                            label="Confirme com sua senha"
                            type="password"
                            value={senhaDeletar}
                            onChange={(e) => setSenhaDeletar(e.target.value)}
                            error={erroDeletar}
                        />

                        <Botao
                            variante="perigo"
                            tipo="submit"
                            desabilitado={deletarMutation.isPending}
                        >
                            {deletarMutation.isPending ? 'Deletando...' : 'Deletar Minha Conta'}
                        </Botao>
                    </form>
                </section>
            </div>
        </PageContainer>
    );
}