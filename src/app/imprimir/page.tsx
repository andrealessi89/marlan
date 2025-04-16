// src/app/imprimir/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FaPrint, FaFilePdf } from 'react-icons/fa';
import { useExibirPrecos } from "@/hooks/useExibirPrecos";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Imprimir() {
  const showPrices = useExibirPrecos();

  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.preco * item.quantity, 0);
  let discount = 0;
  let discountMessage = "";
  if (subtotal >= 3000) {
    discount = subtotal * 0.10;
    discountMessage = "Desconto de 10% aplicado.";
  } else if (subtotal >= 2000) {
    discount = subtotal * 0.05;
    discountMessage = "Desconto de 5% aplicado.";
  }
  const total = subtotal - discount;

  const handlePrint = () => window.print();

  const handleSavePdf = () => {
    const headerRow = showPrices
      ? ['Ref/Tam', 'Cor', 'Qtd', 'Preço', 'Subtotal']
      : ['Ref/Tam', 'Cor', 'Qtd'];

    const bodyRows = cartItems.map(item => {
      const base = [
        { text: `${item.referencia}/${item.size}`, style: 'tableCell' },
        { text: `${item.color} (Troca: ${item.acceptColorChange ? "Sim" : "Não"})`, style: 'tableCell' },
        { text: item.quantity.toString(), style: 'tableCell' }
      ];
      if (!showPrices) return base;
      return [
        ...base,
        { text: new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(item.preco), style: 'tableCell' },
        { text: new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(item.preco * item.quantity), style: 'tableCell' }
      ];
    });

    const totalRows = showPrices
      ? [
          [
            { text: 'Preço Original:', colSpan: 4, style: 'totalLabel' }, {}, {}, {},
            { text: new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(subtotal), style: 'tableTotal' }
          ],
          ...(discount > 0
            ? [
                [
                  { text: discountMessage, colSpan: 4, style: 'totalLabel' }, {}, {}, {},
                  { text: new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(discount), style: 'tableTotal' }
                ],
                [
                  { text: 'Total com Desconto:', colSpan: 4, style: 'totalLabel' }, {}, {}, {},
                  { text: new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(total), style: 'tableTotal' }
                ]
              ]
            : [])
        ]
      : [];

    const docDefinition = {
      content: [
        { text: 'Detalhes do Pedido', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: showPrices ? ['*','*','auto','auto','auto'] : ['*','*','auto'],
            body: [ headerRow, ...bodyRows, ...totalRows ]
          }
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin:[0,0,0,10] },
        tableCell: { margin:[0,5,0,5] },
        totalLabel: { bold:true, alignment:'right', margin:[0,5,0,5] },
        tableTotal: { bold:true, margin:[0,5,0,5] }
      }
    };

    pdfMake.createPdf(docDefinition).download('pedido.pdf');
  };

  return (
    <div>
      <header style={{ textAlign:'center', margin:'20px 0' }}>
        <img src="/images/Grupomarlan-sem-slogan.svg" alt="Grupomarlan" width={200}/>
        <h1>Detalhes do Pedido</h1>
      </header>

      <div style={{ padding:'0 20px' }}>
        <Button onClick={handlePrint} style={{ marginRight:8 }}>
          <FaPrint style={{ marginRight:8 }}/>Imprimir
        </Button>
        <Button onClick={handleSavePdf}>
          <FaFilePdf style={{ marginRight:8 }}/>Salvar como PDF
        </Button>

        <div id="printArea" style={{ marginTop:20 }}>
          {cartItems.length > 0 ? (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Ref/Tam</th>
                  <th style={thStyle}>Cor</th>
                  <th style={thStyle}>Quantidade</th>
                  {showPrices && <>
                    <th style={thStyle}>Preço</th>
                    <th style={thStyle}>Subtotal</th>
                  </>}
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item,i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{item.referencia}/{item.size}</td>
                    <td style={tdStyle}>{item.color}</td>
                    <td style={tdCenter}>{item.quantity}</td>
                    {showPrices && <>
                      <td style={tdStyle}>
                        {new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(item.preco)}
                      </td>
                      <td style={tdStyle}>
                        {new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(item.preco * item.quantity)}
                      </td>
                    </>}
                  </tr>
                ))}
              </tbody>
              {showPrices && (
                <tfoot>
                  <tr>
                    <td colSpan={4} style={{ ...tdStyle, textAlign:'right' }}>Preço Original:</td>
                    <td style={tdStyle}>
                      {new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(subtotal)}
                    </td>
                  </tr>
                  {discount > 0 && <>
                    <tr>
                      <td colSpan={4} style={{ ...tdStyle, textAlign:'right' }}>{discountMessage}</td>
                      <td style={tdStyle}>
                        {new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(discount)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} style={{ ...tdStyle, textAlign:'right' }}>Total com Desconto:</td>
                      <td style={tdStyle}>
                        {new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(total)}
                      </td>
                    </tr>
                  </>}
                </tfoot>
              )}
            </table>
          ) : (
            <p>Nenhum item no carrinho.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// estilos inline com tipos corretos
const thStyle: React.CSSProperties = { border:'1px solid black', padding:8, background:'#f5f5f5' };
const tdStyle: React.CSSProperties = { border:'1px solid black', padding:8 };
const tdCenter: React.CSSProperties = { ...tdStyle, textAlign:'center' };
