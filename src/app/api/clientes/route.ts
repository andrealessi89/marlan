import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const cpf = searchParams.get('cpf');

    if (cpf) {
        try {
            const results = await query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
            return new NextResponse(JSON.stringify(results), { status: 200 });
        } catch (error: any) {
            return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
        }
    } else {
        // Retorna todos os clientes se o CPF não for especificado
        try {
            const results = await query('SELECT * FROM cliente');
            return new NextResponse(JSON.stringify(results), { status: 200 });
        } catch (error: any) {
            return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
        }
    }
}

export async function POST(request: NextRequest) {
    const { nome, telefone, email, cpf, estado, cidade, generoCrianca, newsletter, tipo } = await request.json();
    try {
        const result = await query(
            'INSERT INTO cliente (nome, telefone, email, cpf, estado, cidade, crianca, newsletter, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, telefone, email, cpf, estado, cidade, generoCrianca, newsletter, tipo]
        );
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    const { id, nome, telefone, email } = await request.json();
    try {
        const result = await query(
            'UPDATE cliente SET nome = ?, telefone = ?, email = ? WHERE id = ?',
            [nome, telefone, email, id]
        );
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    try {
        const result = await query('DELETE FROM cliente WHERE id = ?', [id]);
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
