// app/api/clientes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET() {
    try {
        const results = await query('SELECT * FROM cliente');
        return new NextResponse(JSON.stringify(results), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { nome, telefone, email, cidade, como_soube, newsletter } = await request.json();
    try {
        const result = await query(
            'INSERT INTO cliente (nome, telefone, email, cidade, como_soube, newsletter) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, telefone, email, cidade, como_soube, newsletter]
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
