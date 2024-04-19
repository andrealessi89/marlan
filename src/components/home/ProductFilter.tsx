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
  onClearFilters?: () => void; // Tornando opcional com '?'
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onChange, brands, articles, genders, sizes, onClearFilters }) => {
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


  return (
    <div className="space-y-4 ">
      <div>
        <Label htmlFor="brand">Marca</Label>
        <Select value={selectedBrand} onValueChange={value => { setSelectedBrand(value); onChange('brand', value); }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a marca" />
          </SelectTrigger>
          <SelectContent>
            {brands.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="article">Artigo</Label>
        <Select  value={selectedArticle} onValueChange={value => { setSelectedArticle(value); onChange('article', value); }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {articles.map(article => <SelectItem key={article} value={article}>{article}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="gender">Gênero</Label>
        <Select  value={selectedGender} onValueChange={value => { setSelectedGender(value); onChange('gender', value); }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o sexo" />
          </SelectTrigger>
          <SelectContent>
            {genders.map(gender => <SelectItem key={gender} value={gender}>{gender}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="size">Tamanho</Label>
        <Select  value={selectedSize} onValueChange={value => { setSelectedSize(value); onChange('size', value); }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o tamanho" />
          </SelectTrigger>
          <SelectContent>
            {sizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>


      <div>
        <Label htmlFor="minPrice">Preço Mínimo</Label>
        <Input
          id="minPrice"
          value={minPrice}
          onChange={e => {
            setMinPrice(e.target.value);
            onChange('minPrice', e.target.value);
          }}
          placeholder="R$ min"
          className="input-field"
          type="number"
          >
        </Input>
      </div>
      <div>
        <Label htmlFor="maxPrice">Preço Máximo</Label>
        <Input
          id="maxPrice"
          value={maxPrice}
          onChange={e => {
            setMaxPrice(e.target.value);
            onChange('maxPrice', e.target.value);
          }}
          placeholder="R$ max"
          className="input-field"
          type="number"
          >
        </Input>
      </div>
      <Button onClick={handleClearFilters} className="w-full mt-4">Limpar Filtro</Button>
    </div>  
  );
}

export default ProductFilter;
