import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function ProductFilter({ onChange, brands, articles, genders, sizes, onClearFilters  }) {

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedArticle, setSelectedArticle] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSize, setSelectedSize] = useState('');


  const handleClearFilters = () => {
    // Chamando onChange para cada filtro com valor vazio ou inicial
    onChange('brand', '');
    onChange('article', '');
    onChange('gender', '');
    onChange('size', '');

    setSelectedBrand('');
    setSelectedArticle('');
    setSelectedGender('');
    setSelectedSize('');
    
    // Se existe uma função extra para limpar filtros, chame-a
    if (onClearFilters) {
      onClearFilters();
    }
  };


  return (
    <div className="space-y-4 ">
      <div>
        <Label htmlFor="brand">Marca</Label>
        <Select id="brand" value={selectedBrand} onValueChange={value => { setSelectedBrand(value); onChange('brand', value); }}>
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
        <Select id="article" value={selectedArticle} onValueChange={value => { setSelectedArticle(value); onChange('article', value); }}>
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
        <Select id="gender" value={selectedGender} onValueChange={value => { setSelectedGender(value); onChange('gender', value); }}>
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
        <Select id="size" value={selectedSize} onValueChange={value => { setSelectedSize(value); onChange('size', value); }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o tamanho" />
          </SelectTrigger>
          <SelectContent>
            {sizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
          </SelectContent>
        </Select>

        <Button onClick={handleClearFilters} className="w-full mt-4">Limpar Filtro</Button>
      </div>
    </div>
  );
}

export default ProductFilter;
