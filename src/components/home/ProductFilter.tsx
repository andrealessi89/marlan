import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input"


interface ProductFilterProps {
  onChange: (filterType: string, value: any) => void;
  brands: any[];
  articles: any[];
  genders: any[];
  sizes: any[];
  onClearFilters?: () => void;
  onClose?: () => void; // Added optional onClose property
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onChange, brands, articles, genders, sizes, onClearFilters, onClose  }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedArticle, setSelectedArticle] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  

  const handleClearFilters = () => {
    setSelectedBrand('');
    setSelectedArticle('');
    setSelectedGender('');
    setSelectedSize('');
    setMinPrice('');
    setMaxPrice('');

    if (onClearFilters) {
      onClearFilters();
    }
  };

  const handleApplyFilters = () => {
    onChange('brand', selectedBrand);
    onChange('article', selectedArticle);
    onChange('gender', selectedGender);
    onChange('size', selectedSize);
    onChange('minPrice', minPrice);
    onChange('maxPrice', maxPrice);
    if (onClose) onClose(); // Fechar o menu após aplicar os filtros
  };

  return (
    <div className="space-y-4">
      {/* Marca */}
      <div>
        <Label htmlFor="brand">Marca</Label>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a marca" />
          </SelectTrigger>
          <SelectContent>
            {brands.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Artigo */}
      <div>
        <Label htmlFor="article">Artigo</Label>
        <Select value={selectedArticle} onValueChange={setSelectedArticle}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {articles.map(article => <SelectItem key={article} value={article}>{article}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Gênero */}
      <div>
        <Label htmlFor="gender">Gênero</Label>
        <Select value={selectedGender} onValueChange={setSelectedGender}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o sexo" />
          </SelectTrigger>
          <SelectContent>
            {genders.map(gender => <SelectItem key={gender} value={gender}>{gender}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Tamanho */}
      <div>
        <Label htmlFor="size">Tamanho</Label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o tamanho" />
          </SelectTrigger>
          <SelectContent>
            {sizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Preço Mínimo */}
      <div>
        <Label htmlFor="minPrice">Preço Mínimo</Label>
        <Input
          id="minPrice"
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          placeholder="R$ min"
          className="input-field"
        />
      </div>

      {/* Preço Máximo */}
      <div>
        <Label htmlFor="maxPrice">Preço Máximo</Label>
        <Input
          id="maxPrice"
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          placeholder="R$ max"
          className="input-field"
        />
      </div>

      {/* Botões */}
      <Button onClick={handleApplyFilters} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Aplicar Filtro
      </Button>
      <Button onClick={handleClearFilters} className="w-full mt-4">Limpar Filtro</Button>
    </div>
);

}

export default ProductFilter;
