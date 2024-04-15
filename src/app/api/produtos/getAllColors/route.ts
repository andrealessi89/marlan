// app/api/cores/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET() {
    try {
        // Primeiro, pegue todas as linhas da coluna cores
        const results: any = await query('SELECT cores FROM produtos WHERE cores IS NOT NULL');
        
        // Crie um conjunto para manter as cores únicas
        const uniqueColors = new Set();

        // Itera sobre cada resultado, divide a string de cores e adiciona ao conjunto
        results.forEach((produto: { cores: string }) => {
            produto.cores.split(',').forEach((cor: string) => {
                // Ajuste para garantir que espaços em branco extras não afetem a unicidade
                const trimmedColor = cor.trim();
                if (trimmedColor) {
                    uniqueColors.add(trimmedColor);
                }
            });
        });

        // Converta o conjunto de volta para uma array e envie como resposta
        return new NextResponse(JSON.stringify(Array.from(uniqueColors)), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
