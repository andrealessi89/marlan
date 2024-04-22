// app/api/produtos/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { query } from '../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET(request: NextRequest) {
    try {
        // Verifica se a URL já é absoluta ou não
        const baseURL = request.headers.get('x-forwarded-host') ? `https://${request.headers.get('x-forwarded-host')}` : `http://${request.headers.get('host')}`;
        const url = new URL(request.url.startsWith('http') ? request.url : baseURL + request.url);

        // Coleta os parâmetros de consulta de forma segura.
        const id = url.searchParams.get('id');
        const tamanho = url.searchParams.get('tamanho');
        const genero = url.searchParams.get('genero');
        const cores = url.searchParams.get('cores');

        // Constrói a consulta SQL de forma dinâmica e segura.
        let sql = 'SELECT * FROM produto';
        let conditions = [];
        let parameters = [];

        if (id) {
            conditions.push('id = ?');
            parameters.push(id);
        }
        if (tamanho) {
            conditions.push('tamanho = ?');
            parameters.push(tamanho);
        }
        if (genero) {
            conditions.push('genero = ?');
            parameters.push(genero);
        }
        if (cores) {
            conditions.push('cores = ?');
            parameters.push(cores);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        // Executa a consulta SQL.
        const results = await query(sql, parameters);
        return new NextResponse(JSON.stringify(results), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}


/*
export async function POST(request: NextRequest) {
    const { referencia, tamanho, marca, genero, preco, imagem, situacao, categoria, cores, nome } = await request.json();
    try {
        const result = await query(
            'INSERT INTO produtos (referencia, tamanho, marca, genero, preco, imagem, situacao, categoria, cores, nome) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [referencia, tamanho, marca, genero, preco, imagem, situacao, categoria, cores, nome]
        );
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const { id, referencia, tamanho, marca, genero, preco, imagem, situacao, categoria, cores, nome } = await request.json();
    try {
        const result = await query(
            'UPDATE produtos SET referencia = ?, tamanho = ?, marca = ?, genero = ?, preco = ?, imagem = ?, situacao = ?, categoria = ?, cores = ?, nome = ? WHERE id = ?',
            [referencia, tamanho, marca, genero, preco, imagem, situacao, categoria, cores, nome, id]
        );
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    try {
        const result = await query('DELETE FROM produtos WHERE id = ?', [id]);
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
*/
