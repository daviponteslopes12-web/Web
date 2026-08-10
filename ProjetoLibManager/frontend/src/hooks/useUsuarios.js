import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listarUsuarios, cadastrarUsuario, deletarUsuario } from '../services/usuarioService.js';

export function useUsuarios() {
    return useQuery({
        queryKey: ['usuarios'],
        queryFn: listarUsuarios,
    });
}

export function useCadastrarUsuario() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cadastrarUsuario,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuarios'] });
        },
    });
}

export function useDeletarUsuario() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletarUsuario,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuarios'] });
        },
    });
}