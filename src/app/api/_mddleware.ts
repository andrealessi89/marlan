// pages/api/_middleware.ts
import { NextResponse } from 'next/server';
import NextCors from 'nextjs-cors';

export async function middleware(request) {
    await NextCors(request, {
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        origin: '*', // Especifique a origem permitida ou use '*' para permitir todas
        optionsSuccessStatus: 200, // Alguns navegadores antigos (IE11, vários SmartTVs) falham com o status 204
    });

    return NextResponse.next();
}
