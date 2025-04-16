"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FaPrint, FaFilePdf } from 'react-icons/fa';
import { useConfig } from '@/providers/ConfigProvider';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Imprimir() {
  // Obtém a flag de exibição de preços do contexto
  const { exibirPrecos } = useConfig();
  const showPrices = exibirPrecos;

  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  }, []);

  // Cálculo do subtotal, desconto e total (serão utilizados se os preços estiverem visíveis)
  const subtotal = cartItems.reduce((acc, item) => acc + (item.preco * item.quantity), 0);
  let discount = 0;
  let discountMessage = "";
  // Aplica 10% de desconto se subtotal for maior ou igual a 3000,
  // ou 5% se for maior ou igual a 2000
  if (subtotal >= 3000) {
    discount = subtotal * 0.10;
    discountMessage = "Desconto de 10% aplicado.";
  } else if (subtotal >= 2000) {
    discount = subtotal * 0.05;
    discountMessage = "Desconto de 5% aplicado.";
  }
  const total = subtotal - discount;

  const handlePrint = () => {
    window.print();
  };

  const handleSavePdf = () => {
    // Define cabeçalho e linhas da tabela com ou sem informações de preço
    const headerRow = showPrices
      ? ['Ref/Tam', 'Cor', 'Quantidade', 'Preço', 'Subtotal']
      : ['Ref/Tam', 'Cor', 'Quantidade'];

    const bodyRows = cartItems.map(item => {
      if (showPrices) {
        return [
          { text: `${item.referencia}/${item.size}`, style: 'tableCell' },
          {
            stack: [
              { text: item.color, style: 'tableCell' },
              { text: `Aceita troca: ${item.acceptColorChange ? "Sim" : "Não"}`, style: 'smallText' }
            ],
            style: 'tableCell'
          },
          { text: item.quantity.toString(), style: 'tableCell' },
          { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.preco)), style: 'tableCell' },
          { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.preco * item.quantity)), style: 'tableCell' }
        ];
      } else {
        return [
          { text: `${item.referencia}/${item.size}`, style: 'tableCell' },
          { text: `${item.color} - Aceita troca: ${item.acceptColorChange ? "Sim" : "Não"}`, style: 'tableCell' },
          { text: item.quantity.toString(), style: 'tableCell' }
        ];
      }
    });

    const totalRows = showPrices ? [
      [
        { text: 'Preço Original:', colSpan: 4, style: 'totalLabel' },
        {}, {}, {},
        { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(subtotal)), style: 'tableTotal' }
      ],
      ...(discount > 0 ? [
        [
          { text: discountMessage, colSpan: 4, style: 'totalLabel' },
          {}, {}, {},
          { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(discount)), style: 'tableTotal' }
        ],
        [
          { text: 'Total Com Desconto:', colSpan: 4, style: 'totalLabel' },
          {}, {}, {},
          { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(total)), style: 'tableTotal' }
        ]
      ] : [])
    ] : [];

    const docDefinition = {
      content: [
        { text: 'Detalhes do Pedido', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: showPrices ? ['*', '*', 'auto', 'auto', 'auto'] : ['*', '*', 'auto'],
            body: [
              headerRow,
              ...bodyRows,
              ...totalRows
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableCell: {
          margin: [0, 5, 0, 5]
        },
        smallText: {
          fontSize: 9,
          margin: [0, 5, 0, 0]
        },
        totalLabel: {
          bold: true,
          alignment: 'right',
          margin: [0, 5, 0, 5]
        },
        tableTotal: {
          margin: [0, 5, 0, 5],
          bold: true
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('pedido.pdf');
  };

  return (
    <div>
      <header style={{ textAlign: 'center', margin: '20px 0' }}>
        <img src='images/Grupomarlan-sem-slogan.svg' alt='Grupomarlan' width={200} />
        <h1>Detalhes do Pedido</h1>
      </header>
      
      <div style={{ padding: '0 20px' }}>
        <Button onClick={handlePrint} style={{ marginRight: '8px' }}>
          <FaPrint style={{ marginRight: '8px' }} />Imprimir
        </Button>
        <Button onClick={handleSavePdf}>
          <FaFilePdf style={{ marginRight: '8px' }} />Salvar como PDF
        </Button>

        <div id="printArea">
          {cartItems.length > 0 ? (
            <table width="100%" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Ref/Tam</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Cor</th> 
                  <th style={{ border: '1px solid black', padding: '8px' }}>Quantidade</th>
                  {showPrices && (
                    <>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Preço</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Subtotal</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <img alt="Product" className="h-10 w-10 rounded-full object-cover" src={item.imagem} />
                      {item.referencia}/{item.size}
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {item.color} - Aceita troca: {item.acceptColorChange ? "Sim" : "Não"}
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                      {item.quantity}
                    </td>
                    {showPrices && (
                      <>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.preco))}
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.preco * item.quantity))}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
              {showPrices && (
                <tfoot>
                  <tr>
                    <td colSpan={4} style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>
                      Preço Original:
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(subtotal))}
                    </td>
                  </tr>
                  {discount > 0 && (
                    <>
                      <tr>
                        <td colSpan={4} style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>
                          {discountMessage}
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(discount))}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={4} style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>
                          Total com Desconto:
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(total))}
                        </td>
                      </tr>
                    </>
                  )}
                </tfoot>
              )}
            </table>
          ) : (
            <p>Nenhum item no carrinho.</p>
          )}
        </div>
        <Button onClick={handlePrint} style={{ marginRight: '8px' }}>
          <FaPrint style={{ marginRight: '8px' }} />Imprimir
        </Button>
        <Button onClick={handleSavePdf}>
          <FaFilePdf style={{ marginRight: '8px' }} />Salvar como PDF
        </Button>
      </div>
    </div>
  );
}
