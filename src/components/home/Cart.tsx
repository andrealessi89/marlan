/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Input } from '../ui/input';
import Link from 'next/link';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  };

  const handleCartButtonClick = () => {
    loadCartItems();
  };

  const removeFromCart = (index, event) => {
    event.stopPropagation();
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const updateQuantity = (index, newQuantity) => {
    let newCartItems = [...cartItems];
    newCartItems[index].quantity = Number(newQuantity);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.preco * item.quantity, 0);
    let discount = 0;
    let discountMessage = '';
    if (subtotal >= 10000) {
      discount = 0.10; // 10% de desconto
      discountMessage = 'Você ganhou 10% de desconto por compras acima de R$10.000,00.';
    } else if (subtotal >= 2000) {
      discount = 0.05; // 5% de desconto
      discountMessage = 'Você ganhou 5% de desconto por compras acima de R$2.000,00.';
    }
    const total = subtotal - (subtotal * discount);
    return { subtotal, total, discount, discountMessage };
  };

  const { subtotal, total, discount, discountMessage } = calculateTotal();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handleCartButtonClick}>
          Ver Carrinho
          <FaShoppingCart className="" size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent style={{ maxHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fa' }} className="shadow-xl rounded-t-lg p-4">
        <SheetClose asChild>
          <Button variant="ghost" size="icon">
            <XIcon />
          </Button>
        </SheetClose>
        <h2 className="text-xl font-bold text-gray-900">Sua Lista</h2>
        <Button asChild className="bg-red-600 text-white hover:bg-red-700 mt-4">
          <Link href="/imprimir">Imprimir Lista</Link>
        </Button>

        <div className="overflow-y-auto" style={{ flexGrow: 1 }}>
          {cartItems.map((item, index) => (
            <div key={index} className="py-4 flex justify-between items-center border-b border-gray-300">
              <div className="flex items-center space-x-4">
                <img alt="Product" className="h-10 w-10 rounded-full object-cover" src={item.imagem} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Ref: {item.referencia} / {item.size}</p>
                  <p className="text-sm text-gray-500">R$ {item.preco.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Cor: {item.color}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">Qtd:</p>
                    <Input type="number" value={item.quantity} onChange={(e) => updateQuantity(index, Number(e.target.value))} min="1" className="w-16" />
                  </div>
                  <p className="text-sm text-gray-500">Troca de cor aceita: {item.acceptColorChange ? "Sim" : "Não"}</p>
                </div>
              </div>
              <Button onClick={(e) => removeFromCart(index, e)} variant="outline" color="red">Remove</Button>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-white rounded shadow-sm">
          <div className="flex flex-col justify-between space-y-2">
            <span className="text-lg font-medium text-gray-900 text-lg">Preço original: R$ {subtotal.toFixed(2)}</span>
            {discount > 0 && (
              <>
                <p className="text-red-500 text-xs">{discountMessage}</p>
                <span className="text-lg font-medium text-gray-900 text-sm">Preço com desconto: R$ {total.toFixed(2)}</span>
              </>
            )}
          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
};

export default Cart;

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="M6 6 18 18" />
    </svg>
  );
}
