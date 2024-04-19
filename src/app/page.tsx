'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductFilter from "@/components/home/ProductFilter";
import ProductList from "@/components/home/ProductList";
import Footer from "@/components/home/Footer";
import Menu from "@/components/home/Menu";
import Banner from "@/components/home/Banner";
import ModalSub from '@/components/home/ModalSub';

async function fetchProdutos() {
  const response = await fetch('http://localhost:3000/api/produtos');
  if (!response.ok) {
    throw new Error('Erro ao buscar dados');
  }
  return response.json();
}

export default function Page() {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['produtos'],
    queryFn: fetchProdutos,
    retry: false,
  });

  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    articles: [],
    genders: [],
    sizes: []
  });

  // Extrair opções de filtros quando os produtos estiverem disponíveis
  useEffect(() => {
    if (products) {
      const brands = [...new Set(products?.map(product => product.marca))];
      const articles = [...new Set(products?.map(product => product.artigo))];
      const genders = [...new Set(products?.map(product => product.genero))];
      const sizes = [...new Set(products?.flatMap(product => product.tamanho.split(", ")))];

      setFilterOptions({ brands, articles, genders, sizes });
    }
  }, [products]);

  const handleFilterChange = (filterType, value) => {
    console.log(`Filter changed: ${filterType} = ${value}`); // Confirme os valores recebidos
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      console.log("Updating filters: ", newFilters);
      return newFilters;
    });
  };


  const handleClearFilters = () => {
    console.log("Filtros foram limpos!");
    // Aqui você pode adicionar lógica adicional se necessário
  };


  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro: {error.message}</div>;

  return (
    <>
      <ModalSub />

      <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-900">

        <header className="container mx-auto px-4 md:px-6 py-8">
          <Menu
            onChange={handleFilterChange}
            brands={filterOptions.brands}
            articles={filterOptions.articles}
            genders={filterOptions.genders}
            sizes={filterOptions.sizes}
          />

          <Banner />
        </header>
        <main className="container mx-auto px-4 md:px-6 py-8 grid md:grid-cols-[1fr_3fr] gap-8">
          <aside className="hidden md:block">
            <ProductFilter
              onChange={handleFilterChange}
              brands={filterOptions.brands}
              articles={filterOptions.articles}
              genders={filterOptions.genders}
              sizes={filterOptions.sizes}
              onClearFilters={handleClearFilters}
            />
          </aside>
          <ProductList products={products} filters={filters} />
        </main>
        <Footer />
      </section>
    </>
  );
}
