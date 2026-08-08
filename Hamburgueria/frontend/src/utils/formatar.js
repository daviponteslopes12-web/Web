export function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

export function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}