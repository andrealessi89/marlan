// app/api/produtos/busca.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        // Extraindo parâmetros de query da URL
        const parametros = {
            id: url.searchParams.get('id'),
            referencia: url.searchParams.get('referencia'),
            tamanho: url.searchParams.get('tamanho'),
            marca: url.searchParams.get('marca'),
            genero: url.searchParams.get('genero'),
            precoMin: url.searchParams.get('precoMin'),
            precoMax: url.searchParams.get('precoMax'),
            situacao: url.searchParams.get('situacao'),
            categoria: url.searchParams.get('categoria'),
            cores: url.searchParams.get('cores')
        };

        let sql = 'SELECT * FROM produtos WHERE 1=1';
        let valores: any[] = [];

        // Dinamicamente adicionando condições baseadas em parâmetros fornecidos
        Object.keys(parametros).forEach(chave => {
            const valor = parametros[chave as keyof typeof parametros];
            if (valor) {
                switch (chave) {
                    case 'precoMin':
                        sql += ' AND preco >= ?';
                        valores.push(valor);
                        break;
                    case 'precoMax':
                        sql += ' AND preco <= ?';
                        valores.push(valor);
                        break;
                    case 'cores':
                        // A cor deve ser uma das cores listadas na string 'cores', separadas por vírgulas
                        sql += ` AND FIND_IN_SET(?, REPLACE(cores, ' ', ''))`;
                        valores.push(valor);
                        break;
                    default:
                        // Para outros casos, simplesmente filtre por igualdade
                        sql += ` AND ${chave} = ?`;
                        valores.push(valor);
                }
            }
        });

        const results = await query(sql, valores as any[]);
        return new NextResponse(JSON.stringify(results), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
