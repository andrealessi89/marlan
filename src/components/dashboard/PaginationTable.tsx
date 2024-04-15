import React, { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "@/components/ui/table";

// Componente de Tabela Genérico com Paginação
export const PaginationTable = ({ dados, colunas, itensPorPaginas }) => {
    const itensPorPagina = Math.max(itensPorPaginas, 1); // Assegura que itensPorPagina seja pelo menos 1
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [dadosPaginados, setDadosPaginados] = useState([]);

    useEffect(() => {
        // Calcula os dados que devem ser paginados com base na página atual
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = inicio + itensPorPagina;

        // se nao tiver dados, retorna
        if (!dados){
            setDadosPaginados([]);
        } else {
            setDadosPaginados(dados.slice(inicio, fim));
        }
    }, [dados, paginaAtual, itensPorPagina]);

    // Assegura que o número total de páginas seja pelo menos 1
    const totalPaginas = Math.ceil(dados.length / itensPorPagina) || 1;

    // Função de renderização de célula
    const renderCell = (item, coluna) => {
        // Verifica se existe uma função de renderização personalizada para a coluna
        if (coluna.render) {
            return coluna.render(item[coluna.acessor]);
        }
        // Renderização padrão se não houver função personalizada
        return item[coluna.acessor];
    };

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {colunas.map((coluna) => (
                            <TableHead key={coluna.acessor}>{coluna.cabecalho}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dadosPaginados.map((item, index) => (
                        <TableRow key={index}>
                            {colunas.map((coluna) => (
                                <TableCell key={coluna.acessor}>
                                    {renderCell(item, coluna)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))} />
                    </PaginationItem>
                    {[...Array(totalPaginas)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => setPaginaAtual(index + 1)} isActive={index + 1 === paginaAtual}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {totalPaginas > 5 && <PaginationEllipsis />}
                    <PaginationItem>
                        <PaginationNext onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
