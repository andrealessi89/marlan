import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(request: NextRequest) {
  console.log('[API] GET /api/configuracoes called, URL:', request.url);

  try {
    const results = await query('SELECT * FROM configuracoes');
    console.log('[API] configuracoes results:', results);

    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  } catch (error: any) {
    console.error('[API] Error fetching configuracoes:', error);
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
