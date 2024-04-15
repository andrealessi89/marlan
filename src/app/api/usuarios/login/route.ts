// pages/api/auth/login.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '../../../../lib/db'; // Ajuste o caminho conforme necessário

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    try {
        // Busca o usuário pelo email
        const results = await query('SELECT * FROM usuario WHERE email = ?', [email]);
        
        if (results.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'Usuário não encontrado' }), { status: 404 });
        }

        const user = results[0];
        // Verifica a senha
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return new NextResponse(JSON.stringify({ message: 'Senha incorreta' }), { status: 401 });
        }

        // Remova a senha antes de retornar o usuário
        delete user.password;
        return new NextResponse(JSON.stringify(user), { status: 200, headers: { "Content-Type": "application/json" } });

    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: 'Erro ao autenticar usuário', erro: error.message}), { status: 500 });
    }
}
