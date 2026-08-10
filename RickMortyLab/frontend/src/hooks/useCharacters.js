import { api } from '../api/api.js';
import { useQuery } from '@tanstack/react-query';

// Sincronizar Estado
export function useCharacters(page = 1) { // recebe pagina
    return useQuery({
        queryKey: ["characters", page],
        queryFn: async () => {
            const { data } = await api.get(`/character?page=${page}`);
            return data;
        },
        keepPreviousData: true,
    });
}
