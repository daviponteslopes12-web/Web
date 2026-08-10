import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    listarCategorias,
    cadastrarCategoria,
    atualizarCategoria,
    deletarCategoria
} from '../services/categoriaService.js';

export function useCategorias() {
    return useQuery({
        queryKey: ['categorias'],
        queryFn: listarCategorias,
    });
}

export function useCadastrarCategoria() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cadastrarCategoria,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categorias'] });
        },
    });
}

export function useAtualizarCategoria() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, dados }) => atualizarCategoria(id, dados),
        onSuccess: () => {
            queryClient.invalidateQueries({ query: ['categorias'] });
        },
    });
}

export function useDeletarCategoria() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletarCategoria,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categorias'] });
        },
    });
}