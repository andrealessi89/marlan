import React, { createContext, useContext, useState } from 'react';

// Estrutura de dados padrão para o contexto
const defaultContextValue = {
    filters: {
        brands: '',
        articles: '',
        genders: '',
        sizes: ''
    },
    handleFilterChange: () => {} // Função vazia como placeholder
};

// Criando o contexto com um valor padrão
const FilterContext = createContext(defaultContextValue);

// Hook personalizado para acessar o contexto facilmente
export function useFilters() {
    return useContext(FilterContext);
}

// Provedor do contexto
export function FilterProvider({ children }) {
    const [filters, setFilters] = useState({
        brands: '',
        articles: '',
        genders: '',
        sizes: ''
    });

    // Função para atualizar os filtros
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    return (
        <FilterContext.Provider value={{ filters, handleFilterChange }}>
            {children}
        </FilterContext.Provider>
    );
}
