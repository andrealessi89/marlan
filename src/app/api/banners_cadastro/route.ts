import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get('tipo');

  try {
    const results = await query(
      'SELECT url FROM banners_cadastro WHERE tipo = ? LIMIT 1',
      [tipo]
    );

    return NextResponse.json(results[0] || { url: '/images/banner.jpg' });
  } catch (error) {
    console.error('Erro ao buscar o banner:', error);
    return NextResponse.json({ error: 'Erro ao buscar o banner.' }, { status: 500 });
  }
}
