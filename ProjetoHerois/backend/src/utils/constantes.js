export const ELEMENTOS = ['fogo', 'agua', 'natureza', 'luz', 'trevas', 'lendario', 'atemporal'];
export const CLASSES = ['mago', 'elfo', 'anao', 'orc', 'guerreiro'];

export function sortearElemento() {
    return ELEMENTOS[Math.floor(Math.random() * ELEMENTOS.length)];
}

export function sortearClasse() {
    return CLASSES[Math.floor(Math.random() * CLASSES.length)];
}

export function temVantagemElemental(elementoHeroi, elementoInimigo) {
    if (elementoHeroi === 'lendario' && elementoInimigo !== 'atemporal') return true;
    if (elementoHeroi === 'atemporal' && elementoInimigo !== 'lendario') return true;

    const vantagens = {
        fogo: 'natureza',
        agua: 'fogo',
        natureza: 'agua',
        luz: 'trevas',
        trevas: 'luz'
    };

    return vantagens[elementoHeroi] === elementoInimigo;
}