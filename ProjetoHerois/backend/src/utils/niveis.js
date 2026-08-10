export function calcularNivelHeroi(xpAtual, nivelAtual) {
    let nivel = nivelAtual;
    let xp = xpAtual;

    while (xp >= nivel * 50) {
        xp -= nivel * 50;
        nivel++;
    }

    return { nivel, xp };
}

export function calcularNivelRecrutador(xpAtual, nivelAtual) {
    let nivel = nivelAtual;
    let xp = xpAtual;

    while(xp >= nivel * 100) {
        xp -= nivel * 100;
        nivel++;
    }

    return { nivel, xp };
}