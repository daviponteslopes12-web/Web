import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listarEmprestimos, cadastrarEmprestimo, devolverEmprestimo } from '../services/emprestimoService.js';

export function useEmprestimos(status) {
    return useQuery({
        queryKey: ['emprestimos', status],
        queryFn: () => listarEmprestimos(status),    
    });
}

export function useCadastrarEmprestimo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cadastrarEmprestimo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
            queryClient.invalidateQueries({ queryKey: ['livros'] });
        },
    });
}

export function useDevolverEmprestimo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: devolverEmprestimo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
            queryClient.invalidateQueries({ queryKey: ['livros'] });
        },
    });
}