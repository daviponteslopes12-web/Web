import { useQuery } from '@tanstack/react-query';
import { listarHistorico } from '../services/historicoService.js';

export function useHistorico() {
    return useQuery({
        queryKey: ['historico'],
        queryFn: listarHistorico,
    });
}