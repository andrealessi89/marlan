import React, { useState, useEffect, useRef } from 'react';
import ProductCard from "@/components/home/ProductCard";

const ProductList = ({ products, filters }) => {
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [loadedItems, setLoadedItems] = useState(12);
    const observer = useRef();
    const lastProductRef = useRef();
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalFilterProduct, setTotalFilterProduct] = useState(0);

    // Este useEffect lida com a filtragem dos produtos
    useEffect(() => {
        const filteredProducts = products.filter(product => {
            return (
                (!filters.brand || product.marca === filters.brand) &&
                (!filters.article || product.artigo === filters.article) &&
                (!filters.gender || product.genero === filters.gender) &&
                (!filters.size || product.tamanho.split(", ").includes(filters.size))

            ); 
        });

        
        setTotalFilterProduct(filteredProducts.length);
        setVisibleProducts(filteredProducts.slice(0, loadedItems));
    }, [products, loadedItems, filters]);

    // Este useEffect reseta o número de itens carregados quando os filtros mudam
    useEffect(() => {
        setLoadedItems(12);
    }, [filters]);

    // Este useEffect gerencia o observer para a rolagem infinita
    useEffect(() => {

        const currentElement = lastProductRef.current;


        if (currentElement && visibleProducts.length < totalFilterProduct) {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && !isLoadingMore) {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                        setLoadedItems(prev => prev + 12); // Carrega mais itens após 5 segundos
                        setIsLoadingMore(false); // Para de mostrar o indicador de carregamento
                    }, 1000);
                }
            });

            observer.current.observe(currentElement);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [visibleProducts.length, products.length, visibleProducts, filters, totalFilterProduct]);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleProducts.map((product, index) => (
                <ProductCard
                    ref={index === visibleProducts.length - 1 ? lastProductRef : null}
                    key={product.id}
                    image={product.imagem}
                    description={product}
                    priceRange={`R$ ${product.preco.toFixed(2)}`}
                />
            ))}
            {isLoadingMore && <div className="w-full text-center">Carregando...</div>}
        </section>
    );
};

export default ProductList;