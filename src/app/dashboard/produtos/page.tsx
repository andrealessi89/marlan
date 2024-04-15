'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/dashboard/data-table';
import { columns } from './columns';

// Definição da função fetch fora do componente
async function fetchProdutos() {
    const response = await fetch('http://localhost:3000/api/produtos');
    if (!response.ok) {
        throw new Error('Erro ao buscar dados');
    }
    return response.json();
}

export default function Page() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['produtos'],
        queryFn: fetchProdutos,
        retry: false,
    });

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Erro: {error.message}</div>;
    }

    return (
        <section>
            <div className='container'>
                <h1 className='mb-6 text-3xl font-bold'>Produtos</h1>
                <DataTable columns={columns} data={data || []} />
            </div>
        </section>
    );
}
