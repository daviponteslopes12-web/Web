import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listarLivros, cadastrarLivro, deletarLivro } from '../services/livroService.js';

export function useLivros() {
    return useQuery({
        queryKey: ['livros'],
        queryFn: listarLivros,
    });
}

export function useCadastrarLivro() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cadastrarLivro,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['livros'] });
        },
    });
}

export function useDeletarLivro() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletarLivro,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['livros'] });
        },
    });
}