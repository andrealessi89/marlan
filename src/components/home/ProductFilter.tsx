import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProductFilterProps {
  onChange: (filterType: string, value: any) => void;
  brands: any[];
  articles: any[];
  genders: any[];
  sizes: any[];
  onClearFilters?: () => void;
  onClose?: () => void; // Added optional onClose property
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  onChange,
  brands,
  articles,
  genders,
  sizes,
  onClearFilters,
  onClose
}) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedArticle, setSelectedArticle] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleClearFilters = () => {
    onChange('brand', '');
    onChange('article', '');
    onChange('gender', '');
    onChange('size', '');
    onChange('minPrice', '');
    onChange('maxPrice', '');

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
    if (onClose) onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="brand">Marca</Label>
        <select id="brand" name="brand" value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          <option value="">Selecione a marca</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="article">Artigo</Label>
        <select id="article" name="article" value={selectedArticle} onChange={e => setSelectedArticle(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          <option value="">Selecione a categoria</option>
          {articles.map(article => (
            <option key={article} value={article}>{article}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="gender">Gênero</Label>
        <select id="gender" name="gender" value={selectedGender} onChange={e => setSelectedGender(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          <option value="">Selecione o sexo</option>
          {genders.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="size">Tamanho</Label>
        <select id="size" name="size" value={selectedSize} onChange={e => setSelectedSize(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          <option value="">Selecione o tamanho</option>
          {sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="minPrice">Preço Mínimo</Label>
        <Input
          id="minPrice"
          name="minPrice"
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          placeholder="R$ min"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <Label htmlFor="maxPrice">Preço Máximo</Label>
        <Input
          id="maxPrice"
          name="maxPrice"
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          placeholder="R$ max"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>


      <Button onClick={handleApplyFilters} className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
        Aplicar Filtro
      </Button>
      <Button onClick={handleClearFilters} className="w-full mt-4">Limpar Filtro</Button>
    </div>
  );
}

export default ProductFilter;
