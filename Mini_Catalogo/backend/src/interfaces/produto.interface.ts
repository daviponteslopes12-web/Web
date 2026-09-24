export interface Produto {
    readonly id: number
    nome: string
    descricao: string | null
    preco: number
    imagem: string | null
    criado_em: string
}