/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

export default function Imprimir() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.preco * item.quantity), 0);
  let discount = 0;
  let discountMessage = "";

  if (subtotal >= 10000) {
    discount = subtotal * 0.10;
    discountMessage = "Desconto de 10% aplicado.";
  } else if (subtotal >= 2000) {
    discount = subtotal * 0.05;
    discountMessage = "Desconto de 5% aplicado.";
  }

  const total = subtotal - discount;

  return (
    <div>
        
      <header style={{ textAlign: 'center', margin: '20px 0' }}>
      <img src='https://grupomarlan.com.br/wp-content/uploads/2021/06/Grupomarlan-sem-slogan.svg' alt='Grupomarlan' width={200}/>
        <h1>Detalhes do Pedido</h1>
      </header>
      
      <div style={{ padding: '0 20px' }}>
      <Button onClick={handlePrint}>Imprimir</Button>
        {cartItems.length > 0 ? (
          <table width="100%" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Ref/Tam</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Cor</th> 
                <th style={{ border: '1px solid black', padding: '8px' }}>Quantidade</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Preço</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <img alt="Product" className="h-10 w-10 rounded-full object-cover" src={item.imagem} />
                    {item.referencia}/{item.size}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.color} - Aceita troca: {item.acceptColorChange ? "Sim" : "Não"}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>R$ {item.preco.toFixed(2)}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>R$ {(item.preco * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>Preço original:</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>R$ {subtotal.toFixed(2)}</td>
              </tr>
              {discount > 0 && (
                <>
                  <tr>
                    <td colSpan={4} style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>{discountMessage}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>R$ {total.toFixed(2)}</td>
                  </tr>
                </>
              )}
            </tfoot>
          </table>
        ) : (
          <p>Nenhum item no carrinho.</p>
        )}
        <Button onClick={handlePrint}>Imprimir</Button>
      
      </div>
    </div>
  );
}