import React, { createContext, useContext, useState } from 'react';

// Definição da estrutura de dados dos filtros
type FilterState = {
    brands: string;
    articles: string;
    genders: string;
    sizes: string;
};

// Definição do tipo da função para atualizar os filtros
type HandleFilterChange = (filterType: string, value: string) => void;

// Definição do tipo do contexto
type FilterContextType = {
    filters: FilterState;
    handleFilterChange: HandleFilterChange;
};

// Estrutura de dados padrão para o contexto
const defaultContextValue: FilterContextType = {
    filters: {
        brands: '',
        articles: '',
        genders: '',
        sizes: ''
    },
    handleFilterChange: () => {} // Função vazia como placeholder
};

// Criando o contexto com um valor padrão
const FilterContext = createContext<FilterContextType>(defaultContextValue);

// Hook personalizado para acessar o contexto facilmente
export function useFilters() {
    return useContext(FilterContext);
}

// Provedor do contexto
export function FilterProvider({ children }) {
    const [filters, setFilters] = useState<FilterState>({
        brands: '',
        articles: '',
        genders: '',
        sizes: ''
    });

    // Função para atualizar os filtros
    const handleFilterChange: HandleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    return (
        <FilterContext.Provider value={{ filters, handleFilterChange }}>
            {children}
        </FilterContext.Provider>
    );
}
