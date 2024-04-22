// app/api/produtos/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { query } from '../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET(request: NextRequest) {
    try {
        // Obtém a URL da requisição e garante que a base da URL está definida corretamente.
        const url = new URL(request.url, `http://${request.headers.get('host')}`);

        // Coleta os parâmetros de consulta de forma segura.
        const id = url.searchParams.get('id');
        const tamanho = url.searchParams.get('tamanho');
        const genero = url.searchParams.get('genero');
        const cores = url.searchParams.get('cores');

        // Inicia a construção da consulta SQL com segurança contra SQL injection.
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

        // Adiciona condições à consulta, se existirem.
        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        // Executa a consulta.
        const results = await query(sql, parameters);

        // Retorna os resultados com cabeçalhos apropriados para CORS e JSON.
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
        // Manipula erros de banco de dados e outros erros internos.
        console.error('Database or Internal Error:', error);
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
