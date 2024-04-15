// app/api/usuarios/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Ajuste o caminho conforme necessário
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const results = await query('SELECT * FROM usuario');
        return new NextResponse(JSON.stringify(results), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: 'Erro ao buscar usuários', erro: error.message }), { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { nome, email, situacao, password } = await request.json();

    // Gera um hash da senha
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const result = await query(
            'INSERT INTO usuario (nome, email, situacao, password) VALUES (?, ?, ?, ?)',
            [nome, email, situacao, hashedPassword] // Use a senha hasheada aqui
        );
        return new NextResponse(JSON.stringify({ id: result.insertId, nome, email, situacao }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: 'Erro ao adicionar usuário', erro: error.message }), { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    const { id, nome, email, situacao, password } = await request.json();
    try {
        const result = await query(
            'UPDATE usuario SET nome = ?, email = ?, situacao = ?, password = ? WHERE id = ?',
            [nome, email, situacao, password, id]
        );
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: 'Erro ao atualizar usuário', erro: error.message }), { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    try {
        const result = await query('DELETE FROM usuario WHERE id = ?', [id]);
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: 'Erro ao remover usuário', erro: error.message }), { status: 500 });
    }
}
