import dotenv from 'dotenv/config';
import { pool } from '../config/db.js';

const API_BASE = 'https://akabab.github.io/superhero-api/api';

async function popularCache() {
    console.log('Buscando heróis da API externa...');

    const resposta = await fetch(`${API_BASE}/all.json`);

    if (!resposta.ok) {
        console.error('❌ Erro ao buscar heróis da API.');
        process.exit(1);
    }

    const herois = await resposta.json();

    console.log(`${herois.length} heróis encontrados. Salvando no cache...`);

    for (const heroi of herois) {
        await pool.query(`
            INSERT INTO cache_herois
            (heroi_api_id, nome, imagem, intelligence, strength, speed, \`durability\`, power_stat, combat)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                nome = VALUES(nome),
                imagem = VALUES(imagem),
                intelligence = VALUES(intelligence),
                strength = VALUES(strength),
                speed = VALUES(speed),
                \`durability\` = VALUES(\`durability\`),
                power_stat = VALUES(power_stat),
                combat = VALUES(combat),
                atualizado_em = CURRENT_TIMESTAMP
        `, [
            String(heroi.id),
            heroi.name,
            heroi.images.sm,
            parseInt(heroi.powerstats.intelligence) || 0,
            parseInt(heroi.powerstats.strength) || 0,
            parseInt(heroi.powerstats.speed) || 0,
            parseInt(heroi.powerstats.durability) || 0,
            parseInt(heroi.powerstats.power) || 0,
            parseInt(heroi.powerstats.combat) || 0
        ]);
    }

    console.log(`✅ ${herois.length} heróis salvos no cache com sucesso.`);

    await pool.end();
    process.exit(0);
}

popularCache().catch((error) => {
    console.error('❌ Erro:', error.message);
    process.exit(1);
});