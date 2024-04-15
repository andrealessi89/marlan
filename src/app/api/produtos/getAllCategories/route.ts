// app/api/cores/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET() {
    try {
        // Primeiro, pegue todas as linhas da coluna categoria
        const results: any = await query('SELECT categoria FROM produtos WHERE categoria IS NOT NULL');

        console.log(results);
        
        // Crie um conjunto para manter as categorias únicas
        const uniqueCategory = new Set();

        // Itera sobre cada resultado, verifica se categoria é definida e adiciona ao conjunto
        results.forEach((produto: { categoria: string }) => { // Ajuste aqui para "categoria" em vez de "categorias"
            produto.categoria.split(',').forEach((categoria: string) => { // Ajuste para garantir que espaços em branco extras não afetem a unicidade
                const trimmedCategoria = categoria.trim();
                if (trimmedCategoria) {
                    uniqueCategory.add(trimmedCategoria);
                }
            });
        });

        // Converta o conjunto de volta para uma array e envie como resposta
        return new NextResponse(JSON.stringify(Array.from(uniqueCategory)), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
