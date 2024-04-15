// app/api/tamanhos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET() {
    try {
        // Primeiro, pegue todas as linhas da coluna tamanho, excluindo valores nulos
        const results: any = await query('SELECT tamanho FROM produtos WHERE tamanho IS NOT NULL');

        // Crie um conjunto para manter os tamanhos únicos
        const uniqueTamanhos = new Set();

        // Itera sobre cada resultado e adiciona ao conjunto para garantir unicidade
        results.forEach((produto: { tamanho: string }) => {
            // Ajuste para garantir que espaços em branco extras não afetem a unicidade
            const trimmedTamanho = produto.tamanho.trim();
            if (trimmedTamanho) {
                uniqueTamanhos.add(trimmedTamanho);
            }
        });

        // Converta o conjunto de volta para uma array e envie como resposta
        return new NextResponse(JSON.stringify(Array.from(uniqueTamanhos)), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
