'use client'

import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { useQuery, useIsFetching } from "@tanstack/react-query"
import { PaginationTable } from '@/components/dashboard/PaginationTable';

export default function Component() {



const { data, isLoading, isError, error } = useQuery({
  queryKey: ["clientes"],
  queryFn: async () => {
      const res = await fetch("/api/clientes");
      if (!res.ok) {
          // Isso lançará um erro que o React Query pode capturar
          throw new Error('Erro ao buscar dados');
      }
      return res.json();
  },
  retry: false, // Não tenta novamente após falha
  // retry: 1, // Ou tenta apenas uma vez após a falha inicial
});

if (isError) return <div>Erro: {error.message}</div>
if (isLoading) return <div>Carregando...</div>

const colunas = [
  { cabecalho: 'Data', acessor: 'data' },
  { cabecalho: 'Nome', acessor: 'nome' },
  { cabecalho: 'Email', acessor: 'email' },
  { cabecalho: 'Telefone', acessor: 'telefone' },
];


  return (
    <div className="overflow-x-auto">
      <PaginationTable dados={data || []} colunas={colunas} itensPorPaginas={2} />
    </div>
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
