/* eslint-disable @next/next/no-img-element */
'use client';

import React, { forwardRef, useState } from "react";
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useExibirPrecos } from "@/hooks/useExibirPrecos";

interface ProductCardProps {
  image: string;
  description: {
    nome: string;
    referencia: string;
    genero: string;
    tamanho: string;
    marca: string;
    preco: number;
    cor: string;
  };
}

const ProductCard = forwardRef<HTMLElement, ProductCardProps>(
  ({ image, description }, ref: any) => {
    // hook externo para exibir ou ocultar preços
    const showPrices = useExibirPrecos();

    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [acceptColorChange, setAcceptColorChange] = useState(false);

    const handleAcceptColorChange = (checked: boolean | "indeterminate") => {
      setAcceptColorChange(typeof checked === 'boolean' ? checked : false);
    };

    const handleAddToCart = () => {
      if (!color || !size || quantity < 1) {
        toast.error('Por favor, selecione a cor, o tamanho e insira a quantidade.');
        return;
      }

      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const itemToAdd = { ...description, quantity, color, size, acceptColorChange };
      cartItems.push(itemToAdd);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      toast.success(`${description.referencia} foi adicionado ao seu carrinho.`);
      setIsOpen(false);
    };

    const colorOptions = description.cor.split(',').map(cor => cor.trim());
    const sizeOptions = description.tamanho.split(',').map(tamanho => tamanho.trim());

    return (
      <div
        ref={ref}
        className="card p-4 hover:shadow-2xl transition-shadow duration-500 ease-in-out relative overflow-hidden bg-white"
      >
        <img
          alt="Product Image"
          className="w-full rounded-lg object-cover transform hover:scale-110 transition-transform duration-500"
          src={image}
        />
        <div className="p-4">
          <h3 className="text-lg text-gray-900 font-semibold mb-1">{description.nome}</h3>
          <div className="text-gray-700 space-y-1">
            <p>Referência: {description.referencia}</p>
            <p>Tamanhos: {description.tamanho}</p>
            <p>Gênero: {description.genero}</p>
            <p>Marca: {description.marca}</p>

            {showPrices && (
              <p className="text-gray-900 font-bold">
                Preço:{' '}
                <span className="text-green-600 text-xl ml-1">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(description.preco)}
                </span>
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={() => setIsOpen(true)}
          className="bg-white hover:bg-red-700 text-red-600 hover:text-white rounded-full p-3 absolute bottom-4 right-4 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
        >
          <FaHeart /> Adicionar à lista
        </Button>

        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogTitle>Adicionar à Lista de Desejos</DialogTitle>

              <Label htmlFor="color">Cor</Label>
              <select
                id="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Selecione a cor</option>
                {colorOptions.map((cor, i) => (
                  <option key={i} value={cor}>{cor}</option>
                ))}
              </select>

              <Label htmlFor="size">Tamanho</Label>
              <select
                id="size"
                value={size}
                onChange={e => setSize(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Selecione o tamanho</option>
                {sizeOptions.map((tam, i) => (
                  <option key={i} value={tam}>{tam}</option>
                ))}
              </select>

              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                min={1}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />

              <Label htmlFor="trocaProduto">Aceitar troca de cor se não houver estoque</Label>
              <Checkbox
                checked={acceptColorChange}
                onCheckedChange={handleAcceptColorChange}
                id="trocaProduto"
              />

              <Button onClick={handleAddToCart} className="mt-4 w-full">
                Adicionar
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
