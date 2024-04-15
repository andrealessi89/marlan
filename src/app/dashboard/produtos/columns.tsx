'use client'

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export type Product = {
  id: number;
  nome: string;
  email?: string; // Ajuste conforme necessário
  preco: number;
  imagem: string;
  referencia: number;
  // Inclua outros campos conforme necessário
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'referencia',
    header: () => 'Referencia',
    cell: info => info.getValue(),
  },

  {
    accessorKey: 'imagem',
    header: () => 'Imagem',
    cell: info => (
      <Avatar>
        <AvatarImage src={info.getValue() as string} alt="imagem do produto" />
        <AvatarFallback>Prod</AvatarFallback>
      </Avatar>
    ),
  },

  {
    accessorKey: 'nome',
    header: () => 'Nome',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'preco',
    header: () => 'Preço',
    cell: info => info.getValue(),
  },
  // Adicione mais colunas conforme necessário
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => console.log(`Edit ${row.original.id}`)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log(`Delete ${row.original.id}`)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];