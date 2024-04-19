/* eslint-disable @next/next/no-img-element */
import React, { forwardRef, useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface ProductCardProps {
  image: string;
  description: {
    nome: string;
    referencia: string;
    genero: string;
    tamanho: string;
    marca: string;
    preco: number;
    cor: string;  // Adicione mais propriedades conforme necessário
  };
}

const ProductCard = forwardRef<HTMLElement, ProductCardProps>(
  ({ image, description }, ref:any) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [acceptColorChange, setAcceptColorChange] = useState(false);

  const handleAcceptColorChange = (checked: boolean | "indeterminate") => {
    if (checked === "indeterminate") {
      // Trate o estado "indeterminate" conforme necessário.
      // Exemplo: Pode querer definir como false ou true baseado em alguma condição.
      setAcceptColorChange(false); // Ou true, conforme necessário.
    } else {
      // Se não for "indeterminate", basta passar o valor booleano.
      setAcceptColorChange(checked);
    }
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemToAdd = { ...description, quantity, color, size, acceptColorChange };
    cartItems.push(itemToAdd);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    toast.success(`${description.referencia} foi adicionado ao seu carrinho.`);
    setIsOpen(false);
  };

  // Converter a string de cores em uma lista de opções
  const colorOptions = description.cor.split(',').map(cor => cor.trim());
  const sizeOptions = description.tamanho.split(',').map(tamanho => tamanho.trim());

  return (
    <div ref={ref} className="card p-4 hover:shadow-2xl transition-shadow duration-500 ease-in-out relative overflow-hidden bg-white">
      <img  alt="Product Image" className="w-full rounded-lg object-cover transform hover:scale-110 transition-transform duration-500" src={image} />
      <div className="p-4">
        <h3 className="text-lg text-gray-900 font-semibold mb-1">{description.nome}</h3>
        <div className="text-gray-700 space-y-1">
          <p>Referência: {description.referencia}</p>
          <p>Tamanhos: {description.tamanho}</p>
          <p>Gênero: {description.genero}</p>
          <p>Marca: {description.marca}</p>
          
          <p className="text-gray-900 font-bold">Preço: <span className="text-green-600 text-xl ml-1">{description.preco}</span></p>
        </div>
      </div>
      <Button onClick={() => setIsOpen(true)} className="bg-white bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-white rounded-full p-3 absolute bottom-4 right-4 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
        <FaShoppingCart className="text-red-600 hover:text-white" />
      </Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogTitle>Adicionar ao carrinho</DialogTitle>
            <Select defaultValue="" onValueChange={setColor} aria-label="Cor">
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cor" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((colorOption, index) => (
                  <SelectItem key={index} value={colorOption}>{colorOption}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="" onValueChange={setSize} aria-label="Tamanho">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.map((sizeOption, index) => (
                  <SelectItem key={index} value={sizeOption}>{sizeOption}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" />
            <Label htmlFor="trocaProduto">Aceitar trocar de cor caso não tenha em estoque</Label>
            <Checkbox checked={acceptColorChange} onCheckedChange={handleAcceptColorChange} id="trocaProduto" />
            <Button onClick={handleAddToCart}>Adicionar</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
