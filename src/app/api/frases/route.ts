// app/api/frases/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Ajuste o caminho conforme necessário

export async function GET(request: NextRequest) {
  console.log('[API] GET /api/frases called, URL:', request.url);
  
  try {
    // Consulta que retorna as frases ordenadas pela coluna "sequencia"
    const sql = 'SELECT * FROM frases ORDER BY sequencia ASC';
    const results = await query(sql, []);
    console.log('[API] frases results:', results);
    
    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error('[API] Error fetching frases:', error);
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
