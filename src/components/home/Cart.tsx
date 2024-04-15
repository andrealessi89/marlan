import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import PrintComponent from './PrintComponent';

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

  

  const total = cartItems.reduce((acc, item) => acc + item.preco, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button variant="icon" onClick={handleCartButtonClick}>
            <FaShoppingCart className="text-red-600 hover:text-red-700" size={30} />
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
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={(e) => removeFromCart(index, e)}>
                Remove
              </Button>
            </li>
          ))}
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow-inner">
          <span className="text-lg font-medium text-gray-900 dark:text-white">Total: R$ {total.toFixed(2)}</span>
          
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
