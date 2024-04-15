'use client'

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { PaginationTable } from '@/components/dashboard/PaginationTable'; // Ajuste o caminho conforme necessário
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export default function Component() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["produtos"],
        queryFn: async () => {
            const res = await fetch("/api/produtos");
            if (!res.ok) {
                // Isso lançará um erro que o React Query pode capturar
                throw new Error('Erro ao buscar dados');
            }
            return res.json();
        },
        retry: false, // Não tenta novamente após falha
        // retry: 1, // Ou tenta apenas uma vez após a falha inicial
    });
    
    

    if (isLoading) return <div>Carregando...</div>;

    if (isError) return <div>Erro: {error.message}</div>; // Exibe a mensagem de erro

    // Configuração das colunas para a TabelaComPaginacao
    const colunas = [
        { cabecalho: 'Ref', acessor: 'referencia' },
        {
            cabecalho: 'Imagem',
            acessor: 'imagem',
            render: (imagem : any) => (
                <Avatar>
                    <AvatarImage src={imagem} alt="imagem do produto" />
                    <AvatarFallback>Prod</AvatarFallback>
                </Avatar>
            ),
        },
        { cabecalho: 'Nome', acessor: 'nome' },
        { cabecalho: 'Gênero', acessor: 'genero' },
        { cabecalho: 'Categoria', acessor: 'categoria' },
        {
            cabecalho: 'Ativo',
            acessor: 'situacao',
            render: (situacao: any) => situacao ? 'Sim' : 'Não',
        },
    ];


    return (
        <div className="w-full overflow-x-auto">
            <div className="flex justify-end space-x-4 mb-4">
                <Button>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Product
                </Button>
                <Button>
                    <FileIcon className="h-5 w-5 mr-2" />
                    Import Excel
                </Button>
            </div>
            {/* Utilize o componente TabelaComPaginacao aqui, passando os dados e as colunas */}
            <PaginationTable dados={data || []} colunas={colunas} itensPorPaginas={2} />
        </div>
    );
}


function FileIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}


function MoreHorizontalIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    )
}


function PlusIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
