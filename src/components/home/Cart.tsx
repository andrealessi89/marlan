import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Input } from '../ui/input';

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
        <Button variant="icon" onClick={handleCartButtonClick}>
          Ver Carrinho<FaShoppingCart className="text-red-600 hover:text-red-700" size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent style={{ maxHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="transition-transform duration-500 ease-in-out transform translate-y-0 bg-white dark:bg-gray-800 shadow-xl rounded-t-lg p-4">
        <SheetClose asChild>
          <Button variant="outline" size="icon" className="border-transparent bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon />
          </Button>
        </SheetClose>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sua Lista</h2>
        <div style={{ overflowY: 'auto', flexGrow: 1 }} className="divide-y divide-gray-200 dark:divide-gray-700">
          {cartItems.map((item, index) => (
            <li key={index} className="py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img alt="Product" className="h-10 w-10 rounded-full object-cover" src={item.imagem} />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Ref: {item.referencia}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">R$ {item.preco.toFixed(2)}</p>
                  <p>Cor: {item.color} Quantidade: <Input type="number" value={item.quantity} onChange={(e) => updateQuantity(index, Number(e.target.value))} min="1" /></p>
                  <p>Troca de cor aceita: {item.acceptColorChange ? "Sim" : "Não"}</p>
                </div>
              </div>
              <Button onClick={(e) => removeFromCart(index, e)}>Remove</Button>
            </li>
          ))}
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow-inner">
          <span className="text-lg font-medium text-gray-900 dark:text-white">Preço original: R$ {subtotal.toFixed(2)}</span>
          {discount > 0 && (
            <>
              <p className="text-red-500">{discountMessage}</p>
              <span className="text-lg font-medium text-gray-900 dark:text-white">Preço com desconto: R$ {total.toFixed(2)}</span>
            </>
          )}
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
