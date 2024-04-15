// app/api/generos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET() {
    try {
        // Primeiro, pegue todas as linhas da coluna genero, excluindo valores nulos
        const results: any = await query('SELECT genero FROM produtos WHERE genero IS NOT NULL');

        // Crie um conjunto para manter os gêneros únicos
        const uniqueGeneros = new Set();

        // Itera sobre cada resultado e adiciona ao conjunto para garantir unicidade
        results.forEach((produto: { genero: string }) => {
            // Ajuste para garantir que espaços em branco extras não afetem a unicidade
            const trimmedGenero = produto.genero.trim();
            if (trimmedGenero) {
                uniqueGeneros.add(trimmedGenero);
            }
        });

        // Converta o conjunto de volta para uma array e envie como resposta
        return new NextResponse(JSON.stringify(Array.from(uniqueGeneros)), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
